"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { newsService } from "@/services/news-service";
import { NewsArticle } from "@/types";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Sparkles,
  FileText,
} from "lucide-react";

export default function ReporterDeskPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    newsService.getArticles().then((data) => {
      setArticles(data);
    });
  }, []);

  const myDrafts = articles.filter((a) => a.status === "draft");
  const myPending = articles.filter((a) => a.status === "pending");
  const myPublished = articles.filter((a) => a.status === "published");
  const myRejected = articles.filter((a) => a.status === "rejected");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider">
              Reporter Workspace
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            Correspondent Dispatch Desk
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Submit field reporting drafts, monitor editorial review progress, and view byline engagement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/ai">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span>AI Research Assistant</span>
            </Button>
          </Link>
          <Link href="/admin/news/create">
            <Button size="sm" className="flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              <span>File New Story</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Reporter Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="My Published Bylines"
          value={myPublished.length}
          change="+3 this month"
          isPositive={true}
          icon={CheckCircle}
          iconColor="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          title="In Editorial Review"
          value={myPending.length}
          subtitle="Awaiting desk editor sign-off"
          icon={Clock}
          iconColor="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40"
        />
        <StatCard
          title="Unfinished Drafts"
          value={myDrafts.length}
          subtitle="Saved in local workspace"
          icon={FileText}
          iconColor="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          title="Revision Requests"
          value={myRejected.length}
          subtitle="Feedback notes attached"
          icon={AlertCircle}
          iconColor="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40"
        />
      </div>

      {/* Active Assignments & Stories List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
          My Filed Stories & Dispatch Status
        </h3>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900 font-semibold text-zinc-500 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3.5">Headline</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Review Status</th>
                <th className="px-4 py-3.5">Editorial Notes</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:border-zinc-800">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40">
                  <td className="px-4 py-3.5 font-medium max-w-sm">
                    <div className="font-serif font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                      {art.title}
                    </div>
                    <div className="text-[10px] text-zinc-400">Filed {formatDate(art.createdAt)}</div>
                  </td>
                  <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400">
                    {art.categoryName}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        art.status === "published"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : art.status === "pending"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                          : art.status === "rejected"
                          ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                          : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      }`}
                    >
                      {art.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-zinc-500 max-w-xs truncate text-[11px]">
                    {art.rejectionFeedback ? (
                      <span className="text-red-600 font-semibold">{art.rejectionFeedback}</span>
                    ) : (
                      "No revision requested"
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right space-x-2">
                    <Link href={`/admin/news/${art.id}/edit`}>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Edit Draft
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

