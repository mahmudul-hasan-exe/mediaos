"use client";

import React from "react";
import Link from "next/link";
import { RiPlayFill, RiArrowRightLine } from "@remixicon/react";

interface CategoryBlockItem {
  id: string;
  title: string;
  image: string;
  slug: string;
  author: string;
  time: string;
  readingTime: string;
  hasVideo?: boolean;
}

interface CategoryBlock {
  id: string;
  name: string;
  slug: string;
  dotColor: string;
  items: CategoryBlockItem[];
}

const CATEGORY_BLOCKS: CategoryBlock[] = [
  {
    id: "cat-world",
    name: "World",
    slug: "world",
    dotColor: "bg-indigo-500",
    items: [
      {
        id: "w-1",
        title: "World leaders agree to set up new climate loss and damage facility",
        image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&auto=format&fit=crop&q=80",
        slug: "world-leaders-agree-new-climate-fund",
        author: "Nusrat Jahan",
        time: "4d ago",
        readingTime: "1 min read",
        hasVideo: false,
      },
      {
        id: "w-2",
        title: "Signs of progress in regional diplomatic and ceasefire dialogues",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80",
        slug: "signs-progress-middle-east-ceasefire-talks",
        author: "Rafiqul Islam",
        time: "4d ago",
        readingTime: "1 min read",
        hasVideo: false,
      },
    ],
  },
  {
    id: "cat-entertainment",
    name: "Entertainment",
    slug: "entertainment",
    dotColor: "bg-pink-500",
    items: [
      {
        id: "ent-1",
        title: "Audiences respond enthusiastically to new director's debut film teaser",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&auto=format&fit=crop&q=80",
        slug: "audiences-respond-enthusiastically-film-trailer",
        author: "Sabiha Khatun",
        time: "5d ago",
        readingTime: "1 min read",
        hasVideo: true,
      },
      {
        id: "ent-2",
        title: "Bangladeshi documentary film recognized at international festival",
        image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=80",
        slug: "bangladeshi-documentary-recognised-international-festival",
        author: "Arif Mahmud",
        time: "5d ago",
        readingTime: "1 min read",
        hasVideo: false,
      },
    ],
  },
  {
    id: "cat-technology",
    name: "Technology",
    slug: "technology",
    dotColor: "bg-cyan-500",
    items: [
      {
        id: "tech-1",
        title: "Autonomous agricultural drone developed by startup trialled in delta",
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&auto=format&fit=crop&q=80",
        slug: "video-farming-drone-local-startup-trialled",
        author: "Nusrat Jahan",
        time: "4d ago",
        readingTime: "1 min read",
        hasVideo: true,
      },
      {
        id: "tech-2",
        title: "New cybersecurity policy framework mandated for national payment systems",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&auto=format&fit=crop&q=80",
        slug: "cybersecurity-mandate-payment-systems",
        author: "Tanvir Ahmed",
        time: "4d ago",
        readingTime: "2 min read",
        hasVideo: false,
      },
    ],
  },
  {
    id: "cat-culture",
    name: "Culture & Opinion",
    slug: "culture-opinion",
    dotColor: "bg-amber-500",
    items: [
      {
        id: "cul-1",
        title: "The enduring heritage of classical riverside song and folklore traditions",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
        slug: "enduring-heritage-classical-folklore",
        author: "Farhana Yasmin",
        time: "3d ago",
        readingTime: "3 min read",
        hasVideo: false,
      },
      {
        id: "cul-2",
        title: "Editorial: Why public green reserves are critical for megacity mental wellbeing",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&auto=format&fit=crop&q=80",
        slug: "editorial-public-green-reserves-wellbeing",
        author: "Editorial Board",
        time: "4d ago",
        readingTime: "2 min read",
        hasVideo: false,
      },
    ],
  },
  {
    id: "cat-environment",
    name: "Environment",
    slug: "environment",
    dotColor: "bg-teal-500",
    items: [
      {
        id: "env-1",
        title: "Monsoon rainfall patterns shift across coastal and agricultural belts",
        image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&auto=format&fit=crop&q=80",
        slug: "video-steady-rain-drenches-city-weather-warning",
        author: "Video Desk",
        time: "4d ago",
        readingTime: "1 min read",
        hasVideo: true,
      },
      {
        id: "env-2",
        title: "Tiger population survey begins in Sundarbans with smart thermal sensors",
        image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&auto=format&fit=crop&q=80",
        slug: "tiger-census-begins-sundarbans-camera-traps",
        author: "Rafiqul Islam",
        time: "4d ago",
        readingTime: "1 min read",
        hasVideo: false,
      },
    ],
  },
  {
    id: "cat-special",
    name: "Special Reports",
    slug: "special-reports",
    dotColor: "bg-violet-500",
    items: [
      {
        id: "spec-1",
        title: "Investigative: How modern coastal embankments are resisting storm surges",
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80",
        slug: "investigative-coastal-embankments-resisting-storm-surges",
        author: "Investigation Team",
        time: "3d ago",
        readingTime: "4 min read",
        hasVideo: false,
      },
      {
        id: "spec-2",
        title: "The green transition: Inside the country's largest solar utility grid station",
        image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop&q=80",
        slug: "green-transition-inside-largest-solar-utility-grid",
        author: "Climate Desk",
        time: "5d ago",
        readingTime: "3 min read",
        hasVideo: true,
      },
    ],
  },
];

export function MultiCategoryGrid() {
  return (
    <section className="py-8 border-b border-zinc-100 dark:border-zinc-800/80">
      {/* Minimal Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 dark:bg-zinc-200" />
          <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Specialized Desks
          </h3>
          <span className="text-xs text-zinc-400 font-mono">06</span>
        </div>

        <Link
          href="/search"
          className="group flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition shrink-0"
        >
          <span>All desks</span>
          <RiArrowRightLine className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 3-Column Clean Desk Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {CATEGORY_BLOCKS.map((block) => (
          <div
            key={block.id}
            className="flex flex-col justify-between p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-900/10 hover:border-zinc-200 dark:hover:border-zinc-800 transition"
          >
            <div>
              {/* Desk Top Bar */}
              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-zinc-100 dark:border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${block.dotColor}`} />
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {block.name}
                  </h4>
                </div>
                <Link
                  href={`/category/${block.slug}`}
                  className="text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition flex items-center gap-1 group"
                >
                  <span>Desk</span>
                  <RiArrowRightLine className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* 2 Stories */}
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {block.items.map((item, idx) => (
                  <article
                    key={item.id}
                    className={`group flex items-start gap-3 ${
                      idx === 0 ? "pt-2 pb-3" : "pt-3"
                    }`}
                  >
                    <Link
                      href={`/news/${item.slug}`}
                      className="relative w-20 h-15 shrink-0 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-500"
                      />
                      {item.hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                          <div className="h-5 w-5 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow-xs">
                            <RiPlayFill className="h-3 w-3 ml-0.5" />
                          </div>
                        </div>
                      )}
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link href={`/news/${item.slug}`}>
                        <h5 className="text-xs font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug line-clamp-2">
                          {item.title}
                        </h5>
                      </Link>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-zinc-400">
                        <span className="truncate max-w-[85px]">{item.author}</span>
                        <span>·</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
