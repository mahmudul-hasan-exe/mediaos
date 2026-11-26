"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { newsService, INITIAL_CATEGORIES } from "@/services/news-service";
import { NewsArticle } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AIWritingModal } from "@/components/ai/ai-writing-modal";
import { ArrowLeft, Save, Sparkles, CheckCircle, Trash2 } from "lucide-react";
import { mediaosToast } from "@/stores/mediaos-toast-store";

export default function EditNewsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      newsService.getArticleById(id).then((found) => {
        if (found) setArticle(found);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-zinc-500">
        Loading article data from newsroom registry...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-20 text-center space-y-3">
        <h2 className="text-lg font-bold">Story Not Found</h2>
        <Link href="/admin/news">
          <Button variant="outline" size="sm">
            Return to All News
          </Button>
        </Link>
      </div>
    );
  }

  const handleSave = async (status?: any) => {
    setSaving(true);
    await newsService.updateArticle(article.id, {
      ...article,
      status: status || article.status,
    });
    setSaving(false);
    mediaosToast.success("Article changes saved successfully.");
    router.push("/admin/news");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <Link href="/admin/news">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Edit Article: {article.title}
            </h1>
            <span className="text-xs text-zinc-400">
              Current Status: <strong className="uppercase text-blue-600">{article.status}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setAiModalOpen(true)}
            className="flex items-center gap-1.5 border-purple-300 text-purple-700 dark:text-purple-300"
          >
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span>AI Assistant</span>
          </Button>

          <Button
            type="button"
            size="sm"
            disabled={saving}
            onClick={() => handleSave()}
          >
            <Save className="h-3.5 w-3.5 mr-1" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3">
            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Headline
              </label>
              <Input
                value={article.title}
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
                className="text-base font-serif font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Excerpt
              </label>
              <Textarea
                rows={3}
                value={article.excerpt}
                onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Article Body Content
              </label>
              <Textarea
                rows={12}
                value={article.content}
                onChange={(e) => setArticle({ ...article, content: e.target.value })}
                className="font-mono text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Taxonomy & Flags
            </h3>

            <div>
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Category
              </label>
              <Select
                value={article.categoryId}
                onChange={(e) => setArticle({ ...article, categoryId: e.target.value })}
              >
                {INITIAL_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="pt-2 space-y-3">
              <Switch
                checked={article.isBreaking}
                onCheckedChange={(c) => setArticle({ ...article, isBreaking: c })}
                label="Breaking News"
              />
              <Switch
                checked={article.isFeatured}
                onCheckedChange={(c) => setArticle({ ...article, isFeatured: c })}
                label="Featured Front Page"
              />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Featured Image
            </h3>
            <img
              src={article.featuredImage}
              alt=""
              className="rounded-lg aspect-[16/10] object-cover w-full"
            />
            <Input
              value={article.featuredImage}
              onChange={(e) => setArticle({ ...article, featuredImage: e.target.value })}
              className="text-xs font-mono"
            />
          </div>
        </div>
      </div>

      <AIWritingModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialTopic={article.title}
        initialSourceText={article.content}
        onInsertContent={(gen) => setArticle({ ...article, content: `${article.content}\n\n${gen}` })}
      />
    </div>
  );
}

