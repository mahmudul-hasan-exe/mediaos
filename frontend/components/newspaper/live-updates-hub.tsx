"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RiBroadcastLine,
  RiTimeLine,
  RiArrowRightLine,
  RiRefreshLine,
  RiFlashlightFill,
  RiShareForwardLine,
} from "@remixicon/react";

interface LiveUpdateItem {
  id: string;
  time: string;
  title: string;
  summary: string;
  author: string;
  isKeyDevelopment?: boolean;
}

export function LiveUpdatesHub() {
  const [activeFilter, setActiveFilter] = useState<"all" | "key">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const updates: LiveUpdateItem[] = [
    {
      id: "up-1",
      time: "10 mins ago",
      title: "Geneva Plenary votes 64–4 in favor of Autonomous Compute Liability Treaty",
      summary:
        "Negotiators finalize text establishing criminal and civil liability for autonomous model failures operating within critical municipal infrastructure.",
      author: "Eleanor Vance, Diplomatic Correspondent",
      isKeyDevelopment: true,
    },
    {
      id: "up-2",
      time: "24 mins ago",
      title: "European Central Bank issues guidance on cryptographic reserve audits",
      summary:
        "Frankfurt regulators affirm sovereign liquidity requirements for algorithmic trading houses ahead of tomorrow's market opening.",
      author: "Marcus Vance, Chief Economics Editor",
      isKeyDevelopment: false,
    },
    {
      id: "up-3",
      time: "48 mins ago",
      title: "Delegations from 12 emerging economies sign Sovereign Technology Compact",
      summary:
        "The bilateral agreement pledges shared cloud infrastructure and foundational model weights for agricultural resilience.",
      author: "Amina Al-Mansoor, Oxford Tech Fellow",
      isKeyDevelopment: true,
    },
    {
      id: "up-4",
      time: "1 hour ago",
      title: "UN Secretary General addresses closing session: 'A landmark for institutional trust'",
      summary:
        "The Secretary General underscored that multilateral governance must continually match the exponential compute expansion across private labs.",
      author: "United Nations Bureau",
      isKeyDevelopment: false,
    },
  ];

  const filteredUpdates =
    activeFilter === "key"
      ? updates.filter((u) => u.isKeyDevelopment)
      : updates;

  const handleCopyLink = (id: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/#${id}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section className="py-6 border-b border-zinc-200 dark:border-zinc-800">
      <div className="rounded-2xl border-2 border-red-500/20 dark:border-red-500/30 bg-white dark:bg-zinc-900/60 p-5 sm:p-7 shadow-xs">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="news-kicker text-red-600 dark:text-red-400">
                  Developing Now • Live Wire
                </span>
                <span className="text-[10px] font-mono text-zinc-400">• Updated every 2m</span>
              </div>
              <h3 className="font-serif font-black text-xl sm:text-2xl text-zinc-950 dark:text-zinc-50 tracking-tight mt-0.5">
                Global Summit on Autonomous Intelligence Governance
              </h3>
            </div>
          </div>

          {/* Filter Pills & Live indicator */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5 bg-zinc-100 dark:bg-zinc-800 text-xs">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  activeFilter === "all"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs font-bold"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                All Updates ({updates.length})
              </button>
              <button
                onClick={() => setActiveFilter("key")}
                className={`px-2.5 py-1 rounded-md font-semibold transition flex items-center gap-1 ${
                  activeFilter === "key"
                    ? "bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 shadow-2xs font-bold"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                <RiFlashlightFill className="h-3 w-3 text-red-500" />
                <span>Key Events (2)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Timeline Stream */}
        <div className="mt-6 relative pl-6 sm:pl-8 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-red-200 dark:before:bg-red-950">
          <div className="space-y-6">
            {filteredUpdates.map((item) => (
              <div key={item.id} className="relative group" id={item.id}>
                {/* Timeline node */}
                <span
                  className={`absolute -left-6 sm:-left-8 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-zinc-900 ${
                    item.isKeyDevelopment
                      ? "bg-red-600 ring-2 ring-red-400/30"
                      : "bg-zinc-400 dark:bg-zinc-600"
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                      <RiTimeLine className="h-3 w-3" />
                      {item.time}
                    </span>
                    {item.isKeyDevelopment && (
                      <span className="text-[9px] font-extrabold uppercase tracking-wider bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 px-1.5 py-0.2 rounded">
                        Key Point
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-zinc-400">{item.author}</span>
                </div>

                <h4 className="mt-1 font-serif font-bold text-base sm:text-lg text-zinc-950 dark:text-zinc-50 leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition">
                  {item.title}
                </h4>

                <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                  {item.summary}
                </p>

                <div className="mt-2.5 flex items-center gap-3 text-xs">
                  <button
                    onClick={() => handleCopyLink(item.id)}
                    className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition font-medium"
                  >
                    <RiShareForwardLine className="h-3 w-3" />
                    <span>{copiedId === item.id ? "Link Copied" : "Share Point"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Jump Bar */}
        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
          <span className="text-zinc-500 font-medium">
            Live editorial reporting by Geneva Bureau & Tech Policy Desk
          </span>
          <Link
            href="/category/world"
            className="font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
          >
            <span>Full Coverage Dossier</span>
            <RiArrowRightLine className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

