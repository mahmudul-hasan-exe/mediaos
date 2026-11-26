"use client";

import React from "react";
import Link from "next/link";
import {
  RiShieldCheckLine,
  RiCloseCircleLine,
  RiAlertLine,
  RiCheckboxCircleLine,
  RiArrowRightLine,
} from "@remixicon/react";

interface FactCheckItem {
  id: string;
  claim: string;
  source: string;
  verdict: "true" | "false" | "misleading";
  verdictLabel: string;
  explanation: string;
  investigator: string;
  date: string;
  tags: string[];
}

export function FactCheckDesk() {
  const factChecks: FactCheckItem[] = [
    {
      id: "fc-1",
      claim:
        "Viral video claims central banks launched an emergency algorithmic shutdown of digital payment rails.",
      source: "Circulating across X & TikTok with 4.2M views",
      verdict: "false",
      verdictLabel: "Fabricated / Deepfake",
      explanation:
        "Forensic audio analysis revealed the voice was synthesized using an open-source diffusion model. The European Central Bank confirmed no disruptions occurred, and payment rails operated at 100% uptime.",
      investigator: "MediaOS Synthetic Media Forensic Unit",
      date: "Today, 11:30 AM",
      tags: ["Deepfake", "Central Banking", "AI Forensics"],
    },
    {
      id: "fc-2",
      claim:
        "A photo shows sovereign compute clusters completely flooded during recent Alpine storm runoff.",
      source: "Social media posts citing alleged satellite imagery",
      verdict: "misleading",
      verdictLabel: "Missing Context",
      explanation:
        "The image is authentic from 2021 agricultural runoff in Austria, unrelated to the newly built Zurich data campuses which are situated in subterranean waterproof bunker complexes.",
      investigator: "Satellite Verification & Geolocation Desk",
      date: "Yesterday",
      tags: ["Geolocation", "Infrastructure", "Misleading"],
    },
    {
      id: "fc-3",
      claim:
        "68 nations agreed to mandatory watermarking on all commercial neural video synthesis tools by Q3 2026.",
      source: "Geneva Plenary Declaration Draft Text",
      verdict: "true",
      verdictLabel: "Verified True",
      explanation:
        "Confirmed through primary treaty documents released by the UN High Commission for Digital Governance. Article 14 establishes binding metadata provenance requirements.",
      investigator: "Diplomatic Affairs Investigative Bureau",
      date: "Feb 14, 2025",
      tags: ["Geneva Treaty", "AI Watermarking", "Policy"],
    },
  ];

  const getVerdictBadge = (verdict: "true" | "false" | "misleading", label: string) => {
    switch (verdict) {
      case "true":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-300/60 dark:border-emerald-800">
            <RiCheckboxCircleLine className="h-3.5 w-3.5 text-emerald-600" />
            <span>{label}</span>
          </span>
        );
      case "false":
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-rose-300/60 dark:border-rose-800">
            <RiCloseCircleLine className="h-3.5 w-3.5 text-rose-600" />
            <span>{label}</span>
          </span>
        );
      case "misleading":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-amber-300/60 dark:border-amber-800">
            <RiAlertLine className="h-3.5 w-3.5 text-amber-600" />
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <section className="py-6 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-6">
        <div className="flex items-center gap-2">
          <RiShieldCheckLine className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-serif font-black text-xl text-zinc-950 dark:text-zinc-50 tracking-tight">
            Fact-Check & Verification Desk
          </h3>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
            Reality Check
          </span>
        </div>
        <Link
          href="/category/investigations"
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <span>All Fact Checks</span>
          <RiArrowRightLine className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {factChecks.map((item) => (
          <article
            key={item.id}
            className="flex flex-col justify-between rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition shadow-2xs hover:shadow-xs"
          >
            <div>
              {/* Header: Source and Verdict */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[150px]">
                  {item.date}
                </span>
                {getVerdictBadge(item.verdict, item.verdictLabel)}
              </div>

              {/* The Claim */}
              <div className="mb-3.5">
                <span className="news-kicker text-zinc-400 block mb-1">Claim Inspected:</span>
                <h4 className="font-serif font-bold text-sm sm:text-[15px] text-zinc-950 dark:text-zinc-50 leading-snug">
                  &ldquo;{item.claim}&rdquo;
                </h4>
                <p className="mt-1 text-[11px] text-zinc-400 italic">
                  Origin: {item.source}
                </p>
              </div>

              {/* The Findings */}
              <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-3 border border-zinc-100 dark:border-zinc-800/80">
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block mb-1">
                  Our Finding:
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                  {item.explanation}
                </p>
              </div>
            </div>

            {/* Footer: Investigator */}
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px]">
              <span className="text-zinc-500 font-medium">{item.investigator}</span>
              <div className="flex gap-1">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

