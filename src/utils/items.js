import items from "../data/items.js";

const byLabel = new Map();
export const itemOptions = [];

for (const { id, name, displayName } of items) {
  if (id === 0) continue;
  itemOptions.push({ name, displayName });
  byLabel.set(name.toLowerCase(), name);
  byLabel.set(displayName.toLowerCase(), name);
}

export function resolveItem(text) {
  if (!text) return null;
  return byLabel.get(String(text).trim().toLowerCase()) ?? null;
}
