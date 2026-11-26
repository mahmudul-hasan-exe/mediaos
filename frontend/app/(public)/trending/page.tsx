"use client";

import React, { useState, useEffect } from "react";
import { newsService } from "@/services/news-service";
import { NewsArticle } from "@/types";
import { NewsCard } from "@/components/newspaper/news-card";
import { ShimmerCardList } from "@/components/ui/skeleton";
import { RiFireFill } from "@remixicon/react";

export default function TrendingStoriesPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsService.getArticles({ status: "published" }).then((data) => {
      const sorted = [...data].sort((a, b) => b.views - a.views);
      setArticles(sorted);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="border-b-2 border-zinc-900 dark:border-zinc-100 pb-5">
        <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-extrabold uppercase tracking-wider">
          <RiFireFill className="h-4 w-4 text-amber-500 animate-pulse" />
          <span>Real-Time Audience Wire</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-zinc-950 dark:text-zinc-50 tracking-tight mt-1.5">
          Trending News & Most Read Dispatches
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed font-sans">
          Continuous algorithmic ranking of stories generating peak engagement, global syndication, and reader commentary today.
        </p>
      </div>

      {loading ? (
        <ShimmerCardList count={5} />
      ) : (
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {articles.map((art, idx) => (
            <div key={art.id} className="py-4 flex items-start gap-4 sm:gap-6 group">
              <span className="font-serif font-black text-3xl sm:text-5xl text-zinc-300 dark:text-zinc-700 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition w-10 shrink-0 text-right">
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
              <div className="flex-1">
                <NewsCard article={art} variant="horizontal" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
