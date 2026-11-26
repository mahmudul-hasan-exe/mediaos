<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaItem;
use App\Services\TenantResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class MediaController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);

        $query = MediaItem::where('tenant_id', $tenant->id);
        if ($request->filled('type') && $request->input('type') !== 'all') {
            $query->where('file_type', $request->string('type'));
        }

        $items = $query->orderByDesc('created_at')->paginate(16)->withQueryString();

        return view('admin.media.index', compact('tenant', 'items'));
    }

    public function store(Request $request, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'file' => ['nullable', 'file', 'max:10240'],
            'url' => ['nullable', 'url', 'max:1000'],
            'folder' => ['nullable', 'string', 'max:100'],
            'file_type' => ['required', 'in:image,video,document,audio'],
        ]);

        $url = $validated['url'] ?: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80';
        $fileName = str($validated['title'])->slug() . '.jpg';
        $fileSize = '1.4 MB';

        if ($request->hasFile('file')) {
            $uploaded = $request->file('file');
            $path = $uploaded->store('media/' . $tenant->slug, 'public');
            $url = asset('storage/' . $path);
            $fileName = $uploaded->getClientOriginalName();
            $fileSize = round($uploaded->getSize() / 1024, 1) . ' KB';
        }

        MediaItem::create([
            'tenant_id' => $tenant->id,
            'title' => $validated['title'],
            'file_name' => $fileName,
            'url' => $url,
            'file_type' => $validated['file_type'],
            'file_size' => $fileSize,
            'folder' => $validated['folder'] ?: 'General',
            'uploaded_by_id' => $request->user()->id,
            'uploaded_by_name' => $request->user()->name,
        ]);

        return back()->with('success', 'Media asset uploaded.');
    }

    public function destroy(Request $request, MediaItem $media, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($media->tenant_id !== $tenant->id, 403);

        $media->delete();

        return back()->with('success', 'Media asset removed.');
    }
}

