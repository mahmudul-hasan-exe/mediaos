"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiPlayFill } from "@remixicon/react";

interface NationalArticle {
  id: string;
  category: string;
  subcategory: "All" | "Dhaka city" | "Countrywide";
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  author: string;
  time: string;
  readingTime: string;
  hasVideo?: boolean;
}

const NATIONAL_STORIES: NationalArticle[] = [
  {
    id: "nat-1",
    category: "National",
    subcategory: "Dhaka city",
    title: "Schedule announced for the capital's new metro line",
    excerpt:
      "Services on the new metro line will begin in phases to ease commuter congestion across the central business district.",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    slug: "schedule-announced-for-capital-new-metro-line",
    author: "Rafiqul Islam",
    time: "4 d ago",
    readingTime: "1 min read",
    hasVideo: false,
  },
  {
    id: "nat-2",
    category: "National",
    subcategory: "Dhaka city",
    title: "Video: Morning gridlock leaves the city crawling as commuters sit for hours",
    excerpt:
      "Long queues of vehicles build up on main roads at rush hour as traffic police test real-time lane diversion protocols.",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    slug: "video-morning-gridlock-leaves-city-crawling",
    author: "Video Desk",
    time: "4 d ago",
    readingTime: "1 min read",
    hasVideo: true,
  },
  {
    id: "nat-3",
    category: "National",
    subcategory: "Countrywide",
    title: "Flood situation improves, relief efforts ordered stepped up",
    excerpt:
      "Although water is receding in low-lying areas, authorities have ordered round-the-clock medical supplies and emergency rations.",
    image:
      "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80",
    slug: "flood-situation-improves-relief-efforts-stepped-up",
    author: "Sabiha Khatun",
    time: "4 d ago",
    readingTime: "1 min read",
    hasVideo: false,
  },
];

export function NationalNewsSection() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", "Dhaka city", "Countrywide"];

  const filteredStories =
    activeTab === "All"
      ? NATIONAL_STORIES
      : NATIONAL_STORIES.filter((item) => item.subcategory === activeTab);

  return (
    <section className="py-6 border-b border-zinc-200 dark:border-zinc-800">
      {/* Top Header Bar Matching Screenshot */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-blue-600 rounded-xs inline-block shrink-0" />
          <h3 className="font-sans font-black text-2xl text-zinc-950 dark:text-zinc-50 tracking-tight">
            National
          </h3>
        </div>
        <Link
          href="/category/world"
          className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
        >
          See more &gt;
        </Link>
      </div>

      {/* Subcategory Filter Tabs */}
      <div className="flex items-center gap-6 border-b border-zinc-200 dark:border-zinc-800 mt-2 mb-6 text-sm font-medium">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2.5 transition relative cursor-pointer select-none ${
                isActive
                  ? "text-zinc-950 dark:text-zinc-50 font-bold border-b-2 border-blue-600 -mb-[1px]"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 3-Column Card Grid Matching Screenshot Exactly */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <article
            key={story.id}
            className="group flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200/90 dark:border-zinc-800 shadow-2xs hover:shadow-xs transition"
          >
            <div>
              {/* Card Image with Optional Play Button */}
              <Link
                href={`/news/${story.slug}`}
                className="block relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover group-hover:scale-104 transition duration-300"
                />
                {story.hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition">
                    <div className="h-12 w-12 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      <RiPlayFill className="h-6 w-6 ml-0.5" />
                    </div>
                  </div>
                )}
              </Link>

              {/* Card Body */}
              <div className="p-4 sm:p-5">
                <span className="bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-xs inline-block mb-3 uppercase tracking-wider">
                  {story.category}
                </span>

                <Link href={`/news/${story.slug}`} className="block">
                  <h4 className="font-sans font-bold text-base sm:text-[17px] text-zinc-950 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug line-clamp-2">
                    {story.title}
                  </h4>
                </Link>

                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans line-clamp-2">
                  {story.excerpt}
                </p>
              </div>
            </div>

            {/* Card Footer Byline & Time */}
            <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center gap-2 text-xs text-zinc-500 font-sans">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {story.author}
              </span>
              <span>•</span>
              <span>{story.time}</span>
              <span>•</span>
              <span>{story.readingTime}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

