"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { newsService } from "@/services/news-service";
import { NewsArticle } from "@/types";
import { NewsCard } from "@/components/newspaper/news-card";
import {
  RiMailLine,
  RiMapPinLine,
  RiArticleLine,
  RiShieldCheckLine,
  RiArrowLeftLine,
} from "@remixicon/react";

export default function AuthorProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const authorsData: Record<string, any> = {
    "usr-01": {
      name: "Sarah Jenkins",
      designation: "Senior Foreign Correspondent & Diplomatic Desk Lead",
      bio: "Covering multilateral treaties, European Union affairs, and high-capability autonomous compute governance for over fifteen years. Recipient of the International Press Association Award for investigative reporting.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      email: "sarah.jenkins@metrochronicle.com",
      location: "Geneva & London Bureaus",
      articlesCount: 142,
    },
    "usr-02": {
      name: "Dr. Marcus Wei",
      designation: "Technology & Frontier Physics Columnist",
      bio: "Former condensed matter researcher covering quantum computing, semiconductor fabrication bottlenecks, and autonomous robotics architectures.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      email: "marcus.wei@metrochronicle.com",
      location: "San Francisco & Tokyo",
      articlesCount: 89,
    },
    "usr-03": {
      name: "Helena Rostova",
      designation: "Financial Markets & Central Banking Bureau Chief",
      bio: "Specializing in macroeconomic stability, cross-border settlement architectures, central bank digital currencies, and transatlantic sovereign debt corridors.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      email: "helena.rostova@metrochronicle.com",
      location: "New York & Frankfurt",
      articlesCount: 112,
    },
    "usr-04": {
      name: "David O'Connor",
      designation: "Special Investigative Field Correspondent",
      bio: "Focusing on critical rare earth supply chains, defense procurement transparency, and aerospace safety investigations.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      email: "david.oconnor@metrochronicle.com",
      location: "Washington & Global",
      articlesCount: 64,
    },
  };

  const author = authorsData[id] || authorsData["usr-01"];

  useEffect(() => {
    newsService.getArticles({ status: "published" }).then((data) => {
      const matched = data.filter(
        (a) =>
          a.authorName.toLowerCase().includes(author.name.toLowerCase()) ||
          (a.reporterName && a.reporterName.toLowerCase().includes(author.name.toLowerCase()))
      );
      setArticles(matched.length > 0 ? matched : data.slice(0, 3));
      setLoading(false);
    });
  }, [author.name]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-zinc-400 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
          <RiArrowLeftLine className="h-3.5 w-3.5" />
          <span>Front Page</span>
        </Link>
        <span>/</span>
        <span>Newsroom Staff</span>
        <span>/</span>
        <span className="font-bold text-zinc-900 dark:text-zinc-100">{author.name}</span>
      </div>

      {/* Author Profile Bio Card */}
      <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative shrink-0">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-4 border-zinc-100 dark:border-zinc-800 shadow-sm"
            />
            <div className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-1 text-white border-2 border-white dark:border-zinc-900">
              <RiShieldCheckLine className="h-4 w-4" />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="font-serif font-black text-2xl sm:text-3xl text-zinc-950 dark:text-zinc-50">
                  {author.name}
                </h1>
                <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mt-0.5">
                  {author.designation}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <a
                  href={`mailto:${author.email}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 transition shadow-2xs"
                >
                  <RiMailLine className="h-3.5 w-3.5" />
                  <span>Contact Bureau</span>
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
              {author.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-2 border-t border-zinc-100 dark:border-zinc-800 font-mono">
              <span className="flex items-center gap-1">
                <RiMapPinLine className="h-3.5 w-3.5 text-zinc-400" />
                {author.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <RiArticleLine className="h-3.5 w-3.5 text-zinc-400" />
                {author.articlesCount} Published Dispatches
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatches by Author */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-900 dark:border-zinc-100">
          <h2 className="font-serif font-black text-2xl text-zinc-950 dark:text-zinc-50">
            Published Articles & Foreign Dispatches ({articles.length})
          </h2>
          <span className="text-xs text-zinc-400 font-mono">Verified Byline</span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-zinc-400 font-mono">
            Loading author archive...
          </div>
        ) : (
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {articles.map((art) => (
              <NewsCard key={art.id} article={art} variant="horizontal" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
