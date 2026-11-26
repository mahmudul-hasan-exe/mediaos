"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useTenantStore } from "@/stores/tenant-store";
import { mediaosToast } from "@/stores/mediaos-toast-store";
import {
  RiPagesLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiZoomInLine,
  RiZoomOutLine,
  RiDownload2Line,
  RiShareForwardLine,
  RiCursorLine,
  RiArticleLine,
  RiArrowRightLine,
} from "@remixicon/react";

export default function EPaperViewerPage() {
  const { currentTenant } = useTenantStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedHotspot, setSelectedHotspot] = useState<any>(null);
  const totalPages = 16;

  const editionDate = "Sunday, November 8, 2026";

  const pageHotspots = [
    {
      id: "hs-1",
      top: "14%",
      left: "8%",
      width: "55%",
      height: "38%",
      title: "Global Leaders Reach Historic Accord on Autonomous AI Governance Frameworks",
      author: "Sarah Jenkins, Geneva Bureau",
      excerpt: "Diplomats from 68 nations finalize ethical guidelines, safety audits, and liability standards in Geneva. Full ratification expected by mid-year.",
      slug: "global-leaders-historic-accord-autonomous-ai-governance",
    },
    {
      id: "hs-2",
      top: "14%",
      left: "66%",
      width: "28%",
      height: "45%",
      title: "Quantum Chip Architecture Breaks 10,000 Logical Qubit Threshold",
      author: "Dr. Marcus Wei",
      excerpt: "Engineers at the Quantum Dynamics Institute achieve room-temperature coherence in silicon lattice trials.",
      slug: "quantum-chip-architecture-breaks-logical-qubit-threshold",
    },
    {
      id: "hs-3",
      top: "56%",
      left: "8%",
      width: "42%",
      height: "36%",
      title: "Central Banks Accelerate Interoperable Digital Currency Trials",
      author: "Helena Rostova",
      excerpt: "Wholesale settlement pilots reduce transaction friction by 84% across transatlantic enterprise corridors.",
      slug: "central-banks-accelerate-cbdc-trials-trade-shifts",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold text-[10px] px-2 py-0.5 uppercase tracking-wider">
              Authentic Print Replica
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              {currentTenant.name} Digital BroadSheet
            </span>
          </div>
          <h1 className="text-xl font-bold font-serif text-zinc-950 dark:text-zinc-50 mt-1">
            Today's Edition — {editionDate}
          </h1>
        </div>

        {/* Reader Controls: Navigation & Zoom */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          {/* Page Turners */}
          <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 bg-zinc-50 dark:bg-zinc-950">
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-7 w-7 p-0"
            >
              <RiArrowLeftSLine className="h-4 w-4" />
            </Button>
            <span className="px-2 font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="h-7 w-7 p-0"
            >
              <RiArrowRightSLine className="h-4 w-4" />
            </Button>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 bg-zinc-50 dark:bg-zinc-950">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
              className="h-7 w-7 p-0 text-zinc-600 dark:text-zinc-300"
              title="Zoom Out"
            >
              <RiZoomOutLine className="h-4 w-4" />
            </Button>
            <span className="px-1 text-[11px] font-mono text-zinc-500">{zoomLevel}%</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
              className="h-7 w-7 p-0 text-zinc-600 dark:text-zinc-300"
              title="Zoom In"
            >
              <RiZoomInLine className="h-4 w-4" />
            </Button>
          </div>

          {/* Download PDF & Share */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => mediaosToast.info("Preparing high-resolution broadsheet PDF edition download...")}
            className="gap-1.5 h-8 text-xs font-semibold"
          >
            <RiDownload2Line className="h-3.5 w-3.5 text-zinc-500" />
            <span className="hidden sm:inline">PDF Edition</span>
          </Button>
        </div>
      </div>

      {/* Main Newspaper Canvas with Interactive Clipping Hotspots */}
      <div className="overflow-auto rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-200/80 dark:bg-zinc-950/80 p-4 sm:p-8 flex justify-center min-h-[700px] shadow-inner">
        <div
          className="relative bg-white text-zinc-900 shadow-2xl transition-all duration-300 rounded border border-zinc-300 font-serif"
          style={{
            width: `${(650 * zoomLevel) / 100}px`,
            minHeight: `${(920 * zoomLevel) / 100}px`,
          }}
        >
          {/* Authentic Broadsheet Header Layout */}
          <div className="p-6 border-b-2 border-zinc-900 text-center space-y-1">
            <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-zinc-500 border-b border-zinc-300 pb-1 font-sans font-semibold">
              <span>{editionDate}</span>
              <span>VOL. CXXVIII NO. 44</span>
              <span>PRICE $3.50</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-zinc-950 uppercase pt-2">
              {currentTenant.name}
            </h2>
            <p className="text-[10px] text-zinc-600 font-sans italic tracking-wider">
              {currentTenant.websiteConfig.tagline}
            </p>
          </div>

          {/* Interactive Clipping Hotspots Indicator */}
          <div className="p-6 grid grid-cols-12 gap-4 h-[750px] relative font-sans">
            {pageHotspots.map((hs) => (
              <div
                key={hs.id}
                onClick={() => setSelectedHotspot(hs)}
                style={{
                  top: hs.top,
                  left: hs.left,
                  width: hs.width,
                  height: hs.height,
                }}
                className="absolute cursor-pointer border-2 border-transparent hover:border-blue-600 hover:bg-blue-600/10 rounded transition p-2 flex flex-col justify-between group"
              >
                <div className="opacity-0 group-hover:opacity-100 transition flex items-center justify-between bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded font-sans font-bold shadow">
                  <span className="flex items-center gap-1">
                    <RiCursorLine className="h-3 w-3" /> Click to Clip Story
                  </span>
                  <span>Read Article</span>
                </div>
              </div>
            ))}

            {/* Simulated Newspaper Column Typography */}
            <div className="col-span-8 border-r border-zinc-200 pr-4 space-y-2">
              <h3 className="font-serif font-black text-xl leading-tight">
                Global Leaders Reach Historic Accord on Autonomous AI Governance Frameworks
              </h3>
              <p className="text-[10px] font-sans font-bold text-zinc-500 uppercase">
                By Sarah Jenkins in Geneva
              </p>
              <div className="h-44 bg-zinc-100 rounded overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80"
                  alt="Geneva Summit"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-[11px] font-serif leading-relaxed text-zinc-800 line-clamp-6">
                GENEVA — After ninety-six hours of contentious closed-door negotiations, delegates representing sixty-eight sovereign nations affixed their signatures to the International AI Governance Charter on Sunday morning. The agreement mandates independent verification audits for any machine learning architecture commanding compute thresholds above 10^26 FLOPs, establishing unprecedented legal liability standards across borders.
              </p>
            </div>

            <div className="col-span-4 space-y-2">
              <h4 className="font-serif font-black text-sm leading-snug">
                Quantum Chip Architecture Breaks 10,000 Logical Qubit Threshold
              </h4>
              <p className="text-[9px] font-sans font-bold text-zinc-500 uppercase">
                By Dr. Marcus Wei
              </p>
              <p className="text-[10px] font-serif leading-relaxed text-zinc-700 line-clamp-8">
                CAMBRIDGE — In a demonstration that sent waves through cryptographic communities worldwide, engineers at the Quantum Dynamics Institute achieved room-temperature coherence across ten thousand error-corrected logical qubits for over twelve minutes. The landmark milestone accelerates the timeline for sovereign quantum encryption deployment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clipped Article Modal */}
      {selectedHotspot && (
        <Modal
          isOpen={!!selectedHotspot}
          onClose={() => setSelectedHotspot(null)}
          title="Print Edition Clip"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-blue-600 font-bold uppercase tracking-wider">
              <RiArticleLine className="h-4 w-4" />
              <span>Page {currentPage} Broadcast Clip</span>
            </div>
            <h2 className="font-serif font-black text-2xl text-zinc-950 dark:text-zinc-50 leading-tight">
              {selectedHotspot.title}
            </h2>
            <div className="text-xs font-semibold text-zinc-500">
              {selectedHotspot.author}
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
              {selectedHotspot.excerpt}
            </p>
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-400">Available in full digital web edition</span>
              <Link href={`/news/${selectedHotspot.slug}`}>
                <Button size="sm" className="gap-1.5 font-bold">
                  <span>Read Full Article</span>
                  <RiArrowRightLine className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
