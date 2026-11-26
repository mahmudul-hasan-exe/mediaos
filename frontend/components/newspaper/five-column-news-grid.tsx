"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

export interface StoryItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  category?: string;
}

export interface FiveColumnNewsGridProps {
  title?: string;
  categorySlug?: string;
  deskNumber?: string;
  tabs?: string[];
  stories?: StoryItem[];
}

export const DEFAULT_SPORTS_STORIES: StoryItem[] = [
  {
    id: "sp-1",
    title: "Packers & Bengals win in style - NFL week nine highlights",
    excerpt:
      "The Chicago Bears and Denver Broncos grind out wins while Cincinnati Bengals and Green Bay Packers put on a show.",
    image:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&auto=format&fit=crop&q=80",
    slug: "packers-bengals-win-style-nfl-week-nine",
    category: "NFL",
  },
  {
    id: "sp-2",
    title: "Norris sparkles in Sao Paulo despite dramatic track challenge",
    excerpt:
      "Lando Norris was virtually impeccable during a Sao Paulo Grand Prix that challenged drivers to their absolute limit.",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80",
    slug: "norris-sparkles-sao-paulo-f1-grand-prix",
    category: "Formula 1",
  },
  {
    id: "sp-3",
    title: "Ali weeps as world title dream realised in Texas championship",
    excerpt:
      "Ramla Ali dedicated her win to her late father as she defeated Mikiah Kreps to become unified super-bantamweight champion.",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    slug: "ali-weeps-world-title-dream-texas",
    category: "Boxing",
  },
  {
    id: "sp-4",
    title: "What can you read into Premier League table after 10 matchdays?",
    excerpt:
      "With 10 games gone in the campaign, historical numbers show where the title race and relegation battle truly stand.",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80",
    slug: "what-to-read-into-premier-league-table-10-games",
    category: "Premier League",
  },
  {
    id: "sp-5",
    title: "USA and Pacific Islands to host 2030 World Cup tournament",
    excerpt:
      "The 2030 Rugby League World Cup tournament will be hosted across the Pacific rim with five host cities being finalized.",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
    slug: "usa-pacific-islands-host-2030-world-cup",
    category: "Rugby",
  },
];

export function FiveColumnNewsGrid({
  title = "Sports",
  categorySlug = "sports",
  deskNumber = "04",
  tabs = ["All", "Cricket", "Football", "F1 & Arena"],
  stories = DEFAULT_SPORTS_STORIES,
}: FiveColumnNewsGridProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0] || "All");

  return (
    <section className="py-8 border-b border-zinc-100 dark:border-zinc-800/80">
      {/* Minimal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-6 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
          <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {title}
          </h3>
          <span className="text-xs text-zinc-400 font-mono">
            {deskNumber}
          </span>
        </div>

        {/* Tab Filter & Link */}
        <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
          {tabs.length > 1 && (
            <div className="flex items-center gap-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1 text-xs rounded-full transition-all cursor-pointer select-none ${
                      isActive
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          )}

          <Link
            href={`/category/${categorySlug}`}
            className="group flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition shrink-0"
          >
            <span>View all</span>
            <RiArrowRightLine className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 5-Column Minimal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {stories.map((story) => (
          <article key={story.id} className="group flex flex-col justify-between">
            <div>
              <Link
                href={`/news/${story.slug}`}
                className="block overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 aspect-[16/10] mb-2.5"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </Link>

              {story.category && (
                <span className="text-[11px] font-medium text-zinc-400 block mb-1">
                  {story.category}
                </span>
              )}

              <Link href={`/news/${story.slug}`} className="block">
                <h4 className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug line-clamp-2">
                  {story.title}
                </h4>
              </Link>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal line-clamp-2">
                {story.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
