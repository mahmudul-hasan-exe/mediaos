"use client";

import React from "react";
import Link from "next/link";
import { NewsArticle } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  RiTimeLine,
  RiEyeLine,
  RiFireLine,
  RiFlashlightFill,
  RiDoubleQuotesL,
} from "@remixicon/react";
import { NewsCard } from "./news-card";

interface HeroNewsGridProps {
  articles: NewsArticle[];
}

export function HeroNewsGrid({ articles }: HeroNewsGridProps) {
  const leadArticle = articles.find((a) => a.isFeatured) || articles[0];
  const sideArticles = articles.filter((a) => a.id !== leadArticle?.id).slice(0, 3);
  const trendingArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  if (!leadArticle) return null;

  return (
    <section className="py-4 border-b border-zinc-200 dark:border-zinc-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Authoritative Lead Story (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-200/80 dark:border-zinc-800 pb-6 lg:pb-0 lg:pr-8">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="news-kicker text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200/60 dark:border-blue-900">
                {leadArticle.categoryName}
              </span>
              {leadArticle.isBreaking && (
                <span className="inline-flex items-center gap-1 news-kicker text-red-600 bg-red-50 dark:bg-red-950 px-2 py-0.5 rounded">
                  <RiFlashlightFill className="h-3 w-3" />
                  Breaking Dispatch
                </span>
              )}
            </div>

            <Link href={`/news/${leadArticle.slug}`} className="group block">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition leading-[1.12]">
                {leadArticle.title}
              </h2>
            </Link>

            {leadArticle.subtitle && (
              <p className="mt-2.5 news-standfirst text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-snug">
                {leadArticle.subtitle}
              </p>
            )}

            <div className="mt-4 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 aspect-[16/9] border border-zinc-200 dark:border-zinc-800">
              <img
                src={leadArticle.featuredImage}
                alt={leadArticle.title}
                className="h-full w-full object-cover hover:scale-102 transition duration-700"
              />
            </div>
            {leadArticle.imageCaption && (
              <p className="mt-1.5 text-[11px] text-zinc-400 italic">
                {leadArticle.imageCaption}
              </p>
            )}

            <p className="mt-4 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
              {leadArticle.excerpt}
            </p>
          </div>

          <div className="mt-6 pt-3.5 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                {leadArticle.authorName.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 block leading-tight">
                  {leadArticle.authorName}
                </span>
                <span className="text-[10px] text-zinc-400">Senior International Desk</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[11px]">
                <RiTimeLine className="h-3 w-3" />
                {formatDate(leadArticle.publishedAt || leadArticle.createdAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[11px]">
                <RiEyeLine className="h-3 w-3" />
                {leadArticle.views.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Ranked Briefs & Most Read (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Secondary Story Cards */}
          <div className="space-y-1">
            <div className="pb-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                Editorial Highlights
              </span>
              <span className="text-[10px] text-blue-600 font-semibold">Curated Daily</span>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {sideArticles.map((article) => (
                <NewsCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          </div>

          {/* Numbered Most Read Ranking Box */}
          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 p-4 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <RiFireLine className="h-4 w-4 text-amber-500" />
                <span>Most Read Right Now</span>
              </h4>
              <span className="text-[10px] font-mono text-zinc-400">Live Traffic</span>
            </div>

            <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800">
              {trendingArticles.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group flex items-start gap-3 py-3 first:pt-3.5 transition"
                >
                  <span className="text-2xl font-black font-serif text-zinc-300 dark:text-zinc-700 group-hover:text-blue-600 transition w-6 shrink-0">
                    0{index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition line-clamp-2 leading-snug">
                      {article.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-zinc-400">
                      <span>{article.categoryName}</span>
                      <span>•</span>
                      <span>{article.views.toLocaleString()} reads</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Editorial Quote of the Day */}
          <div className="rounded-xl border border-blue-100 dark:border-blue-950 bg-blue-50/50 dark:bg-blue-950/20 p-4 flex gap-3 items-start">
            <RiDoubleQuotesL className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs italic font-serif text-zinc-800 dark:text-zinc-200 leading-relaxed">
                &ldquo;Independent journalism is not merely the mirror of society; it is the lantern that illuminates the paths ahead.&rdquo;
              </p>
              <div className="mt-1.5 text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                — Global Editorial Board
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
