"use client";

import React, { useState, useEffect } from "react";
import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiSunLine,
  RiMapPinLine,
} from "@remixicon/react";
import { useMarkets } from "@/hooks/use-markets";
import { Skeleton } from "@/components/ui/skeleton";

const WEATHER_CACHE_KEY = "mediaos_weather_cache_v2";
const WEATHER_TTL_MS = 20 * 60 * 1000; // 20 minutes client cache

interface LocationWeatherState {
  city: string;
  temp: string;
  condition: string;
  isLoaded: boolean;
}

export function PortalMarketBar() {
  const { markets, isLoading } = useMarkets({ pollingInterval: 300000 });

  // Initialize with stable defaults for zero hydration mismatch between SSR & Client
  const [userLocation, setUserLocation] = useState<LocationWeatherState>({
    city: "Tangail Paurashava",
    temp: "25°C",
    condition: "Clear",
    isLoaded: true,
  });

  useEffect(() => {
    let isMounted = true;
    const now = Date.now();

    // 1. Check if cached weather is still fresh (< 20 mins)
    let isCacheFresh = false;
    try {
      const cached = localStorage.getItem(WEATHER_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.city && parsed.temp) {
          setUserLocation({
            city: parsed.city,
            temp: parsed.temp,
            condition: parsed.condition || "Clear",
            isLoaded: true,
          });

          // Check if cache age is within 20 minutes TTL
          const cacheAge = now - (parsed.updatedAt || 0);
          if (cacheAge < WEATHER_TTL_MS) {
            isCacheFresh = true;
          }
        }
      }
    } catch {
      // Storage access fail-safe
    }

    // If cache is fresh, DO NOT query GPS or fetch /api/weather on reload!
    if (isCacheFresh) {
      return;
    }

    // Helper to update state and cache atomically
    const applyWeather = (city: string, temp: string, condition: string, coords?: { lat: number; lon: number }) => {
      if (!isMounted) return;
      setUserLocation({
        city,
        temp,
        condition: condition || "Clear",
        isLoaded: true,
      });
      try {
        localStorage.setItem(
          WEATHER_CACHE_KEY,
          JSON.stringify({
            city,
            temp,
            condition: condition || "Clear",
            coords,
            updatedAt: Date.now(),
          })
        );
      } catch {
        // Storage quota / access safe
      }
    };

    // Helper to fetch weather with or without coordinates
    const fetchWeatherApi = async (lat?: number, lon?: number) => {
      try {
        const url =
          lat !== undefined && lon !== undefined
            ? `/api/weather?lat=${lat}&lon=${lon}`
            : "/api/weather";
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data && data.city && data.temp) {
            applyWeather(
              data.city,
              data.temp,
              data.condition,
              lat !== undefined && lon !== undefined ? { lat, lon } : undefined
            );
          }
        }
      } catch {
        // Retain current or fallback
      }
    };

    // 2. Request browser real-time geolocation with high accuracy only when cache is expired or missing
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherApi(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          fetchWeatherApi();
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: WEATHER_TTL_MS,
        }
      );
    } else {
      fetchWeatherApi();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Display items (duplicate for smooth continuous marquee animation)
  const displayItems = markets.length > 0 ? [...markets, ...markets] : [];

  return (
    <div className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-[11px] text-zinc-600 dark:text-zinc-400 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
        {/* Real-Time Financial Ticker Marquee */}
        <div className="flex-1 overflow-hidden relative mr-2">
          {isLoading && markets.length === 0 ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-3.5 w-24 rounded-full" />
              <Skeleton className="h-3.5 w-20 rounded-full" />
              <Skeleton className="h-3.5 w-28 rounded-full hidden sm:block" />
            </div>
          ) : (
            <div className="animate-ticker flex items-center gap-6 whitespace-nowrap">
              {displayItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex items-center gap-1.5">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {item.name}
                  </span>
                  <span className="text-zinc-900 dark:text-zinc-100 font-mono font-medium">
                    {item.formattedPrice}
                  </span>
                  <span
                    className={`inline-flex items-center font-bold text-[10px] ${
                      item.isUp
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {item.isUp ? (
                      <RiArrowUpLine className="h-3 w-3 inline" />
                    ) : (
                      <RiArrowDownLine className="h-3 w-3 inline" />
                    )}
                    {item.formattedChange}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User's Real-Time Live Location & Weather (No flickering / Instant reload from cache / Clean Inline) */}
        <div className="flex items-center gap-1.5 shrink-0 pl-3 border-l border-zinc-200 dark:border-zinc-800 text-[11px]">
          <RiMapPinLine className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          {userLocation.isLoaded ? (
            <>
              <span
                className="font-bold text-zinc-800 dark:text-zinc-200 max-w-[140px] truncate"
                title={userLocation.city}
              >
                {userLocation.city}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <RiSunLine className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                {userLocation.temp}
              </span>
              <span className="hidden sm:inline text-zinc-500 text-[10px] capitalize">
                {userLocation.condition}
              </span>
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-16 rounded-full" />
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <Skeleton className="h-3 w-8 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

