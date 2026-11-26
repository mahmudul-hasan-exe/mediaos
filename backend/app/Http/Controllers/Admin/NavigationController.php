<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\MenuItem;
use App\Services\DefaultMenuService;
use App\Services\TenantResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class NavigationController extends Controller
{
    public function index(Request $request, TenantResolver $resolver, DefaultMenuService $menuSeeder): View
    {
        $tenant = $resolver->resolveFromRequest($request);
        $menuSeeder->ensureSeededForTenant($tenant);

        $locations = MenuItem::LOCATIONS;
        $activeLocation = $request->query('location', 'header');
        if (! array_key_exists($activeLocation, $locations)) {
            $activeLocation = 'header';
        }

        $menuItemsQuery = MenuItem::with(['children.category', 'category'])
            ->where('tenant_id', $tenant->id)
            ->where('location', $activeLocation)
            ->whereNull('parent_id');

        if ($search = trim((string) $request->query('search', ''))) {
            $menuItemsQuery->where('label', 'like', "%{$search}%");
        }

        if ($status = $request->query('status')) {
            if ($status === 'active') {
                $menuItemsQuery->where('is_active', true);
            } elseif ($status === 'hidden') {
                $menuItemsQuery->where('is_active', false);
            }
        }

        $menuItems = $menuItemsQuery
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $drawerParents = MenuItem::where('tenant_id', $tenant->id)
            ->where('location', 'drawer')
            ->whereNull('parent_id')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $countsByLocation = MenuItem::where('tenant_id', $tenant->id)
            ->whereIn('location', array_keys($locations))
            ->whereNull('parent_id')
            ->selectRaw('location, count(*) as total')
            ->groupBy('location')
            ->pluck('total', 'location');

        $categories = Category::with('subcategories')
            ->where('tenant_id', $tenant->id)
            ->whereNull('parent_id')
            ->orderBy('order')
            ->get();

        $existingUrlsInLocation = MenuItem::where('tenant_id', $tenant->id)
            ->where('location', $activeLocation)
            ->pluck('url')
            ->all();

        return view('admin.navigation.index', compact(
            'tenant',
            'locations',
            'activeLocation',
            'menuItems',
            'drawerParents',
            'countsByLocation',
            'categories',
            'existingUrlsInLocation'
        ));
    }

    public function store(Request $request, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        $validLocationKeys = array_keys(MenuItem::LOCATIONS);

        // Support either multi-select `locations[]` or single `location`
        $rawLocations = $request->input('locations', $request->filled('location') ? [$request->input('location')] : []);
        $request->merge(['resolved_locations' => is_array($rawLocations) ? array_values(array_unique($rawLocations)) : []]);

        $validated = $request->validate([
            'resolved_locations' => ['required', 'array', 'min:1'],
            'resolved_locations.*' => ['required', Rule::in($validLocationKeys)],
            'label' => ['required', 'string', 'max:120'],
            'parent_id' => ['nullable', 'integer'],
        ], [
            'resolved_locations.required' => 'Please select at least one menu area (Header Bar, Sections, More, or Side Menu).',
        ]);

        $label = trim($validated['label']);
        $targetLocations = $validated['resolved_locations'];

        $drawerParent = null;
        if (! empty($validated['parent_id']) && in_array('drawer', $targetLocations, true)) {
            $drawerParent = MenuItem::where('tenant_id', $tenant->id)
                ->where('location', 'drawer')
                ->whereNull('parent_id')
                ->find($validated['parent_id']);
        }

        [$resolvedUrl, $categoryId] = $this->resolveDestinationFromLabel(
            $tenant->id,
            $tenant->default_language ?? 'en',
            $label,
            $drawerParent?->id
        );

        $addedAreas = [];
        foreach ($targetLocations as $loc) {
            $parentIdForLoc = ($loc === 'drawer' && $drawerParent) ? $drawerParent->id : null;

            $alreadyExists = MenuItem::where('tenant_id', $tenant->id)
                ->where('location', $loc)
                ->where('parent_id', $parentIdForLoc)
                ->whereRaw('LOWER(label) = ?', [strtolower($label)])
                ->exists();

            if (! $alreadyExists) {
                $nextOrder = (int) MenuItem::where('tenant_id', $tenant->id)
                    ->where('location', $loc)
                    ->where('parent_id', $parentIdForLoc)
                    ->max('sort_order') + 1;

                MenuItem::create([
                    'tenant_id' => $tenant->id,
                    'parent_id' => $parentIdForLoc,
                    'category_id' => $categoryId,
                    'location' => $loc,
                    'label' => $label,
                    'url' => $resolvedUrl,
                    'target' => '_self',
                    'sort_order' => $nextOrder,
                    'is_active' => true,
                ]);
            }

            $addedAreas[] = MenuItem::LOCATIONS[$loc]['label'];
        }

        return redirect()
            ->route('admin.navigation.index', ['location' => $targetLocations[0]])
            ->with('success', 'Menu item "' . $label . '" saved to ' . implode(', ', $addedAreas) . '.');
    }

    public function addCategories(Request $request, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        $validLocationKeys = array_keys(MenuItem::LOCATIONS);

        $rawLocations = $request->input('locations', $request->filled('location') ? [$request->input('location')] : []);
        $request->merge(['resolved_locations' => is_array($rawLocations) ? array_values(array_unique($rawLocations)) : []]);

        $validated = $request->validate([
            'resolved_locations' => ['required', 'array', 'min:1'],
            'resolved_locations.*' => ['required', Rule::in($validLocationKeys)],
            'category_ids' => ['required', 'array', 'min:1'],
            'category_ids.*' => ['integer'],
            'include_subcategories' => ['nullable', 'boolean'],
        ], [
            'resolved_locations.required' => 'Please select at least one menu area.',
            'category_ids.required' => 'Please select at least one category.',
        ]);

        $targetLocations = $validated['resolved_locations'];
        $categories = Category::with('subcategories')
            ->where('tenant_id', $tenant->id)
            ->whereIn('id', $validated['category_ids'])
            ->orderBy('order')
            ->get();

        $addedCount = 0;

        foreach ($targetLocations as $location) {
            $includeSubs = $location === 'drawer' && $request->boolean('include_subcategories', true);

            $maxOrder = (int) MenuItem::where('tenant_id', $tenant->id)
                ->where('location', $location)
                ->whereNull('parent_id')
                ->max('sort_order');

            foreach ($categories as $cat) {
                $url = '/category/' . $cat->slug;

                $existingParent = MenuItem::where('tenant_id', $tenant->id)
                    ->where('location', $location)
                    ->whereNull('parent_id')
                    ->where('url', $url)
                    ->first();

                if (! $existingParent) {
                    $maxOrder++;
                    $existingParent = MenuItem::create([
                        'tenant_id' => $tenant->id,
                        'category_id' => $cat->id,
                        'location' => $location,
                        'label' => $cat->name,
                        'url' => $url,
                        'target' => '_self',
                        'sort_order' => $maxOrder,
                        'is_active' => true,
                    ]);
                    $addedCount++;
                }

                if ($includeSubs && $cat->subcategories->isNotEmpty()) {
                    $subOrder = (int) MenuItem::where('parent_id', $existingParent->id)->max('sort_order');
                    foreach ($cat->subcategories as $sub) {
                        $existsSub = MenuItem::where('tenant_id', $tenant->id)
                            ->where('parent_id', $existingParent->id)
                            ->where('label', $sub->name)
                            ->exists();

                        if (! $existsSub) {
                            $subOrder++;
                            MenuItem::create([
                                'tenant_id' => $tenant->id,
                                'parent_id' => $existingParent->id,
                                'category_id' => $sub->id,
                                'location' => $location,
                                'label' => $sub->name,
                                'url' => '/category/' . $sub->slug,
                                'target' => '_self',
                                'sort_order' => $subOrder,
                                'is_active' => true,
                            ]);
                            $addedCount++;
                        }
                    }
                }
            }
        }

        return redirect()
            ->route('admin.navigation.index', ['location' => $targetLocations[0]])
            ->with('success', $addedCount > 0 ? "{$addedCount} menu item(s) added." : 'Selected categories are already in the chosen menu(s).');
    }

    public function update(Request $request, MenuItem $menuItem, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($menuItem->tenant_id !== $tenant->id, 403);

        $validated = $request->validate([
            'label' => ['required', 'string', 'max:120'],
        ]);

        $menuItem->update([
            'label' => trim($validated['label']),
        ]);

        return redirect()
            ->route('admin.navigation.index', ['location' => $menuItem->location])
            ->with('success', 'Menu item updated.');
    }

    public function toggle(Request $request, MenuItem $menuItem, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($menuItem->tenant_id !== $tenant->id, 403);

        $menuItem->update(['is_active' => ! $menuItem->is_active]);

        return redirect()
            ->route('admin.navigation.index', ['location' => $menuItem->location])
            ->with('success', $menuItem->is_active ? 'Menu item enabled.' : 'Menu item hidden.');
    }

    public function destroy(Request $request, MenuItem $menuItem, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($menuItem->tenant_id !== $tenant->id, 403);

        $location = $menuItem->location;
        $menuItem->delete();

        return redirect()
            ->route('admin.navigation.index', ['location' => $location])
            ->with('success', 'Menu item removed.');
    }

    /**
     * Automatically determine the frontend route & category from just a human-friendly Menu Name.
     *
     * @return array{0: string, 1: int|null}
     */
    private function resolveDestinationFromLabel(int $tenantId, string $defaultLang, string $label, ?int $parentMenuId = null): array
    {
        $normalized = strtolower(trim($label));

        $builtInPages = [
            'home' => '/',
            'trending' => '/trending',
            'trending wire' => '/trending',
            'trending topics' => '/trending',
            'epaper' => '/epaper',
            'e-paper' => '/epaper',
            'digital e-paper' => '/epaper',
            'e-paper edition' => '/epaper',
            'search' => '/search',
            'archive' => '/search',
            'dispatch archive' => '/search',
            'about' => '/about',
            'about us' => '/about',
            'contact' => '/contact',
            'support journalism' => '/contact',
            'live coverage' => '/#live',
            'shorts & reels' => '/#shorts',
            'audio podcasts' => '/#podcasts',
        ];

        if (isset($builtInPages[$normalized])) {
            return [$builtInPages[$normalized], null];
        }

        $slug = Str::slug($label) ?: 'section-' . strtolower(Str::random(4));

        $category = Category::where('tenant_id', $tenantId)
            ->where(function ($q) use ($label, $slug) {
                $q->whereRaw('LOWER(name) = ?', [strtolower($label)])
                    ->orWhere('slug', $slug);
            })
            ->first();

        if (! $category) {
            $parentCategoryId = null;
            if ($parentMenuId) {
                $parentMenu = MenuItem::find($parentMenuId);
                $parentCategoryId = $parentMenu?->category_id;
            }

            $category = Category::create([
                'tenant_id' => $tenantId,
                'parent_id' => $parentCategoryId,
                'name' => $label,
                'slug' => $slug,
                'color' => '#2563EB',
                'order' => Category::where('tenant_id', $tenantId)->count() + 1,
                'language' => $defaultLang,
            ]);
        }

        return ['/category/' . $category->slug, $category->id];
    }
}
