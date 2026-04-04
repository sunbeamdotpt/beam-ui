import type { Preview } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import "./panda.css";
import "@sunbeam/beam-ui/styles/fonts.css";
import "@sunbeam/beam-ui/styles/global.css";
import "../src/theme/global.css";

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(
        MemoryRouter,
        null,
        React.createElement(
          "div",
          { "data-theme": "light", style: { padding: 16 } },
          React.createElement(Story),
        ),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "beam-light",
      values: [
        { name: "beam-light", value: "#fdfaf5" },
        { name: "beam-dark", value: "#1a1611" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
};

export default preview;
