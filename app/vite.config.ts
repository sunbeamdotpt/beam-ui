import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "styled-system": resolve(__dirname, "styled-system"),
      "@sunbeam/beam-ui": resolve(__dirname, "../packages/beam-ui/src"),
    },
  },
});
