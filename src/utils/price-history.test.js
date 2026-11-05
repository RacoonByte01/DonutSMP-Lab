import assert from "node:assert/strict";
import test from "node:test";
import { toPoints } from "./price-history.js";

test("mapea price/bid a sell/buy", () => {
  const points = toPoints([
    { t: 1, price: 10, bid: 8 },
    { t: 2, price: null, bid: 9 },
  ]);
  assert.deepEqual(points, [
    { t: 1, sell: 10, buy: 8 },
    { t: 2, sell: null, buy: 9 },
  ]);
});

test("descarta periodos sin precio ni orden", () => {
  assert.deepEqual(toPoints([{ t: 1, price: null, bid: null }]), []);
});
