"use client";

import { useUIStore } from "@/stores/ui-store";
import { RiSunLine, RiMoonLine } from "@remixicon/react";
import { useEffect } from "react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { toggleTheme, setTheme } = useUIStore();

  // Sync state with DOM on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, [setTheme]);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light theme"
      title="Toggle dark/light mode"
      className={`flex h-7 w-7 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 active:scale-95 ${className}`}
    >
      {/* Light Mode: Moon Icon (visible in light mode, hidden in dark mode) */}
      <RiMoonLine className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300 block dark:hidden transition-transform duration-300 hover:-rotate-12" />

      {/* Dark Mode: Sun Icon (hidden in light mode, visible in dark mode) */}
      <RiSunLine className="h-3.5 w-3.5 text-amber-500 hidden dark:block transition-transform duration-300 hover:rotate-45" />
    </button>
  );
}
