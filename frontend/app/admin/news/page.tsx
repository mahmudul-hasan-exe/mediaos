"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { newsService } from "@/services/news-service";
import { NewsArticle, ArticleStatus } from "@/types";
import { DataTable, Column } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { mediaosToast } from "@/stores/mediaos-toast-store";
import { MediaOSConfirmDialog } from "@/components/ui/mediaos-modal";

export default function AllNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const loadData = () => {
    newsService.getArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    await newsService.deleteArticle(target.id);
    loadData();
    mediaosToast.success("Story Deleted Permanently", {
      description: `"${target.title}" was removed from the active news index.`,
    });
  };

  const filteredArticles = articles.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (categoryFilter !== "all" && a.categoryId !== categoryFilter) return false;
    return true;
  });

  const columns: Column<NewsArticle>[] = [
    {
      key: "title",
      header: "Headline & Story Details",
      render: (a) => (
        <div className="flex items-start gap-3 max-w-md">
          {a.featuredImage && (
            <img
              src={a.featuredImage}
              alt=""
              className="h-12 w-16 rounded-md object-cover shrink-0 bg-zinc-100 dark:bg-zinc-800"
            />
          )}
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {a.categoryName}
              </span>
              {a.isBreaking && (
                <span className="rounded bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 px-1 text-[9px] font-extrabold uppercase">
                  Breaking
                </span>
              )}
              {a.isFeatured && (
                <span className="rounded bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 px-1 text-[9px] font-bold uppercase">
                  Featured
                </span>
              )}
            </div>
            <Link
              href={`/admin/news/${a.id}/edit`}
              className="font-serif font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1"
            >
              {a.title}
            </Link>
            <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{a.excerpt}</p>
          </div>
        </div>
      ),
    },
    {
      key: "authorName",
      header: "Author / Desk",
      render: (a) => (
        <div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{a.authorName}</span>
          {a.reporterName && (
            <div className="text-[10px] text-zinc-400">Reporter: {a.reporterName}</div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (a) => {
        let variant: "default" | "secondary" | "destructive" | "warning" | "success" = "secondary";
        if (a.status === "published") variant = "success";
        if (a.status === "pending") variant = "warning";
        if (a.status === "rejected") variant = "destructive";
        return (
          <Badge variant={variant} className="capitalize text-[10px]">
            {a.status}
          </Badge>
        );
      },
    },
    {
      key: "views",
      header: "Views",
      render: (a) => (
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          {a.views.toLocaleString()}
        </span>
      ),
    },
    {
      key: "publishedAt",
      header: "Date",
      render: (a) => (
        <span className="text-[11px] text-zinc-500">
          {formatDate(a.publishedAt || a.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (a) => (
        <div className="flex items-center gap-1.5 justify-end">
          <Link href={`/admin/news/${a.id}/edit`}>
            <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1">
              <Edit className="h-3 w-3" />
              <span>Edit</span>
            </Button>
          </Link>
          <Link href={`/news/${a.slug}`} target="_blank">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteTarget({ id: a.id, title: a.title })}
            className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer"
            title="Delete Story"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            All Editorial News & Articles
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage published journalism, pending field reports, drafts, and scheduled dispatches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/news/review">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-500" />
              <span>Review Queue</span>
            </Button>
          </Link>
          <Link href="/admin/news/create">
            <Button size="sm" className="flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              <span>Create News</span>
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        data={filteredArticles}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search news headline..."
        filterComponent={
          <div className="flex items-center gap-2">
            {/* Status pills */}
            <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5 bg-zinc-50 dark:bg-zinc-900">
              {["all", "published", "draft", "pending", "rejected"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium capitalize transition ${
                    statusFilter === st
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        }
      />

      {/* MediaOS Native Delete Confirmation Dialog */}
      <MediaOSConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Story Permanently?"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be reversed and all related cache entries will be purged.`}
        confirmText="Yes, Delete Story"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}

