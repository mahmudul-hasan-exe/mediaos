"use client";

import React from "react";
import Link from "next/link";
import { RiPlayCircleFill, RiVideoLine, RiTimeLine, RiRadio2Line } from "@remixicon/react";

export function MultimediaShowcase() {
  const videoStories = [
    {
      id: "vid-1",
      title: "Inside the Geneva Summit: Behind Closed Doors on Autonomous Defense Accords",
      duration: "12:45",
      views: "142K views",
      thumb: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
      category: "Special Investigation",
    },
    {
      id: "vid-2",
      title: "The Fusion Frontier: Commercial Tokamak Reactor Tests in Provence",
      duration: "08:20",
      views: "98K views",
      thumb: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
      category: "Science & Discovery",
    },
    {
      id: "vid-3",
      title: "Currency Wars: Digital Yuan, Euro Stablecoins, and Global Reserve Shifts",
      duration: "15:10",
      views: "210K views",
      thumb: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80",
      category: "Global Markets",
    },
  ];

  return (
    <section className="py-6 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-6">
        <div className="flex items-center gap-2">
          <RiVideoLine className="h-4 w-4 text-rose-600" />
          <h3 className="font-serif font-black text-xl text-zinc-950 dark:text-zinc-50 tracking-tight">
            Video Dispatches & Investigative Broadcasts
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold">
          <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
          <span>Broadsheet Media TV</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videoStories.map((video) => (
          <div
            key={video.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-900 text-white shadow-sm"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={video.thumb}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-white/30 group-hover:scale-110 group-hover:bg-blue-600 transition shadow-lg">
                  <RiPlayCircleFill className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Duration Tag */}
              <div className="absolute bottom-2.5 right-2.5 rounded bg-black/80 px-2 py-0.5 text-[10px] font-mono font-medium backdrop-blur-sm text-white">
                {video.duration}
              </div>

              {/* Category Pill */}
              <div className="absolute top-2.5 left-2.5 rounded bg-blue-600/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm text-white">
                {video.category}
              </div>
            </div>

            <div className="p-4 bg-zinc-900 flex-1 flex flex-col justify-between">
              <h4 className="font-serif font-bold text-sm text-zinc-100 group-hover:text-blue-400 transition leading-snug line-clamp-2">
                {video.title}
              </h4>

              <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800">
                <span className="flex items-center gap-1">
                  <RiRadio2Line className="h-3 w-3 text-rose-500" />
                  HD Broadcast
                </span>
                <span>{video.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

