# CodeEditor

> Props for {@link CodeEditor}. */
export interface CodeEditorProps {
  /** Controlled text value (the code being edited). */
  value: string;
  /** Callback fired when the user edits the code; receives the new text. */
  onChange: (value: string) => void;
  /** Language for syntax highlighting (e.g., "javascript", "typescript", "python", "rust"). Defaults to no highlighting. */
  language?: string;
  /** CSS height of the editor viewport. Defaults to `"300px"`. */
  height?: string;
  /** If true, the editor is read-only and cannot be modified. Defaults to false. */
  readOnly?: boolean;
  /** If true, line numbers are shown in the left gutter. Defaults to true. */
  showLineNumbers?: boolean;
  /** If true, long lines wrap instead of scrolling horizontally. Defaults to false. */
  softWrap?: boolean;
  /** Placeholder text shown when the editor is empty. */
  placeholder?: string;
  /** Extra CSS class names to apply to the root container. */
  className?: string;
  /** Extra CodeMirror extensions to append. Typed as unknown[] to avoid Extension symbol mismatch when the caller uses a different @codemirror/state instance (e.g. a file:-linked monorepo package). */
  extensions?: readonly unknown[];
}

/* ------------------------------------------------------------------ */
/* Language loading                                                     */
/* ------------------------------------------------------------------ */
async function loadLanguage(lang: string | undefined) {
  if (!lang) return null;

  const normalized = lang.toLowerCase();

  switch (normalized) {
    case "javascript":
    case "js": {
      const { javascript } = await import("@codemirror/lang-javascript");
      return javascript();
    }
    case "typescript":
    case "ts": {
      const { javascript } = await import("@codemirror/lang-javascript");
      return javascript({ typescript: true });
    }
    case "tsx": {
      const { javascript } = await import("@codemirror/lang-javascript");
      return javascript({ typescript: true, jsx: true });
    }
    case "jsx": {
      const { javascript } = await import("@codemirror/lang-javascript");
      return javascript({ jsx: true });
    }
    case "python":
    case "py": {
      const { python } = await import("@codemirror/lang-python");
      return python();
    }
    case "html": {
      const { html } = await import("@codemirror/lang-html");
      return html();
    }
    case "css": {
      const { css: cssLang } = await import("@codemirror/lang-css");
      return cssLang();
    }
    case "json": {
      const { json } = await import("@codemirror/lang-json");
      return json();
    }
    case "markdown":
    case "md": {
      const { markdown } = await import("@codemirror/lang-markdown");
      return markdown();
    }
    case "rust":
    case "rs": {
      const { rust } = await import("@codemirror/lang-rust");
      return rust();
    }
    case "go": {
      const { go } = await import("@codemirror/lang-go");
      return go();
    }
    case "java": {
      const { java } = await import("@codemirror/lang-java");
      return java();
    }
    case "cpp":
    case "c++":
    case "c": {
      const { cpp } = await import("@codemirror/lang-cpp");
      return cpp();
    }
    case "xml": {
      const { xml } = await import("@codemirror/lang-xml");
      return xml();
    }
    case "sql": {
      const { sql } = await import("@codemirror/lang-sql");
      return sql();
    }
    case "yaml":
    case "yml": {
      const { yaml } = await import("@codemirror/lang-yaml");
      return yaml();
    }
    case "php": {
      const { php } = await import("@codemirror/lang-php");
      return php();
    }
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Custom CodeMirror theme using Beam tokens                           */
/* ------------------------------------------------------------------ */
function createBeamTheme(isDark: boolean) {
  const bg = isDark ? "#2a2a2a" : "#fff0c2";
  const fg = isDark ? "#ffffff" : "#1f1f1f";
  const muted = isDark ? "rgba(255,255,255,0.4)" : "#7f6315";
  const mono = "'Monaspace Argon', 'SF Mono', 'Fira Code', monospace";

  return EditorView.theme(
    {
      "&": {
        backgroundColor: bg,
        color: fg,
        fontSize: "13px",
        fontFamily: mono,
      },
      ".cm-content": {
        caretColor: "#fa520f",
        padding: "12px 0",
      },
      ".cm-cursor, .cm-dropCursor": {
        borderLeftColor: "#fa520f",
        borderLeftWidth: "2px",
      },
      "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
        backgroundColor: isDark ? "rgba(250, 82, 15, 0.20)" : "rgba(250, 82, 15, 0.15)",
      },
      ".cm-activeLine": {
        backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
      },
      ".cm-gutters": {
        backgroundColor: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)",
        color: muted,
        border: "none",
        paddingRight: "8px",
      },
      ".cm-activeLineGutter": {
        backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
      },
      ".cm-lineNumbers .cm-gutterElement": {
        fontSize: "12px",
        minWidth: "32px",
        padding: "0 4px 0 8px",
      },
      ".cm-placeholder": {
        color: muted,
        fontStyle: "italic",
      },
      "&.cm-focused": {
        outline: "none",
      },
      ".cm-scroller": {
        fontFamily: mono,
        lineHeight: "1.6",
      },
    },
    { dark: isDark },
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

/** CodeMirror-based syntax-highlighting code editor with theme-aware Beam colors. * Supports 15+ languages with smart indentation, search, history, line numbers, and soft wrapping. Automatically responds to dark/light theme changes. * @example ```tsx <CodeEditor value={code} onChange={setCode} language="typescript" height="400px" showLineNumbers /> ```

> **[View rendered page](https://design.sunbeam.pt/components/code-editor?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { CodeEditor } from "@sunbeam/beam-ui/components/ui/code-editor"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Controlled text value (the code being edited). |
| onChange | `(value: string) => void` | Yes | Callback fired when the user edits the code; receives the new text. |
| language | `string` | No | Language for syntax highlighting (e.g., "javascript", "typescript", "python", "rust"). Defaults to no highlighting. |
| height | `string` | No | CSS height of the editor viewport. Defaults to `"300px"`. |
| readOnly | `boolean` | No | If true, the editor is read-only and cannot be modified. Defaults to false. |
| showLineNumbers | `boolean` | No | If true, line numbers are shown in the left gutter. Defaults to true. |
| softWrap | `boolean` | No | If true, long lines wrap instead of scrolling horizontally. Defaults to false. |
| placeholder | `string` | No | Placeholder text shown when the editor is empty. |
| className | `string` | No | Extra CSS class names to apply to the root container. |
| extensions | `readonly unknown[]` | No | Extra CodeMirror extensions to append. Typed as unknown[] to avoid Extension symbol mismatch when the caller uses a different @codemirror/state instance (e.g. a file:-linked monorepo package). |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
