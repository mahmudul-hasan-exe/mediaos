import { NextResponse } from "next/server";
import { MarketItem, MarketsApiResponse } from "@/types/market";

// In-memory cache for 60 seconds to prevent rate limits
let cachedData: { timestamp: number; items: MarketItem[] } | null = null;
const CACHE_TTL_MS = 60 * 1000;

interface SymbolConfig {
  symbol: string;
  name: string;
  category: "indices" | "commodities" | "currencies" | "crypto";
  prefix?: string;
  decimals?: number;
}

const YAHOO_SYMBOLS: SymbolConfig[] = [
  { symbol: "^GSPC", name: "S&P 500", category: "indices", decimals: 2 },
  { symbol: "^IXIC", name: "NASDAQ", category: "indices", decimals: 2 },
  { symbol: "^DJI", name: "DOW JONES", category: "indices", decimals: 2 },
  { symbol: "^FTSE", name: "FTSE 100", category: "indices", decimals: 2 },
  { symbol: "GC=F", name: "GOLD (OZ)", category: "commodities", prefix: "$", decimals: 2 },
  { symbol: "CL=F", name: "CRUDE OIL", category: "commodities", prefix: "$", decimals: 2 },
  { symbol: "EURUSD=X", name: "EUR / USD", category: "currencies", decimals: 4 },
  { symbol: "GBPUSD=X", name: "GBP / USD", category: "currencies", decimals: 4 },
];

async function fetchYahooSymbol(config: SymbolConfig): Promise<MarketItem | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      config.symbol
    )}?interval=1d&range=1d`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    const meta = json?.chart?.result?.[0]?.meta;
    if (!meta) return null;

    const price = Number(meta.regularMarketPrice || 0);
    const prev = Number(meta.chartPreviousClose || meta.previousClose || price);
    const change = price - prev;
    const changePercent = prev > 0 ? (change / prev) * 100 : 0;
    const decimals = config.decimals ?? 2;
    const prefix = config.prefix || "";

    return {
      id: config.symbol,
      symbol: config.symbol,
      name: config.name,
      price,
      formattedPrice: `${prefix}${price.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}`,
      change: Number(change.toFixed(decimals)),
      changePercent: Number(changePercent.toFixed(2)),
      formattedChange: `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`,
      isUp: changePercent >= 0,
      category: config.category,
      updatedAt: new Date().toISOString(),
    };
  } catch (err) {
    return null;
  }
}

async function fetchBinanceCrypto(): Promise<MarketItem[]> {
  try {
    const res = await fetch(
      'https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","SOLUSDT"]',
      {
        next: { revalidate: 30 },
      }
    );
    if (!res.ok) return [];
    const tickers: Array<{ symbol: string; lastPrice: string; priceChangePercent: string }> =
      await res.json();

    const names: Record<string, string> = {
      BTCUSDT: "BITCOIN",
      ETHUSDT: "ETHEREUM",
      SOLUSDT: "SOLANA",
    };

    return tickers.map((t) => {
      const price = parseFloat(t.lastPrice);
      const changePercent = parseFloat(t.priceChangePercent);
      return {
        id: t.symbol,
        symbol: t.symbol,
        name: names[t.symbol] || t.symbol,
        price,
        formattedPrice: `$${price.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        change: 0,
        changePercent: Number(changePercent.toFixed(2)),
        formattedChange: `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`,
        isUp: changePercent >= 0,
        category: "crypto",
        updatedAt: new Date().toISOString(),
      };
    });
  } catch (err) {
    return [];
  }
}

const FALLBACK_ITEMS: MarketItem[] = [
  {
    id: "^GSPC",
    symbol: "^GSPC",
    name: "S&P 500",
    price: 5864.67,
    formattedPrice: "5,864.67",
    change: 24.12,
    changePercent: 0.41,
    formattedChange: "+0.41%",
    isUp: true,
    category: "indices",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "^IXIC",
    symbol: "^IXIC",
    name: "NASDAQ",
    price: 18518.61,
    formattedPrice: "18,518.61",
    change: 152.3,
    changePercent: 0.83,
    formattedChange: "+0.83%",
    isUp: true,
    category: "indices",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "^DJI",
    symbol: "^DJI",
    name: "DOW JONES",
    price: 43239.05,
    formattedPrice: "43,239.05",
    change: -112.4,
    changePercent: -0.26,
    formattedChange: "-0.26%",
    isUp: false,
    category: "indices",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "GC=F",
    symbol: "GC=F",
    name: "GOLD (OZ)",
    price: 2747.3,
    formattedPrice: "$2,747.30",
    change: 8.7,
    changePercent: 0.32,
    formattedChange: "+0.32%",
    isUp: true,
    category: "commodities",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "CL=F",
    symbol: "CL=F",
    name: "CRUDE OIL",
    price: 74.29,
    formattedPrice: "$74.29",
    change: 0.42,
    changePercent: 0.58,
    formattedChange: "+0.58%",
    isUp: true,
    category: "commodities",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "EURUSD=X",
    symbol: "EURUSD=X",
    name: "EUR / USD",
    price: 1.0834,
    formattedPrice: "1.0834",
    change: -0.0009,
    changePercent: -0.08,
    formattedChange: "-0.08%",
    isUp: false,
    category: "currencies",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "BTCUSDT",
    symbol: "BTCUSDT",
    name: "BITCOIN",
    price: 76412.5,
    formattedPrice: "$76,412.50",
    change: 1824.0,
    changePercent: 2.45,
    formattedChange: "+2.45%",
    isUp: true,
    category: "crypto",
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  const now = Date.now();

  // Return cached data if fresh
  if (cachedData && now - cachedData.timestamp < CACHE_TTL_MS) {
    const res: MarketsApiResponse = {
      success: true,
      timestamp: new Date(cachedData.timestamp).toISOString(),
      source: "cached",
      count: cachedData.items.length,
      data: cachedData.items,
    };
    return NextResponse.json(res);
  }

  try {
    // Parallel fetch from Yahoo Finance and Binance
    const [yahooResults, cryptoResults] = await Promise.all([
      Promise.all(YAHOO_SYMBOLS.map(fetchYahooSymbol)),
      fetchBinanceCrypto(),
    ]);

    const liveItems: MarketItem[] = [
      ...yahooResults.filter((item): item is MarketItem => item !== null),
      ...cryptoResults,
    ];

    if (liveItems.length >= 3) {
      cachedData = {
        timestamp: now,
        items: liveItems,
      };

      const res: MarketsApiResponse = {
        success: true,
        timestamp: new Date(now).toISOString(),
        source: "live",
        count: liveItems.length,
        data: liveItems,
      };
      return NextResponse.json(res);
    }
  } catch (err) {
    // Falls through to fallback
  }

  // Graceful fallback if upstream is down
  const res: MarketsApiResponse = {
    success: true,
    timestamp: new Date(now).toISOString(),
    source: "fallback",
    count: FALLBACK_ITEMS.length,
    data: FALLBACK_ITEMS,
  };
  return NextResponse.json(res);
}
