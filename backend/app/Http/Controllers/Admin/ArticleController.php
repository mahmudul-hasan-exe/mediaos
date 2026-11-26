<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Services\TenantResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class ArticleController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);

        $query = Article::with(['category', 'author'])
            ->where('tenant_id', $tenant->id);

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->integer('category_id'));
        }

        if ($request->filled('search')) {
            $q = $request->string('search');
            $query->where(function ($sub) use ($q) {
                $sub->where('title', 'like', "%{$q}%")->orWhere('excerpt', 'like', "%{$q}%");
            });
        }

        $articles = $query->orderByDesc('updated_at')->paginate(12)->withQueryString();
        $categories = Category::where('tenant_id', $tenant->id)->whereNull('parent_id')->orderBy('order')->get();

        return view('admin.articles.index', compact('tenant', 'articles', 'categories'));
    }

    public function create(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);
        $categories = Category::where('tenant_id', $tenant->id)->whereNull('parent_id')->orderBy('order')->get();

        return view('admin.articles.form', [
            'tenant' => $tenant,
            'article' => new Article(['status' => 'draft', 'language' => $tenant->default_language ?? 'en']),
            'categories' => $categories,
            'isEdit' => false,
        ]);
    }

    public function store(Request $request, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:500'],
            'subtitle' => ['nullable', 'string', 'max:500'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'featured_image' => ['nullable', 'string', 'max:1000'],
            'image_caption' => ['nullable', 'string', 'max:500'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'tags' => ['nullable', 'string'],
            'status' => ['required', 'in:draft,pending,approved,scheduled,published,rejected,archived'],
            'language' => ['required', 'in:en,bn,ar'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
        ]);

        $slug = Str::slug($validated['title']) ?: 'story';
        if (Article::where('tenant_id', $tenant->id)->where('slug', $slug)->exists()) {
            $slug .= '-' . Str::random(5);
        }

        $tags = array_values(array_filter(array_map('trim', explode(',', $validated['tags'] ?? ''))));

        Article::create([
            'tenant_id' => $tenant->id,
            'title' => $validated['title'],
            'slug' => $slug,
            'subtitle' => $validated['subtitle'] ?? null,
            'excerpt' => ($validated['excerpt'] ?? null) ?: Str::limit(strip_tags($validated['content']), 180),
            'content' => $validated['content'],
            'featured_image' => ($validated['featured_image'] ?? null) ?: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
            'image_caption' => $validated['image_caption'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
            'tags' => $tags,
            'author_id' => $request->user()->id,
            'status' => $validated['status'],
            'is_breaking' => $request->boolean('is_breaking'),
            'is_featured' => $request->boolean('is_featured'),
            'is_editor_pick' => $request->boolean('is_editor_pick'),
            'language' => $validated['language'],
            'published_at' => $validated['status'] === 'published' ? now() : null,
            'seo' => [
                'metaTitle' => ($validated['meta_title'] ?? null) ?: $validated['title'],
                'metaDescription' => ($validated['meta_description'] ?? null) ?: ($validated['excerpt'] ?? ''),
                'keywords' => $tags,
            ],
        ]);

        return redirect()->route('admin.articles.index')->with('success', 'Article created successfully.');
    }

    public function edit(Request $request, Article $article, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($article->tenant_id !== $tenant->id, 403);

        $categories = Category::where('tenant_id', $tenant->id)->whereNull('parent_id')->orderBy('order')->get();

        return view('admin.articles.form', [
            'tenant' => $tenant,
            'article' => $article,
            'categories' => $categories,
            'isEdit' => true,
        ]);
    }

    public function update(Request $request, Article $article, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($article->tenant_id !== $tenant->id, 403);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:500'],
            'subtitle' => ['nullable', 'string', 'max:500'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'featured_image' => ['nullable', 'string', 'max:1000'],
            'image_caption' => ['nullable', 'string', 'max:500'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'tags' => ['nullable', 'string'],
            'status' => ['required', 'in:draft,pending,approved,scheduled,published,rejected,archived'],
            'language' => ['required', 'in:en,bn,ar'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
        ]);

        $tags = array_values(array_filter(array_map('trim', explode(',', $validated['tags'] ?? ''))));

        $article->update([
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'] ?? null,
            'excerpt' => ($validated['excerpt'] ?? null) ?: Str::limit(strip_tags($validated['content']), 180),
            'content' => $validated['content'],
            'featured_image' => ($validated['featured_image'] ?? null) ?: $article->featured_image,
            'image_caption' => $validated['image_caption'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
            'tags' => $tags,
            'status' => $validated['status'],
            'is_breaking' => $request->boolean('is_breaking'),
            'is_featured' => $request->boolean('is_featured'),
            'is_editor_pick' => $request->boolean('is_editor_pick'),
            'language' => $validated['language'],
            'published_at' => $validated['status'] === 'published' ? ($article->published_at ?? now()) : $article->published_at,
            'seo' => [
                'metaTitle' => ($validated['meta_title'] ?? null) ?: $validated['title'],
                'metaDescription' => ($validated['meta_description'] ?? null) ?: ($validated['excerpt'] ?? ''),
                'keywords' => $tags,
            ],
        ]);

        return redirect()->route('admin.articles.index')->with('success', 'Article updated successfully.');
    }

    public function reviewQueue(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);

        $articles = Article::with(['category', 'author', 'reporter'])
            ->where('tenant_id', $tenant->id)
            ->whereIn('status', ['pending', 'rejected', 'approved'])
            ->orderByRaw("CASE status WHEN 'pending' THEN 1 WHEN 'approved' THEN 2 ELSE 3 END")
            ->orderByDesc('updated_at')
            ->get();

        return view('admin.articles.review', compact('tenant', 'articles'));
    }

    public function updateStatus(Request $request, Article $article, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($article->tenant_id !== $tenant->id, 403);

        $validated = $request->validate([
            'status' => ['required', 'in:draft,pending,approved,scheduled,published,rejected,archived'],
            'rejection_feedback' => ['nullable', 'string', 'max:1000'],
        ]);

        $article->update([
            'status' => $validated['status'],
            'rejection_feedback' => $validated['status'] === 'rejected' ? ($validated['rejection_feedback'] ?? 'Needs editorial revision.') : null,
            'published_at' => $validated['status'] === 'published' ? ($article->published_at ?? now()) : $article->published_at,
        ]);

        return back()->with('success', "Article marked as {$validated['status']}.");
    }

    public function destroy(Request $request, Article $article, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($article->tenant_id !== $tenant->id, 403);

        $article->delete();

        return back()->with('success', 'Article deleted.');
    }
}
