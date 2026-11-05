import assert from "node:assert/strict";
import test from "node:test";
import { resolveItem, searchItems } from "./items.js";

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

test("busca por nombre y por clave", () => {
  const byName = searchItems("diamond sword");
  assert.equal(byName[0].name, "diamond_sword");
  assert.equal(searchItems("diamond_sword")[0].name, "diamond_sword");
});

test("sin texto no sugiere nada y respeta el límite", () => {
  assert.deepEqual(searchItems(""), []);
  assert.equal(searchItems("diamond", 2).length, 2);
});
