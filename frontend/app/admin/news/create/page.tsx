"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { newsService } from "@/services/news-service";
import { INITIAL_CATEGORIES } from "@/services/news-service";
import { AIWritingModal } from "@/components/ai/ai-writing-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { slugify } from "@/lib/utils";
import { mediaosToast } from "@/stores/mediaos-toast-store";
import {
  Sparkles,
  ArrowLeft,
  Image as ImageIcon,
  Save,
  Send,
  Eye,
  Calendar,
  Tag,
  CheckCircle,
  Clock,
  History,
  ShieldCheck,
  Video,
} from "lucide-react";

export default function CreateNewsPage() {
  const router = useRouter();
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("Autosaved 1 min ago");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    excerpt: "",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    imageCaption: "",
    videoUrl: "",
    categoryId: "cat-world",
    subcategoryId: "sub-diplomacy",
    tags: "Diplomacy, Technology, Policy",
    authorName: "Sarah Jenkins",
    reporterName: "David O'Connor",
    language: "en" as const,
    isBreaking: false,
    isFeatured: false,
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "News, World, Breaking",
  });

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: slugify(val),
      seoTitle: prev.seoTitle || val,
    }));
  };

  const handleInsertFromAI = (generatedHtml: string, headlines?: string[]) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content ? `${prev.content}\n\n${generatedHtml}` : generatedHtml,
      title: headlines && headlines.length > 0 && !prev.title ? headlines[0] : prev.title,
      slug: headlines && headlines.length > 0 && !prev.title ? slugify(headlines[0]) : prev.slug,
    }));
  };

  const handleSubmit = async (targetStatus: "draft" | "pending" | "published") => {
    if (!formData.title) {
      mediaosToast.warning("Please provide a story headline.");
      return;
    }
    setSaving(true);

    const categoryObj = INITIAL_CATEGORIES.find((c) => c.id === formData.categoryId);
    const subcategoryObj = categoryObj?.subcategories.find((s) => s.id === formData.subcategoryId);

    try {
      await newsService.createArticle({
        title: formData.title,
        slug: formData.slug || slugify(formData.title),
        subtitle: formData.subtitle || undefined,
        excerpt: formData.excerpt || formData.title,
        content: formData.content || "<p>Story content pending drafting.</p>",
        featuredImage: formData.featuredImage,
        imageCaption: formData.imageCaption || undefined,
        videoUrl: formData.videoUrl || undefined,
        categoryId: formData.categoryId,
        categoryName: categoryObj?.name || "General",
        subcategoryId: formData.subcategoryId || undefined,
        subcategoryName: subcategoryObj?.name || undefined,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        authorId: "usr-01",
        authorName: formData.authorName,
        reporterId: "usr-04",
        reporterName: formData.reporterName,
        status: targetStatus,
        isBreaking: formData.isBreaking,
        isFeatured: formData.isFeatured,
        language: formData.language,
        publishedAt: targetStatus === "published" ? new Date().toISOString() : undefined,
        seo: {
          metaTitle: formData.seoTitle || formData.title,
          metaDescription: formData.seoDescription || formData.excerpt,
          keywords: formData.seoKeywords.split(",").map((k) => k.trim()).filter(Boolean),
        },
      });

      setSaving(false);
      mediaosToast.success(`Story successfully saved as ${targetStatus.toUpperCase()}.`);
      router.push("/admin/news");
    } catch {
      setSaving(false);
      mediaosToast.error("Failed to save story. Please check required fields.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <Link href="/admin/news">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Compose Editorial Story
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="h-3 w-3" />
                {lastSaved}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <History className="h-3 w-3" />
                Revision v1.2
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setAiModalOpen(true)}
            className="flex items-center gap-1.5 border-purple-300 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100"
          >
            <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span>AI Writing Assistant</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={saving}
            onClick={() => handleSubmit("draft")}
          >
            <Save className="h-3.5 w-3.5 mr-1" />
            Save Draft
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={saving}
            onClick={() => handleSubmit("pending")}
          >
            <Send className="h-3.5 w-3.5 mr-1" />
            Submit for Review
          </Button>

          <Button
            type="button"
            size="sm"
            disabled={saving}
            onClick={() => handleSubmit("published")}
          >
            Publish Now
          </Button>
        </div>
      </div>

      {/* Main Form Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Headline, Body, Rich Editor (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Headline */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-4 shadow-xs">
            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Article Headline <span className="text-red-500">*</span>
              </label>
              <Input
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter punchy, factual headline..."
                className="text-base font-serif font-bold h-11"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                URL Slug (Permanent Link)
              </label>
              <div className="flex items-center">
                <span className="inline-flex h-9 items-center rounded-l-lg border border-r-0 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-2.5 text-xs text-zinc-400 font-mono">
                  /news/
                </span>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="rounded-l-none font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Subtitle / Deck (Optional)
              </label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Secondary line summarizing key discovery or context..."
                className="text-xs italic"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Executive Excerpt (Lead Paragraph)
              </label>
              <Textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary for broadsheet front page cards and social shares..."
                className="text-xs"
              />
            </div>
          </div>

          {/* Rich Content Editor */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Article Body & Reporting
              </label>
              <span className="text-[10px] text-zinc-400">
                Supports HTML & Rich Markdown Formatting
              </span>
            </div>

            {/* Quick formatting toolbar */}
            <div className="flex flex-wrap items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 bg-zinc-50 dark:bg-zinc-800/40 text-xs font-mono">
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, content: `${p.content}<h2>Subheading</h2>\n<p>Body copy here...</p>\n` }))}
                className="px-2 py-0.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 font-bold"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, content: `${p.content}<h3>Section</h3>\n` }))}
                className="px-2 py-0.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 font-bold"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, content: `${p.content}<blockquote>"Direct quote from source here."</blockquote>\n` }))}
                className="px-2 py-0.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 italic"
              >
                Quote
              </button>
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, content: `${p.content}<ul>\n  <li>Key point 1</li>\n  <li>Key point 2</li>\n</ul>\n` }))}
                className="px-2 py-0.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                List
              </button>
            </div>

            <Textarea
              rows={14}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Draft your in-depth journalistic article here, or use the AI Assistant to generate a structured draft..."
              className="font-mono text-xs leading-relaxed"
            />
          </div>

          {/* SEO Metadata Box */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Search Engine Optimization (SEO & Social Graph)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  SEO Meta Title
                </label>
                <Input
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="Appears in Google search results (recommended 60 chars)"
                  className="text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Meta Description
                </label>
                <Textarea
                  rows={2}
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="Search snippet summary (recommended 150-160 chars)"
                  className="text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Focus Keywords
                </label>
                <Input
                  value={formData.seoKeywords}
                  onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                  placeholder="e.g. Geneva Summit, AI Governance, Technology"
                  className="text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Taxonomy, Media & Publishing Controls (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Publishing Flags */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Publishing Options
            </h3>

            <div className="space-y-3">
              <Switch
                checked={formData.isBreaking}
                onCheckedChange={(c) => setFormData({ ...formData, isBreaking: c })}
                label="Breaking News Alert"
                description="Promotes to red top ticker and dispatches push broadcast."
              />

              <Switch
                checked={formData.isFeatured}
                onCheckedChange={(c) => setFormData({ ...formData, isFeatured: c })}
                label="Featured Front-Page Story"
                description="Positions in main broadsheet hero spotlight."
              />
            </div>
          </div>

          {/* Category & Desks */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Editorial Classification
            </h3>

            <div>
              <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Primary Category
              </label>
              <Select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              >
                {INITIAL_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Story Language
              </label>
              <Select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value as any })}
              >
                <option value="en">English Edition</option>
                <option value="bn">Bangla / বাংলা সংস্করণ</option>
                <option value="ar">Arabic / النسخة العربية</option>
              </Select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Story Tags (Comma Separated)
              </label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Diplomacy, Policy, Tech"
                className="text-xs"
              />
            </div>
          </div>

          {/* Authorship & Field Reporter */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Bylines & Field Reporting
            </h3>

            <div>
              <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Author / Lead Byline
              </label>
              <Input
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Special Correspondent / Reporter
              </label>
              <Input
                value={formData.reporterName}
                onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                className="text-xs"
              />
            </div>
          </div>

          {/* Featured Imagery & Media */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Featured Editorial Image
            </h3>

            <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 aspect-[16/10] bg-zinc-100 dark:bg-zinc-800">
              <img
                src={formData.featuredImage}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Image CDN URL
              </label>
              <Input
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                className="text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Caption & Photo Attribution
              </label>
              <Input
                value={formData.imageCaption}
                onChange={(e) => setFormData({ ...formData, imageCaption: e.target.value })}
                placeholder="e.g. Photo: Press Association / AFP"
                className="text-xs italic"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AIWritingModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialTopic={formData.title}
        initialSourceText={formData.content}
        onInsertContent={handleInsertFromAI}
      />
    </div>
  );
}

