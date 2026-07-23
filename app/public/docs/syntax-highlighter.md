# SyntaxHighlighter

> Props for {@link SyntaxHighlighter}. */
export interface SyntaxHighlighterProps {
  /** Source code string to highlight. */
  code: string;
  /** Language identifier (e.g., "javascript", "python", "rust"). */
  language: string;
  /** Theme override. Defaults to theme from `useTheme()`. */
  theme?: "light" | "dark";
  /** Show line numbers in a gutter. Defaults to `false`. */
  showLineNumbers?: boolean;
  /** Array of 1-based line numbers to highlight (e.g., `[1, 3, 5]`). */
  highlightLines?: number[];
  /** Additional CSS class. */
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Lazy singleton highlighter                                          */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/* Custom Beam themes for Shiki                                        */
/* ------------------------------------------------------------------ */

const BEAM_DARK = {
  name: "beam-dark",
  type: "dark" as const,
  colors: {
    "editor.background": "#2a2a2a",
    "editor.foreground": "#d4d4d8",
  },
  settings: [
    { settings: { foreground: "#d4d4d8" } }, // default text
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "rgba(255,255,255,0.35)", fontStyle: "italic" },
    },
    { scope: ["keyword", "storage.type", "storage.modifier"], settings: { foreground: "#c084fc" } }, // syn.keyword — purple
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: "#93c5fd" },
    }, // syn.fn — blue
    { scope: ["string", "string.quoted"], settings: { foreground: "#86efac" } }, // syn.string — green
    {
      scope: ["variable.other.property", "entity.name.tag", "support.type.property-name"],
      settings: { foreground: "#fdba74" },
    }, // syn.prop — orange
    { scope: ["constant.numeric", "constant.language"], settings: { foreground: "#fb923c" } }, // syn.number — deeper orange
    {
      scope: ["support.class", "entity.name.type", "storage.type.builtin"],
      settings: { foreground: "#fde047" },
    }, // syn.builtin — yellow
    { scope: ["variable", "variable.other"], settings: { foreground: "#e2e8f0" } },
    { scope: ["punctuation", "meta.brace"], settings: { foreground: "rgba(255,255,255,0.5)" } },
    { scope: ["entity.name.class", "entity.name.type.class"], settings: { foreground: "#fde047" } },
    { scope: ["constant.other", "variable.other.constant"], settings: { foreground: "#fb923c" } },
    { scope: ["keyword.operator"], settings: { foreground: "#ffa110" } }, // sunshine.700
    { scope: ["meta.decorator", "punctuation.decorator"], settings: { foreground: "#ffd06a" } }, // sunshine.300
    { scope: ["markup.heading"], settings: { foreground: "#fa520f", fontStyle: "bold" } }, // sunbeam.orange
    { scope: ["markup.bold"], settings: { fontStyle: "bold" } },
    { scope: ["markup.italic"], settings: { fontStyle: "italic" } },
    { scope: ["markup.inline.raw", "markup.fenced_code"], settings: { foreground: "#86efac" } },
  ],
};

const BEAM_LIGHT = {
  name: "beam-light",
  type: "light" as const,
  colors: {
    "editor.background": "#fff0c2",
    "editor.foreground": "#1f1f1f",
  },
  settings: [
    { settings: { foreground: "#1f1f1f" } },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#7f6315", fontStyle: "italic" },
    },
    { scope: ["keyword", "storage.type", "storage.modifier"], settings: { foreground: "#7c3aed" } }, // darker purple for light bg
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: "#2563eb" },
    }, // darker blue
    { scope: ["string", "string.quoted"], settings: { foreground: "#16a34a" } }, // darker green
    {
      scope: ["variable.other.property", "entity.name.tag", "support.type.property-name"],
      settings: { foreground: "#c2410c" },
    }, // darker orange
    { scope: ["constant.numeric", "constant.language"], settings: { foreground: "#ea580c" } },
    {
      scope: ["support.class", "entity.name.type", "storage.type.builtin"],
      settings: { foreground: "#a16207" },
    }, // darker yellow/gold
    { scope: ["variable", "variable.other"], settings: { foreground: "#1f1f1f" } },
    { scope: ["punctuation", "meta.brace"], settings: { foreground: "#7f6315" } },
    { scope: ["entity.name.class", "entity.name.type.class"], settings: { foreground: "#a16207" } },
    { scope: ["constant.other", "variable.other.constant"], settings: { foreground: "#ea580c" } },
    { scope: ["keyword.operator"], settings: { foreground: "#b45309" } },
    { scope: ["meta.decorator", "punctuation.decorator"], settings: { foreground: "#a16207" } },
    { scope: ["markup.heading"], settings: { foreground: "#fa520f", fontStyle: "bold" } },
    { scope: ["markup.bold"], settings: { fontStyle: "bold" } },
    { scope: ["markup.italic"], settings: { fontStyle: "italic" } },
    { scope: ["markup.inline.raw", "markup.fenced_code"], settings: { foreground: "#16a34a" } },
  ],
};

/* ------------------------------------------------------------------ */
/* Lazy singleton highlighter                                          */
/* ------------------------------------------------------------------ */
let highlighterPromise: Promise<Highlighter> | null = null;

function getOrCreateHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then(({ createHighlighter }) => {
      return createHighlighter({
        themes: [BEAM_DARK, BEAM_LIGHT],
        langs: [
          "javascript",
          "typescript",
          "python",
          "rust",
          "go",
          "java",
          "json",
          "html",
          "css",
          "bash",
          "markdown",
          "tsx",
          "jsx",
          "sql",
          "yaml",
          "xml",
          "cpp",
          "c",
          "ruby",
          "php",
        ],
      });
    });
  }
  return highlighterPromise;
}

/** Syntax highlighter using Shiki with beam-branded light/dark themes. Supports 19+ languages, optional line numbers, and per-line highlighting. Falls back to plain text while loading. * @example ```tsx <SyntaxHighlighter code="const x = 42;" language="javascript" showLineNumbers highlightLines={[1]} theme="dark" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/syntax-highlighter?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { SyntaxHighlighter } from "@sunbeam/beam-ui/components/ui/syntax-highlighter"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| code | `string` | Yes | Source code string to highlight. |
| language | `string` | Yes | Language identifier (e.g., "javascript", "python", "rust"). |
| theme | `"light" | "dark"` | No | Theme override. Defaults to theme from `useTheme()`. |
| showLineNumbers | `boolean` | No | Show line numbers in a gutter. Defaults to `false`. |
| highlightLines | `number[]` | No | Array of 1-based line numbers to highlight (e.g., `[1, 3, 5]`). |
| className | `string` | No | Additional CSS class. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
