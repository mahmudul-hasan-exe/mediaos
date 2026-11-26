<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\EpaperEdition;
use App\Services\TenantResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EpaperController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $editions = EpaperEdition::where('tenant_id', $tenant->id)
            ->orderByDesc('edition_date')
            ->get()
            ->map(fn (EpaperEdition $e) => [
                'id' => (string) $e->id,
                'title' => $e->title,
                'editionDate' => $e->edition_date?->toDateString(),
                'coverImage' => $e->cover_image,
                'totalPages' => $e->total_pages,
                'pages' => $e->pages ?? [],
                'status' => $e->status,
                'downloadUrl' => $e->download_url,
            ]);

        return response()->json(['success' => true, 'data' => $editions]);
    }
}

