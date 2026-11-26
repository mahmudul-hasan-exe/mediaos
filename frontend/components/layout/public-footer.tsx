"use client";

import React from "react";
import Link from "next/link";
import { useTenantStore } from "@/stores/tenant-store";
import { mediaosToast } from "@/stores/mediaos-toast-store";
import { Input } from "@/components/ui/input";
import {
  RiShieldCheckLine,
  RiMailSendLine,
  RiGlobalLine,
  RiArrowRightLine,
  RiRssLine,
  RiNewspaperLine,
  RiTerminalBoxLine,
  RiLockLine,
  RiCustomerService2Line,
} from "@remixicon/react";

export function PublicFooter() {
  const { currentTenant } = useTenantStore();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400">
      {/* Morning Dispatch Newsletter Banner */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800 py-10 bg-white dark:bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                Daily Morning Briefing
              </span>
            </div>
            <h3 className="text-2xl font-bold font-serif text-zinc-950 dark:text-zinc-50">
              The {currentTenant.name} Morning Intelligence
            </h3>
            <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
              Curated diplomatic cables, market analysis, and investigative scoops delivered directly to your inbox before the markets open.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              mediaosToast.success("Subscribed to Morning Intelligence", {
                description: "Thank you for subscribing to our daily morning newsletter dispatch!",
              });
            }}
            className="flex w-full md:w-auto items-center gap-2 max-w-md"
          >
            <div className="relative flex-1">
              <RiMailSendLine className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
              <Input
                type="email"
                required
                placeholder="Enter your professional email..."
                className="pl-10"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-blue-700 hover:bg-blue-800 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition shrink-0 flex items-center gap-1.5"
            >
              <span>Subscribe Free</span>
              <RiArrowRightLine className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-xs">
        {/* Brand & Editorial Mission */}
        <div className="col-span-2 space-y-3.5">
          <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50 font-serif tracking-tight">
            {currentTenant.name}
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
            {currentTenant.websiteConfig.tagline}. Dedicated to rigorous investigative reporting, fearless foreign correspondence, and uncompromising factual integrity.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 px-3 py-1 text-[11px] font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
              <RiShieldCheckLine className="h-3.5 w-3.5" />
              Verified Independent Journalism
            </span>
          </div>
        </div>

        {/* Global Desks */}
        <div>
          <h4 className="font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3 text-[11px]">
            Editorial Desks
          </h4>
          <ul className="space-y-2.5 text-zinc-600 dark:text-zinc-400">
            <li>
              <Link href="/category/world" className="hover:text-blue-600 transition">
                World Affairs
              </Link>
            </li>
            <li>
              <Link href="/category/technology" className="hover:text-blue-600 transition">
                Technology &amp; AI
              </Link>
            </li>
            <li>
              <Link href="/category/business" className="hover:text-blue-600 transition">
                Business &amp; Markets
              </Link>
            </li>
            <li>
              <Link href="/category/climate-science" className="hover:text-blue-600 transition">
                Climate &amp; Earth
              </Link>
            </li>
            <li>
              <Link href="/category/investigations" className="hover:text-blue-600 transition">
                Investigative Bureau
              </Link>
            </li>
          </ul>
        </div>

        {/* Digital Products */}
        <div>
          <h4 className="font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3 text-[11px]">
            Editions &amp; Syndication
          </h4>
          <ul className="space-y-2.5 text-zinc-600 dark:text-zinc-400">
            <li>
              <Link href="/epaper" className="hover:text-blue-600 transition flex items-center gap-1.5 font-medium">
                <RiNewspaperLine className="h-3.5 w-3.5 text-blue-600" />
                <span>Today&apos;s E-Paper Edition</span>
              </Link>
            </li>
            <li>
              <Link href="/trending" className="hover:text-blue-600 transition">
                Trending Wire
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:text-blue-600 transition">
                Journalism Archive (⌘K)
              </Link>
            </li>
            <li>
              <a
                href="/api/rss"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition flex items-center gap-1"
              >
                <RiRssLine className="h-3.5 w-3.5 text-amber-500" />
                <span>RSS Syndication (XML)</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Governance & Staff Portal */}
        <div>
          <h4 className="font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3 text-[11px]">
            Governance &amp; Staff
          </h4>
          <ul className="space-y-2.5 text-zinc-600 dark:text-zinc-400">
            <li>
              <Link href="/about" className="hover:text-blue-600 transition">
                Editorial Code of Ethics
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600 transition flex items-center gap-1">
                <RiCustomerService2Line className="h-3.5 w-3.5 text-zinc-400" />
                <span>Secure Whistleblower Tips</span>
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-600 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-blue-600 transition">
                Terms &amp; Syndication
              </Link>
            </li>
            <li className="pt-1">
              <a
                href="http://127.0.0.1:8000/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                <RiTerminalBoxLine className="h-3.5 w-3.5" />
                <span>Newsroom CMS Staff</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Attribution */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-xs bg-zinc-100/70 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {currentTenant.name}. All global syndication and publishing rights reserved.
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
            <span>Platform: <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">MediaOS</strong></span>
            <span>•</span>
            <span>Developer: <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">SoftSync Agency</strong></span>
            <span>•</span>
            <span className="italic">One Platform. Every Publication.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
