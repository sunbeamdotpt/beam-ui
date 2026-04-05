/**
 * Bundles plugin.ts as an ESM module for Penpot's plugin sandbox.
 * Separate from the Vite build (which handles the UI).
 */
import { build } from "esbuild";
import { cpSync } from "fs";

await build({
  entryPoints: ["plugin.ts"],
  bundle: true,
  format: "esm",
  minify: true,
  outfile: "dist/assets/plugin.js",
});

// Copy manifest and assets to dist
cpSync("manifest.json", "dist/manifest.json");
cpSync("assets", "dist/assets", { recursive: true });

console.log("Plugin built → dist/");
