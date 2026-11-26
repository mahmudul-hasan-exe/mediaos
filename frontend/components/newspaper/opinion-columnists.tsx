"use client";

import React from "react";
import Link from "next/link";
import { RiArrowRightLine, RiPenNibLine } from "@remixicon/react";

export function OpinionColumnists() {
  const columnists = [
    {
      id: "col-1",
      name: "Dr. Elena Rostova",
      role: "Geopolitical Strategist, Geneva",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
      headline: "The Illusion of Multilateral Peace in an Era of Algorithmic Warfare",
      slug: "illusion-of-multilateral-peace",
    },
    {
      id: "col-2",
      name: "Marcus Vance",
      role: "Chief Economics Editor, London",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      headline: "Why Sovereign Debt Restructuring Is Facing an Unprecedented Liquidity Crunch",
      slug: "sovereign-debt-restructuring",
    },
    {
      id: "col-3",
      name: "Amina Al-Mansoor",
      role: "Frontier Tech Fellow, Oxford",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      headline: "Silicon Sovereignty: Can Developing Nations Build Their Own Foundation Models?",
      slug: "silicon-sovereignty-foundation-models",
    },
    {
      id: "col-4",
      name: "Prof. Tariq Rahman",
      role: "Climate Resilience Chair, Singapore",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
      headline: "The Hidden Carbon Balance of Generative AI Data Centers",
      slug: "hidden-carbon-balance-ai",
    },
  ];

  return (
    <section className="py-6 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-900 dark:border-zinc-100 mb-6">
        <div className="flex items-center gap-2">
          <RiPenNibLine className="h-5 w-5 text-blue-700 dark:text-blue-400" />
          <h3 className="font-serif font-black text-2xl text-zinc-950 dark:text-zinc-50 tracking-tight">
            Opinion & Editorial Guest Essays
          </h3>
        </div>
        <Link
          href="/category/culture-opinion"
          className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 uppercase tracking-wider"
        >
          <span>All Opinions</span>
          <RiArrowRightLine className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 dark:divide-zinc-800">
        {columnists.map((col, idx) => (
          <article
            key={col.id}
            className={`group flex flex-col justify-between pt-4 sm:pt-0 ${
              idx > 0 ? "sm:pl-6" : ""
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={col.avatar}
                  alt={col.name}
                  className="h-11 w-11 rounded-full object-cover border border-zinc-200 dark:border-zinc-800 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition truncate">
                    {col.name}
                  </h4>
                  <p className="text-[10px] text-zinc-400 truncate">{col.role}</p>
                </div>
              </div>

              <Link href={`/news/${col.slug}`} className="block">
                <h5 className="font-serif italic font-bold text-sm sm:text-base text-zinc-950 dark:text-zinc-50 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                  "{col.headline}"
                </h5>
              </Link>
            </div>

            <div className="mt-4 pt-2 text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Editorial Essay
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
