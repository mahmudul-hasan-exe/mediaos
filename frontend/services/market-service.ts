import axios from "axios";
import { MarketItem, MarketsApiResponse, MarketCategory } from "@/types/market";

const MARKETS_CACHE_KEY = "mediaos_cached_markets_v2";
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes client cache

export const DEFAULT_MARKETS: MarketItem[] = [
  {
    id: "sp500",
    symbol: "^GSPC",
    name: "S&P 500",
    price: 5983.99,
    formattedPrice: "5,983.99",
    change: 22.45,
    changePercent: 0.38,
    formattedChange: "+0.38%",
    isUp: true,
    category: "indices",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "nasdaq",
    symbol: "^IXIC",
    name: "Nasdaq",
    price: 19281.4,
    formattedPrice: "19,281.40",
    change: 17.8,
    changePercent: 0.09,
    formattedChange: "+0.09%",
    isUp: true,
    category: "indices",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "dow",
    symbol: "^DJI",
    name: "Dow Jones",
    price: 43988.99,
    formattedPrice: "43,988.99",
    change: 259.65,
    changePercent: 0.59,
    formattedChange: "+0.59%",
    isUp: true,
    category: "indices",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "gold",
    symbol: "GC=F",
    name: "Gold",
    price: 2684.2,
    formattedPrice: "$2,684.20",
    change: -11.3,
    changePercent: -0.42,
    formattedChange: "-0.42%",
    isUp: false,
    category: "commodities",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "crude",
    symbol: "CL=F",
    name: "Crude Oil",
    price: 70.38,
    formattedPrice: "$70.38",
    change: 0.67,
    changePercent: 0.96,
    formattedChange: "+0.96%",
    isUp: true,
    category: "commodities",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "eurusd",
    symbol: "EURUSD=X",
    name: "EUR/USD",
    price: 1.0718,
    formattedPrice: "1.0718",
    change: -0.0004,
    changePercent: -0.04,
    formattedChange: "-0.04%",
    isUp: false,
    category: "currencies",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "btc",
    symbol: "BTCUSDT",
    name: "Bitcoin",
    price: 76500.0,
    formattedPrice: "$76,500.00",
    change: 1250.0,
    changePercent: 1.66,
    formattedChange: "+1.66%",
    isUp: true,
    category: "crypto",
    updatedAt: new Date().toISOString(),
  },
];

export class MarketService {
  private static instance: MarketService;
  private cachedData: MarketItem[] | null = null;
  private lastFetchTime = 0;

  private constructor() {}

  public static getInstance(): MarketService {
    if (!MarketService.instance) {
      MarketService.instance = new MarketService();
    }
    return MarketService.instance;
  }

  /**
   * Synchronously retrieve cached markets from localStorage if available (for instant zero-flicker render on reload)
   */
  public getInitialMarkets(): MarketItem[] {
    if (this.cachedData && this.cachedData.length > 0) {
      return this.cachedData;
    }

    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(MARKETS_CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed?.data) && parsed.data.length > 0) {
            this.cachedData = parsed.data;
            this.lastFetchTime = parsed.timestamp || Date.now();
            return parsed.data;
          }
        }
      } catch {
        // Safe access
      }
    }

    return DEFAULT_MARKETS;
  }

  /**
   * Fetches real-time financial market data from our cached proxy endpoint.
   * If cache is still fresh (< 15 mins), returns cache immediately without making any network call!
   */
  public async getLiveMarkets(forceRefresh = false): Promise<MarketItem[]> {
    const now = Date.now();

    // 1. Try memory cache
    if (!forceRefresh && this.cachedData && now - this.lastFetchTime < CACHE_TTL_MS) {
      return this.cachedData;
    }

    // 2. Try localStorage cache
    if (!forceRefresh && typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(MARKETS_CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            Array.isArray(parsed?.data) &&
            parsed.data.length > 0 &&
            now - (parsed.timestamp || 0) < CACHE_TTL_MS
          ) {
            this.cachedData = parsed.data;
            this.lastFetchTime = parsed.timestamp;
            return parsed.data;
          }
        }
      } catch {
        // Safe access
      }
    }

    // 3. Cache expired or force refresh: fetch from server
    try {
      const response = await axios.get<MarketsApiResponse>("/api/markets", {
        timeout: 8000,
      });

      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        this.cachedData = response.data.data;
        this.lastFetchTime = now;

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              MARKETS_CACHE_KEY,
              JSON.stringify({
                data: response.data.data,
                timestamp: now,
              })
            );
          } catch {
            // Safe access
          }
        }

        return this.cachedData;
      }
    } catch {
      // Return previously cached data or fallback on network failure
      if (this.cachedData && this.cachedData.length > 0) {
        return this.cachedData;
      }
    }

    return this.getInitialMarkets();
  }

  /**
   * Get filtered markets by category (indices, commodities, currencies, crypto)
   */
  public async getMarketsByCategory(category: MarketCategory): Promise<MarketItem[]> {
    const all = await this.getLiveMarkets();
    return all.filter((m) => m.category === category);
  }

  /**
   * Helper to format a single quote value
   */
  public formatQuote(item: MarketItem): {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
  } {
    return {
      title: item.name,
      value: item.formattedPrice,
      change: item.formattedChange,
      isPositive: item.isUp,
    };
  }
}

export const marketService = MarketService.getInstance();


