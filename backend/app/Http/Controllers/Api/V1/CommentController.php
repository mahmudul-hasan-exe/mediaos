<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Services\TenantResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $query = Comment::with('article')->where('tenant_id', $tenant->id);
        if ($request->filled('articleId')) {
            $query->where('article_id', $request->integer('articleId'));
        }
        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        $comments = $query->orderByDesc('created_at')->get()->map(fn (Comment $c) => [
            'id' => (string) $c->id,
            'articleId' => (string) $c->article_id,
            'articleTitle' => $c->article?->title ?? 'Untitled',
            'authorName' => $c->author_name,
            'authorEmail' => $c->author_email,
            'content' => $c->content,
            'status' => $c->status,
            'likes' => $c->likes,
            'createdAt' => $c->created_at?->toIso8601String(),
        ]);

        return response()->json(['success' => true, 'data' => $comments]);
    }

    public function store(Request $request, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'articleId' => ['required', 'exists:articles,id'],
            'authorName' => ['required', 'string', 'max:120'],
            'authorEmail' => ['nullable', 'email'],
            'content' => ['required', 'string', 'max:2000'],
        ]);

        $moderation = $tenant->website_config['commentsModeration'] ?? true;

        $comment = Comment::create([
            'tenant_id' => $tenant->id,
            'article_id' => $validated['articleId'],
            'author_name' => $validated['authorName'],
            'author_email' => $validated['authorEmail'] ?? null,
            'content' => $validated['content'],
            'status' => $moderation ? 'pending' : 'approved',
        ]);

        return response()->json(['success' => true, 'data' => $comment], 201);
    }

    public function updateStatus(Request $request, Comment $comment, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        if ($comment->tenant_id !== $tenant->id) {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $validated = $request->validate([
            'status' => ['required', 'in:approved,pending,spam,trash'],
        ]);

        $comment->update(['status' => $validated['status']]);

        return response()->json(['success' => true, 'data' => $comment]);
    }
}

