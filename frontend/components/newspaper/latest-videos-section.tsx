"use client";

import React from "react";
import Link from "next/link";
import { RiPlayFill, RiArrowRightLine } from "@remixicon/react";

interface VideoCardItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  author: string;
  time: string;
  readingTime: string;
  duration: string;
}

const LATEST_VIDEOS: VideoCardItem[] = [
  {
    id: "vid-1",
    category: "Politics",
    title: "Election night in the newsroom as the verified results come in",
    excerpt:
      "Reporters and editors work through counting night; our cameras caught the preparations and early returns from key constituencies.",
    image:
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop&q=80",
    slug: "video-election-night-newsroom-results",
    author: "Video Desk",
    time: "4d ago",
    readingTime: "1 min read",
    duration: "04:15",
  },
  {
    id: "vid-2",
    category: "National",
    title: "Morning gridlock leaves the city crawling as commuters sit for hours",
    excerpt:
      "Long queues of vehicles build up on main roads at rush hour. Traffic police test real-time lane diversion protocols.",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    slug: "video-morning-gridlock-leaves-city-crawling",
    author: "Video Desk",
    time: "4d ago",
    readingTime: "1 min read",
    duration: "03:42",
  },
  {
    id: "vid-3",
    category: "Sports",
    title: "Batters dominate the nets, cover drives all around the stadium ground",
    excerpt:
      "Top-order batters caught the eye in pre-match practice; the head coach confirms the rhythm is back ahead of the opening fixture.",
    image:
      "https://images.unsplash.com/photo-1531415074868-036b107e7742?w=800&auto=format&fit=crop&q=80",
    slug: "video-batters-dominate-nets-cover-drives",
    author: "Sports Desk",
    time: "4d ago",
    readingTime: "1 min read",
    duration: "05:20",
  },
];

export function LatestVideosSection() {
  return (
    <section className="py-8 border-b border-zinc-100 dark:border-zinc-800/80">
      {/* Minimal Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
          <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Latest Videos
          </h3>
          <span className="text-xs text-zinc-400 font-mono">05</span>
        </div>

        <Link
          href="/category/multimedia"
          className="group flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition shrink-0"
        >
          <span>All videos</span>
          <RiArrowRightLine className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 3-Column Minimal Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LATEST_VIDEOS.map((item) => (
          <article key={item.id} className="group flex flex-col justify-between">
            <div>
              <Link
                href={`/news/${item.slug}`}
                className="block relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />

                {/* Frosted Minimal Play Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/10 transition">
                  <div className="h-11 w-11 rounded-full bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-900 dark:text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <RiPlayFill className="h-5 w-5 ml-0.5 text-red-600" />
                  </div>
                </div>

                {/* Minimal Duration Pill in Bottom Right */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                  {item.duration}
                </div>
              </Link>

              <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-1">
                <span className="text-zinc-800 dark:text-zinc-200">{item.category}</span>
                <span>·</span>
                <span>{item.duration}</span>
              </div>

              <Link href={`/news/${item.slug}`} className="block">
                <h4 className="text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug line-clamp-2">
                  {item.title}
                </h4>
              </Link>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal line-clamp-2">
                {item.excerpt}
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-zinc-400">
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                {item.author}
              </span>
              <span>·</span>
              <span>{item.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
