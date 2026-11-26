<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\TenantResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $categories = Category::with(['subcategories'])
            ->withCount('articles')
            ->where('tenant_id', $tenant->id)
            ->whereNull('parent_id')
            ->orderBy('order')
            ->get()
            ->map(fn (Category $c) => [
                'id' => (string) $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'description' => $c->description,
                'icon' => $c->icon,
                'color' => $c->color,
                'order' => $c->order,
                'postCount' => $c->articles_count,
                'language' => $c->language,
                'subcategories' => $c->subcategories->map(fn (Category $sub) => [
                    'id' => (string) $sub->id,
                    'name' => $sub->name,
                    'slug' => $sub->slug,
                ])->values(),
            ]);

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    public function store(Request $request, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'color' => ['nullable', 'string', 'max:20'],
            'order' => ['nullable', 'integer'],
            'parentId' => ['nullable', 'exists:categories,id'],
            'language' => ['nullable', 'in:en,bn,ar'],
        ]);

        $slug = Str::slug($validated['name']);
        if (Category::where('tenant_id', $tenant->id)->where('slug', $slug)->exists()) {
            $slug .= '-' . Str::random(4);
        }

        $category = Category::create([
            'tenant_id' => $tenant->id,
            'parent_id' => $validated['parentId'] ?? null,
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'color' => $validated['color'] ?? '#2563EB',
            'order' => $validated['order'] ?? (Category::where('tenant_id', $tenant->id)->count() + 1),
            'language' => $validated['language'] ?? $tenant->default_language ?? 'en',
        ]);

        return response()->json([
            'success' => true,
            'data' => $category,
        ], 201);
    }

    public function destroy(Request $request, Category $category, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        if ($category->tenant_id !== $tenant->id) {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $category->delete();

        return response()->json(['success' => true, 'message' => 'Category deleted.']);
    }
}

