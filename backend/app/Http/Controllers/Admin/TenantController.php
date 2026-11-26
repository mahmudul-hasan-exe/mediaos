<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Services\TenantResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class TenantController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);
        $tenants = Tenant::withCount(['articles', 'users'])->orderBy('id')->get();

        return view('admin.tenants.index', compact('tenant', 'tenants'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'domain' => ['required', 'string', 'max:255', 'unique:tenants,domain'],
            'primary_color' => ['nullable', 'string', 'max:20'],
            'plan' => ['required', 'in:Starter,Professional,Enterprise'],
            'default_language' => ['required', 'in:en,bn,ar'],
            'owner_name' => ['nullable', 'string', 'max:255'],
            'contact_email' => ['nullable', 'email'],
        ]);

        $slug = Str::slug($validated['name']);
        if (Tenant::where('slug', $slug)->exists()) {
            $slug .= '-' . Str::random(4);
        }

        Tenant::create([
            'code' => 'ten-' . str_pad((string) (Tenant::count() + 1), 2, '0', STR_PAD_LEFT),
            'name' => $validated['name'],
            'slug' => $slug,
            'domain' => $validated['domain'],
            'primary_color' => $validated['primary_color'] ?: '#2563EB',
            'supported_languages' => [$validated['default_language']],
            'default_language' => $validated['default_language'],
            'plan' => $validated['plan'],
            'status' => 'active',
            'owner_name' => $validated['owner_name'] ?? 'Publisher',
            'contact_email' => $validated['contact_email'] ?? null,
            'website_config' => [
                'siteTitle' => $validated['name'],
                'tagline' => 'Independent digital journalism.',
                'breakingNewsEnabled' => true,
                'ePaperEnabled' => true,
                'commentsModeration' => true,
                'advertisementsEnabled' => true,
            ],
        ]);

        return back()->with('success', 'New publication tenant provisioned.');
    }

    public function switchTenant(Request $request, Tenant $tenant): RedirectResponse
    {
        $request->session()->put('active_tenant_id', $tenant->id);

        return back()->with('success', "Switched workspace to {$tenant->name}.");
    }

    public function toggleStatus(Tenant $tenant): RedirectResponse
    {
        $tenant->update([
            'status' => $tenant->status === 'active' ? 'suspended' : 'active',
        ]);

        return back()->with('success', "Tenant {$tenant->name} is now {$tenant->status}.");
    }
}

