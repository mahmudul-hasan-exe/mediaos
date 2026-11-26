<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Services\TenantResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $query = Article::with(['category', 'subcategory', 'author', 'reporter'])
            ->where('tenant_id', $tenant->id);

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('category')) {
            $cat = $request->string('category');
            $query->whereHas('category', function ($q) use ($cat) {
                $q->where('id', is_numeric((string) $cat) ? (int) $cat : -1)
                    ->orWhere('slug', $cat)
                    ->orWhere('name', 'like', "%{$cat}%");
            });
        }

        if ($request->filled('language')) {
            $query->where('language', $request->string('language'));
        }

        if ($request->has('is_breaking')) {
            $query->where('is_breaking', filter_var($request->input('is_breaking'), FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->has('is_featured')) {
            $query->where('is_featured', filter_var($request->input('is_featured'), FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->filled('search')) {
            $q = $request->string('search');
            $query->where(function ($sub) use ($q) {
                $sub->where('title', 'like', "%{$q}%")
                    ->orWhere('excerpt', 'like', "%{$q}%");
            });
        }

        $articles = $query->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Article $a) => $this->formatArticle($a));

        return response()->json([
            'success' => true,
            'data' => $articles,
        ]);
    }

    public function show(Request $request, string $slugOrId, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $article = Article::with(['category', 'subcategory', 'author', 'reporter'])
            ->where('tenant_id', $tenant->id)
            ->where(function ($q) use ($slugOrId) {
                $q->where('slug', $slugOrId);
                if (is_numeric($slugOrId)) {
                    $q->orWhere('id', (int) $slugOrId);
                }
            })
            ->first();

        if (! $article) {
            return response()->json(['success' => false, 'message' => 'Article not found.'], 404);
        }

        $article->increment('views');

        return response()->json([
            'success' => true,
            'data' => $this->formatArticle($article),
        ]);
    }

    public function store(Request $request, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:500'],
            'subtitle' => ['nullable', 'string', 'max:500'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'featuredImage' => ['nullable', 'string'],
            'imageCaption' => ['nullable', 'string'],
            'categoryId' => ['nullable'],
            'subcategoryId' => ['nullable'],
            'tags' => ['nullable', 'array'],
            'status' => ['nullable', 'in:draft,pending,approved,scheduled,published,rejected,archived'],
            'isBreaking' => ['nullable', 'boolean'],
            'isFeatured' => ['nullable', 'boolean'],
            'isEditorPick' => ['nullable', 'boolean'],
            'language' => ['nullable', 'in:en,bn,ar'],
            'seo' => ['nullable', 'array'],
        ]);

        $slug = Str::slug($validated['title']) ?: 'story';
        if (Article::where('tenant_id', $tenant->id)->where('slug', $slug)->exists()) {
            $slug .= '-' . Str::random(5);
        }

        $categoryId = null;
        if (! empty($validated['categoryId'])) {
            $cat = Category::where('tenant_id', $tenant->id)
                ->where(function ($q) use ($validated) {
                    $q->where('slug', $validated['categoryId']);
                    if (is_numeric($validated['categoryId'])) {
                        $q->orWhere('id', (int) $validated['categoryId']);
                    }
                })->first();
            $categoryId = $cat?->id;
        }

        $status = $validated['status'] ?? 'draft';

        $article = Article::create([
            'tenant_id' => $tenant->id,
            'title' => $validated['title'],
            'slug' => $slug,
            'subtitle' => $validated['subtitle'] ?? null,
            'excerpt' => $validated['excerpt'] ?? Str::limit(strip_tags($validated['content']), 180),
            'content' => $validated['content'],
            'featured_image' => $validated['featuredImage'] ?? null,
            'image_caption' => $validated['imageCaption'] ?? null,
            'category_id' => $categoryId,
            'tags' => $validated['tags'] ?? [],
            'author_id' => $request->user()?->id,
            'status' => $status,
            'is_breaking' => $validated['isBreaking'] ?? false,
            'is_featured' => $validated['isFeatured'] ?? false,
            'is_editor_pick' => $validated['isEditorPick'] ?? false,
            'language' => $validated['language'] ?? $tenant->default_language ?? 'en',
            'published_at' => $status === 'published' ? now() : null,
            'seo' => $validated['seo'] ?? [
                'metaTitle' => $validated['title'],
                'metaDescription' => $validated['excerpt'] ?? '',
                'keywords' => $validated['tags'] ?? [],
            ],
        ]);

        $article->load(['category', 'subcategory', 'author', 'reporter']);

        return response()->json([
            'success' => true,
            'message' => 'Article created successfully.',
            'data' => $this->formatArticle($article),
        ], 201);
    }

    public function update(Request $request, Article $article, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        if ($article->tenant_id !== $tenant->id) {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $article->update([
            'title' => $request->input('title', $article->title),
            'subtitle' => $request->input('subtitle', $article->subtitle),
            'excerpt' => $request->input('excerpt', $article->excerpt),
            'content' => $request->input('content', $article->content),
            'featured_image' => $request->input('featuredImage', $article->featured_image),
            'image_caption' => $request->input('imageCaption', $article->image_caption),
            'tags' => $request->input('tags', $article->tags),
            'is_breaking' => $request->has('isBreaking') ? (bool) $request->input('isBreaking') : $article->is_breaking,
            'is_featured' => $request->has('isFeatured') ? (bool) $request->input('isFeatured') : $article->is_featured,
            'is_editor_pick' => $request->has('isEditorPick') ? (bool) $request->input('isEditorPick') : $article->is_editor_pick,
            'seo' => $request->input('seo', $article->seo),
        ]);

        $article->load(['category', 'subcategory', 'author', 'reporter']);

        return response()->json([
            'success' => true,
            'data' => $this->formatArticle($article),
        ]);
    }

    public function updateStatus(Request $request, Article $article, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        if ($article->tenant_id !== $tenant->id) {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $validated = $request->validate([
            'status' => ['required', 'in:draft,pending,approved,scheduled,published,rejected,archived'],
            'rejectionFeedback' => ['nullable', 'string'],
        ]);

        $article->update([
            'status' => $validated['status'],
            'rejection_feedback' => $validated['rejectionFeedback'] ?? null,
            'published_at' => $validated['status'] === 'published' ? ($article->published_at ?? now()) : $article->published_at,
        ]);

        $article->load(['category', 'subcategory', 'author', 'reporter']);

        return response()->json([
            'success' => true,
            'data' => $this->formatArticle($article),
        ]);
    }

    public function destroy(Request $request, Article $article, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        if ($article->tenant_id !== $tenant->id) {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article deleted.',
        ]);
    }

    public function formatArticle(Article $a): array
    {
        return [
            'id' => (string) $a->id,
            'title' => $a->title,
            'slug' => $a->slug,
            'subtitle' => $a->subtitle,
            'excerpt' => $a->excerpt ?? '',
            'content' => $a->content,
            'featuredImage' => $a->featured_image ?? '',
            'imageCaption' => $a->image_caption,
            'gallery' => $a->gallery ?? [],
            'videoUrl' => $a->video_url,
            'categoryId' => (string) ($a->category_id ?? ''),
            'categoryName' => $a->category?->name ?? 'General',
            'subcategoryId' => $a->subcategory_id ? (string) $a->subcategory_id : null,
            'subcategoryName' => $a->subcategory?->name,
            'tags' => $a->tags ?? [],
            'authorId' => (string) ($a->author_id ?? ''),
            'authorName' => $a->author?->name ?? 'Editorial Desk',
            'reporterId' => $a->reporter_id ? (string) $a->reporter_id : null,
            'reporterName' => $a->reporter?->name,
            'status' => $a->status,
            'rejectionFeedback' => $a->rejection_feedback,
            'isBreaking' => $a->is_breaking,
            'isFeatured' => $a->is_featured,
            'isEditorPick' => $a->is_editor_pick,
            'views' => $a->views,
            'shares' => $a->shares,
            'language' => $a->language,
            'publishedAt' => $a->published_at?->toIso8601String(),
            'scheduledAt' => $a->scheduled_at?->toIso8601String(),
            'createdAt' => $a->created_at?->toIso8601String(),
            'updatedAt' => $a->updated_at?->toIso8601String(),
            'seo' => $a->seo ?? [
                'metaTitle' => $a->title,
                'metaDescription' => $a->excerpt ?? '',
                'keywords' => $a->tags ?? [],
            ],
        ];
    }
}

