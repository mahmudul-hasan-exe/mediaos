"use client";

import React, { useEffect, useState } from "react";
import {
  useMediaOSToastStore,
  ToastItem,
  ToastType,
} from "@/stores/mediaos-toast-store";
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiAlertFill,
  RiInformationFill,
  RiCloseLine,
} from "@remixicon/react";

function ToastCard({ toast }: { toast: ToastItem }) {
  const dismissToast = useMediaOSToastStore((s) => s.dismissToast);
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(100);

  const duration = toast.duration || 4000;

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        handleClose();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      dismissToast(toast.id);
    }, 200);
  };

  const typeConfig: Record<
    ToastType,
    {
      icon: React.ReactNode;
      border: string;
      barColor: string;
      accentBg: string;
    }
  > = {
    success: {
      icon: <RiCheckboxCircleFill className="h-5 w-5 text-emerald-500 shrink-0" />,
      border: "border-emerald-200/80 dark:border-emerald-900/60",
      barColor: "bg-emerald-500",
      accentBg: "bg-emerald-50/40 dark:bg-emerald-950/20",
    },
    error: {
      icon: <RiCloseCircleFill className="h-5 w-5 text-rose-500 shrink-0" />,
      border: "border-rose-200/80 dark:border-rose-900/60",
      barColor: "bg-rose-500",
      accentBg: "bg-rose-50/40 dark:bg-rose-950/20",
    },
    warning: {
      icon: <RiAlertFill className="h-5 w-5 text-amber-500 shrink-0" />,
      border: "border-amber-200/80 dark:border-amber-900/60",
      barColor: "bg-amber-500",
      accentBg: "bg-amber-50/40 dark:bg-amber-950/20",
    },
    info: {
      icon: <RiInformationFill className="h-5 w-5 text-blue-500 shrink-0" />,
      border: "border-blue-200/80 dark:border-blue-900/60",
      barColor: "bg-blue-500",
      accentBg: "bg-blue-50/40 dark:bg-blue-950/20",
    },
  };

  const config = typeConfig[toast.type];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${config.border} bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-xl shadow-zinc-950/5 dark:shadow-zinc-950/40 transition-all duration-200 pointer-events-auto p-4 flex flex-col gap-2 ${
        isClosing
          ? "opacity-0 translate-x-4 scale-95"
          : "opacity-100 translate-x-0 scale-100 animate-in fade-in slide-in-from-top-2 duration-200"
      }`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {config.icon}
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
            {toast.title}
          </p>
          {toast.description && (
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
              {toast.description}
            </p>
          )}

          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                handleClose();
              }}
              className="mt-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        <button
          onClick={handleClose}
          className="rounded-lg p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition -mr-1 -mt-1 cursor-pointer"
          title="Dismiss"
        >
          <RiCloseLine className="h-4 w-4" />
        </button>
      </div>

      {/* Subtle Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-100 dark:bg-zinc-800">
        <div
          className={`h-full ${config.barColor} transition-all duration-75`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function MediaOSToastContainer() {
  const toasts = useMediaOSToastStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
