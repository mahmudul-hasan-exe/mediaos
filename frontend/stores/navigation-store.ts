import { apiClient, ApiResponse } from "@/lib/api-client";
import { create } from "zustand";

export interface NavChildItem {
  id: string;
  label: string;
  href: string;
  target?: string;
}

export interface NavMenuItem {
  id: string;
  label: string;
  href: string;
  target?: string;
  children?: NavChildItem[];
}

export interface NavMenusMap {
  header: NavMenuItem[];
  mega: NavMenuItem[];
  more: NavMenuItem[];
  drawer: NavMenuItem[];
}

export interface NavLatestArticle {
  id: string;
  title: string;
  href: string;
}

interface NavigationApiPayload {
  menus: NavMenusMap;
  latestArticles: NavLatestArticle[];
}

const DEFAULT_MENUS: NavMenusMap = {
  header: [
    { id: "h-1", label: "National", href: "/category/national" },
    { id: "h-2", label: "World", href: "/category/world" },
    { id: "h-3", label: "Politics", href: "/category/politics" },
    { id: "h-4", label: "Economy", href: "/category/business" },
    { id: "h-5", label: "Sports", href: "/category/sports" },
    { id: "h-6", label: "Entertainment", href: "/category/entertainment" },
    { id: "h-7", label: "Technology", href: "/category/technology" },
    { id: "h-8", label: "Opinion", href: "/category/culture-opinion" },
    { id: "h-9", label: "Health", href: "/category/health" },
  ],
  mega: [
    { id: "m-1", label: "National", href: "/category/national" },
    { id: "m-2", label: "World", href: "/category/world" },
    { id: "m-3", label: "Politics", href: "/category/politics" },
    { id: "m-4", label: "Economy", href: "/category/business" },
    { id: "m-5", label: "Sports", href: "/category/sports" },
    { id: "m-6", label: "Entertainment", href: "/category/entertainment" },
    { id: "m-7", label: "Technology", href: "/category/technology" },
    { id: "m-8", label: "Opinion", href: "/category/culture-opinion" },
    { id: "m-9", label: "Health", href: "/category/health" },
    { id: "m-10", label: "Education", href: "/category/education" },
    { id: "m-11", label: "Lifestyle", href: "/category/lifestyle" },
    { id: "m-12", label: "Environment", href: "/category/climate-science" },
  ],
  more: [
    { id: "mo-1", label: "Live Coverage", href: "/#live" },
    { id: "mo-2", label: "Shorts & Reels", href: "/#shorts" },
    { id: "mo-3", label: "Audio Podcasts", href: "/#podcasts" },
    { id: "mo-4", label: "E-Paper Edition", href: "/epaper" },
    { id: "mo-5", label: "Editorial Authors", href: "/author/sarah-jenkins" },
    { id: "mo-6", label: "Trending Topics", href: "/trending" },
    { id: "mo-7", label: "Dispatch Archive", href: "/search" },
    { id: "mo-8", label: "Support Journalism", href: "/contact" },
  ],
  drawer: [
    { id: "d-1", label: "Home", href: "/" },
    {
      id: "d-2",
      label: "World Affairs",
      href: "/category/world",
      children: [
        { id: "d-2-1", label: "World Affairs", href: "/category/world" },
        { id: "d-2-2", label: "Diplomacy & Treaties", href: "/category/world" },
        { id: "d-2-3", label: "Global Geopolitics", href: "/category/world" },
        { id: "d-2-4", label: "International Security", href: "/category/world" },
      ],
    },
    {
      id: "d-3",
      label: "Business",
      href: "/category/business",
      children: [
        { id: "d-3-1", label: "Business", href: "/category/business" },
        { id: "d-3-2", label: "Technology of Business", href: "/category/business" },
        { id: "d-3-3", label: "Capital Markets & Banking", href: "/category/business" },
      ],
    },
    {
      id: "d-4",
      label: "Technology",
      href: "/category/technology",
      children: [
        { id: "d-4-1", label: "Technology", href: "/category/technology" },
        { id: "d-4-2", label: "Artificial Intelligence", href: "/category/technology" },
        { id: "d-4-3", label: "Quantum Computing", href: "/category/technology" },
        { id: "d-4-4", label: "Cybersecurity", href: "/category/technology" },
      ],
    },
    {
      id: "d-5",
      label: "Climate & Science",
      href: "/category/climate-science",
      children: [
        { id: "d-5-1", label: "Climate & Science", href: "/category/climate-science" },
        { id: "d-5-2", label: "Clean Energy Transition", href: "/category/climate-science" },
        { id: "d-5-3", label: "Space Exploration", href: "/category/climate-science" },
      ],
    },
    {
      id: "d-6",
      label: "Investigations",
      href: "/category/investigations",
      children: [
        { id: "d-6-1", label: "Investigative Desk", href: "/category/investigations" },
        { id: "d-6-2", label: "Public Accountability", href: "/category/investigations" },
      ],
    },
    {
      id: "d-7",
      label: "Culture & Opinion",
      href: "/category/culture-opinion",
      children: [
        { id: "d-7-1", label: "Culture & Life", href: "/category/culture-opinion" },
        { id: "d-7-2", label: "Literature & Criticism", href: "/category/culture-opinion" },
      ],
    },
    { id: "d-8", label: "Trending Wire", href: "/trending" },
    { id: "d-9", label: "Digital e-Paper", href: "/epaper" },
  ],
};

