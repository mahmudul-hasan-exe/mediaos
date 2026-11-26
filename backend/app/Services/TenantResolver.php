<?php

namespace App\Services;

use App\Models\Tenant;
use Illuminate\Http\Request;

class TenantResolver
{
    protected ?Tenant $tenant = null;
    protected ?int $resolvedRequestId = null;

    public function resolveFromRequest(Request $request): Tenant
    {
        $requestId = spl_object_id($request);
        if ($this->tenant && $this->resolvedRequestId === $requestId) {
            return $this->tenant;
        }

        $this->resolvedRequestId = $requestId;

        // 1. Check explicit query param or API headers (X-Tenant-ID or X-Tenant-Domain)
        $headerId = $request->query('tenant') ?: $request->header('X-Tenant-ID');
        $headerDomain = $request->header('X-Tenant-Domain');

        if ($headerId) {
            $tenant = Tenant::where('code', $headerId)
                ->orWhere('id', is_numeric($headerId) ? (int) $headerId : -1)
                ->first();
            if ($tenant) {
                return $this->tenant = $tenant;
            }
        }

        if ($headerDomain) {
            $tenant = Tenant::where('domain', $headerDomain)
                ->orWhere('slug', $headerDomain)
                ->first();
            if ($tenant) {
                return $this->tenant = $tenant;
            }
        }

        // 2. Check Web session (for Admin Panel tenant switcher)
        if ($request->hasSession() && $request->session()->has('active_tenant_id')) {
            $tenant = Tenant::find($request->session()->get('active_tenant_id'));
            if ($tenant) {
                return $this->tenant = $tenant;
            }
        }

        // 3. Fallback to first active tenant (MediaOS)
        return $this->tenant = Tenant::where('status', 'active')->first()
            ?? Tenant::firstOrFail();
    }

    public function setTenant(Tenant $tenant): void
    {
        $this->tenant = $tenant;
    }

    public function current(): ?Tenant
    {
        return $this->tenant;
    }
}
