import { useRef, useEffect, useCallback } from "react";
import { css, cx } from "styled-system/css";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  placeholder as cmPlaceholder,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import {
  syntaxHighlighting,
  HighlightStyle,
  indentOnInput,
} from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { searchKeymap } from "@codemirror/search";
import { useTheme } from "../../hooks/use-theme";

/* Beam syntax highlighting — matches syn.* tokens */
const beamHighlightDark = HighlightStyle.define([
  { tag: tags.keyword, color: "#c084fc" },           // syn.keyword — purple
  { tag: tags.controlKeyword, color: "#c084fc" },
  { tag: tags.operatorKeyword, color: "#c084fc" },
  { tag: tags.definitionKeyword, color: "#c084fc" },
  { tag: tags.moduleKeyword, color: "#c084fc" },
  { tag: tags.function(tags.variableName), color: "#93c5fd" }, // syn.fn — blue
  { tag: tags.function(tags.definition(tags.variableName)), color: "#93c5fd" },
  { tag: tags.string, color: "#86efac" },             // syn.string — green
  { tag: tags.special(tags.string), color: "#86efac" },
  { tag: tags.propertyName, color: "#fdba74" },       // syn.prop — orange
  { tag: tags.number, color: "#fb923c" },             // syn.number — deeper orange
  { tag: tags.bool, color: "#fb923c" },
  { tag: tags.null, color: "#fb923c" },
  { tag: tags.typeName, color: "#fde047" },           // syn.builtin — yellow
  { tag: tags.className, color: "#fde047" },
  { tag: tags.standard(tags.typeName), color: "#fde047" },
  { tag: tags.comment, color: "rgba(255,255,255,0.35)", fontStyle: "italic" },
  { tag: tags.lineComment, color: "rgba(255,255,255,0.35)", fontStyle: "italic" },
  { tag: tags.blockComment, color: "rgba(255,255,255,0.35)", fontStyle: "italic" },
  { tag: tags.operator, color: "#ffa110" },           // sunshine.700
  { tag: tags.punctuation, color: "rgba(255,255,255,0.5)" },
  { tag: tags.variableName, color: "#e2e8f0" },
  { tag: tags.regexp, color: "#fb923c" },
  { tag: tags.tagName, color: "#fdba74" },
  { tag: tags.attributeName, color: "#93c5fd" },
  { tag: tags.attributeValue, color: "#86efac" },
  { tag: tags.heading, color: "#fa520f", fontWeight: "bold" },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
]);

const beamHighlightLight = HighlightStyle.define([
  { tag: tags.keyword, color: "#7c3aed" },
  { tag: tags.controlKeyword, color: "#7c3aed" },
  { tag: tags.operatorKeyword, color: "#7c3aed" },
  { tag: tags.definitionKeyword, color: "#7c3aed" },
  { tag: tags.moduleKeyword, color: "#7c3aed" },
  { tag: tags.function(tags.variableName), color: "#2563eb" },
  { tag: tags.function(tags.definition(tags.variableName)), color: "#2563eb" },
  { tag: tags.string, color: "#16a34a" },
  { tag: tags.special(tags.string), color: "#16a34a" },
  { tag: tags.propertyName, color: "#c2410c" },
  { tag: tags.number, color: "#ea580c" },
  { tag: tags.bool, color: "#ea580c" },
  { tag: tags.null, color: "#ea580c" },
  { tag: tags.typeName, color: "#a16207" },
  { tag: tags.className, color: "#a16207" },
  { tag: tags.standard(tags.typeName), color: "#a16207" },
  { tag: tags.comment, color: "#7f6315", fontStyle: "italic" },
  { tag: tags.lineComment, color: "#7f6315", fontStyle: "italic" },
  { tag: tags.blockComment, color: "#7f6315", fontStyle: "italic" },
  { tag: tags.operator, color: "#b45309" },
  { tag: tags.punctuation, color: "#7f6315" },
  { tag: tags.variableName, color: "#1f1f1f" },
  { tag: tags.regexp, color: "#ea580c" },
  { tag: tags.tagName, color: "#c2410c" },
  { tag: tags.attributeName, color: "#2563eb" },
  { tag: tags.attributeValue, color: "#16a34a" },
  { tag: tags.heading, color: "#fa520f", fontWeight: "bold" },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
]);

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  softWrap?: boolean;
  placeholder?: string;
  className?: string;
  /** Extra CodeMirror extensions to append. Typed as unknown[] to avoid
   *  Extension symbol mismatch when the caller uses a different @codemirror/state
   *  instance (e.g. a file:-linked monorepo package). */
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
      "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
        {
          backgroundColor: isDark
            ? "rgba(250, 82, 15, 0.20)"
            : "rgba(250, 82, 15, 0.15)",
        },
      ".cm-activeLine": {
        backgroundColor: isDark
          ? "rgba(255, 255, 255, 0.03)"
          : "rgba(0, 0, 0, 0.02)",
      },
      ".cm-gutters": {
        backgroundColor: isDark
          ? "rgba(255, 255, 255, 0.02)"
          : "rgba(0, 0, 0, 0.02)",
        color: muted,
        border: "none",
        paddingRight: "8px",
      },
      ".cm-activeLineGutter": {
        backgroundColor: isDark
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(0, 0, 0, 0.04)",
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
export function CodeEditor({
  value,
  onChange,
  language,
  height = "300px",
  readOnly = false,
  showLineNumbers = true,
  softWrap = false,
  placeholder,
  className,
  extensions,
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const { theme } = useTheme();

  // Keep onChange ref fresh
  onChangeRef.current = onChange;

  const buildExtensions = useCallback(
    async () => {
      const isDark = theme === "dark";
      const exts = [
        createBeamTheme(isDark),
        syntaxHighlighting(isDark ? beamHighlightDark : beamHighlightLight),
        indentOnInput(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap]),
        highlightActiveLine(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
      ];

      if (showLineNumbers) {
        exts.push(lineNumbers());
      }

      if (softWrap) {
        exts.push(EditorView.lineWrapping);
      }

      if (placeholder) {
        exts.push(cmPlaceholder(placeholder));
      }

      if (readOnly) {
        exts.push(EditorState.readOnly.of(true));
        exts.push(EditorView.editable.of(false));
      }

      const langExtension = await loadLanguage(language);
      if (langExtension) {
        exts.push(langExtension);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (extensions?.length) exts.push(...(extensions as any[]));

      return exts;
    },
    [theme, showLineNumbers, softWrap, placeholder, readOnly, language, extensions],
  );

  // Create / recreate the editor when config changes
  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    (async () => {
      const extensions = await buildExtensions();
      if (cancelled || !containerRef.current) return;

      // Destroy previous view
      viewRef.current?.destroy();

      const state = EditorState.create({
        doc: value,
        extensions,
      });

      const view = new EditorView({
        state,
        parent: containerRef.current,
      });

      viewRef.current = view;
    })();

    return () => {
      cancelled = true;
      viewRef.current?.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildExtensions]);

  // Sync external value changes
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const currentDoc = view.state.doc.toString();
    if (currentDoc !== value) {
      view.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      role="textbox"
      aria-label={`Code editor${language ? ` (${language})` : ""}${readOnly ? " (read-only)" : ""}`}
      aria-multiline="true"
      aria-readonly={readOnly || undefined}
      className={cx(editorContainer, className)}
      style={{ height }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const editorContainer = css({
  border: "1px solid",
  borderColor: "border.default",
  overflow: "hidden",
  borderRadius: "0",
  "& .cm-editor": {
    height: "100%",
  },
  "& .cm-scroller": {
    overflow: "auto",
  },
});
