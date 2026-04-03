import { useState, type ReactNode } from "react";
import { TabsRoot, TabList, TabTrigger, TabContent } from "@ark-ui/react/tabs";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

interface CodeTab {
  label: string;
  /** Content keyed by toggle combo, e.g. "Non-streaming|V2|Synchronous". Falls back to "default". */
  variants?: Record<string, ReactNode>;
  /** Simple content (no variants) */
  content?: ReactNode;
}

interface ToggleGroup {
  options: string[];
  defaultValue?: string;
}

interface CodeBlockProps {
  tabs: CodeTab[];
  streamToggle?: ToggleGroup;
  versionToggle?: ToggleGroup;
  modeToggle?: ToggleGroup;
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
    <div className={css({ display: "flex", backgroundColor: "sunbeam.black", borderRadius: "md", padding: "2px" })}>
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
            value === opt
              ? css({ backgroundColor: "code.activePill", color: "white" })
              : css({ backgroundColor: "transparent", color: "rgba(255,255,255,0.35)", _hover: { color: "rgba(255,255,255,0.7)" } })
          )}
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
export function CodeBlock({
  tabs,
  streamToggle,
  versionToggle,
  modeToggle,
  className,
}: CodeBlockProps) {
  const [stream, setStream] = useState(streamToggle?.defaultValue ?? streamToggle?.options[0] ?? "");
  const [version, setVersion] = useState(versionToggle?.defaultValue ?? versionToggle?.options[0] ?? "");
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
    return tab.variants[variantKey] ?? tab.variants["default"] ?? Object.values(tab.variants)[0] ?? null;
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
                    ? css({ color: "white", borderBottom: "2px solid", borderBottomColor: "sunbeam.orange" })
                    : css({ color: "rgba(255,255,255,0.35)", _hover: { color: "rgba(255,255,255,0.6)" } })
                )}
              >
                {opt}
              </button>
            ))}
          </div>
          <button onClick={handleCopy} className={copyBtn} title="Copy code" aria-label="Copy code">
            <Icon
              name={copied ? "check" : "content_copy"}
              size={16}
              className={css({ color: copied ? "code.success" : "rgba(255,255,255,0.35)" })}
            />
            <span aria-live="polite" className={css({ fontSize: "10px", color: "code.success", fontFamily: "body", fontWeight: "button", textTransform: "uppercase" })}>
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
        {modeToggle && (
          <PillToggle options={modeToggle.options} value={mode} onChange={setMode} />
        )}
        {!streamToggle && (
          <button onClick={handleCopy} className={copyBtn} title="Copy code" aria-label="Copy code">
            <Icon
              name={copied ? "check" : "content_copy"}
              size={16}
              className={css({ color: copied ? "code.success" : "rgba(255,255,255,0.35)" })}
            />
            <span aria-live="polite" className={css({ fontSize: "10px", color: "code.success", fontFamily: "body", fontWeight: "button", textTransform: "uppercase" })}>
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
export const syn = {
  keyword: css({ color: "syn.keyword" }),
  fn: css({ color: "syn.fn" }),
  string: css({ color: "syn.string" }),
  prop: css({ color: "syn.prop" }),
  number: css({ color: "syn.number" }),
  builtin: css({ color: "syn.builtin" }),
  comment: css({ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }),
};
