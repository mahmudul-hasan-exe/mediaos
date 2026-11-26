<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Advertisement;
use App\Services\TenantResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdvertisementController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $ads = Advertisement::where('tenant_id', $tenant->id)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Advertisement $a) => [
                'id' => (string) $a->id,
                'title' => $a->title,
                'zone' => $a->zone,
                'clientName' => $a->client_name,
                'imageUrl' => $a->image_url,
                'destinationUrl' => $a->destination_url,
                'startDate' => $a->start_date?->toDateString(),
                'endDate' => $a->end_date?->toDateString(),
                'status' => $a->status,
                'impressions' => $a->impressions,
                'clicks' => $a->clicks,
            ]);

        return response()->json(['success' => true, 'data' => $ads]);
    }
}

