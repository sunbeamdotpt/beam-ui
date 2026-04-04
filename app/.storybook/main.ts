import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "styled-system": resolve(__dirname, "../styled-system"),
      "@sunbeam/beam-ui": resolve(__dirname, "../../packages/beam-ui/src"),
    };
    // Set base path only for static builds (served at /storybook/ in production)
    if (process.env.STORYBOOK_BASE) {
      config.base = process.env.STORYBOOK_BASE;
    }
    // Ensure Panda CSS PostCSS plugin runs (Storybook may not find postcss.config from app/)
    config.css = config.css ?? {};
    config.css.postcss = resolve(__dirname, "..");
    return config;
  },
};

export default config;
