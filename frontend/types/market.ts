export type MarketCategory = "indices" | "commodities" | "currencies" | "crypto";

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  formattedPrice: string;
  change: number;
  changePercent: number;
  formattedChange: string;
  isUp: boolean;
  category: MarketCategory;
  currency?: string;
  high24h?: number;
  low24h?: number;
  volume24h?: string;
  updatedAt: string;
}

export interface MarketsApiResponse {
  success: boolean;
  timestamp: string;
  source: "live" | "cached" | "fallback";
  count: number;
  data: MarketItem[];
}

