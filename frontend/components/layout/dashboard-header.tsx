"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/stores/ui-store";
import { RoleSwitcher } from "@/components/shared/role-switcher";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { RiMenuLine, RiGlobalLine, RiExternalLinkLine, RiNotification3Line } from "@remixicon/react";
import Link from "next/link";

export function DashboardHeader() {
  const pathname = usePathname();
  const { toggleSidebar } = useUIStore();

  const isSuperAdmin = pathname.startsWith("/super-admin");

  // Format breadcrumbs from pathname
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbText = segments
    .map((s) => s.replace(/-/g, " "))
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" / ");

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 px-4 backdrop-blur-md">
      {/* Left Area: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300"
        >
          <RiMenuLine className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-400">MediaOS</span>
          <span className="text-xs text-zinc-300 dark:text-zinc-700">/</span>
          <h1 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            {breadcrumbText || "Dashboard"}
          </h1>
        </div>
      </div>

      {/* Right Area: Controls & User Switchers */}
      <div className="flex items-center gap-2.5">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition group py-1"
          title="View Public Frontend Website"
        >
          <RiGlobalLine className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-500 transition" />
          <span>Live Website</span>
          <RiExternalLinkLine className="h-3 w-3 text-zinc-400 group-hover:text-blue-500 transition" />
        </a>
        <RoleSwitcher />
        <LanguageSwitcher />
        <ThemeToggle />

        {/* Notification Bell */}
        <Link
          href="/admin/notifications"
          title="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <RiNotification3Line className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-zinc-950" />
        </Link>
      </div>
    </header>
  );
}
