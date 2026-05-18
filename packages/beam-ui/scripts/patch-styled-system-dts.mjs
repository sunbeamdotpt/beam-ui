#!/usr/bin/env node
import { readdir, readFile, writeFile, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STYLED_SYSTEM_DIR = join(__dirname, "..", "styled-system");

function walk(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, files);
    else if (entry.name.endsWith(".d.ts")) files.push(path);
  }
  return files;
}

const BARE = /from\s+(['"])((?:\.\.?\/)[^'"]+)\1/g;

function resolveSibling(dir, spec) {
  const base = join(dir, spec);
  if (existsSync(base + ".mjs")) return spec + ".mjs";
  if (existsSync(base + ".d.ts")) return spec + ".d.ts";
  return null;
}

function patchFile(path) {
  const original = readFileSync(path, "utf-8");
  const dir = dirname(path);
  let changed = false;
  const patched = original.replace(BARE, (m, q, spec) => {
    if (/\.[^/]+$/.test(spec)) return m; // already has extension
    const resolved = resolveSibling(dir, spec);
    if (!resolved) return m;
    changed = true;
    return `from ${q}${resolved}${q}`;
  });
  if (changed) writeFileSync(path, patched, "utf-8");
}

import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const files = walk(STYLED_SYSTEM_DIR);
for (const f of files) patchFile(f);
console.log(`patched ${files.length} .d.ts files`);
