"use client";

import React from "react";
import Link from "next/link";
import { NewsArticle } from "@/types";
import { LatestSidebarWidget } from "./latest-sidebar-widget";
import { RiPlayFill } from "@remixicon/react";

interface PortalHeroSectionProps {
  articles: NewsArticle[];
}

export function PortalHeroSection({ articles }: PortalHeroSectionProps) {
  const lead = articles[0] || {
    id: "lead-1",
    title: "Global Leaders Reach Historic Accord on Autonomous AI Governance Frameworks",
    slug: "global-leaders-historic-accord-autonomous-ai-governance",
    excerpt:
      "In a groundbreaking summit concluding today, international negotiators codified landmark treaties governing high-capability autonomous systems, mandating verifiable provenance and safety certifications.",
    featuredImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    categoryName: "Technology",
    authorName: "Sarah Jenkins",
    publishedAt: "Today",
  };

  const secondaryStories = articles.slice(1, 3);

  return (
    <section className="pb-10 border-b border-zinc-100 dark:border-zinc-800/80">
      {/* Minimal Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
            Top Stories
          </h2>
        </div>
        <span className="text-xs text-zinc-400 font-light">
          Today's Edition
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left 8 Cols: Lead Story + 2 Sub-Leads */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          {/* Main Primary Lead Story */}
          <article className="group mb-8">
            <Link
              href={`/news/${lead.slug}`}
              className="block relative aspect-[16/9] sm:aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-4"
            >
              <img
                src={lead.featuredImage}
                alt={lead.title}
                className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
            </Link>

            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
                <span>{lead.categoryName || "Lead Story"}</span>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
                <span className="text-zinc-400 font-normal">2 min read</span>
              </div>

              <Link href={`/news/${lead.slug}`} className="block">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug tracking-tight">
                  {lead.title}
                </h3>
              </Link>

              <p className="mt-2 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal line-clamp-3">
                {lead.excerpt}
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                  {lead.authorName || "Editorial Desk"}
                </span>
                <span>·</span>
                <span>Today</span>
              </div>
            </div>
          </article>

          {/* 2 Sub-Leads in Clean 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-100 dark:border-zinc-800/80">
            {secondaryStories.map((story) => (
              <article key={story.id} className="group flex flex-col justify-between">
                <div>
                  <Link
                    href={`/news/${story.slug}`}
                    className="block relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-3"
                  >
                    <img
                      src={story.featuredImage}
                      alt={story.title}
                      className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                  </Link>

                  <div className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                    <span>{story.categoryName}</span>
                    <span className="text-zinc-300 dark:text-zinc-700">·</span>
                    <span className="text-zinc-400 font-normal">1 min read</span>
                  </div>

                  <Link href={`/news/${story.slug}`} className="block">
                    <h4 className="text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug line-clamp-2">
                      {story.title}
                    </h4>
                  </Link>

                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 font-normal">
                    {story.excerpt}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2 text-[11px] text-zinc-400">
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                    {story.authorName}
                  </span>
                  <span>·</span>
                  <span>4d ago</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right 4 Cols: Minimal Latest Feed with clean left border */}
        <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-zinc-100 lg:dark:border-zinc-800/80">
          <LatestSidebarWidget />
        </div>
      </div>
    </section>
  );
}
