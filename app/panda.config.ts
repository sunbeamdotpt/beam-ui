import { defineConfig } from "@pandacss/dev";
import { beamPreset } from "../packages/beam-ui/src/preset";

export default defineConfig({
  preflight: true,
  presets: [beamPreset],
  include: ["./src/**/*.{ts,tsx}", "../packages/beam-ui/src/**/*.{ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
});
