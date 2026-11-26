"use client";

import { useAuthStore } from "@/stores/auth-store";
import { UserRole } from "@/types";
import { ShieldCheck, Newspaper, Edit3, PenTool, CheckCircle, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const ROLES: {
  role: UserRole;
  label: string;
  badge: string;
  route: string;
  icon: typeof ShieldCheck;
  description: string;
}[] = [
  {
    role: "super-admin",
    label: "Super Admin",
    badge: "Platform",
    route: "/super-admin",
    icon: ShieldCheck,
    description: "Manage all newspaper tenants, subscriptions & AI configs",
  },
  {
    role: "admin",
    label: "Newspaper Admin",
    badge: "CMS Admin",
    route: "/admin",
    icon: Newspaper,
    description: "Full publication management, news, ads, e-paper & settings",
  },
  {
    role: "editor",
    label: "Editorial Desk",
    badge: "Editor",
    route: "/admin/news/review",
    icon: Edit3,
    description: "Review queue, story approvals, change requests & fact-checking",
  },
  {
    role: "reporter",
    label: "Reporter Desk",
    badge: "Reporter",
    route: "/reporter",
    icon: PenTool,
    description: "Story drafting, reporter assignments & performance stats",
  },
];

export function RoleSwitcher() {
  const { user, switchRole } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentRoleConfig = ROLES.find((r) => r.role === user?.role) || ROLES[0];
  const Icon = currentRoleConfig.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center gap-2 rounded-lg border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30 px-3 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-sm transition hover:bg-blue-100/60 dark:hover:bg-blue-900/50"
      >
        <Icon className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        <span className="hidden md:inline">{currentRoleConfig.label}</span>
        <ChevronDown className="h-3 w-3 opacity-60" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-72 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95">
          <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Switch Role View (Demo Simulation)
          </div>
          <div className="mt-1 space-y-1">
            {ROLES.map((r) => {
              const RoleIcon = r.icon;
              const isSelected = user?.role === r.role;
              return (
                <button
                  key={r.role}
                  onClick={() => {
                    switchRole(r.role);
                    setIsOpen(false);
                    router.push(r.route);
                  }}
                  className={`flex w-full items-start gap-3 rounded-lg p-2 text-left transition ${
                    isSelected
                      ? "bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                  }`}
                >
                  <div className={`mt-0.5 rounded-md p-1.5 ${isSelected ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}>
                    <RoleIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">{r.label}</span>
                      {isSelected && <CheckCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                    </div>
                    <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                      {r.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

