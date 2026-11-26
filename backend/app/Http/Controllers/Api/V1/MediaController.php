<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\MediaItem;
use App\Services\TenantResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $query = MediaItem::where('tenant_id', $tenant->id);

        if ($request->filled('folder') && $request->input('folder') !== 'All') {
            $query->where('folder', $request->string('folder'));
        }
        if ($request->filled('type') && $request->input('type') !== 'all') {
            $query->where('file_type', $request->string('type'));
        }
        if ($request->filled('search')) {
            $q = $request->string('search');
            $query->where(function ($sub) use ($q) {
                $sub->where('title', 'like', "%{$q}%")->orWhere('file_name', 'like', "%{$q}%");
            });
        }

        $items = $query->orderByDesc('created_at')->get()->map(fn (MediaItem $m) => [
            'id' => (string) $m->id,
            'title' => $m->title,
            'fileName' => $m->file_name,
            'url' => $m->url,
            'fileType' => $m->file_type,
            'fileSize' => $m->file_size,
            'dimensions' => $m->dimensions,
            'folder' => $m->folder,
            'uploadedBy' => $m->uploaded_by_name ?? 'Editorial Staff',
            'createdAt' => $m->created_at?->toIso8601String(),
        ]);

        return response()->json([
            'success' => true,
            'data' => $items,
        ]);
    }

    public function store(Request $request, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'file' => ['nullable', 'file', 'max:10240'],
            'url' => ['nullable', 'url'],
            'folder' => ['nullable', 'string', 'max:100'],
            'type' => ['nullable', 'in:image,video,document,audio'],
        ]);

        $url = $validated['url'] ?? 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80';
        $fileName = $validated['title'] . '.jpg';
        $fileSize = '1.2 MB';

        if ($request->hasFile('file')) {
            $uploaded = $request->file('file');
            $path = $uploaded->store('media/' . $tenant->slug, 'public');
            $url = asset('storage/' . $path);
            $fileName = $uploaded->getClientOriginalName();
            $fileSize = round($uploaded->getSize() / 1024, 1) . ' KB';
        }

        $item = MediaItem::create([
            'tenant_id' => $tenant->id,
            'title' => $validated['title'],
            'file_name' => $fileName,
            'url' => $url,
            'file_type' => $validated['type'] ?? 'image',
            'file_size' => $fileSize,
            'folder' => $validated['folder'] ?? 'General',
            'uploaded_by_id' => $request->user()?->id,
            'uploaded_by_name' => $request->user()?->name ?? 'Admin',
        ]);

        return response()->json([
            'success' => true,
            'data' => $item,
        ], 201);
    }

    public function destroy(Request $request, MediaItem $media, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        if ($media->tenant_id !== $tenant->id) {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }
        $media->delete();

        return response()->json(['success' => true, 'message' => 'Media item deleted.']);
    }
}

