import { defineConfig } from "@pandacss/dev";
import { beamPreset } from "../packages/beam-ui/src/preset";

export default defineConfig({
  preflight: true,
  presets: [beamPreset],
  include: ["./src/**/*.{ts,tsx}", "../packages/beam-ui/src/**/*.{ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  // The library imports Panda runtime fns via its own barrel (`src/system.ts`,
  // imported as `../system.ts` / `../../system.ts`). Panda's extractor only
  // recognizes imports whose specifier matches the import map, so without
  // these entries every `css()`/`token()` call in the library is silently
  // skipped and the utilities never make it into the stylesheet.
  importMap: {
    css: ["styled-system/css", "/system.ts"],
    tokens: ["styled-system/tokens", "/system.ts"],
  },
});
