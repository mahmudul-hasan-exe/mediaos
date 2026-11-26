"use client";

import React, { useState } from "react";
import {
  RiPlayFill,
  RiPauseFill,
  RiForward15Line,
  RiReplay15Line,
  RiHeadphoneLine,
} from "@remixicon/react";

export function AudioBriefingPodcast() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<"1x" | "1.25x" | "1.5x">("1x");
  const [progress, setProgress] = useState(38); // 38%

  const toggleSpeed = () => {
    if (playbackSpeed === "1x") setPlaybackSpeed("1.25x");
    else if (playbackSpeed === "1.25x") setPlaybackSpeed("1.5x");
    else setPlaybackSpeed("1x");
  };

  const episodes = [
    {
      id: "ep-1",
      title: "Today's Broadsheet: Inside the Geneva AI Liability Summit",
      duration: "14:20",
      host: "Sarah Jenkins & Marcus Vance",
      isActive: true,
    },
    {
      id: "ep-2",
      title: "Quantum Decryption Protocols & Sovereign Debt Liquidity",
      duration: "18:45",
      host: "Oxford Tech Fellow Amina Al-Mansoor",
      isActive: false,
    },
    {
      id: "ep-3",
      title: "The Weekend Dispatch: Geopolitics of Cloud Compute",
      duration: "24:10",
      host: "David O'Connor, Foreign Desk",
      isActive: false,
    },
  ];

  return (
    <section className="py-6 border-b border-zinc-200 dark:border-zinc-800">
      <div className="rounded-2xl bg-zinc-950 text-white p-6 sm:p-8 relative overflow-hidden border border-zinc-800 shadow-xl">
        {/* Subtle background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Player Controls & Active Audio */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-900">
                <RiHeadphoneLine className="h-3.5 w-3.5" />
                <span>MediaOS Audio Edition</span>
              </span>
              <span className="text-zinc-500 text-xs">• Daily News Briefing</span>
            </div>

            <div>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                The Morning Broadsheet: Diplomatic Treaties & Global Markets
              </h3>
              <p className="mt-1.5 text-xs text-zinc-400 font-sans">
                Hosted by Sarah Jenkins & Marcus Vance • Published daily at 06:00 GMT
              </p>
            </div>

            {/* Interactive Audio Player Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>05:27</span>
                <span>14:20</span>
              </div>
              <div
                className="h-2 w-full rounded-full bg-zinc-800 cursor-pointer overflow-hidden group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = ((e.clientX - rect.left) / rect.width) * 100;
                  setProgress(Math.round(pos));
                }}
              >
                <div
                  className="h-full bg-blue-500 rounded-full transition-all group-hover:bg-blue-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Playback Buttons */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-11 w-11 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition shadow-md active:scale-95"
                >
                  {isPlaying ? (
                    <RiPauseFill className="h-5 w-5" />
                  ) : (
                    <RiPlayFill className="h-5 w-5 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={() => setProgress((p) => Math.max(0, p - 10))}
                  title="Replay 15s"
                  className="text-zinc-400 hover:text-white transition p-1.5"
                >
                  <RiReplay15Line className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setProgress((p) => Math.min(100, p + 10))}
                  title="Forward 15s"
                  className="text-zinc-400 hover:text-white transition p-1.5"
                >
                  <RiForward15Line className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleSpeed}
                  className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono font-bold text-zinc-300 hover:text-white transition"
                >
                  {playbackSpeed}
                </button>
                <span className="text-[11px] text-zinc-500 hidden sm:inline">
                  Spatial Audio 48kHz
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Other Episodes Playlist */}
          <div className="lg:col-span-5 lg:border-l lg:border-zinc-800/80 lg:pl-6 space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
              Recent Audio Dispatches
            </span>
            <div className="space-y-2.5">
              {episodes.map((ep) => (
                <div
                  key={ep.id}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    ep.isActive
                      ? "border-blue-500/50 bg-blue-950/20"
                      : "border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-xs text-zinc-100 truncate">
                      {ep.title}
                    </h5>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{ep.host}</p>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                    {ep.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

