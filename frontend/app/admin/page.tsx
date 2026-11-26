"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { StatCard } from "@/components/shared/stat-card";
import { TENANT_CMS_METRICS, ARTICLE_TRAFFIC_DATA } from "@/services/analytics-service";
import { useTenantStore } from "@/stores/tenant-store";
import { newsService } from "@/services/news-service";
import { NewsArticle } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  FileText,
  Clock,
  Eye,
  CheckCircle,
  Users,
  MessageSquare,
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckSquare,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewspaperAdminDashboard() {
  const { currentTenant } = useTenantStore();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsService.getArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  const pendingArticles = articles.filter((a) => a.status === "pending");
  const publishedArticles = articles.filter((a) => a.status === "published");

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: currentTenant.primaryColor }}
            />
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              {currentTenant.name} Newsroom
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            Editorial CMS Dashboard
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Monitor real-time readership, manage the editorial review queue, and coordinate daily dispatches.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/admin/news/create">
            <Button size="sm" className="flex items-center gap-1.5 shadow-sm">
              <Plus className="h-4 w-4" />
              <span>Create News Story</span>
            </Button>
          </Link>
          <Link href="/admin/ai">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span>AI Writing Suite</span>
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Website</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Published Articles"
          value={TENANT_CMS_METRICS.publishedNews.toLocaleString()}
          change="+12 today"
          isPositive={true}
          subtitle="Live across all edition desks"
          icon={FileText}
          iconColor="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          title="Editorial Review Queue"
          value={pendingArticles.length || 8}
          change="Urgent Attention"
          isPositive={false}
          subtitle="Pending desk verification"
          icon={CheckSquare}
          iconColor="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40"
        />
        <StatCard
          title="Monthly Reader Views"
          value={TENANT_CMS_METRICS.totalViews.toLocaleString()}
          change={TENANT_CMS_METRICS.monthlyViewsGrowth}
          isPositive={true}
          subtitle="Unique visitors: 312k"
          icon={Eye}
          iconColor="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          title="Comments Moderation"
          value={TENANT_CMS_METRICS.pendingComments}
          change="19 pending"
          isPositive={false}
          subtitle="3,890 total approved"
          icon={MessageSquare}
          iconColor="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40"
        />
      </div>

      {/* Editorial Flow & Traffic Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Traffic Chart */}
        <div className="lg:col-span-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                Readership Trajectory & Peak News Cycles
              </h3>
              <p className="text-xs text-zinc-400">
                Daily views and unique reader engagement across the past 7 days.
              </p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
              51.2k Friday Peak
            </span>
          </div>

          <div className="mt-6 h-48 flex items-end justify-between gap-3 pt-4">
            {ARTICLE_TRAFFIC_DATA.map((item, idx) => {
              const maxViews = 60000;
              const heightPercent = Math.round((item.views / maxViews) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] font-semibold text-zinc-400 opacity-0 group-hover:opacity-100 transition">
                    {(item.views / 1000).toFixed(1)}k
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-t-lg h-36 flex items-end overflow-hidden p-0.5">
                    <div
                      className="w-full bg-blue-600 dark:bg-blue-500 rounded-t transition-all duration-500 group-hover:bg-blue-700"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Review Queue Widget */}
        <div className="lg:col-span-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <CheckSquare className="h-4 w-4 text-amber-500" />
                Review Queue Priority
              </h3>
              <Link href="/admin/news/review" className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                View All (8)
              </Link>
            </div>

            <div className="mt-3 space-y-3">
              {pendingArticles.slice(0, 3).map((art) => (
                <div
                  key={art.id}
                  className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">
                      {art.categoryName}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {formatDate(art.createdAt)}
                    </span>
                  </div>
                  <h4 className="text-xs font-serif font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2">
                    {art.title}
                  </h4>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500">
                    <span>By {art.authorName}</span>
                    <Link
                      href="/admin/news/review"
                      className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Review →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800">
            <Link href="/admin/news/review">
              <Button size="sm" variant="outline" className="w-full text-xs">
                Open Editorial Desk
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Latest Dispatches Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Recent Newsroom Stories
            </h3>
            <p className="text-xs text-zinc-500">
              Live updates across all editorial categories.
            </p>
          </div>
          <Link href="/admin/news">
            <Button variant="outline" size="sm" className="text-xs">
              Manage All News
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900 font-semibold text-zinc-500 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3.5">Headline & Category</th>
                <th className="px-4 py-3.5">Author / Desk</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Views</th>
                <th className="px-4 py-3.5">Publish Date</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:border-zinc-800">
              {articles.slice(0, 5).map((article) => (
                <tr key={article.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40">
                  <td className="px-4 py-3.5 max-w-md">
                    <div className="flex items-start gap-3">
                      {article.featuredImage && (
                        <img
                          src={article.featuredImage}
                          alt=""
                          className="h-10 w-14 object-cover rounded shrink-0"
                        />
                      )}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                          {article.categoryName}
                        </span>
                        <Link
                          href={`/news/${article.slug}`}
                          className="font-serif font-bold text-zinc-900 dark:text-zinc-100 hover:underline line-clamp-1"
                        >
                          {article.title}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {article.authorName}
                    </div>
                    {article.reporterName && (
                      <div className="text-[10px] text-zinc-400">Reporter: {article.reporterName}</div>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        article.status === "published"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : article.status === "pending"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                          : article.status === "rejected"
                          ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                          : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      }`}
                    >
                      {article.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-medium">
                    {article.views.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 text-zinc-500">
                    {formatDate(article.publishedAt || article.createdAt)}
                  </td>
                  <td className="px-4 py-3.5 text-right space-x-1.5">
                    <Link href={`/admin/news/${article.id}/edit`}>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/news/${article.slug}`} target="_blank">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

