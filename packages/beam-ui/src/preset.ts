import { definePreset } from "@pandacss/dev";

/**
 * Beam Design Language Panda CSS Preset
 *
 * Usage in consumer's panda.config.ts:
 * ```ts
 * import { beamPreset } from "@sunbeam/beam-ui/preset"
 *
 * export default defineConfig({
 *   presets: [beamPreset],
 *   // ...
 * })
 * ```
 */
export const beamPreset = definePreset({
  name: "beam",
  conditions: {
    extend: {
      dark: "[data-theme=dark] &",
      light: "[data-theme=light] &",
    },
  },

  theme: {
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      tokens: {
        colors: {
          // Primary
          "sunbeam.orange": { value: "#fa520f" },
          "sunbeam.flame": { value: "#fb6424" },
          "beam.orange": { value: "#ff8105" },

          // Secondary / Sunshine scale
          "sunshine.900": { value: "#ff8a00" },
          "sunshine.700": { value: "#ffa110" },
          "sunshine.500": { value: "#ffb83e" },
          "sunshine.300": { value: "#ffd06a" },
          "beam.gold": { value: "#ffe295" },
          "bright.yellow": { value: "#ffd900" },

          // Surfaces
          "warm.ivory": { value: "#fffaeb" },
          cream: { value: "#fff0c2" },
          "sunbeam.black": { value: "#1f1f1f" },
          "card.dark": { value: "#2a2a2a" },
          "code.activePill": { value: "#404040" },
          "code.text": { value: "#d4d4d8" },
          "code.success": { value: "#4ade80" },

          // Syntax highlighting
          "syn.keyword": { value: "#c084fc" },
          "syn.fn": { value: "#93c5fd" },
          "syn.string": { value: "#86efac" },
          "syn.prop": { value: "#fdba74" },
          "syn.number": { value: "#fb923c" },
          "syn.builtin": { value: "#fde047" },

          // Borders
          "border.warm": { value: "rgba(127, 99, 21, 0.15)" },
          "border.warmSubtle": { value: "rgba(127, 99, 21, 0.08)" },
          "border.warmDark": { value: "rgba(255, 161, 16, 0.15)" },
        },
        fonts: {
          heading: { value: "'Ysabeau Infant', Arial, ui-sans-serif, system-ui, sans-serif" },
          body: { value: "'Ysabeau Infant', Arial, ui-sans-serif, system-ui, sans-serif" },
          mono: { value: "'Monaspace Argon', 'SF Mono', 'Fira Code', monospace" },
        },
        fontWeights: {
          display: { value: "431" },
          heading: { value: "575" },
          body: { value: "647" },
          button: { value: "791" },
        },
        shadows: {
          golden: { value: "-3px 5px 13px rgba(127,99,21,0.15), -11px 21px 32px rgba(127,99,21,0.11), -21px 43px 53px rgba(127,99,21,0.08), -43px 85px 80px rgba(127,99,21,0.05)" },
          goldenDark: { value: "-3px 5px 13px rgba(127,99,21,0.12), -11px 21px 32px rgba(127,99,21,0.09), -21px 43px 53px rgba(127,99,21,0.06), -43px 85px 80px rgba(127,99,21,0.04)" },
          nav: { value: "0 3px 13px rgba(127,99,21,0.08)" },
          code: { value: "0 7px 20px -7px rgba(0,0,0,0.5)" },
        },
        fontSizes: {
          // UI utility sizes
          "2xs": { value: "0.625rem" },    // 10px — badges, pills, filter counts
          xs: { value: "0.75rem" },        // 12px — meta lines, stats, timestamps
          // Typography scale (matches Type Scale in foundations/typography)
          sm: { value: "0.875rem" },       // 14px — Caption (weight 647 / line 1.43)
          md: { value: "1rem" },           // 16px — Body (weight 647 / line 1.50)
          lg: { value: "1.125rem" },       // 18px — UI emphasis
          xl: { value: "1.25rem" },        // 20px — UI emphasis
          "2xl": { value: "1.5rem" },      // 24px — Title (weight 575 / line 1.33)
          "3xl": { value: "2rem" },        // 32px — Sub-heading (weight 575 / line 1.15)
          "4xl": { value: "3rem" },        // 48px — Sub-heading Large (weight 431 / line 0.95)
          "5xl": { value: "3.5rem" },      // 56px — Section (weight 431 / line 0.95)
          "6xl": { value: "5.125rem" },    // 82px — Display (weight 431 / line 1.0 / ls -2.05px)
        },
        radii: {
          sm: { value: "2px" },
          md: { value: "4px" },
          lg: { value: "12px" },
          full: { value: "9999px" },
        },
      },
      textStyles: {
        display: {
          value: {
            fontSize: "5.125rem",
            fontWeight: "431",
            lineHeight: "1.0",
            letterSpacing: "-2.05px",
            fontFamily: "heading",
          },
        },
        section: {
          value: {
            fontSize: "3.5rem",
            fontWeight: "431",
            lineHeight: "0.95",
            fontFamily: "heading",
          },
        },
        "sub-heading-lg": {
          value: {
            fontSize: "3rem",
            fontWeight: "431",
            lineHeight: "0.95",
            fontFamily: "heading",
          },
        },
        "sub-heading": {
          value: {
            fontSize: "2rem",
            fontWeight: "575",
            lineHeight: "1.15",
            fontFamily: "heading",
          },
        },
        title: {
          value: {
            fontSize: "1.5rem",
            fontWeight: "575",
            lineHeight: "1.33",
            fontFamily: "heading",
          },
        },
        body: {
          value: {
            fontSize: "1rem",
            fontWeight: "647",
            lineHeight: "1.50",
            fontFamily: "body",
          },
        },
        caption: {
          value: {
            fontSize: "0.875rem",
            fontWeight: "647",
            lineHeight: "1.43",
            fontFamily: "body",
          },
        },
        emphasis: {
          value: {
            fontSize: "1.125rem",
            fontWeight: "791",
            lineHeight: "1.4",
            fontFamily: "heading",
          },
        },
        "strong-title": {
          value: {
            fontSize: "1.5rem",
            fontWeight: "791",
            lineHeight: "1.33",
            fontFamily: "heading",
          },
        },
        label: {
          value: {
            fontSize: "0.75rem",
            fontWeight: "791",
            lineHeight: "1.5",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontFamily: "body",
          },
        },
      },
      semanticTokens: {
        shadows: {
          code: {
            value: {
              base: "0 10px 30px -10px rgba(0,0,0,0.5)",
              _dark: "0 14px 40px -6px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,161,16,0.08)",
            },
          },
        },
        colors: {
          "bg.page": { value: { base: "{colors.warm.ivory}", _dark: "{colors.sunbeam.black}" } },
          "bg.card": { value: { base: "{colors.cream}", _dark: "{colors.card.dark}" } },
          "bg.nav": { value: { base: "rgba(255,250,235,0.92)", _dark: "rgba(31,31,31,0.92)" } },
          "text.primary": { value: { base: "{colors.sunbeam.black}", _dark: "#ffffff" } },
          "text.secondary": { value: { base: "hsl(0,0%,24%)", _dark: "rgba(255,255,255,0.7)" } },
          "text.muted": { value: { base: "#7f6315", _dark: "rgba(255,255,255,0.4)" } },
          "border.default": { value: { base: "{colors.border.warm}", _dark: "{colors.border.warmDark}" } },
          "border.subtle": { value: { base: "{colors.border.warmSubtle}", _dark: "rgba(255,161,16,0.08)" } },
          accent: { value: { base: "{colors.sunbeam.orange}", _dark: "{colors.sunbeam.orange}" } },
          sectionLabel: { value: { base: "{colors.sunbeam.orange}", _dark: "{colors.sunshine.700}" } },
        },
      },
    },
  },

  globalCss: {
    body: {
      fontFamily: "body",
      fontWeight: "body",
      bg: "bg.page",
      color: "text.primary",
      lineHeight: "1.5",
      WebkitFontSmoothing: "antialiased",
    },
  },
});
