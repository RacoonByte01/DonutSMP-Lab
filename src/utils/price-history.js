import { BASE } from "./average-call.js";

const CACHE_MS = 5 * 60 * 1000;
const cache = new Map();

export const RANGES = {
  "7d": { interval: "hour", days: 7 },
  "30d": { interval: "day", days: 30 },
  "365d": { interval: "day", days: 365 },
};

export function toPoints(entries) {
  return entries
    .filter((entry) => entry.price != null || entry.bid != null)
    .map((entry) => ({ t: entry.t, sell: entry.price, buy: entry.bid }));
}

export async function priceHistory({ key, range = "30d", apikey }) {
  if (!key) throw new Error("Item is required");
  const config = RANGES[range];
  if (!config) throw new Error(`Unknown range: ${range}`);

  const now = Date.now();
  const cacheKey = `${key}:${range}`;
  const cached = cache.get(cacheKey);
  if (cached && now - cached.at < CACHE_MS) return cached.points;

  const params = new URLSearchParams({
    interval: config.interval,
    from: String(now - config.days * 24 * 60 * 60 * 1000),
    limit: "5000",
  });

  const response = await fetch(
    `${BASE}/v1/items/${encodeURIComponent(key)}/history?${params}`,
    { headers: apikey ? { "x-api-key": apikey } : {} },
  );
  if (!response.ok) {
    throw new Error(`DonutStats API returned ${response.status}`);
  }

  const { entries = [] } = await response.json();
  const points = toPoints(entries);
  cache.set(cacheKey, { at: now, points });
  return points;
}
