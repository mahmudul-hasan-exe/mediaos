"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTenantStore } from "@/stores/tenant-store";
import { useAuthStore } from "@/stores/auth-store";
import { useNavigationStore } from "@/stores/navigation-store";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { BrandLogo } from "@/components/shared/brand-logo";
import { SearchCommandDialog } from "@/components/newspaper/search-command-dialog";
import { AllSectionsDrawer } from "@/components/newspaper/all-sections-drawer";
import {
  RiSearchLine,
  RiMenuLine,
  RiCloseLine,
  RiFireLine,
  RiUser3Line,
  RiDashboardLine,
  RiLogoutBoxRLine,
  RiArrowDownSLine,
  RiCheckboxCircleFill,
  RiVerifiedBadgeFill,
  RiTimeLine,
  RiArrowRightLine,
  RiMailCheckLine,
  RiNotification3Line,
} from "@remixicon/react";

export function PublicHeader() {
  const pathname = usePathname();
  const { currentTenant } = useTenantStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { menus, latestArticles, fetchNavigation } = useNavigationStore();

  const [sectionsDrawerOpen, setSectionsDrawerOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [megaSectionsOpen, setMegaSectionsOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync dynamic menus from Laravel Admin (/api/v1/navigation) & refresh when tab focuses or becomes visible
  useEffect(() => {
    fetchNavigation(currentTenant.id, true);
    const handleRefresh = () => {
      if (document.visibilityState === "visible") {
        fetchNavigation(currentTenant.id, true);
      }
    };
    window.addEventListener("focus", handleRefresh);
    document.addEventListener("visibilitychange", handleRefresh);
    return () => {
      window.removeEventListener("focus", handleRefresh);
      document.removeEventListener("visibilitychange", handleRefresh);
    };
  }, [currentTenant.id, fetchNavigation]);

  // Global ⌘K shortcut listener to trigger search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchDialogOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = menus.header;
  const moreItems = menus.more;
  const megaItems = menus.mega;

  return (
    <header className="w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      {/* Top Header Bar: Official Brand Logo on Top-Left & Tools on Top-Right */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 sm:py-3.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Top-Left: Brand Logo Crest */}
          <div className="flex items-center shrink-0">
            <BrandLogo variant="navbar" />
          </div>

          {/* Top-Right: The 4 Core Utility Actions (Search, Language, Dark Mode, Login) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* 1. Global Professional Search Bar (Triggers ⌘K Command Dialog) */}
            <button
              onClick={() => setSearchDialogOpen(true)}
              title="Search Global Stories, Topics & Archives (⌘K)"
              className="group flex items-center justify-between gap-3 px-3.5 py-1.5 w-auto sm:w-56 md:w-64 rounded-full bg-zinc-100/90 dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 text-xs shadow-2xs transition active:scale-[0.98]"
            >
              <div className="flex items-center gap-2 truncate">
                <RiSearchLine className="h-4 w-4 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition shrink-0" />
                <span className="hidden sm:inline font-sans text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 truncate">
                  Search news, topics & archives...
                </span>
                <span className="sm:hidden font-sans text-xs text-zinc-500">Search</span>
              </div>
              <kbd className="hidden lg:inline-flex items-center text-[10px] font-mono bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-400 shadow-2xs shrink-0">
                ⌘K
              </kbd>
            </button>

            {/* 2. Dark/Light Mode */}
            <ThemeToggle />

            {/* 3. Notification Icon & User Profile Icon Only (Zero-flicker on refresh) */}
            {!mounted ? (
              <div className="h-8 w-20 flex items-center justify-end" aria-hidden="true">
                <div className="h-8 w-8 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse" />
              </div>
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-2 animate-in fade-in duration-150">
                {/* Notification Bell */}
                <Link
                  href={user.role !== "reader" ? "/admin/notifications" : "#notifications"}
                  title="Notifications"
                  className="relative flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                  <RiNotification3Line className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-zinc-950" />
                </Link>

                {/* Profile Icon Only (No Text Pill) */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold ring-2 ring-zinc-200 dark:ring-zinc-800 hover:ring-blue-500 transition shadow-2xs select-none cursor-pointer"
                    title={user.name || "User Profile & Settings"}
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name || "User"}
                        referrerPolicy="no-referrer"
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      user.name ? user.name.charAt(0).toUpperCase() : "U"
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                      onMouseLeave={() => setUserMenuOpen(false)}
                    >
                      <div className="px-3.5 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <div className="h-8 w-8 rounded-full overflow-hidden bg-blue-600 text-white flex items-center justify-center shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-700">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-bold">{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1 min-w-0">
                              <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">{user.name}</p>
                              {(user.isEmailVerified || user.emailVerifiedAt) && (
                                <span title="Verified Reader" className="inline-flex items-center shrink-0">
                                  <RiVerifiedBadgeFill className="h-4 w-4 text-emerald-500 shrink-0" />
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                          </div>
                        </div>
                      
                      {user.role === "reader" ? (
                        !user.isEmailVerified && !user.emailVerifiedAt ? (
                          <div className="mt-2 space-y-1.5">
                            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                              <RiTimeLine className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                              <span>Reader (Unverified)</span>
                            </div>
                            <Link
                              href={user.email ? `/verify-email?email=${encodeURIComponent(user.email)}` : "/verify-email"}
                              onClick={() => {
                                if (user.email && typeof window !== "undefined") {
                                  try {
                                    sessionStorage.setItem("mediaos_verify_email", user.email);
                                    localStorage.setItem("mediaos_verify_email", user.email);
                                  } catch {}
                                }
                                setUserMenuOpen(false);
                              }}
                              className="flex items-center justify-between px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-[11px] font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20 transition"
                            >
                              <span className="flex items-center gap-1">
                                <RiMailCheckLine className="h-3 w-3" />
                                <span>Verify Email</span>
                              </span>
                              <RiArrowRightLine className="h-3 w-3" />
                            </Link>
                          </div>
                        ) : null
                      ) : (
                        <span className="inline-block mt-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          {user.role}
                        </span>
                      )}
                    </div>

                    {user.role !== "reader" && (
                      <Link
                        href={user.role === "super-admin" ? "/super-admin" : user.role === "reporter" ? "/reporter" : "/admin"}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition font-medium"
                      >
                        <RiDashboardLine className="h-4 w-4 text-blue-600" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-2 w-full text-left px-3.5 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition font-medium cursor-pointer"
                    >
                      <RiLogoutBoxRLine className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            ) : (
              <div className="flex items-center gap-1.5 animate-in fade-in duration-150">
                <Link
                  href="/login"
                  title="Sign In"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-sans text-xs font-bold hover:bg-blue-700 dark:hover:bg-blue-400 dark:hover:text-white shadow-2xs transition active:scale-95"
                >
                  <RiUser3Line className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Primary Sticky Navigation Bar with Category Sections */}
      <nav className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-10 gap-3 relative">
          {/* Left: Original Drawer Menu Button + Sections ⌵ Mega Menu + Categories + More ⌵ */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 min-w-0 flex-1">
            {/* 1. Original Drawer Menu Button (Opens Full Editorial Slide-Over Drawer) */}
            <button
              onClick={() => setSectionsDrawerOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 py-1 px-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition shrink-0 border-r border-zinc-200 dark:border-zinc-800 pr-3 cursor-pointer"
              title="Open Full Drawer Menu"
            >
              <RiMenuLine className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
              <span>Menu</span>
            </button>

            {/* 2. Sections ⌵ Mega Dropdown Trigger */}
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  setMegaSectionsOpen(!megaSectionsOpen);
                  setMoreMenuOpen(false);
                }}
                className={`flex items-center gap-1 text-xs font-bold py-1 transition cursor-pointer ${
                  megaSectionsOpen
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-blue-600 dark:text-blue-400 hover:text-blue-700"
                }`}
                title="All Sections"
              >
                <span>Sections</span>
                <RiArrowDownSLine
                  className={`h-4 w-4 transition-transform duration-200 ${
                    megaSectionsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* 3. Scrollable Desktop Category Navigation */}
            <div className="flex items-center gap-4 lg:gap-5 text-xs font-bold tracking-wide overflow-x-auto no-scrollbar py-1 min-w-0">
              {categories.map((cat) => {
                const active = pathname === cat.href;
                return (
                  <Link
                    key={cat.id || cat.href + cat.label}
                    href={cat.href}
                    target={cat.target === "_blank" ? "_blank" : undefined}
                    rel={cat.target === "_blank" ? "noopener noreferrer" : undefined}
                    className={`relative py-1 transition whitespace-nowrap shrink-0 ${
                      active
                        ? "text-blue-700 dark:text-blue-400 font-extrabold after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                        : "text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>

            {/* 4. More ⌵ Dropdown Menu Trigger (Outside overflow-x-auto so dropdown is NEVER clipped!) */}
            {moreItems.length > 0 && (
              <div className="relative shrink-0">
                <button
                  onClick={() => {
                    setMoreMenuOpen(!moreMenuOpen);
                    setMegaSectionsOpen(false);
                  }}
                  className={`flex items-center gap-0.5 text-xs font-bold py-1 transition cursor-pointer ${
                    moreMenuOpen
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-blue-600 dark:text-blue-400 hover:text-blue-700"
                  }`}
                >
                  <span>More</span>
                  <RiArrowDownSLine
                    className={`h-4 w-4 transition-transform duration-200 ${
                      moreMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {moreMenuOpen && (
                  <div
                    className="absolute right-0 sm:left-0 top-full mt-1.5 w-52 max-h-96 overflow-y-auto bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl py-2 z-50 text-xs font-bold text-zinc-900 dark:text-zinc-100 animate-in fade-in zoom-in-95 duration-150 space-y-0.5"
                    onMouseLeave={() => setMoreMenuOpen(false)}
                  >
                    {moreItems.map((item) => (
                      <Link
                        key={item.id || item.label}
                        href={item.href}
                        target={item.target === "_blank" ? "_blank" : undefined}
                        rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                        onClick={() => setMoreMenuOpen(false)}
                        className="block px-4 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Group: Trending Wire & Mobile Search */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/trending"
              className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold hover:text-amber-700 transition shrink-0 text-xs whitespace-nowrap pl-3 border-l border-zinc-200 dark:border-zinc-800"
            >
              <RiFireLine className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
              <span>Trending</span>
            </Link>

            {/* Mobile Search Icon Trigger */}
            <button
              onClick={() => setSearchDialogOpen(true)}
              className="md:hidden p-1 rounded text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
              aria-label="Search dispatches"
            >
              <RiSearchLine className="h-4 w-4" />
            </button>
          </div>

          {/* Sections ⌵ Mega Dropdown Panel (Matching Image 2) */}
          {megaSectionsOpen && (
            <div
              className="absolute left-4 top-full mt-1 w-[92vw] max-w-4xl bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 z-50 text-xs animate-in fade-in zoom-in-95 duration-150 grid grid-cols-1 md:grid-cols-12 gap-8"
              onMouseLeave={() => setMegaSectionsOpen(false)}
            >
              {/* Left Column: SECTIONS (2 Columns, Dynamic from Admin) */}
              <div className="md:col-span-7">
                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 block mb-4">
                  SECTIONS
                </span>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  {megaItems.map((sec) => (
                    <Link
                      key={sec.id || sec.href + sec.label}
                      href={sec.href}
                      target={sec.target === "_blank" ? "_blank" : undefined}
                      rel={sec.target === "_blank" ? "noopener noreferrer" : undefined}
                      onClick={() => setMegaSectionsOpen(false)}
                      className="block hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {sec.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Column: LATEST (Dynamic from Backend) */}
              <div className="md:col-span-5 md:border-l md:border-zinc-200 dark:md:border-zinc-800 md:pl-6 space-y-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 block mb-4">
                  LATEST
                </span>
                <div className="space-y-3.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {latestArticles.map((art) => (
                    <Link
                      key={art.id}
                      href={art.href}
                      onClick={() => setMegaSectionsOpen(false)}
                      className="block hover:text-blue-600 dark:hover:text-blue-400 transition line-clamp-2 leading-snug"
                    >
                      {art.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 5. All Sections Interactive Slide-Over Mega-Drawer */}
      <AllSectionsDrawer
        isOpen={sectionsDrawerOpen}
        onClose={() => setSectionsDrawerOpen(false)}
      />

      {/* 6. Instant Command Palette Search Dialog (⌘K) */}
      <SearchCommandDialog
        isOpen={searchDialogOpen}
        onClose={() => setSearchDialogOpen(false)}
      />
    </header>
  );
}
