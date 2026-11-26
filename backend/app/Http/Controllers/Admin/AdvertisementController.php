<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Advertisement;
use App\Services\TenantResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class AdvertisementController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);
        $ads = Advertisement::where('tenant_id', $tenant->id)->orderByDesc('created_at')->get();

        return view('admin.advertisements.index', compact('tenant', 'ads'));
    }

    public function store(Request $request, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'zone' => ['required', 'in:header_leaderboard,sidebar_square,in_article,sticky_footer,homepage_middle'],
            'client_name' => ['required', 'string', 'max:255'],
            'image_url' => ['nullable', 'url', 'max:1000'],
            'destination_url' => ['nullable', 'url', 'max:1000'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
        ]);

        Advertisement::create([
            'tenant_id' => $tenant->id,
            'title' => $validated['title'],
            'zone' => $validated['zone'],
            'client_name' => $validated['client_name'],
            'image_url' => $validated['image_url'] ?? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
            'destination_url' => $validated['destination_url'] ?? 'https://mediaos.com',
            'start_date' => $validated['start_date'] ?? now()->toDateString(),
            'end_date' => $validated['end_date'] ?? now()->addDays(30)->toDateString(),
            'status' => 'active',
        ]);

        return back()->with('success', 'Advertisement campaign created.');
    }

    public function toggle(Request $request, Advertisement $advertisement, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($advertisement->tenant_id !== $tenant->id, 403);

        $advertisement->update([
            'status' => $advertisement->status === 'active' ? 'paused' : 'active',
        ]);

        return back()->with('success', 'Campaign status updated.');
    }

    public function destroy(Request $request, Advertisement $advertisement, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        abort_if($advertisement->tenant_id !== $tenant->id, 403);

        $advertisement->delete();

        return back()->with('success', 'Campaign deleted.');
    }
}

