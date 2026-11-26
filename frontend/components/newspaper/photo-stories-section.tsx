"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RiCameraLensLine,
  RiArrowRightLine,
  RiCloseLine,
} from "@remixicon/react";

interface PhotoStoryItem {
  id: string;
  title: string;
  image: string;
  photoCount: number;
  photographer: string;
  time: string;
  slug: string;
}

const PHOTO_STORIES: PhotoStoryItem[] = [
  {
    id: "ps-1",
    title: "In pictures: Winter morning fog blankets the rural delta rivers",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    photoCount: 12,
    photographer: "Munem Wasif",
    time: "2d ago",
    slug: "in-pictures-winter-morning-fog-delta",
  },
  {
    id: "ps-2",
    title: "Traditional boat racing festival draws thousands to the river banks",
    image:
      "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80",
    photoCount: 9,
    photographer: "Sabiha Khatun",
    time: "3d ago",
    slug: "traditional-boat-racing-festival-draws-thousands",
  },
  {
    id: "ps-3",
    title: "Life along the railway tracks: A dawn-to-dusk photographic essay",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    photoCount: 16,
    photographer: "Tanvir Ahmed",
    time: "4d ago",
    slug: "life-along-railway-tracks-photo-essay",
  },
];

export function PhotoStoriesSection() {
  const [activePhoto, setActivePhoto] = useState<PhotoStoryItem | null>(null);

  return (
    <section className="py-8 border-b border-zinc-100 dark:border-zinc-800/80">
      {/* Minimal Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Photo Stories
          </h3>
          <span className="text-xs text-zinc-400 font-mono">08</span>
        </div>

        <Link
          href="/category/multimedia"
          className="group flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition shrink-0"
        >
          <span>Gallery</span>
          <RiArrowRightLine className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 3-Column Minimal Photo Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PHOTO_STORIES.map((item) => (
          <article key={item.id} className="group flex flex-col justify-between">
            <div>
              <div
                onClick={() => setActivePhoto(item)}
                className="block relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-900 cursor-pointer mb-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />

                {/* Minimal Photo Count Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-xs text-white text-[10px] font-medium">
                  <RiCameraLensLine className="h-3 w-3" />
                  <span>{item.photoCount} photos</span>
                </div>
              </div>

              <h4
                onClick={() => setActivePhoto(item)}
                className="text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug line-clamp-2 cursor-pointer"
              >
                {item.title}
              </h4>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-zinc-400">
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                Photo by {item.photographer}
              </span>
              <span>·</span>
              <span>{item.time}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center transition"
            >
              <RiCloseLine className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/10] bg-black">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-5 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-white font-medium text-sm sm:text-base">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Photo by {activePhoto.photographer} · {activePhoto.photoCount} slides
                </p>
              </div>

              <Link
                href={`/news/${activePhoto.slug}`}
                className="px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-medium transition self-start sm:self-auto"
              >
                Open essay
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
