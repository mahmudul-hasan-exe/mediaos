import { NextResponse } from "next/server";

interface WeatherApiResponse {
  success: boolean;
  city: string;
  country: string;
  temp: string;
  temperature: number;
  condition: string;
  source: "gps" | "ip" | "fallback";
}

// In-memory cache by coordinate / IP key with 5-minute TTL
const memoryCache = new Map<string, { timestamp: number; data: WeatherApiResponse }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function mapWmoCode(code: number): string {
  if (code === 0) return "Clear Sky";
  if (code === 1) return "Mainly Clear";
  if (code === 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 55) return "Light Drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95 && code <= 99) return "Thunderstorm";
  return "Clear";
}

function extractLocationName(addr: Record<string, string | undefined>): string {
  if (!addr) return "Current Location";
  // Hierarchy prioritizes specific local area (village, union, upazila/town, suburb, city)
  return (
    addr.village ||
    addr.hamlet ||
    addr.suburb ||
    addr.neighbourhood ||
    addr.town ||
    addr.municipality ||
    addr.county ||
    addr.city ||
    addr.state_district ||
    addr.state ||
    "Current Location"
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const qLat = searchParams.get("lat");
  const qLon = searchParams.get("lon");
  const lang = searchParams.get("lang") || "en";
  const now = Date.now();

  let lat: number;
  let lon: number;
  let city = "Dhaka";
  let country = "Bangladesh";
  let isFromGps = false;

  // 1. Determine Coordinates (from GPS query params or IP fallback)
  if (qLat && qLon && !isNaN(Number(qLat)) && !isNaN(Number(qLon))) {
    lat = Number(qLat);
    lon = Number(qLon);
    isFromGps = true;
  } else {
    // Fallback: Resolve approximate location via IP
    try {
      const geoRes = await fetch("http://ip-api.com/json/?fields=status,city,country,lat,lon", {
        headers: { "User-Agent": "MediaOS/1.0" },
        next: { revalidate: 600 },
      });
      if (geoRes.ok) {
        const geo = await geoRes.json();
        if (geo.status === "success" && geo.lat && geo.lon) {
          city = geo.city || "Dhaka";
          country = geo.country || "Bangladesh";
          lat = geo.lat;
          lon = geo.lon;
        } else {
          lat = 23.8103;
          lon = 90.4125;
        }
      } else {
        lat = 23.8103;
        lon = 90.4125;
      }
    } catch {
      lat = 23.8103;
      lon = 90.4125;
    }
  }

  // 2. Check Coordinate-Specific Cache
  const cacheKey = `${lat.toFixed(2)}_${lon.toFixed(2)}_${lang}`;
  const cached = memoryCache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(cached.data);
  }

  try {
    // 3. If GPS coordinates were provided, perform Reverse Geocoding via Nominatim
    if (isFromGps) {
      try {
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&accept-language=${lang},en`;
        const reverseRes = await fetch(nominatimUrl, {
          headers: {
            "User-Agent": "MediaOS-NewsPortal/1.0 (contact: info@mediaos.local)",
            Accept: "application/json",
          },
          next: { revalidate: 3600 },
        });

        if (reverseRes.ok) {
          const revData = await reverseRes.json();
          if (revData && revData.address) {
            city = extractLocationName(revData.address);
            country = revData.address.country || country;
          }
        }
      } catch {
        // Fallback to coordinates / default
      }
    }

    // 4. Fetch Exact Live Temperature from Open-Meteo
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
    const weatherRes = await fetch(weatherUrl, {
      next: { revalidate: 180 },
    });

    if (weatherRes.ok) {
      const weatherJson = await weatherRes.json();
      const current = weatherJson?.current;
      if (current && typeof current.temperature_2m === "number") {
        const tempVal = Number(current.temperature_2m);
        const condition = mapWmoCode(current.weather_code);
        const data: WeatherApiResponse = {
          success: true,
          city,
          country,
          temp: `${Math.round(tempVal)}°C`,
          temperature: tempVal,
          condition,
          source: isFromGps ? "gps" : "ip",
        };

        memoryCache.set(cacheKey, { timestamp: now, data });
        return NextResponse.json(data);
      }
    }
  } catch {
    // Ignore and proceed to fallback
  }

  // Fallback response with live or calculated reading
  const fallback: WeatherApiResponse = {
    success: true,
    city: city || "Dhaka",
    country: country || "Bangladesh",
    temp: "25°C",
    temperature: 25,
    condition: "Clear",
    source: "fallback",
  };
  return NextResponse.json(fallback);
}


