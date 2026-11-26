"use client";

import React from "react";
import Link from "next/link";
import { RiPlayFill, RiArrowRightLine } from "@remixicon/react";

interface ShortItem {
  id: string;
  title: string;
  image: string;
  slug: string;
  hasVideo?: boolean;
  views: string;
}

const SHORTS_STORIES: ShortItem[] = [
  {
    id: "sh-1",
    title: "Schedule announced for the capital's new metro line",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&auto=format&fit=crop&q=80",
    slug: "schedule-announced-for-capital-new-metro-line",
    hasVideo: false,
    views: "18k",
  },
  {
    id: "sh-2",
    title: "Election night inside the newsroom as verified results count begins",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=500&auto=format&fit=crop&q=80",
    slug: "video-election-night-newsroom-results",
    hasVideo: true,
    views: "32k",
  },
  {
    id: "sh-3",
    title: "Morning gridlock leaves the city crawling as commuters sit",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80",
    slug: "video-morning-gridlock-leaves-city-crawling",
    hasVideo: true,
    views: "45k",
  },
  {
    id: "sh-4",
    title: "Dengue cases rise, hospitals prepare extra medical facilities",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=80",
    slug: "dengue-cases-rise-hospitals-prepare-extra-beds",
    hasVideo: false,
    views: "12k",
  },
  {
    id: "sh-5",
    title: "Flood situation improves, relief efforts stepped up across districts",
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=500&auto=format&fit=crop&q=80",
    slug: "flood-situation-improves-relief-efforts-stepped-up",
    hasVideo: false,
    views: "27k",
  },
  {
    id: "sh-6",
    title: "Batters dominate the nets, cover drives all around the ground",
    image: "https://images.unsplash.com/photo-1531415074868-036b107e7742?w=500&auto=format&fit=crop&q=80",
    slug: "video-batters-dominate-nets-cover-drives",
    hasVideo: true,
    views: "64k",
  },
];

export function ShortsSection() {
  return (
    <section className="py-8 border-b border-zinc-100 dark:border-zinc-800/80">
      {/* Minimal Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
          <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Shorts & Stories
          </h3>
          <span className="text-xs text-zinc-400 font-mono">07</span>
        </div>

        <Link
          href="/category/multimedia"
          className="group flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition shrink-0"
        >
          <span>All reels</span>
          <RiArrowRightLine className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 6 Vertical Minimal Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 sm:gap-4">
        {SHORTS_STORIES.map((item) => (
          <article key={item.id} className="group">
            <Link
              href={`/news/${item.slug}`}
              className="block relative aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 shadow-2xs group-hover:shadow-md transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out opacity-90"
              />

              {/* Minimal gradient scrim for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Top views pill */}
              <div className="absolute top-2.5 left-2.5 text-white/90 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs">
                {item.views}
              </div>

              {/* Play icon */}
              {item.hasVideo && (
                <div className="absolute top-2.5 right-2.5 h-6 w-6 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center">
                  <RiPlayFill className="h-3 w-3 ml-0.5" />
                </div>
              )}

              {/* Bottom Title */}
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-white text-xs font-medium leading-snug line-clamp-3">
                  {item.title}
                </h4>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
