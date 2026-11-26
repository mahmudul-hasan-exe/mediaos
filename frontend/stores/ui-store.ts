import { create } from "zustand";
import { SupportedLocale, isRTL } from "@/lib/translations";

interface UIState {
  locale: SupportedLocale;
  isRtl: boolean;
  theme: "light" | "dark";
  sidebarCollapsed: boolean;
  setLocale: (locale: SupportedLocale) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  locale: "en",
  isRtl: false,
  theme: "light",
  sidebarCollapsed: false,

  setLocale: (locale) => {
    const rtl = isRTL(locale);
    if (typeof window !== "undefined") {
      localStorage.setItem("mediaos_locale", locale);
      document.documentElement.dir = rtl ? "rtl" : "ltr";
      document.documentElement.lang = locale;
    }
    set({ locale, isRtl: rtl });
  },

  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("mediaos_theme", nextTheme);
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
      return { theme: nextTheme };
    });
  },

  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mediaos_theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    set({ theme });
  },

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}));

