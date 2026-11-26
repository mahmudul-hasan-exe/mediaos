<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Tenant;
use App\Models\User;
use App\Services\TenantResolver;
use Illuminate\Http\Request;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);

        // 1. Dynamic Live KPI Metrics directly from database
        $stats = [
            'total_articles' => Article::where('tenant_id', $tenant->id)->count(),
            'published_today' => Article::where('tenant_id', $tenant->id)->whereDate('published_at', today())->count(),
            'total_views' => (int) Article::where('tenant_id', $tenant->id)->sum('views'),
            'categories' => Category::where('tenant_id', $tenant->id)->count(),
            'pending_articles' => Article::where('tenant_id', $tenant->id)->where('status', 'pending')->count(),
            'pending_comments' => Comment::where('tenant_id', $tenant->id)->where('status', 'pending')->count(),
            'total_comments' => Comment::where('tenant_id', $tenant->id)->count(),
            'admin_users' => User::where(function ($q) use ($tenant) {
                $q->where('tenant_id', $tenant->id)->orWhere('role', 'super-admin');
            })->count(),
        ];

        // 2. Real 14-day publication series from database
        $fourteenDaysArticles = [];
        for ($i = 13; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = Article::where('tenant_id', $tenant->id)
                ->whereDate('published_at', $date->toDateString())
                ->count();
            $fourteenDaysArticles[] = [
                'date' => $i === 0 ? 'Today' : $date->format('M d'),
                'count' => $count,
            ];
        }

        // 3. Dynamic articles by type distribution from database
        $totalCataloged = max($stats['total_articles'], 1);
        $videoCount = Article::where('tenant_id', $tenant->id)
            ->where(function ($q) {
                $q->whereNotNull('video_url')->orWhere('title', 'like', '%video%');
            })->count();

        $opinionCat = Category::where('tenant_id', $tenant->id)->where('slug', 'opinion')->first();
        $opinionCount = $opinionCat ? Article::where('tenant_id', $tenant->id)->where('category_id', $opinionCat->id)->count() : 0;
        $newsCount = max(0, $stats['total_articles'] - $videoCount - $opinionCount);

        $articlesByType = [
            [
                'type' => 'News',
                'slug' => 'news',
                'count' => $newsCount,
                'percentage' => round(($newsCount / $totalCataloged) * 100),
                'badge_class' => 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
                'bar_color' => 'bg-blue-600',
            ],
            [
                'type' => 'Video',
                'slug' => 'video',
                'count' => $videoCount,
                'percentage' => round(($videoCount / $totalCataloged) * 100),
                'badge_class' => 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
                'bar_color' => 'bg-emerald-500',
            ],
            [
                'type' => 'Opinion',
                'slug' => 'opinion',
                'count' => $opinionCount,
                'percentage' => round(($opinionCount / $totalCataloged) * 100),
                'badge_class' => 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
                'bar_color' => 'bg-purple-500',
            ],
        ];

        // 4. Real Top articles ordered by views directly from MySQL
        $dbArticles = Article::with('category')
            ->where('tenant_id', $tenant->id)
            ->orderByDesc('views')
            ->limit(8)
            ->get();

        $topArticles = $dbArticles->map(function ($art) {
            $type = 'news';
            if ($art->video_url || stripos($art->title, 'video') !== false) {
                $type = 'video';
            } elseif (stripos($art->category?->name ?? '', 'opinion') !== false) {
                $type = 'opinion';
            }

            return [
                'title' => $art->title,
                'category' => $art->category?->name ?? 'General',
                'type' => $type,
                'views' => (int) $art->views,
                'article_id' => $art->id,
            ];
        })->toArray();

        return view('admin.dashboard', compact(
            'tenant',
            'stats',
            'fourteenDaysArticles',
            'articlesByType',
            'topArticles'
        ));
    }
}
