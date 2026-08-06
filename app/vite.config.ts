import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { execFileSync } from "child_process";

function generateBuildAssets() {
  return {
    name: "generate-build-assets",
    buildStart() {
      try {
        execFileSync("npx", ["tsx", "scripts/generate-build-info.ts"], { cwd: __dirname, stdio: "inherit" });
      } catch (e) {
        console.warn("Warning: failed to generate build info", e);
      }
      try {
        execFileSync("npx", ["tsx", "scripts/generate-llms-txt.ts"], { cwd: __dirname, stdio: "inherit" });
      } catch (e) {
        console.warn("Warning: failed to generate llms.txt", e);
      }
      try {
        execFileSync("npx", ["tsx", "scripts/generate-component-api.ts"], { cwd: __dirname, stdio: "inherit" });
      } catch (e) {
        console.warn("Warning: failed to generate component API", e);
      }
      try {
        execFileSync("npx", ["tsx", "scripts/generate-plasmic-tokens.ts"], { cwd: __dirname, stdio: "inherit" });
      } catch (e) {
        console.warn("Warning: failed to generate Plasmic tokens", e);
      }
    },
  };
}

function getBuildLabel() {
  try {
    const commit = execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: __dirname }).toString().trim();
    let dirty = false;
    try { execFileSync("git", ["diff", "--quiet"], { cwd: __dirname }); } catch { dirty = true; }
    return `${commit}${dirty ? "+dirty" : ""}`;
  } catch { return "dev"; }
}

export default defineConfig({
  plugins: [generateBuildAssets(), react()],
  define: {
    __BUILD_LABEL__: JSON.stringify(getBuildLabel()),
  },
  resolve: {
    alias: {
      "styled-system": resolve(__dirname, "styled-system"),
      "@sunbeam/beam-ui": resolve(__dirname, "../packages/beam-ui/src"),
    },
  },
});
