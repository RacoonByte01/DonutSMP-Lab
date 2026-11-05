import items from "../data/items.js";

const byLabel = new Map();
export const itemOptions = [];

for (const { id, name, displayName } of items) {
  if (id === 0) continue;
  itemOptions.push({ name, displayName });
  byLabel.set(name.toLowerCase(), name);
  byLabel.set(displayName.toLowerCase(), name);
}

itemOptions.sort((a, b) => a.displayName.localeCompare(b.displayName));

export function resolveItem(text) {
  if (!text) return null;
  return byLabel.get(String(text).trim().toLowerCase()) ?? null;
}

export function searchItems(query, limit = 20) {
  const text = String(query ?? "").trim().toLowerCase();
  if (!text) return [];
  const matches = [];
  for (const item of itemOptions) {
    if (
      item.name.includes(text) ||
      item.displayName.toLowerCase().includes(text)
    ) {
      matches.push(item);
      if (matches.length === limit) break;
    }
  }
  return matches;
}
