"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RiPlayFill,
  RiPauseFill,
  RiArrowRightLine,
} from "@remixicon/react";

export function PodcastBannerSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-8">
      {/* Minimal Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Audio Briefings
          </h3>
          <span className="text-xs text-zinc-400 font-mono">09</span>
        </div>

        <Link
          href="/category/multimedia"
          className="group flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition shrink-0"
        >
          <span>All episodes</span>
          <RiArrowRightLine className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Minimal Modern Audio Player Card */}
      <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 sm:p-6 transition">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left Audio Details */}
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            {/* Play Trigger Circle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-12 w-12 rounded-full bg-zinc-900 dark:bg-white hover:bg-blue-600 dark:hover:bg-blue-500 text-white dark:text-zinc-900 hover:text-white dark:hover:text-white flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              aria-label={isPlaying ? "Pause podcast" : "Play podcast"}
            >
              {isPlaying ? (
                <RiPauseFill className="h-5 w-5" />
              ) : (
                <RiPlayFill className="h-5 w-5 ml-0.5" />
              )}
            </button>

            {/* Title & Metadata */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-0.5">
                <span className="text-blue-600 dark:text-blue-400 font-medium">EPISODE 42</span>
                <span>·</span>
                <span>28:10</span>
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                Weekly Analysis: Fiscal Reforms & Inflation Trajectory
              </h4>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                Hosted by Tanvir Ahmed with chief economics correspondent Rafiqul Islam.
              </p>
            </div>
          </div>

          {/* Right Visualizer & Button */}
          <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end border-t border-zinc-200/60 dark:border-zinc-800/60 md:border-t-0 pt-3 md:pt-0">
            {/* Minimal Sound Wave Animation */}
            <div className="flex items-end gap-1 h-5">
              {[35, 65, 25, 85, 50, 95, 40, 75, 45, 60].map((height, i) => (
                <span
                  key={i}
                  className={`w-0.5 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${
                    isPlaying ? "opacity-100" : "opacity-30"
                  }`}
                  style={{
                    height: isPlaying ? `${height}%` : "30%",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
            >
              {isPlaying ? "Pause audio" : "Listen now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
