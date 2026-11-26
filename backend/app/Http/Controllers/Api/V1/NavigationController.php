<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\MenuItem;
use App\Services\DefaultMenuService;
use App\Services\TenantResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NavigationController extends Controller
{
    public function index(Request $request, TenantResolver $resolver, DefaultMenuService $menuSeeder): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        $menuSeeder->ensureSeededForTenant($tenant);

        $allItems = MenuItem::with(['children' => function ($query) {
            $query->where('is_active', true)->orderBy('sort_order')->orderBy('id');
        }])
            ->where('tenant_id', $tenant->id)
            ->whereNull('parent_id')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->groupBy('location');

        $menus = [];
        foreach (array_keys(MenuItem::LOCATIONS) as $location) {
            $menus[$location] = ($allItems->get($location) ?? collect())
                ->map(fn (MenuItem $item) => [
                    'id' => (string) $item->id,
                    'label' => $item->label,
                    'href' => $item->url,
                    'target' => $item->target,
                    'children' => $item->children->map(fn (MenuItem $child) => [
                        'id' => (string) $child->id,
                        'label' => $child->label,
                        'href' => $child->url,
                        'target' => $child->target,
                    ])->values(),
                ])
                ->values();
        }

        $latestArticles = Article::where('tenant_id', $tenant->id)
            ->where('status', 'published')
            ->latest('published_at')
            ->limit(4)
            ->get(['id', 'title', 'slug'])
            ->map(fn (Article $a) => [
                'id' => (string) $a->id,
                'title' => $a->title,
                'href' => '/news/' . $a->slug,
            ])
            ->values();

        return response()->json([
            'success' => true,
            'data' => [
                'menus' => $menus,
                'latestArticles' => $latestArticles,
            ],
        ])->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    }
}
