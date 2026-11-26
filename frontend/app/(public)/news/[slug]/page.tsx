"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { newsService } from "@/services/news-service";
import { NewsArticle } from "@/types";
import { formatDate } from "@/lib/utils";
import { AdBanner } from "@/components/newspaper/ad-banner";
import { NewsCard } from "@/components/newspaper/news-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArticleDetailSkeleton } from "@/components/ui/skeleton";
import {
  RiTimeLine,
  RiEyeLine,
  RiShareForwardLine,
  RiBookmarkLine,
  RiBookmarkFill,
  RiChat1Line,
  RiCheckLine,
  RiArrowLeftLine,
  RiShieldCheckLine,
  RiSendPlane2Line,
  RiVolumeUpLine,
  RiDoubleQuotesL,
  RiPrinterLine,
  RiFlashlightFill,
} from "@remixicon/react";
import { mediaosToast } from "@/stores/mediaos-toast-store";

export default function ArticleDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [related, setRelated] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [fontType, setFontType] = useState<"serif" | "sans">("serif");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Comments state
  const [comments, setComments] = useState([
    {
      id: "c1",
      author: "Ambassador Marcus Sterling",
      time: "2 hours ago",
      text: "The verification protocols in this treaty represent the single most important consensus since the Non-Proliferation agreements. Excellent reporting by the foreign desk.",
      likes: 24,
    },
    {
      id: "c2",
      author: "Dr. Evelyn Wright",
      time: "3 hours ago",
      text: "Curious how the autonomous audit thresholds will be calculated across distributed neural networks without centralized inference choke points.",
      likes: 12,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    if (slug) {
      newsService.getArticleBySlug(slug).then((found) => {
        if (found) {
          setArticle(found);
          newsService.getArticles({ category: found.categoryId }).then((all) => {
            setRelated(all.filter((a) => a.id !== found.id).slice(0, 3));
          });
        }
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return <ArticleDetailSkeleton />;
  }

  if (!article) {
    return (
      <div className="py-24 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-3xl font-serif font-black text-zinc-900 dark:text-zinc-100">
          Story Not Found
        </h2>
        <p className="text-xs text-zinc-500 leading-relaxed">
          The requested dispatch may have been updated, rescheduled, or relocated under editorial guidelines.
        </p>
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <RiArrowLeftLine className="h-4 w-4" />
            <span>Return to Front Page</span>
          </Button>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      mediaosToast.success("Link Copied to Clipboard!", {
        description: "You can now paste and share this story with colleagues or friends.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !authorName) return;
    setComments([
      {
        id: `c-${Date.now()}`,
        author: authorName,
        time: "Just now",
        text: newComment,
        likes: 0,
      },
      ...comments,
    ]);
    setNewComment("");
    mediaosToast.success("Perspective Submitted!", {
      description: "Thank you! Your comment has been submitted and queued for newsroom moderation.",
    });
  };

  const readingTime = Math.max(2, Math.ceil(article.content.length / 500));

  return (
    <article className="space-y-8 max-w-4xl mx-auto">
      {/* JSON-LD Schema for Google NewsArticle Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.excerpt,
            image: [article.featuredImage],
            datePublished: article.publishedAt || article.createdAt,
            dateModified: article.updatedAt,
            author: [
              {
                "@type": "Person",
                name: article.authorName,
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb & Section Navigation */}
      <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-zinc-500 hover:text-blue-600 transition flex items-center gap-1">
            <RiArrowLeftLine className="h-3.5 w-3.5" />
            <span>Front Page</span>
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <Link
            href={`/category/${article.categoryId}`}
            className="font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400"
          >
            {article.categoryName}
          </Link>
        </div>

        {/* Accessibility & Typography Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Font Family Switcher (Serif vs Sans) */}
          <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-md p-0.5 bg-zinc-50 dark:bg-zinc-900">
            <button
              onClick={() => setFontType("serif")}
              title="Broadsheet Serif (Classic Newsreader)"
              className={`px-2 py-0.5 rounded text-xs font-serif font-bold transition ${
                fontType === "serif"
                  ? "bg-white dark:bg-zinc-800 shadow-2xs text-blue-600 dark:text-blue-400"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              Serif
            </button>
            <button
              onClick={() => setFontType("sans")}
              title="Modern Digital Sans"
              className={`px-2 py-0.5 rounded text-xs font-sans font-bold transition ${
                fontType === "sans"
                  ? "bg-white dark:bg-zinc-800 shadow-2xs text-blue-600 dark:text-blue-400"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              Sans
            </button>
          </div>

          {/* Font Sizing Controls */}
          <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-md p-0.5 bg-zinc-50 dark:bg-zinc-900">
            <span className="text-zinc-400 text-[10px] uppercase font-bold px-1.5 hidden sm:inline">Size</span>
            <button
              onClick={() => setFontSize("sm")}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition ${
                fontSize === "sm" ? "bg-white dark:bg-zinc-800 shadow-2xs font-bold text-blue-600 dark:text-blue-400" : "text-zinc-500"
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize("base")}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition ${
                fontSize === "base" ? "bg-white dark:bg-zinc-800 shadow-2xs font-bold text-blue-600 dark:text-blue-400" : "text-zinc-500"
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize("lg")}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition ${
                fontSize === "lg" ? "bg-white dark:bg-zinc-800 shadow-2xs font-bold text-blue-600 dark:text-blue-400" : "text-zinc-500"
              }`}
            >
              A+
            </button>
          </div>

          <button
            onClick={() => window.print()}
            title="Print Article"
            className="hidden sm:flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <RiPrinterLine className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Headline & Subtitle */}
      <div className="space-y-3">
        {article.isBreaking && (
          <span className="inline-flex items-center gap-1 rounded bg-red-600 text-white px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest shadow-2xs">
            <RiFlashlightFill className="h-3 w-3" />
            Breaking News
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.12]">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="news-standfirst text-lg sm:text-xl font-normal leading-relaxed text-zinc-600 dark:text-zinc-400">
            {article.subtitle}
          </p>
        )}
      </div>

      {/* Author Byline, Designation & Metadata Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-3.5 border-y border-zinc-200 dark:border-zinc-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
            {article.authorName.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span>{article.authorName}</span>
              <RiShieldCheckLine className="h-3.5 w-3.5 text-blue-600" />
            </div>
            <p className="text-[11px] text-zinc-400">Chief International Bureau Correspondent</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
          <span className="flex items-center gap-1">
            <RiTimeLine className="h-3.5 w-3.5" />
            {formatDate(article.publishedAt || article.createdAt)}
          </span>
          <span>•</span>
          <span>{readingTime} min read</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <RiEyeLine className="h-3.5 w-3.5" />
            {article.views.toLocaleString()} reads
          </span>
        </div>
      </div>

      {/* Action Bar (Audio Readout, Bookmark, Share) */}
      <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 text-xs">
        {/* Audio Article Dispatch */}
        <button
          onClick={() =>
            mediaosToast.info("Audio Dispatch Playing", {
              description: `Streaming automated voice broadcast for this ${readingTime} min article.`,
            })
          }
          className="flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50/80 dark:bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition cursor-pointer"
        >
          <RiVolumeUpLine className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
          <span>Listen to this story ({readingTime}m)</span>
        </button>

        {/* Share & Bookmark Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const nextState = !isBookmarked;
              setIsBookmarked(nextState);
              if (nextState) {
                mediaosToast.success("Story Saved to Bookmarks", {
                  description: "You can find this article in your reading list.",
                });
              } else {
                mediaosToast.info("Removed from Bookmarks");
              }
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border transition cursor-pointer ${
              isBookmarked
                ? "bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/50 dark:border-amber-900 dark:text-amber-300"
                : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            {isBookmarked ? (
              <RiBookmarkFill className="h-3.5 w-3.5 text-amber-500" />
            ) : (
              <RiBookmarkLine className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save"}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 text-zinc-600 dark:text-zinc-300 transition"
          >
            {copied ? (
              <>
                <RiCheckLine className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Link Copied</span>
              </>
            ) : (
              <>
                <RiShareForwardLine className="h-3.5 w-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Featured Editorial Photo */}
      <div className="space-y-2">
        <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 aspect-[16/9] shadow-xs">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>
        {article.imageCaption && (
          <p className="text-xs text-zinc-500 italic pl-1 border-l-2 border-blue-600 font-sans">
            {article.imageCaption}
          </p>
        )}
      </div>

      {/* Article Body Content (Broadsheet Type, Drop Cap, Pull Quotes) */}
      <div
        className={`text-zinc-800 dark:text-zinc-200 space-y-6 ${
          fontType === "serif" ? "font-editorial" : "font-sans"
        } ${
          fontSize === "sm"
            ? "text-[15px] sm:text-base leading-relaxed tracking-normal"
            : fontSize === "lg"
            ? "text-xl sm:text-2xl leading-loose tracking-normal"
            : "text-[17px] sm:text-lg leading-[1.8] tracking-normal"
        }`}
      >
        <p className="news-standfirst text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">
          {article.excerpt}
        </p>

        {/* BBC News Signature Key Takeaways Box ("At a Glance") */}
        <div className="my-6 rounded-xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>At a Glance • Key Points</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-sans">
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-black text-sm leading-none mt-0.5">•</span>
              <span>Binding international protocol signed across key sovereign jurisdictions.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-black text-sm leading-none mt-0.5">•</span>
              <span>Enforces rigorous algorithmic transparency & real-time compute auditing.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-black text-sm leading-none mt-0.5">•</span>
              <span>Next verification summit scheduled for Geneva later this quarter.</span>
            </li>
          </ul>
        </div>

        {/* Editorial Pull Quote */}
        <div className="news-pullquote">
          <RiDoubleQuotesL className="h-6 w-6 text-blue-600 mb-2" />
          <p className="font-serif italic text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 leading-snug">
            &ldquo;The verification protocol is not merely technical paperwork; it establishes unprecedented liability across sovereign compute clusters worldwide.&rdquo;
          </p>
          <div className="mt-3 text-xs font-bold uppercase tracking-wider text-zinc-500 font-sans">
            — United Nations High Commission Report
          </div>
        </div>

        <div className="space-y-6 whitespace-pre-line news-drop-cap">
          {article.content}
        </div>
      </div>

      {/* In-Article Sponsor Ad Banner */}
      <div className="py-4">
        <AdBanner zone="article_inline" />
      </div>

      {/* Tags / Metadata Pills */}
      {article.tags && article.tags.length > 0 && (
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-zinc-500 text-[11px] uppercase tracking-wider">
            Topics:
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Editorial Comments Section */}
      <section className="pt-10 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-black text-xl text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
            <RiChat1Line className="h-5 w-5 text-blue-600" />
            <span>Reader Perspectives ({comments.length})</span>
          </h3>
          <span className="text-xs text-zinc-400">Moderated Discussion</span>
        </div>

        {/* Add Comment Form */}
        <form
          onSubmit={handleAddComment}
          className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-5 space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Your full name & designation..."
            />
          </div>
          <Textarea
            required
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Contribute constructive commentary to this investigative reporting..."
          />
          <div className="flex justify-between items-center pt-1">
            <p className="text-[11px] text-zinc-400">Comments follow newsroom editorial guidelines.</p>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 px-4 py-2 text-xs font-bold text-white transition shadow-xs"
            >
              <RiSendPlane2Line className="h-3.5 w-3.5" />
              <span>Post Comment</span>
            </button>
          </div>
        </form>

        {/* Comments Feed */}
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 p-4 space-y-2 bg-white dark:bg-zinc-900/30 shadow-2xs"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{c.author}</span>
                <span className="text-[11px] text-zinc-400">{c.time}</span>
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Stories Desk */}
      {related.length > 0 && (
        <section className="pt-10 border-t border-zinc-200 dark:border-zinc-800 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="font-serif font-black text-xl text-zinc-950 dark:text-zinc-50">
              Related Dispatches from {article.categoryName}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <NewsCard key={rel.id} article={rel} variant="vertical" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
