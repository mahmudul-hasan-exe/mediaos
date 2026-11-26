"use client";

import React, { useState, useEffect } from "react";
import { newsService, INITIAL_CATEGORIES } from "@/services/news-service";
import { NewsArticle } from "@/types";
import { NewsCard } from "@/components/newspaper/news-card";
import { ShimmerCardList } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { RiSearchLine } from "@remixicon/react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [results, setResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  const performSearch = (q: string, cat: string) => {
    setLoading(true);
    newsService.getArticles({ search: q, category: cat === "all" ? undefined : cat }).then((data) => {
      setResults(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    performSearch(query, category);
  }, [category]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query, category);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="border-b-2 border-zinc-900 dark:border-zinc-100 pb-5">
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-zinc-950 dark:text-zinc-50 tracking-tight">
          Search Journalism Archives
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 font-sans">
          Access the complete historical index of foreign cables, investigative dossiers, financial reporting, and policy analysis.
        </p>
      </div>

      {/* Search Input & Filter Bar */}
      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords, diplomatic summits, authors, or topics..."
            className="pl-10 h-12 text-sm bg-white dark:bg-zinc-900 rounded-xl"
          />
        </div>

        <div className="w-full sm:w-60">
          <Select value={category} onChange={(e) => setCategory(e.target.value)} className="h-12 rounded-xl text-xs">
            <option value="all">All Desks & Categories</option>
            {INITIAL_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto px-7 h-12 text-xs font-bold gap-2 rounded-xl">
          <RiSearchLine className="h-4 w-4" />
          <span>Search Wire</span>
        </Button>
      </form>

      {/* Query Status */}
      <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-mono">
        <span>Found {results.length} verified dispatches</span>
        {query && <span className="font-sans font-semibold text-zinc-800 dark:text-zinc-200">Query: &quot;{query}&quot;</span>}
      </div>

      {/* Results Feed */}
      {loading ? (
        <ShimmerCardList count={4} />
      ) : results.length === 0 ? (
        <div className="py-24 text-center space-y-3">
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 font-serif">
            No matching dispatches found. Try broadening search terms.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {results.map((art) => (
            <NewsCard key={art.id} article={art} variant="horizontal" />
          ))}
        </div>
      )}
    </div>
  );
}
