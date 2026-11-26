<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Services\TenantResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class CommentController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);

        $query = Comment::with('article')->where('tenant_id', $tenant->id);
        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->string('status'));
        }

        $comments = $query->orderByDesc('created_at')->paginate(15)->withQueryString();

        return view('admin.comments.index', compact('tenant', 'comments'));
    }

    public function updateStatus(Request $request, Comment $comment, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($comment->tenant_id !== $tenant->id, 403);

        $validated = $request->validate([
            'status' => ['required', 'in:approved,pending,spam,trash'],
        ]);

        $comment->update(['status' => $validated['status']]);

        return back()->with('success', "Comment marked as {$validated['status']}.");
    }

    public function destroy(Request $request, Comment $comment, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($comment->tenant_id !== $tenant->id, 403);

        $comment->delete();

        return back()->with('success', 'Comment permanently deleted.');
    }
}

