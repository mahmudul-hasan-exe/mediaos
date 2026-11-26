import { create } from "zustand";
import { Tenant } from "@/types";

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: "ten-01",
    name: "MediaOS",
    slug: "mediaos",
    domain: "mediaos.com",
    logo: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100&auto=format&fit=crop&q=80",
    primaryColor: "#2563EB",
    supportedLanguages: ["en"],
    defaultLanguage: "en",
    plan: "Enterprise",
    status: "active",
    aiLimit: 5000000,
    aiUsage: 1420500,
    contactEmail: "press@mediaos.com",
    ownerName: "Arthur Sterling",
    createdAt: "2024-03-10T10:00:00Z",
    websiteConfig: {
      siteTitle: "MediaOS — AI-Powered Multi-Tenant Digital Publishing Platform",
      tagline: "Unbiased reporting, fearless investigations, in-depth analysis.",
      breakingNewsEnabled: true,
      ePaperEnabled: true,
      commentsModeration: true,
      advertisementsEnabled: true,
      facebookUrl: "https://facebook.com/mediaos",
      twitterUrl: "https://twitter.com/mediaos",
      youtubeUrl: "https://youtube.com/@mediaos",
    },
  },
  {
    id: "ten-02",
    name: "The Dhaka Standard",
    slug: "dhaka-standard",
    domain: "dhakastandard.com",
    logo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100&auto=format&fit=crop&q=80",
    primaryColor: "#059669",
    supportedLanguages: ["bn", "en"],
    defaultLanguage: "bn",
    plan: "Professional",
    status: "active",
    aiLimit: 2500000,
    aiUsage: 890400,
    contactEmail: "editor@dhakastandard.com",
    ownerName: "Tanvir Ahmed",
    createdAt: "2024-06-18T14:30:00Z",
    websiteConfig: {
      siteTitle: "ঢাকা স্ট্যান্ডার্ড — নির্ভীক ও নিরপেক্ষ সংবাদপত্র",
      tagline: "সত্য প্রকাশে আপসহীন প্রতিদিন।",
      breakingNewsEnabled: true,
      ePaperEnabled: true,
      commentsModeration: true,
      advertisementsEnabled: true,
      facebookUrl: "https://facebook.com/dhakastandard",
      twitterUrl: "https://twitter.com/dhakastandard",
    },
  },
  {
    id: "ten-03",
    name: "Al-Sharq Tribune",
    slug: "alsharq-tribune",
    domain: "alsharqtribune.ae",
    logo: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=100&auto=format&fit=crop&q=80",
    primaryColor: "#D97706",
    supportedLanguages: ["ar", "en"],
    defaultLanguage: "ar",
    plan: "Enterprise",
    status: "active",
    aiLimit: 4000000,
    aiUsage: 1200300,
    contactEmail: "desk@alsharqtribune.ae",
    ownerName: "Sheikh Tariq Mansoor",
    createdAt: "2024-08-01T09:00:00Z",
    websiteConfig: {
      siteTitle: "الشرق تريبيون — صوت الشرق الأوسط والعالم",
      tagline: "تغطية شاملة وموثوقة على مدار الساعة.",
      breakingNewsEnabled: true,
      ePaperEnabled: true,
      commentsModeration: true,
      advertisementsEnabled: true,
      facebookUrl: "https://facebook.com/alsharqtribune",
      twitterUrl: "https://twitter.com/alsharqtribune",
    },
  },
  {
    id: "ten-04",
    name: "Pacific Tech Herald",
    slug: "pacific-tech",
    domain: "techherald.io",
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&auto=format&fit=crop&q=80",
    primaryColor: "#7C3AED",
    supportedLanguages: ["en"],
    defaultLanguage: "en",
    plan: "Starter",
    status: "suspended",
    aiLimit: 500000,
    aiUsage: 512000,
    contactEmail: "contact@techherald.io",
    ownerName: "Elena Rostova",
    createdAt: "2024-11-04T11:20:00Z",
    websiteConfig: {
      siteTitle: "Pacific Tech Herald — Frontier Technologies & AI",
      tagline: "The definitive source for deep tech insights.",
      breakingNewsEnabled: false,
      ePaperEnabled: false,
      commentsModeration: true,
      advertisementsEnabled: false,
    },
  },
];

interface TenantState {
  currentTenant: Tenant;
  tenants: Tenant[];
  setTenant: (tenant: Tenant) => void;
  setTenantById: (id: string) => void;
  updateCurrentTenant: (updates: Partial<Tenant>) => void;
  toggleTenantStatus: (id: string) => void;
}

export const useTenantStore = create<TenantState>((set, get) => ({
  currentTenant: INITIAL_TENANTS[0],
  tenants: INITIAL_TENANTS,

  setTenant: (tenant) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mediaos_active_tenant_id", tenant.id);
      localStorage.setItem("mediaos_active_tenant_domain", tenant.domain);
    }
    set({ currentTenant: tenant });
  },

  setTenantById: (id) => {
    const found = get().tenants.find((t) => t.id === id);
    if (found) {
      get().setTenant(found);
    }
  },

  updateCurrentTenant: (updates) => {
    set((state) => {
      const updated = { ...state.currentTenant, ...updates };
      const updatedList = state.tenants.map((t) => (t.id === updated.id ? updated : t));
      return { currentTenant: updated, tenants: updatedList };
    });
  },

  toggleTenantStatus: (id) => {
    set((state) => {
      const updatedList = state.tenants.map((t) => {
        if (t.id === id) {
          const newStatus = t.status === "active" ? "suspended" : "active";
          return { ...t, status: newStatus as "active" | "suspended" };
        }
        return t;
      });
      const current = updatedList.find((t) => t.id === state.currentTenant.id) || state.currentTenant;
      return { tenants: updatedList, currentTenant: current };
    });
  },
}));

