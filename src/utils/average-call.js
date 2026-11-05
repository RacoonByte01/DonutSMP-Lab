import { resolveItem } from "./items.js";

const native = globalThis.Capacitor?.isNativePlatform?.();
const BASE =
  import.meta.env?.VITE_API_BASE ||
  (native ? "https://api.donutstats.io" : "/api");

const SOURCES = {
  sell: { path: "auction", quantityKey: "count" },
  buy: { path: "orders", quantityKey: "remaining" },
};

export function weightedAverage(entries, quantityKey) {
  const totals = entries.reduce(
    (acc, entry) => {
      acc.price += entry.unitPrice * entry[quantityKey];
      acc.quantity += entry[quantityKey];
      return acc;
    },
    { price: 0, quantity: 0 },
  );
  return totals.quantity > 0 ? totals.price / totals.quantity : null;
}

async function suggestPrice({ side, item, limit = 20, apikey }) {
  const source = SOURCES[side];
  if (!source) throw new Error(`Unknown side: ${side}`);
  if (!item) throw new Error("Item is required");

  const key = resolveItem(item);
  const safeLimit = Math.min(Math.max(Math.trunc(Number(limit)) || 20, 1), 200);
  const params = new URLSearchParams({
    [key ? "item" : "q"]: key ?? item,
    sort: "price",
    limit: String(safeLimit),
  });

  const response = await fetch(`${BASE}/v1/${source.path}?${params}`, {
    headers: apikey ? { "x-api-key": apikey } : {},
  });

  if (!response.ok) {
    throw new Error(`DonutStats API returned ${response.status}`);
  }

  const { entries = [] } = await response.json();
  const average = weightedAverage(entries, source.quantityKey);
  if (average === null) throw new Error(`No ${side} data for "${item}"`);
  return Math.round(average);
}

export default suggestPrice;
