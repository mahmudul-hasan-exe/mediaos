"use client";

import React from "react";
import { RiArrowRightUpLine } from "@remixicon/react";
import { mediaosToast } from "@/stores/mediaos-toast-store";

interface AdBannerProps {
  zone: "header_leaderboard" | "sidebar_square" | "in_article" | "article_inline" | "homepage_middle";
  className?: string;
}

export function AdBanner({ zone, className }: AdBannerProps) {
  if (zone === "header_leaderboard") {
    return (
      <div className={`w-full max-w-4xl mx-auto my-4 ${className || ""}`}>
        <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/20 px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-0.5">
              Partner
            </span>
            <p className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">MediaOS Cloud</span> — Modern infrastructure for digital newsrooms and publishing teams.
            </p>
          </div>
          <button
            onClick={() => mediaosToast.info("Partner spotlight: MediaOS Cloud infrastructure showcase.")}
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition shrink-0 group cursor-pointer"
          >
            <span>Learn more</span>
            <RiArrowRightUpLine className="h-3.5 w-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  if (zone === "sidebar_square") {
    return (
      <div className={`rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/20 p-4 text-left ${className || ""}`}>
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono block mb-2">
          Partner Spotlight
        </span>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Apex Global CDN
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
            Ultra-fast edge routing and intelligent media caching built for modern publishers.
          </p>
          <button
            onClick={() => mediaosToast.info("Partner spotlight: Apex Global CDN edge routing.")}
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition pt-1 cursor-pointer"
          >
            <span>Explore network</span>
            <RiArrowRightUpLine className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
