import { css, cx } from "../../system.ts";

import { type ReactNode, useState } from "react";
import { TabContent, TabList, TabsRoot, TabTrigger } from "@ark-ui/react/tabs";
import { Icon } from "./icon.tsx";

/** Represents a single code tab. */
interface CodeTab {
  /** Tab label (e.g., "JavaScript", "Python"). */
  label: string;
  /** Content keyed by toggle combo (e.g., "Non-streaming|V2|Synchronous"). Falls back to "default" key if no exact match. */
  variants?: Record<string, ReactNode>;
  /** Static content when no variants are used. */
  content?: ReactNode;
}

/** Toggle control group for filtering code variants. */
interface ToggleGroup {
  /** Array of option strings (e.g., ["Streaming", "Non-streaming"]). */
  options: string[];
  /** Initially selected option. Defaults to first option. */
  defaultValue?: string;
}

/** Props for {@link CodeBlock}. */
export interface CodeBlockProps {
  /** Array of code tabs to display. */
  tabs: CodeTab[];
  /** Optional streaming mode toggle (appears in top bar). */
  streamToggle?: ToggleGroup;
  /** Optional version toggle (appears in controls bar as pill group). */
  versionToggle?: ToggleGroup;
  /** Optional mode toggle (appears in controls bar as pill group). */
  modeToggle?: ToggleGroup;
  /** Additional Panda CSS classes. */
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Small pill toggle                                                   */
/* ------------------------------------------------------------------ */
function PillToggle({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      role="group"
      className={css({
        display: "flex",
        backgroundColor: "sunbeam.black",
        borderRadius: "md",
        padding: "2px",
      })}
    >
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={cx(
            css({
              padding: "4px 12px",
              fontSize: "10px",
              fontWeight: "button",
              borderRadius: "md",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "body",
            }),
            value === opt ? css({ backgroundColor: "code.activePill", color: "white" }) : css({
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.35)",
              _hover: { color: "rgba(255,255,255,0.7)" },
            }),
          )}
          type="button"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CodeBlock                                                           */
/* ------------------------------------------------------------------ */

/**
 * Tabbed code block with copy button and optional variant toggles.
 *
 * Renders multiple language/framework tabs. Each tab can have static content or
 * variant-keyed content selected by toggles (stream mode, version, execution mode).
 * Includes a copy button and syntax highlighting helpers via the `syn` export.
 *
 * Variant resolution: exact key match first, then partial matches, then "default" fallback.
 *
 * @example
 * ```tsx
 * <CodeBlock
 *   tabs={[
 *     {
 *       label: "JavaScript",
 *       variants: {
 *         "Streaming|V2": <code>// streaming v2 code</code>,
 *         "default": <code>// fallback code</code>
 *       }
 *     }
 *   ]}
 *   streamToggle={{ options: ["Streaming", "Non-streaming"] }}
 *   versionToggle={{ options: ["V1", "V2"] }}
 * />
 * ```
 */
export function CodeBlock({
  tabs,
  streamToggle,
  versionToggle,
  modeToggle,
  className,
}: CodeBlockProps): ReactNode {
  const [stream, setStream] = useState(
    streamToggle?.defaultValue ?? streamToggle?.options[0] ?? "",
  );
  const [version, setVersion] = useState(
    versionToggle?.defaultValue ?? versionToggle?.options[0] ?? "",
  );
  const [mode, setMode] = useState(modeToggle?.defaultValue ?? modeToggle?.options[0] ?? "");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const el = document.querySelector("[data-code-content]");
    if (el) {
      await navigator.clipboard.writeText(el.textContent ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  /** Build the variant key from current toggle state */
  const variantKey = [stream, version, mode].filter(Boolean).join("|");

  /** Resolve content for a tab given the current toggles */
  const resolveContent = (tab: CodeTab): ReactNode => {
    if (tab.content) return tab.content;
    if (!tab.variants) return null;
    // Try exact match, then partial matches, then "default"
    return tab.variants[variantKey] ?? tab.variants["default"] ?? Object.values(tab.variants)[0] ??
      null;
  };

  return (
    <TabsRoot defaultValue={tabs[0]?.label} className={cx(codeBlockRoot, className)}>
      {/* Stream / copy bar */}
      {streamToggle && (
        <div className={topBar}>
          <div className={css({ display: "flex", gap: "16px" })}>
            {streamToggle.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setStream(opt)}
                aria-pressed={stream === opt}
                className={cx(
                  css({
                    fontSize: "12px",
                    fontWeight: "button",
                    letterSpacing: "-0.01em",
                    textTransform: "uppercase",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    paddingBottom: "4px",
                    transition: "all 0.15s ease",
                    fontFamily: "body",
                  }),
                  stream === opt
                    ? css({
                      color: "white",
                      borderBottom: "2px solid",
                      borderBottomColor: "sunbeam.orange",
                    })
                    : css({
                      color: "rgba(255,255,255,0.35)",
                      _hover: { color: "rgba(255,255,255,0.6)" },
                    }),
                )}
                type="button"
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className={copyBtn}
            title="Copy code"
            aria-label="Copy code"
            type="button"
          >
            <Icon
              name={copied ? "check" : "content_copy"}
              size={16}
              className={css({ color: copied ? "code.success" : "rgba(255,255,255,0.35)" })}
            />
            <span
              aria-live="polite"
              className={css({
                fontSize: "10px",
                color: "code.success",
                fontFamily: "body",
                fontWeight: "button",
                textTransform: "uppercase",
              })}
            >
              {copied ? "Copied!" : ""}
            </span>
          </button>
        </div>
      )}

      {/* Language + version + mode bar */}
      <div className={controlsBar}>
        <div className={css({ display: "flex", gap: "12px", alignItems: "center" })}>
          <TabList className={tabList}>
            {tabs.map((tab) => (
              <TabTrigger key={tab.label} value={tab.label} className={tabTrigger}>
                {tab.label}
              </TabTrigger>
            ))}
          </TabList>
          {versionToggle && (
            <PillToggle options={versionToggle.options} value={version} onChange={setVersion} />
          )}
        </div>
        {modeToggle && <PillToggle options={modeToggle.options} value={mode} onChange={setMode} />}
        {!streamToggle && (
          <button
            onClick={handleCopy}
            className={copyBtn}
            title="Copy code"
            aria-label="Copy code"
            type="button"
          >
            <Icon
              name={copied ? "check" : "content_copy"}
              size={16}
              className={css({ color: copied ? "code.success" : "rgba(255,255,255,0.35)" })}
            />
            <span
              aria-live="polite"
              className={css({
                fontSize: "10px",
                color: "code.success",
                fontFamily: "body",
                fontWeight: "button",
                textTransform: "uppercase",
              })}
            >
              {copied ? "Copied!" : ""}
            </span>
          </button>
        )}
      </div>

      {/* Code panels — re-render when toggles change */}
      {tabs.map((tab) => (
        <TabContent key={tab.label} value={tab.label} className={codeBody}>
          <div data-code-content="">
            {resolveContent(tab)}
          </div>
        </TabContent>
      ))}
    </TabsRoot>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const codeBlockRoot = css({
  borderRadius: "0",
  overflow: "hidden",
  backgroundColor: "sunbeam.black",
  color: "code.text",
  fontFamily: "mono",
  fontSize: "14px",
  shadow: "code",
  border: "1px solid rgba(255,255,255,0.05)",
});

const topBar = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 16px",
  backgroundColor: "rgba(31,31,31,0.5)",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
});

const controlsBar = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  backgroundColor: "sunbeam.black",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  flexWrap: "wrap",
  gap: "8px",
});

const tabList = css({
  display: "flex",
  backgroundColor: "sunbeam.black",
  borderRadius: "md",
  padding: "2px",
  gap: 0,
});

const tabTrigger = css({
  padding: "4px 12px",
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  borderRadius: "md",
  border: "none",
  cursor: "pointer",
  transition: "all 0.15s ease",
  color: "rgba(255,255,255,0.35)",
  backgroundColor: "transparent",
  fontFamily: "body",
  _hover: { color: "rgba(255,255,255,0.7)" },
  _selected: { backgroundColor: "code.activePill", color: "white" },
});

const copyBtn = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "md",
  transition: "all 0.15s ease",
  _hover: { backgroundColor: "rgba(255,255,255,0.1)" },
});

const codeBody = css({
  padding: "24px",
  overflowX: "auto",
  lineHeight: 1.7,
  "& pre": { margin: 0, fontFamily: "mono" },
});

/* ------------------------------------------------------------------ */
/* Syntax span helpers (use as className on <span>)                    */
/* ------------------------------------------------------------------ */
export const syn: Record<
  "keyword" | "fn" | "string" | "prop" | "number" | "builtin" | "comment",
  string
> = {
  keyword: css({ color: "syn.keyword" }),
  fn: css({ color: "syn.fn" }),
  string: css({ color: "syn.string" }),
  prop: css({ color: "syn.prop" }),
  number: css({ color: "syn.number" }),
  builtin: css({ color: "syn.builtin" }),
  comment: css({ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }),
};
