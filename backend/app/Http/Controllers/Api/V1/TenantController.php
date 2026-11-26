<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Services\TenantResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TenantController extends Controller
{
    public function index(): JsonResponse
    {
        $tenants = Tenant::orderBy('id')->get()->map(fn (Tenant $t) => $this->formatTenant($t));

        return response()->json([
            'success' => true,
            'data' => $tenants,
        ]);
    }

    public function current(Request $request, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        return response()->json([
            'success' => true,
            'data' => $this->formatTenant($tenant),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'domain' => ['required', 'string', 'max:255', 'unique:tenants,domain'],
            'primaryColor' => ['nullable', 'string', 'max:20'],
            'plan' => ['nullable', 'in:Starter,Professional,Enterprise'],
            'contactEmail' => ['nullable', 'email'],
            'ownerName' => ['nullable', 'string', 'max:255'],
            'defaultLanguage' => ['nullable', 'in:en,bn,ar'],
        ]);

        $slug = Str::slug($validated['name']);
        $tenant = Tenant::create([
            'code' => 'ten-' . str_pad((string) (Tenant::count() + 1), 2, '0', STR_PAD_LEFT),
            'name' => $validated['name'],
            'slug' => $slug . '-' . Str::random(4),
            'domain' => $validated['domain'],
            'primary_color' => $validated['primaryColor'] ?? '#2563EB',
            'supported_languages' => [$validated['defaultLanguage'] ?? 'en'],
            'default_language' => $validated['defaultLanguage'] ?? 'en',
            'plan' => $validated['plan'] ?? 'Professional',
            'status' => 'active',
            'contact_email' => $validated['contactEmail'] ?? null,
            'owner_name' => $validated['ownerName'] ?? null,
            'website_config' => [
                'siteTitle' => $validated['name'],
                'tagline' => 'Independent digital publication.',
                'breakingNewsEnabled' => true,
                'ePaperEnabled' => true,
                'commentsModeration' => true,
                'advertisementsEnabled' => true,
            ],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tenant provisioned successfully.',
            'data' => $this->formatTenant($tenant),
        ], 201);
    }

    public function toggleStatus(Tenant $tenant): JsonResponse
    {
        $tenant->update([
            'status' => $tenant->status === 'active' ? 'suspended' : 'active',
        ]);

        return response()->json([
            'success' => true,
            'data' => $this->formatTenant($tenant),
        ]);
    }

    public function formatTenant(Tenant $t): array
    {
        return [
            'id' => $t->code ?? (string) $t->id,
            'numericId' => $t->id,
            'name' => $t->name,
            'slug' => $t->slug,
            'domain' => $t->domain,
            'logo' => $t->logo,
            'favicon' => $t->favicon,
            'primaryColor' => $t->primary_color,
            'supportedLanguages' => $t->supported_languages ?? ['en'],
            'defaultLanguage' => $t->default_language,
            'plan' => $t->plan,
            'status' => $t->status,
            'aiLimit' => $t->ai_limit,
            'aiUsage' => $t->ai_usage,
            'contactEmail' => $t->contact_email,
            'ownerName' => $t->owner_name,
            'createdAt' => $t->created_at?->toIso8601String(),
            'websiteConfig' => $t->website_config ?? [],
        ];
    }
}

