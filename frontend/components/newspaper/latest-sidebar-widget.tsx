"use client";

import React from "react";
import Link from "next/link";
import { RiArrowRightLine, RiPlayFill } from "@remixicon/react";

interface LatestItem {
  id: string;
  title: string;
  image: string;
  slug: string;
  author: string;
  time: string;
  readingTime: string;
  hasVideo?: boolean;
}

const LATEST_ITEMS: LatestItem[] = [
  {
    id: "lat-1",
    title: "Batters dominate the nets, cover drives all around the ground",
    image:
      "https://images.unsplash.com/photo-1531415074868-036b107e7742?w=400&auto=format&fit=crop&q=80",
    slug: "video-batters-dominate-nets-cover-drives",
    author: "Sports Desk",
    time: "1h ago",
    readingTime: "1 min",
    hasVideo: true,
  },
  {
    id: "lat-2",
    title: "Quiz: How well do you know Bangladesh cricket records?",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&auto=format&fit=crop&q=80",
    slug: "quiz-how-well-do-you-know-bangladesh-cricket",
    author: "Sports Desk",
    time: "2h ago",
    readingTime: "2 min",
    hasVideo: false,
  },
  {
    id: "lat-3",
    title: "Major changes to the school curriculum due to begin next session",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80",
    slug: "major-changes-school-curriculum-announced",
    author: "Arif Mahmud",
    time: "3h ago",
    readingTime: "1 min",
    hasVideo: false,
  },
  {
    id: "lat-4",
    title: "Steady rain drenches the city as the weather office issues warning",
    image:
      "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&auto=format&fit=crop&q=80",
    slug: "video-steady-rain-drenches-city-weather-warning",
    author: "Video Desk",
    time: "4h ago",
    readingTime: "1 min",
    hasVideo: true,
  },
  {
    id: "lat-5",
    title: "Tiger census begins in the Sundarbans using advanced camera traps",
    image:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&auto=format&fit=crop&q=80",
    slug: "tiger-census-begins-sundarbans-camera-traps",
    author: "Rafiqul Islam",
    time: "5h ago",
    readingTime: "2 min",
    hasVideo: false,
  },
];

export function LatestSidebarWidget() {
  return (
    <aside className="h-full flex flex-col justify-between">
      <div>
        {/* Minimal Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Live Feed
            </h4>
          </div>
          <Link
            href="/search"
            className="text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition flex items-center gap-1 group"
          >
            <span>All updates</span>
            <RiArrowRightLine className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Minimal Item List */}
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
          {LATEST_ITEMS.map((item, index) => (
            <article key={item.id} className="py-3.5 first:pt-0 last:pb-0 group">
              <Link href={`/news/${item.slug}`} className="block">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-zinc-300 dark:text-zinc-600 font-light pt-0.5 select-none shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug line-clamp-2">
                      {item.title}
                    </h5>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-400 dark:text-zinc-500">
                      <span>{item.time}</span>
                      <span>·</span>
                      <span>{item.author}</span>
                      {item.hasVideo && (
                        <>
                          <span>·</span>
                          <span className="inline-flex items-center gap-0.5 text-zinc-500">
                            <RiPlayFill className="h-2.5 w-2.5 text-blue-500" /> Video
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
