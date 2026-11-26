"use client";

import React from "react";
import Link from "next/link";
import { useTenantStore } from "@/stores/tenant-store";

interface BrandLogoProps {
  variant?: "masthead" | "navbar" | "compact";
  className?: string;
}

// SVGL-Standard MediaOS Official Logo Icon
export function MediaOSIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
    >
      <defs>
        <linearGradient id="svgl-mediaos-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="svgl-mediaos-fold" x1="16" y1="8" x2="26" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#93C5FD" />
          <stop offset="1" stopColor="#60A5FA" />
        </linearGradient>
      </defs>

      {/* Rounded App Container */}
      <rect width="32" height="32" rx="8" fill="url(#svgl-mediaos-bg)" />

      {/* Inner Precision Rim */}
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="7.25"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="1.25"
      />

      {/* Primary Broadsheet 'M' Monogram */}
      <path
        d="M8 23V9L13.5 16.5L19 9V23"
        stroke="white"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Modern Editorial Fold Wing */}
      <path
        d="M19 16.5L24 9V23"
        stroke="url(#svgl-mediaos-fold)"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Live Digital Beacon */}
      <circle cx="24.5" cy="7.5" r="1.75" fill="#F59E0B" />
    </svg>
  );
}

export function BrandLogo({ variant = "navbar", className = "" }: BrandLogoProps) {
  const { currentTenant } = useTenantStore();

  // Top-Left Header & Navbar Version
  if (variant === "navbar" || variant === "compact") {
    return (
      <Link href="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
        <MediaOSIcon size={34} />
        <div className="flex flex-col text-left">
          <div className="flex items-center leading-none">
            <span className="font-sans font-black text-xl sm:text-2xl tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
              Media
            </span>
            <span className="font-sans font-black text-xl sm:text-2xl tracking-tight text-blue-600 dark:text-blue-400">
              OS
            </span>
          </div>
          <span className="text-[9.5px] font-sans uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500 mt-0.5">
            Independent Global Broadsheet
          </span>
        </div>
      </Link>
    );
  }

  // Grand Broadsheet Masthead Version
  return (
    <Link href="/" className={`inline-block group text-center ${className}`}>
      <div className="flex flex-col items-center justify-center space-y-2.5">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-12 sm:w-20 bg-zinc-300 dark:bg-zinc-700" />
          <MediaOSIcon size={44} />
          <span className="h-px w-12 sm:w-20 bg-zinc-300 dark:bg-zinc-700" />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-sans tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition">
          Media<span className="text-blue-600 dark:text-blue-400">OS</span>
        </h1>

        <div className="flex items-center justify-center gap-3 pt-1">
          <span className="h-px w-8 sm:w-16 bg-zinc-300 dark:bg-zinc-700 hidden sm:block" />
          <p className="text-[11px] sm:text-xs text-zinc-500 font-sans tracking-widest uppercase font-semibold">
            {currentTenant.websiteConfig.tagline}
          </p>
          <span className="h-px w-8 sm:w-16 bg-zinc-300 dark:bg-zinc-700 hidden sm:block" />
        </div>
      </div>
    </Link>
  );
}
