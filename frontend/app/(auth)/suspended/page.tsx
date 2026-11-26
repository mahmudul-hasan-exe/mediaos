"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { RiUserForbidLine, RiMailLine, RiArrowLeftLine, RiLogoutBoxRLine, RiAlertLine } from "@remixicon/react";
import { useAuthStore } from "@/stores/auth-store";

function SuspendedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const email = searchParams.get("email") || user?.email || "your account";

  const handleSwitchAccount = async () => {
    try {
      await logout();
    } catch {
      // ignore
    }
    router.push("/login");
  };

  return (
    <div className="space-y-6 text-center animate-in fade-in duration-200">
      {/* Icon Badge */}
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-900/60 shadow-xs">
        <RiUserForbidLine className="h-8 w-8" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-950">
          !
        </span>
      </div>

      {/* Main Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
          <RiAlertLine className="h-3 w-3" />
          <span>Account Suspended</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-zinc-900 dark:text-zinc-50">
          Access Restricted
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
          Your account is currently suspended and restricted from logging in to MediaOS.
        </p>
      </div>

      {/* Account Info Box */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 p-4 text-left space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 dark:text-zinc-400 font-medium">Affected Account</span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-[200px]" title={email}>
            {email}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-zinc-200/70 dark:border-zinc-800/80 pt-2">
          <span className="text-zinc-500 dark:text-zinc-400 font-medium">Status</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400">
            Suspended
          </span>
        </div>
        <div className="flex items-start justify-between border-t border-zinc-200/70 dark:border-zinc-800/80 pt-2">
          <span className="text-zinc-500 dark:text-zinc-400 font-medium">Notice</span>
          <span className="text-right text-zinc-600 dark:text-zinc-400 text-[11px] max-w-[220px]">
            This action was initiated by editorial administrators due to a policy review or status update.
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-1">
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <RiMailLine className="h-4 w-4" />
          <span>Contact Editorial Support</span>
        </Link>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-1.5 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition"
          >
            <RiArrowLeftLine className="h-3.5 w-3.5" />
            <span>Front Page</span>
          </Link>

          <button
            type="button"
            onClick={handleSwitchAccount}
            className="flex items-center justify-center gap-1.5 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
          >
            <RiLogoutBoxRLine className="h-3.5 w-3.5" />
            <span>Switch Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SuspendedPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 text-center py-12">
          <div className="h-14 w-14 mx-auto rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="h-6 w-48 mx-auto rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        </div>
      }
    >
      <SuspendedContent />
    </Suspense>
  );
}
