"use client";

import React from "react";
import Link from "next/link";
import { NewsArticle } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  RiTimeLine,
  RiEyeLine,
  RiFlashlightFill,
} from "@remixicon/react";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "horizontal" | "vertical" | "compact" | "lead" | "opinion";
  showCategory?: boolean;
}

export function NewsCard({
  article,
  variant = "vertical",
  showCategory = true,
}: NewsCardProps) {
  if (variant === "compact") {
    return (
      <article className="group py-3.5 border-b border-zinc-200/60 dark:border-zinc-800 last:border-b-0">
        <div className="flex items-start gap-3.5">
          <div className="flex-1 min-w-0">
            {showCategory && (
              <span className="news-kicker text-blue-700 dark:text-blue-400 block mb-1">
                {article.categoryName}
              </span>
            )}
            <Link
              href={`/news/${article.slug}`}
              className="font-serif font-bold text-sm sm:text-[15px] text-zinc-950 dark:text-zinc-50 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition line-clamp-2 leading-snug"
            >
              {article.title}
            </Link>
            <div className="mt-1.5 flex items-center gap-2.5 text-[11px] text-zinc-500">
              <span className="flex items-center gap-1">
                <RiTimeLine className="h-3 w-3 text-zinc-400" />
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <RiEyeLine className="h-3 w-3 text-zinc-400" />
                {article.views.toLocaleString()}
              </span>
            </div>
          </div>
          {article.featuredImage && (
            <Link
              href={`/news/${article.slug}`}
              className="shrink-0 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800"
            >
              <img
                src={article.featuredImage}
                alt={article.title}
                className="h-16 w-24 object-cover group-hover:scale-105 transition duration-300"
              />
            </Link>
          )}
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="group flex flex-col sm:flex-row gap-5 py-5 border-b border-zinc-200/70 dark:border-zinc-800 last:border-b-0">
        {article.featuredImage && (
          <Link
            href={`/news/${article.slug}`}
            className="sm:w-60 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 aspect-[16/10] border border-zinc-200 dark:border-zinc-800"
          >
            <img
              src={article.featuredImage}
              alt={article.title}
              className="h-full w-full object-cover group-hover:scale-103 transition duration-500"
            />
          </Link>
        )}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              {showCategory && (
                <span className="news-kicker text-blue-700 dark:text-blue-400">
                  {article.categoryName}
                </span>
              )}
              {article.isBreaking && (
                <span className="inline-flex items-center gap-1 news-kicker text-red-600 bg-red-50 dark:bg-red-950/60 px-1.5 py-0.5 rounded">
                  <RiFlashlightFill className="h-2.5 w-2.5" />
                  Breaking
                </span>
              )}
            </div>
            <Link
              href={`/news/${article.slug}`}
              className="font-serif font-black text-lg sm:text-xl text-zinc-950 dark:text-zinc-50 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition leading-snug line-clamp-2"
            >
              {article.title}
            </Link>
            <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-xs text-zinc-500">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {article.authorName}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <RiTimeLine className="h-3 w-3" />
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <RiEyeLine className="h-3 w-3" />
                {article.views.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Vertical card (Magazine & Desk style)
  return (
    <article className="group flex flex-col justify-between h-full bg-white dark:bg-zinc-900/40 rounded-xl border border-zinc-200/80 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition shadow-2xs hover:shadow-xs">
      <div>
        {article.featuredImage && (
          <Link
            href={`/news/${article.slug}`}
            className="block overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 aspect-[16/10] mb-3.5 border border-zinc-200 dark:border-zinc-800"
          >
            <img
              src={article.featuredImage}
              alt={article.title}
              className="h-full w-full object-cover group-hover:scale-104 transition duration-500"
            />
          </Link>
        )}

        <div className="flex items-center gap-2 mb-2">
          {showCategory && (
            <span className="news-kicker text-blue-700 dark:text-blue-400">
              {article.categoryName}
            </span>
          )}
          {article.isBreaking && (
            <span className="news-kicker text-red-600">
              • Breaking
            </span>
          )}
        </div>

        <Link
          href={`/news/${article.slug}`}
          className="font-serif font-black text-base sm:text-lg text-zinc-950 dark:text-zinc-50 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition leading-snug line-clamp-2"
        >
          {article.title}
        </Link>

        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
        <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-[11px]">
          {article.authorName}
        </span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <RiTimeLine className="h-3 w-3 text-zinc-400" />
          <span>{formatDate(article.publishedAt || article.createdAt)}</span>
        </div>
      </div>
    </article>
  );
}
