"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { newsService } from "@/services/news-service";
import { NewsArticle } from "@/types";
import {
  RiSearchLine,
  RiCloseLine,
  RiFireLine,
  RiArrowRightLine,
  RiTimeLine,
  RiFolderLine,
} from "@remixicon/react";

interface SearchCommandDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchCommandDialog({ isOpen, onClose }: SearchCommandDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  // Global ⌘K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom event or parent
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Live search debounced
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const data = await newsService.getArticles({ search: query, status: "published" });
        setResults(data.slice(0, 5));
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (slug: string) => {
    onClose();
    router.push(`/news/${slug}`);
  };

  const trendingTags = ["AI & Autonomy", "Global Economy", "Climate Accord", "Cybersecurity", "Geopolitics"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800">
          <RiSearchLine className="h-5 w-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, topics, investigative reporting & archives..."
            autoFocus
            className="w-full pl-3 pr-8 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <RiCloseLine className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Content Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Quick Trending Tags */}
          {!query && (
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                <RiFireLine className="h-3.5 w-3.5 text-amber-500" />
                <span>Trending Topics on the Wire</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 dark:hover:text-blue-400 transition"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {loading ? (
            <div className="py-8 text-center text-xs text-zinc-400 font-mono animate-pulse">
              Scanning editorial wire and archives...
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider pb-1">
                Dispatches ({results.length})
              </div>
              {results.map((art) => (
                <button
                  key={art.id}
                  onClick={() => handleSelect(art.slug)}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition flex items-start gap-3 group"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      {art.categoryName}
                    </span>
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-1">
                      {art.title}
                    </h4>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">{art.excerpt}</p>
                  </div>
                  <RiArrowRightLine className="h-4 w-4 text-zinc-400 group-hover:text-blue-600 shrink-0 mt-2 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 font-serif">
                No matching stories found for &ldquo;{query}&rdquo;
              </p>
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="inline-block text-xs text-blue-600 hover:underline font-bold"
              >
                Search Complete Historical Archives →
              </Link>
            </div>
          ) : null}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
          <span>Use ⌘K to open command search from anywhere</span>
          <Link
            href="/search"
            onClick={onClose}
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            Advanced Search Wire
          </Link>
        </div>
      </div>
    </div>
  );
}

