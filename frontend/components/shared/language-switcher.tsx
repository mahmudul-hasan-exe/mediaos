"use client";

import { useUIStore } from "@/stores/ui-store";
import { SupportedLocale } from "@/lib/translations";
import { RiGlobalLine, RiCheckLine } from "@remixicon/react";
import { useState, useRef, useEffect } from "react";

const languages: { code: SupportedLocale; name: string; nativeName: string; flag: string }[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "bn", name: "Bangla", nativeName: "বাংলা", flag: "🇧🇩" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
];

interface LanguageSwitcherProps {
  showLabel?: boolean;
  className?: string;
}

export function LanguageSwitcher({ showLabel = false, className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useUIStore();
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

  const current = languages.find((l) => l.code === locale) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={`Change Language (${current.name})`}
        aria-label="Select language"
        className={`flex h-7 w-7 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xs transition-all duration-200 active:scale-95 ${
          showLabel ? "px-2.5 gap-1.5 w-auto text-xs font-semibold" : ""
        } ${className}`}
      >
        <RiGlobalLine className="h-3.5 w-3.5" />
        {showLabel && (
          <>
            <span>{current.flag}</span>
            <span className="font-medium">{current.nativeName}</span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Language / ভাষা
          </div>
          {languages.map((lang) => {
            const isSelected = lang.code === locale;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-xs transition ${
                  isSelected
                    ? "bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-white"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <span className="font-medium">{lang.nativeName}</span>
                </div>
                {isSelected && <RiCheckLine className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
