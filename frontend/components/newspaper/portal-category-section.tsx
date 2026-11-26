"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiPlayFill, RiArrowRightLine } from "@remixicon/react";

export interface CategoryArticle {
  id: string;
  category: string;
  subcategory?: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  author: string;
  time: string;
  readingTime: string;
  hasVideo?: boolean;
}

export interface PortalCategorySectionProps {
  title: string;
  categorySlug: string;
  deskNumber?: string;
  accentColor?: "blue" | "red" | "emerald" | "indigo" | "amber" | "purple";
  tabs?: string[];
  articles: CategoryArticle[];
  layout?: "split" | "grid";
}

export function PortalCategorySection({
  title,
  categorySlug,
  deskNumber = "01",
  accentColor = "blue",
  tabs = ["All"],
  articles,
  layout = "grid",
}: PortalCategorySectionProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0] || "All");

  const dotColors = {
    blue: "bg-blue-600",
    red: "bg-red-600",
    emerald: "bg-emerald-600",
    indigo: "bg-indigo-600",
    amber: "bg-amber-600",
    purple: "bg-purple-600",
  }[accentColor];

  const filteredArticles =
    activeTab === "All"
      ? articles
      : articles.filter(
          (item) => item.subcategory?.toLowerCase() === activeTab.toLowerCase()
        );

  const displayArticles = filteredArticles.length > 0 ? filteredArticles : articles;
  const leadStory = displayArticles[0];
  const sideStories = displayArticles.slice(1);

  return (
    <section className="py-8 border-b border-zinc-100 dark:border-zinc-800/80">
      {/* Minimal Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-6 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <span className={`h-1.5 w-1.5 rounded-full ${dotColors}`} />
          <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {title}
          </h3>
          <span className="text-xs text-zinc-400 font-mono">
            {deskNumber}
          </span>
        </div>

        {/* Filter Tabs & Link */}
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

      {/* Layout Option 1: Minimalist Split (Lead Feature + Clean Side Stack) */}
      {layout === "split" && leadStory ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Prominent Lead Story (7 cols) */}
          <div className="lg:col-span-7">
            <article className="group flex flex-col justify-between h-full">
              <div>
                <Link
                  href={`/news/${leadStory.slug}`}
                  className="block relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-4"
                >
                  <img
                    src={leadStory.image}
                    alt={leadStory.title}
                    className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                  {leadStory.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/10 transition">
                      <div className="h-10 w-10 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-xs text-zinc-900 dark:text-white flex items-center justify-center shadow-sm">
                        <RiPlayFill className="h-5 w-5 ml-0.5 text-blue-600" />
                      </div>
                    </div>
                  )}
                </Link>

                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-1.5">
                  <span className="text-zinc-800 dark:text-zinc-200">
                    {leadStory.subcategory || leadStory.category}
                  </span>
                  <span>·</span>
                  <span>{leadStory.readingTime}</span>
                </div>

                <Link href={`/news/${leadStory.slug}`} className="block">
                  <h4 className="text-lg sm:text-xl font-medium text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug">
                    {leadStory.title}
                  </h4>
                </Link>

                <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal line-clamp-3">
                  {leadStory.excerpt}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                  {leadStory.author}
                </span>
                <span>·</span>
                <span>{leadStory.time}</span>
              </div>
            </article>
          </div>

          {/* Clean Side Stack (5 cols) */}
          <div className="lg:col-span-5 lg:pl-6 lg:border-l lg:border-zinc-100 lg:dark:border-zinc-800/80 divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {sideStories.map((story) => (
              <article key={story.id} className="py-4 first:pt-0 last:pb-0 group flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-medium text-zinc-400 block mb-1">
                    {story.subcategory || story.category}
                  </span>
                  <Link href={`/news/${story.slug}`} className="block">
                    <h5 className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug line-clamp-2">
                      {story.title}
                    </h5>
                  </Link>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {story.excerpt}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-zinc-400">
                    <span>{story.author}</span>
                    <span>·</span>
                    <span>{story.time}</span>
                  </div>
                </div>

                <Link
                  href={`/news/${story.slug}`}
                  className="relative w-24 h-18 sm:w-28 sm:h-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800"
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                  {story.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                      <div className="h-6 w-6 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow">
                        <RiPlayFill className="h-3.5 w-3.5 ml-0.5" />
                      </div>
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      ) : (
        /* Layout Option 2: 3-Column Minimal Editorial Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayArticles.map((story) => (
            <article key={story.id} className="group flex flex-col justify-between">
              <div>
                <Link
                  href={`/news/${story.slug}`}
                  className="block relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-3"
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full object-cover group-hover:scale-[1.02] transition duration-500"
                  />
                  {story.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/10 transition">
                      <div className="h-9 w-9 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-xs text-blue-600 flex items-center justify-center shadow">
                        <RiPlayFill className="h-4 w-4 ml-0.5" />
                      </div>
                    </div>
                  )}
                </Link>

                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-1">
                  <span className="text-zinc-800 dark:text-zinc-200">
                    {story.subcategory || story.category}
                  </span>
                  <span>·</span>
                  <span>{story.readingTime}</span>
                </div>

                <Link href={`/news/${story.slug}`} className="block">
                  <h4 className="text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug line-clamp-2">
                    {story.title}
                  </h4>
                </Link>

                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal line-clamp-2">
                  {story.excerpt}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-zinc-400">
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                  {story.author}
                </span>
                <span>·</span>
                <span>{story.time}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
