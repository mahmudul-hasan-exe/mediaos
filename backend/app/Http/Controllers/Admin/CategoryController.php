<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\MenuItem;
use App\Services\TenantResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class CategoryController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);

        $categories = Category::with('subcategories')
            ->withCount('articles')
            ->where('tenant_id', $tenant->id)
            ->whereNull('parent_id')
            ->orderBy('order')
            ->get();

        return view('admin.categories.index', compact('tenant', 'categories'));
    }

    public function store(Request $request, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'color' => ['nullable', 'string', 'max:20'],
            'parent_id' => ['nullable', 'exists:categories,id'],
            'order' => ['nullable', 'integer'],
        ]);

        $slug = Str::slug($validated['name']);
        if (Category::where('tenant_id', $tenant->id)->where('slug', $slug)->exists()) {
            $slug .= '-' . Str::random(4);
        }

        $category = Category::create([
            'tenant_id' => $tenant->id,
            'parent_id' => $validated['parent_id'] ?? null,
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'color' => $validated['color'] ?? '#2563EB',
            'order' => $validated['order'] ?? (Category::where('tenant_id', $tenant->id)->count() + 1),
            'language' => $tenant->default_language ?? 'en',
        ]);

        if ($request->boolean('add_to_menu') && empty($validated['parent_id'])) {
            foreach (['header', 'mega'] as $loc) {
                $url = '/category/' . $category->slug;
                $exists = MenuItem::where('tenant_id', $tenant->id)
                    ->where('location', $loc)
                    ->where('url', $url)
                    ->exists();

                if (! $exists) {
                    $maxOrder = (int) MenuItem::where('tenant_id', $tenant->id)
                        ->where('location', $loc)
                        ->whereNull('parent_id')
                        ->max('sort_order');

                    MenuItem::create([
                        'tenant_id' => $tenant->id,
                        'category_id' => $category->id,
                        'location' => $loc,
                        'label' => $category->name,
                        'url' => $url,
                        'target' => '_self',
                        'sort_order' => $maxOrder + 1,
                        'is_active' => true,
                    ]);
                }
            }
        }

        return back()->with('success', 'Category created.');
    }

    public function destroy(Request $request, Category $category, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($category->tenant_id !== $tenant->id, 403);

        $category->delete();

        return back()->with('success', 'Category deleted.');
    }
}

