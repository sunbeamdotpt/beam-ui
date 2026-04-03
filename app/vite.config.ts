import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { execFileSync } from "child_process";

function generateLlmsDocs() {
  return {
    name: "generate-llms-docs",
    buildStart() {
      try {
        execFileSync("npx", ["tsx", "scripts/generate-llms-txt.ts"], { cwd: __dirname, stdio: "inherit" });
      } catch (e) {
        console.warn("Warning: failed to generate llms.txt", e);
      }
    },
  };
}

export default defineConfig({
  plugins: [generateLlmsDocs(), react()],
  resolve: {
    alias: {
      "styled-system": resolve(__dirname, "styled-system"),
      "@sunbeam/beam-ui": resolve(__dirname, "../packages/beam-ui/src"),
    },
  },
});
