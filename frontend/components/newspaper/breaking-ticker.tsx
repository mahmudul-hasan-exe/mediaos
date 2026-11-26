"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NewsArticle } from "@/types";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react";

interface BreakingTickerProps {
  articles: NewsArticle[];
}

export function BreakingTicker({ articles }: BreakingTickerProps) {
  const breakingList = articles.filter((a) => a.isBreaking);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (breakingList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [breakingList.length]);

  if (breakingList.length === 0) return null;
  const current = breakingList[currentIndex];

  return (
    <div className="w-full border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/30 py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Minimal Live Indicator Badge */}
          <div className="flex items-center gap-1.5 shrink-0 text-red-600 dark:text-red-400 font-medium text-xs tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            <span>Live Dispatch</span>
          </div>

          <span className="text-zinc-300 dark:text-zinc-700 font-light hidden sm:inline">/</span>

          <Link
            href={`/news/${current.slug}`}
            className="truncate text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-400 transition"
          >
            {current.title}
          </Link>
        </div>

        {breakingList.length > 1 && (
          <div className="flex items-center gap-2 shrink-0 text-zinc-400 dark:text-zinc-500 text-xs">
            <span className="text-[11px] font-mono hidden sm:inline">
              {currentIndex + 1} / {breakingList.length}
            </span>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev - 1 + breakingList.length) % breakingList.length)
                }
                className="p-1 rounded-md hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
                aria-label="Previous dispatch"
              >
                <RiArrowLeftSLine className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % breakingList.length)}
                className="p-1 rounded-md hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
                aria-label="Next dispatch"
              >
                <RiArrowRightSLine className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
