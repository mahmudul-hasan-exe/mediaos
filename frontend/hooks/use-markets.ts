"use client";

import { useState, useEffect, useCallback } from "react";
import { marketService, DEFAULT_MARKETS } from "@/services/market-service";
import { MarketItem } from "@/types/market";

interface UseMarketsOptions {
  pollingInterval?: number; // milliseconds, defaults to 5 minutes (300000ms)
  autoRefresh?: boolean;
}

export function useMarkets(options: UseMarketsOptions = {}) {
  const { pollingInterval = 300000, autoRefresh = true } = options;

  // Initialize with DEFAULT_MARKETS to guarantee 100% match between SSR and initial client hydration
  const [markets, setMarkets] = useState<MarketItem[]>(DEFAULT_MARKETS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchMarkets = useCallback(async (force = false) => {
    try {
      setError(null);
      const data = await marketService.getLiveMarkets(force);
      if (data && data.length > 0) {
        setMarkets(data);
        setLastUpdated(new Date());
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load live market data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // 1. Immediately hydrate with persisted localStorage markets if present
    const cached = marketService.getInitialMarkets();
    if (cached && cached.length > 0) {
      setMarkets(cached);
    }

    if (!autoRefresh || pollingInterval <= 0) return;

    // 2. Background interval refresh
    const interval = setInterval(() => {
      fetchMarkets(true);
    }, pollingInterval);

    return () => clearInterval(interval);
  }, [fetchMarkets, autoRefresh, pollingInterval]);

  return {
    markets,
    isLoading,
    error,
    lastUpdated,
    refresh: () => fetchMarkets(true),
  };
}


