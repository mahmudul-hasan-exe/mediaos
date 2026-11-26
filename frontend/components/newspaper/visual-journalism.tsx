"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RiCameraLensLine,
  RiMapPinLine,
  RiArrowRightLine,
  RiCloseLine,
} from "@remixicon/react";

interface PhotoEssayItem {
  id: string;
  image: string;
  caption: string;
  location: string;
  photographer: string;
  bureau: string;
}

export function VisualJournalism() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoEssayItem | null>(null);

  const photos: PhotoEssayItem[] = [
    {
      id: "p1",
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1000&auto=format&fit=crop&q=80",
      caption: "Dusk falls over the diplomatic precinct as the closing plenary at the International Conference Center concludes.",
      location: "Geneva, Switzerland",
      photographer: "Marc Dubois",
      bureau: "European Bureau",
    },
    {
      id: "p2",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80",
      caption: "Engineers conduct microscopic alignment tests on topological silicon wafer interconnects under cleanroom illumination.",
      location: "Kyoto, Japan",
      photographer: "Kenji Sato",
      bureau: "Asia-Pacific Tech Desk",
    },
    {
      id: "p3",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1000&auto=format&fit=crop&q=80",
      caption: "Geothermal arrays power zero-carbon subterranean compute facilities beneath the volcanic rift valley.",
      location: "Reykjavik, Iceland",
      photographer: "Astrid Lindholm",
      bureau: "Nordic Climate Desk",
    },
    {
      id: "p4",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80",
      caption: "Traders and algorithmic monitoring stations track volatility shifts following central banking policy disclosures.",
      location: "London, United Kingdom",
      photographer: "James Thornton",
      bureau: "Financial Markets Wire",
    },
  ];

  return (
    <section className="py-6 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-6">
        <div className="flex items-center gap-2">
          <RiCameraLensLine className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
          <h3 className="font-serif font-black text-xl text-zinc-950 dark:text-zinc-50 tracking-tight">
            In Pictures • Photojournalism & Visual Storytelling
          </h3>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            Eyewitness
          </span>
        </div>
        <Link
          href="/category/culture-opinion"
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <span>All Photo Essays</span>
          <RiArrowRightLine className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {photos.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-zinc-900 aspect-[4/3] shadow-xs"
          >
            <img
              src={item.image}
              alt={item.caption}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-106"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition" />

            {/* Location Tag on Top-Left */}
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/10">
              <RiMapPinLine className="h-3 w-3 text-blue-400" />
              <span>{item.location}</span>
            </div>

            {/* Caption on Bottom */}
            <div className="absolute bottom-3 inset-x-3 text-white">
              <p className="text-xs font-serif line-clamp-2 leading-snug drop-shadow-xs">
                {item.caption}
              </p>
              <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-300">
                <span>Photo: {item.photographer}</span>
                <span className="text-zinc-400">{item.bureau}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition"
            >
              <RiCloseLine className="h-5 w-5" />
            </button>
            <div className="aspect-[16/10] bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.caption}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="p-6 bg-zinc-950 text-white">
              <div className="flex items-center gap-2 text-xs text-blue-400 mb-2">
                <RiMapPinLine className="h-3.5 w-3.5" />
                <span>{selectedPhoto.location}</span>
                <span>•</span>
                <span>{selectedPhoto.bureau}</span>
              </div>
              <p className="text-base font-serif leading-relaxed text-zinc-100">
                {selectedPhoto.caption}
              </p>
              <p className="mt-2 text-xs text-zinc-400">
                Photographed by {selectedPhoto.photographer} for MediaOS News Wire.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

