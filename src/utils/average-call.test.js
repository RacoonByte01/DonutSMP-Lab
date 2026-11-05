import assert from "node:assert/strict";
import test from "node:test";
import { weightedAverage } from "./average-call.js";

test("weights auction listings by count", () => {
  const entries = [
    { unitPrice: 10, count: 1 },
    { unitPrice: 20, count: 3 },
  ];
  assert.equal(weightedAverage(entries, "count"), 17.5);
});

test("weights buy orders by remaining", () => {
  const entries = [
    { unitPrice: 100, remaining: 2 },
    { unitPrice: 200, remaining: 1 },
  ];
  assert.equal(weightedAverage(entries, "remaining"), 400 / 3);
});

test("returns null when there is no quantity", () => {
  assert.equal(weightedAverage([], "count"), null);
});
