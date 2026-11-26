<?php

namespace App\Http\Middleware;

use App\Services\TenantResolver;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenant
{
    public function __construct(protected TenantResolver $resolver)
    {
    }

    public function handle(Request $request, Closure $next): Response
    {
        $tenant = $this->resolver->resolveFromRequest($request);
        $request->attributes->set('tenant', $tenant);

        return $next($request);
    }
}