const DEFAULT_LATEST: NavLatestArticle[] = [
  {
    id: "lat-1",
    title: "Global Leaders Reach Historic Accord on Autonomous AI Governance Frameworks",
    href: "/news/global-leaders-historic-accord-autonomous-ai-governance",
  },
  {
    id: "lat-2",
    title: "Quantum Chip Architecture Breaks 10,000 Logical Qubit Threshold",
    href: "/news/quantum-chip-architecture-breaks-logical-qubit-threshold",
  },
  {
    id: "lat-3",
    title: "Central Banks Accelerate Interoperable Digital Currency Trials Amid Trade Shifts",
    href: "/news/central-banks-accelerate-cbdc-trials-trade-shifts",
  },
  {
    id: "lat-4",
    title: "Renewable Microgrids Shield Coastal Metropolises from Severe Winter Superstorms",
    href: "/news/renewable-microgrids-shield-coastal-metropolises",
  },
];

interface NavigationState {
  menus: NavMenusMap;
  latestArticles: NavLatestArticle[];
  loadedTenantId: string | null;
  lastFetchedAt: number;
  isFetching: boolean;
  fetchNavigation: (tenantId: string, force?: boolean) => Promise<void>;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  menus: DEFAULT_MENUS,
  latestArticles: DEFAULT_LATEST,
  loadedTenantId: null,
  lastFetchedAt: 0,
  isFetching: false,

  fetchNavigation: async (tenantId: string, force = false) => {
    const state = get();
    const now = Date.now();

    if (state.isFetching) return;
    if (!force && state.loadedTenantId === tenantId && now - state.lastFetchedAt < 2000) {
      return;
    }

    set({ isFetching: true });

    try {
      const activeCode = tenantId || "ten-01";
      const response = await apiClient.get<ApiResponse<NavigationApiPayload>>("/navigation", {
        params: { tenant: activeCode, _t: now },
        headers: {
          "X-Tenant-ID": activeCode,
        },
      });

      if (response.data?.success && response.data.data?.menus) {
        set({
          menus: response.data.data.menus,
          latestArticles:
            response.data.data.latestArticles && response.data.data.latestArticles.length > 0
              ? response.data.data.latestArticles
              : DEFAULT_LATEST,
          loadedTenantId: tenantId,
          lastFetchedAt: Date.now(),
          isFetching: false,
        });
        return;
      }
    } catch {
      // Keep default fallback menus silently if backend API is temporarily offline
    }

    set({ isFetching: false });
  },
}));
