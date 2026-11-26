"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/stores/ui-store";
import { useAuthStore } from "@/stores/auth-store";
import { useTenantStore } from "@/stores/tenant-store";
import { MediaOSIcon } from "@/components/shared/brand-logo";
import {
  RiDashboard3Line,
  RiBuilding2Line,
  RiBankCardLine,
  RiCpuLine,
  RiSettings3Line,
  RiArticleLine,
  RiAddCircleLine,
  RiCheckboxCircleLine,
  RiFolderLine,
  RiTeamLine,
  RiImageLine,
  RiMagicLine,
  RiPagesLine,
  RiMegaphoneLine,
  RiChat1Line,
  RiNotification3Line,
  RiBarChartBoxLine,
  RiExternalLinkLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiShieldCheckLine,
  RiUserVoiceLine,
} from "@remixicon/react";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { user } = useAuthStore();
  const { currentTenant } = useTenantStore();

  const isSuperAdminArea = pathname.startsWith("/super-admin");
  const isReporterArea = pathname.startsWith("/reporter");

  const superAdminNav = [
    { label: "Overview", href: "/super-admin", icon: RiDashboard3Line },
    { label: "Tenants & Publications", href: "/super-admin/tenants", icon: RiBuilding2Line },
    { label: "Subscription Plans", href: "/super-admin/plans", icon: RiBankCardLine },
    { label: "AI Providers & Models", href: "/super-admin/ai-providers", icon: RiCpuLine },
    { label: "Platform Analytics", href: "/super-admin/analytics", icon: RiBarChartBoxLine },
    { label: "Global Settings & Logs", href: "/super-admin/settings", icon: RiSettings3Line },
  ];

  const reporterNav = [
    { label: "Reporter Desk", href: "/reporter", icon: RiDashboard3Line },
    { label: "Draft New Story", href: "/admin/news/create", icon: RiAddCircleLine },
    { label: "My Stories & Drafts", href: "/admin/news", icon: RiArticleLine },
    { label: "AI Writing Assistant", href: "/admin/ai", icon: RiMagicLine },
    { label: "Media Library", href: "/admin/media", icon: RiImageLine },
  ];

  const newspaperAdminNav = [
    { label: "Dashboard", href: "/admin", icon: RiDashboard3Line },
    {
      group: "Editorial & Content",
      items: [
        { label: "All News & Articles", href: "/admin/news", icon: RiArticleLine },
        { label: "Create News", href: "/admin/news/create", icon: RiAddCircleLine },
        { label: "Review Queue", href: "/admin/news/review", icon: RiCheckboxCircleLine, badge: "8" },
        { label: "Categories", href: "/admin/categories", icon: RiFolderLine },
        { label: "Authors & Reporters", href: "/admin/authors", icon: RiTeamLine },
        { label: "Media Library", href: "/admin/media", icon: RiImageLine },
      ],
    },
    {
      group: "Intelligence & AI",
      items: [
        { label: "AI Writing Suite", href: "/admin/ai", icon: RiMagicLine, highlight: true },
      ],
    },
    {
      group: "Publishing Modules",
      items: [
        { label: "E-Paper Editions", href: "/admin/epaper", icon: RiPagesLine },
        { label: "Advertisements", href: "/admin/advertisements", icon: RiMegaphoneLine },
        { label: "Comments Moderation", href: "/admin/comments", icon: RiChat1Line, badge: "19" },
        { label: "Push Notifications", href: "/admin/notifications", icon: RiNotification3Line },
        { label: "Audience Analytics", href: "/admin/analytics", icon: RiBarChartBoxLine },
        { label: "Publication Settings", href: "/admin/settings", icon: RiSettings3Line },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-30 flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-200 ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800">
        <Link href={isSuperAdminArea ? "/super-admin" : "/admin"} className="flex items-center gap-2.5 overflow-hidden group">
          <MediaOSIcon size={32} />
          {!sidebarCollapsed && (
            <div className="truncate">
              <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-zinc-100 font-sans">
                MediaOS
              </span>
              <span className="ml-1.5 rounded bg-blue-100 dark:bg-blue-950/80 px-1.5 py-0.2 text-[10px] font-semibold text-blue-700 dark:text-blue-300">
                v2.0
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200 transition"
        >
          {sidebarCollapsed ? <RiArrowRightSLine className="h-4 w-4" /> : <RiArrowLeftSLine className="h-4 w-4" />}
        </button>
      </div>

      {/* Tenant Indicator (When in Newspaper CMS) */}
      {!isSuperAdminArea && !sidebarCollapsed && (
        <div className="p-3 border-b border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center gap-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 p-2 border border-zinc-200/60 dark:border-zinc-800">
            <div
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ backgroundColor: currentTenant.primaryColor }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {currentTenant.name}
              </p>
              <p className="text-[10px] text-zinc-400 truncate">{currentTenant.domain}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {isSuperAdminArea ? (
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Platform Operations
              </span>
            )}
            {superAdminNav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ) : isReporterArea ? (
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Reporter Workspace
              </span>
            )}
            {reporterNav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="space-y-6">
            <Link
              href="/admin"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                pathname === "/admin"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
              title={sidebarCollapsed ? "Dashboard" : undefined}
            >
              <RiDashboard3Line className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && <span>Overview</span>}
            </Link>

            {newspaperAdminNav.slice(1).map((section: any, idx) => (
              <div key={idx} className="space-y-1">
                {!sidebarCollapsed && (
                  <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {section.group}
                  </span>
                )}
                {section.items.map((item: any) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition ${
                        item.highlight
                          ? active
                            ? "bg-blue-600 text-white"
                            : "bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60"
                          : active
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                      }`}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Icon className="h-4 w-4 shrink-0" />
                        {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                      </div>
                      {!sidebarCollapsed && item.badge && (
                        <span className="rounded-full bg-blue-100 dark:bg-blue-950 px-1.5 py-0.2 text-[10px] font-bold text-blue-700 dark:text-blue-300">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Live Newspaper Link */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-lg p-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200 transition"
          title="View Live Newspaper"
        >
          <div className="flex items-center gap-2.5 truncate">
            <RiExternalLinkLine className="h-4 w-4 shrink-0 text-blue-600" />
            {!sidebarCollapsed && <span className="truncate">View Public Site</span>}
          </div>
        </Link>
      </div>
    </aside>
  );
}
