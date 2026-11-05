import assert from "node:assert/strict";
import test from "node:test";
import { resolveItem } from "./items.js";

test("resuelve displayName a clave vanilla", () => {
  assert.equal(resolveItem("Diamond"), "diamond");
  assert.equal(resolveItem("Diamond Sword"), "diamond_sword");
});

test("resuelve la propia clave y normaliza espacios/mayúsculas", () => {
  assert.equal(resolveItem("  DIAMOND_SWORD "), "diamond_sword");
});

test("devuelve null para texto desconocido o vacío", () => {
  assert.equal(resolveItem("no existe"), null);
  assert.equal(resolveItem(""), null);
  assert.equal(resolveItem(undefined), null);
});
