"use client";

import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Universal Shimmer Skeleton
 * Produces the ultra-smooth sweeping linear gradient shimmer
 */
export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`shimmer-card rounded-2xl ${className}`}
      {...props}
    />
  );
}

/**
 * Stacked Rounded Capsule Cards
 * Exactly matches the user's uploaded mobile/tablet card loading layout
 */
export function ShimmerCardList({ count = 4, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`space-y-4 sm:space-y-5 w-full max-w-3xl mx-auto py-6 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="h-20 sm:h-24 w-full rounded-3xl shimmer-card shadow-2xs"
        />
      ))}
    </div>
  );
}

/**
 * Broadsheet Lead Hero Grid Skeleton
 */
export function HeroNewsSkeleton() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Lead Story & Top Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        {/* Left Column (3 cols) */}
        <div className="lg:col-span-3 space-y-6 hidden lg:block">
          <div className="space-y-2.5">
            <Skeleton className="h-3.5 w-24 rounded-full" />
            <Skeleton className="h-5 w-full rounded-xl" />
            <Skeleton className="h-5 w-4/5 rounded-xl" />
            <Skeleton className="h-3 w-1/3 rounded-full mt-2" />
          </div>
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <Skeleton className="h-3.5 w-20 rounded-full" />
            <Skeleton className="h-5 w-full rounded-xl" />
            <Skeleton className="h-5 w-3/4 rounded-xl" />
            <Skeleton className="h-3 w-1/4 rounded-full mt-2" />
          </div>
        </div>

        {/* Center Main Lead Story (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-9 sm:h-12 w-full rounded-2xl" />
          <Skeleton className="h-8 w-4/5 rounded-2xl" />
          <Skeleton className="aspect-[16/10] w-full rounded-3xl mt-4" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-5/6 rounded-full" />
          </div>
        </div>

        {/* Right Column (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <Skeleton className="h-4 w-28 rounded-full" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3 items-center">
                <Skeleton className="h-16 w-20 rounded-2xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full rounded-xl" />
                  <Skeleton className="h-3 w-2/3 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stacked Cards Preview below hero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[16/10] w-full rounded-3xl" />
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-5 w-full rounded-xl" />
            <Skeleton className="h-5 w-3/4 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Magazine Grid Skeleton (Category, Search, Topics)
 */
export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="space-y-3.5">
          <Skeleton className="aspect-[16/10] w-full rounded-3xl" />
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-24 rounded-full" />
            <Skeleton className="h-5 w-full rounded-xl" />
            <Skeleton className="h-5 w-4/5 rounded-xl" />
            <Skeleton className="h-3 w-1/3 rounded-full mt-1.5" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Full Article Detail Page Skeleton
 */
export function ArticleDetailSkeleton() {
  return (
    <article className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="space-y-4">
        <Skeleton className="h-4 w-32 rounded-full" />
        <Skeleton className="h-10 sm:h-14 w-full rounded-2xl" />
        <Skeleton className="h-8 sm:h-10 w-4/5 rounded-2xl" />
        <div className="flex items-center gap-4 pt-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-40 rounded-full" />
            <Skeleton className="h-3 w-28 rounded-full" />
          </div>
        </div>
      </div>
      <Skeleton className="aspect-[16/9] w-full rounded-3xl" />
      <div className="space-y-3 pt-4">
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-5/6 rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-3/4 rounded-full" />
      </div>
    </article>
  );
}



