"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { newsService } from "@/services/news-service";
import { NewsArticle } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { mediaosToast } from "@/stores/mediaos-toast-store";
import { formatDate } from "@/lib/utils";
import {
  CheckSquare,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Eye,
  User,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

export default function EditorialReviewQueuePage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionFeedback, setRejectionFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    newsService.getArticles().then((data) => {
      setArticles(data);
      // Select first pending story by default if available
      const pending = data.filter((a) => a.status === "pending" || a.status === "rejected");
      if (pending.length > 0) setSelectedArticle(pending[0]);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id: string) => {
    await newsService.updateStatus(id, "approved");
    mediaosToast.success("Story approved and queued for staging.");
    loadData();
  };

  const handlePublishDirect = async (id: string) => {
    await newsService.updateStatus(id, "published");
    mediaosToast.success("Story published immediately to public broadsheet.");
    loadData();
  };

  const handleRejectSubmit = async () => {
    if (!selectedArticle) return;
    if (!rejectionFeedback) {
      mediaosToast.warning("Please provide constructive editorial feedback for the reporter.");
      return;
    }
    await newsService.updateStatus(selectedArticle.id, "rejected", rejectionFeedback);
    setRejectModalOpen(false);
    setRejectionFeedback("");
    mediaosToast.info("Article rejected with editorial revision feedback sent.");
    loadData();
  };

  const queueArticles = articles.filter(
    (a) => a.status === "pending" || a.status === "rejected"
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider">
              Editorial Review Desk
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            Story Fact-Checking & Approval Queue
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Every story must undergo authorized editorial review before syndication to the public broadsheet.
          </p>
        </div>

        <Link href="/admin/news/create">
          <Button size="sm">Compose New Dispatch</Button>
        </Link>
      </div>

      {/* Two-Pane Review Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Pane: Queue List (4 Cols) */}
        <div className="lg:col-span-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              Submissions in Queue ({queueArticles.length})
            </h3>
          </div>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {queueArticles.length === 0 ? (
              <div className="text-center py-10 text-xs text-zinc-400">
                Queue clean! No pending reviews at this time.
              </div>
            ) : (
              queueArticles.map((art) => {
                const isSelected = selectedArticle?.id === art.id;
                return (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-1 ring-blue-600"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {art.categoryName}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                          art.status === "pending"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                        }`}
                      >
                        {art.status}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-xs text-zinc-900 dark:text-zinc-100 line-clamp-2">
                      {art.title}
                    </h4>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400">
                      <span>By {art.authorName}</span>
                      <span>{formatDate(art.createdAt)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Review & Sign-Off Desk (8 Cols) */}
        <div className="lg:col-span-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-6">
          {selectedArticle ? (
            <>
              {/* Header Details */}
              <div className="space-y-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {selectedArticle.categoryName}
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-xs text-zinc-500">
                      Submitted {formatDate(selectedArticle.createdAt)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setRejectModalOpen(true)}
                      className="h-8 text-xs flex items-center gap-1"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      <span>Reject with Notes</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleApprove(selectedArticle.id)}
                      className="h-8 text-xs flex items-center gap-1"
                    >
                      <CheckSquare className="h-3.5 w-3.5" />
                      <span>Approve</span>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handlePublishDirect(selectedArticle.id)}
                      className="h-8 text-xs flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>Publish Live</span>
                    </Button>
                  </div>
                </div>

                <h2 className="text-2xl font-serif font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                  {selectedArticle.title}
                </h2>

                {selectedArticle.subtitle && (
                  <p className="text-sm font-serif italic text-zinc-600 dark:text-zinc-400">
                    {selectedArticle.subtitle}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-zinc-500 pt-1">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Byline: {selectedArticle.authorName}
                  </span>
                  {selectedArticle.reporterName && (
                    <span>Field Correspondent: {selectedArticle.reporterName}</span>
                  )}
                  <span>Language: {selectedArticle.language.toUpperCase()}</span>
                </div>
              </div>

              {/* Rejection Feedback Banner if Rejected */}
              {selectedArticle.rejectionFeedback && (
                <div className="rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/60 dark:bg-red-950/30 p-4 space-y-1">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold text-xs">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Editorial Revision Requested:</span>
                  </div>
                  <p className="text-xs text-red-800/90 dark:text-red-300/90 leading-relaxed">
                    {selectedArticle.rejectionFeedback}
                  </p>
                </div>
              )}

              {/* Featured Image */}
              {selectedArticle.featuredImage && (
                <div className="overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 aspect-[16/9] max-h-72">
                  <img
                    src={selectedArticle.featuredImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Article Content Body */}
              <div
                className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              {/* Tags & Taxonomy */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-zinc-400">Tags:</span>
                {selectedArticle.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-24 text-zinc-400 text-xs">
              Select an article from the left queue to begin review.
            </div>
          )}
        </div>
      </div>

      {/* Rejection Feedback Dialog */}
      <Modal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Return Story with Editorial Feedback"
        description="Explain fact-checking corrections, required verification, or tone adjustments for the reporter."
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Feedback & Instructions for Author
            </label>
            <Textarea
              rows={4}
              required
              value={rejectionFeedback}
              onChange={(e) => setRejectionFeedback(e.target.value)}
              placeholder="e.g. Needs independent secondary confirmation from the Ministry of Energy before we can run this figure..."
              className="text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button variant="outline" size="sm" onClick={() => setRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleRejectSubmit}>
              Submit Feedback & Reject
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

