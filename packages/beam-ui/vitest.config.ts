import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "styled-system/css": resolve(__dirname, "./styled-system/css/index.mjs"),
      "styled-system/tokens": resolve(__dirname, "./styled-system/tokens/index.mjs"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
  },
});
