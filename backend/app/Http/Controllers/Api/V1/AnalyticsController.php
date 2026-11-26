<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Tenant;
use App\Models\User;
use App\Services\TenantResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function overview(Request $request, TenantResolver $resolver): JsonResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        return response()->json([
            'success' => true,
            'data' => [
                'tenant' => $tenant->name,
                'totalArticles' => Article::where('tenant_id', $tenant->id)->count(),
                'publishedArticles' => Article::where('tenant_id', $tenant->id)->where('status', 'published')->count(),
                'pendingReview' => Article::where('tenant_id', $tenant->id)->where('status', 'pending')->count(),
                'totalViews' => (int) Article::where('tenant_id', $tenant->id)->sum('views'),
                'totalShares' => (int) Article::where('tenant_id', $tenant->id)->sum('shares'),
                'categoriesCount' => Category::where('tenant_id', $tenant->id)->whereNull('parent_id')->count(),
                'pendingComments' => Comment::where('tenant_id', $tenant->id)->where('status', 'pending')->count(),
                'staffCount' => User::where('tenant_id', $tenant->id)->where('role', '!=', 'reader')->count(),
                'totalTenants' => Tenant::count(),
                'aiUsage' => $tenant->ai_usage,
                'aiLimit' => $tenant->ai_limit,
            ],
        ]);
    }
}

