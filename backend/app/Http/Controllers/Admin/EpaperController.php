<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EpaperEdition;
use App\Services\TenantResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class EpaperController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);
        $editions = EpaperEdition::where('tenant_id', $tenant->id)->orderByDesc('edition_date')->get();

        return view('admin.epapers.index', compact('tenant', 'editions'));
    }

    public function store(Request $request, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'edition_date' => ['required', 'date'],
            'total_pages' => ['required', 'integer', 'min:1', 'max:64'],
            'cover_image' => ['nullable', 'url', 'max:1000'],
            'status' => ['required', 'in:published,draft'],
        ]);

        $cover = $validated['cover_image'] ?: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80';

        EpaperEdition::create([
            'tenant_id' => $tenant->id,
            'title' => $validated['title'],
            'edition_date' => $validated['edition_date'],
            'total_pages' => $validated['total_pages'],
            'cover_image' => $cover,
            'status' => $validated['status'],
            'pages' => [
                [
                    'pageNumber' => 1,
                    'imageUrl' => $cover,
                    'thumbnailUrl' => $cover,
                    'hotspots' => [],
                ],
            ],
        ]);

        return back()->with('success', 'E-Paper edition created.');
    }

    public function toggle(Request $request, EpaperEdition $epaper, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($epaper->tenant_id !== $tenant->id, 403);

        $epaper->update([
            'status' => $epaper->status === 'published' ? 'draft' : 'published',
        ]);

        return back()->with('success', 'Edition publish state updated.');
    }

    public function destroy(Request $request, EpaperEdition $epaper, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($epaper->tenant_id !== $tenant->id, 403);

        $epaper->delete();

        return back()->with('success', 'E-Paper edition deleted.');
    }
}

