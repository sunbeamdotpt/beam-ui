import { defineConfig } from "@pandacss/dev";
import { beamPreset } from "./src/preset";

export default defineConfig({
  preflight: true,
  presets: [beamPreset],
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  outExtension: "mjs",
  forceConsistentTypeExtension: true,
});
