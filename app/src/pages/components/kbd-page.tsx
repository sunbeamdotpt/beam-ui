import { useState } from "react";
import { css } from "styled-system/css";
import { Kbd } from "@sunbeam/beam-ui/components/ui/kbd";
import { Tabs } from "@sunbeam/beam-ui/components/ui/tabs";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "children", type: "string", required: true, description: "The key or shortcut text to display. Mac symbols (⌘, ⌥) are auto-converted to Windows equivalents (Ctrl, Alt) on non-Mac devices." },
  { name: "platform", type: '"mac" | "windows" | "linux"', required: false, description: "Override platform detection. Defaults to auto-detect from user agent. Mac uses ⌘/⌥, Windows uses Ctrl/Alt, Linux uses Super/Alt." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const SHORTCUTS = [
  { keys: ["\u2318K"], label: "Command palette" },
  { keys: ["Esc"], label: "Close / dismiss" },
  { keys: ["Enter"], label: "Confirm" },
  { keys: ["\u2318", "Shift", "P"], label: "Open preferences" },
  { keys: ["Ctrl", "C"], label: "Copy to clipboard" },
];

export function KbdPage() {
  const [platform, setPlatform] = useState<"mac" | "windows" | "linux">("mac");

  return (
    <ComponentPage
      name="Kbd"
      description="A styled keyboard key indicator used to display shortcuts and key bindings. Auto-detects the user's platform and converts Mac symbols (⌘, ⌥) to platform equivalents (Ctrl/Super, Alt)."
      importPath='import { Kbd } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={css({ marginBottom: "12px" })}>
        <Tabs
          items={[
            { value: "mac", label: "macOS" },
            { value: "windows", label: "Windows" },
            { value: "linux", label: "Linux" },
          ]}
          activeValue={platform}
          onChange={(v) => setPlatform(v as "mac" | "windows" | "linux")}
        />
      </div>
      <div className={previewBox}>
        {SHORTCUTS.map(({ keys, label }) => (
          <div key={label} className={shortcutRow}>
            <span className={shortcutLabel}>{label}</span>
            <span className={shortcutKeys}>
              {keys.map((k, i) => (
                <span key={k + i}>
                  <Kbd platform={platform}>{k}</Kbd>
                  {i < keys.length - 1 && <span className={plusSign}>+</span>}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}Kbd{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Single key"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Kbd</span>{">"}Esc{"</"}<span className={syn.fn}>Kbd</span>{">"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Keyboard shortcut"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Kbd</span>{">"}{"\u2318K"}{"</"}<span className={syn.fn}>Kbd</span>{">"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Compound shortcut"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Kbd</span>{">"}{"\u2318"}{"</"}<span className={syn.fn}>Kbd</span>{">"} + {"<"}<span className={syn.fn}>Kbd</span>{">"}Shift{"</"}<span className={syn.fn}>Kbd</span>{">"} + {"<"}<span className={syn.fn}>Kbd</span>{">"}P{"</"}<span className={syn.fn}>Kbd</span>{">"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabelText}>Inline with text</h3>
        <p className={inlineDemo}>
          Press <Kbd>Esc</Kbd> to close the dialog, or <Kbd>{"\u2318K"}</Kbd> to open the command palette.
        </p>
        <CodeBlock
          tabs={[{
            label: "TSX",
            content: (
              <pre><code>
                {"<p>"}{"\n"}
                {"  Press <"}<span className={syn.fn}>Kbd</span>{">"}Esc{"</"}<span className={syn.fn}>Kbd</span>{">"} to close,{"\n"}
                {"  or <"}<span className={syn.fn}>Kbd</span>{">"}{"\u2318K"}{"</"}<span className={syn.fn}>Kbd</span>{">"} for command palette.{"\n"}
                {"</p>"}
              </code></pre>
            ),
          }]}
        />
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabelText}>Standalone keys</h3>
        <div className={css({ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" })}>
          <Kbd>Tab</Kbd>
          <Kbd>Space</Kbd>
          <Kbd>Backspace</Kbd>
          <Kbd>{"\u2318"}</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>Alt</Kbd>
          <Kbd>Ctrl</Kbd>
          <Kbd>{"\u2191"}</Kbd>
          <Kbd>{"\u2193"}</Kbd>
          <Kbd>{"\u2190"}</Kbd>
          <Kbd>{"\u2192"}</Kbd>
        </div>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "32px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const shortcutRow = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid",
  borderColor: "border.default",
  _last: { borderBottom: "none" },
});

const shortcutLabel = css({
  fontSize: "14px",
  color: "text.secondary",
});

const shortcutKeys = css({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const plusSign = css({
  fontSize: "12px",
  color: "text.muted",
  margin: "0 2px",
});

const variantBlock = css({
  marginBottom: "40px",
});

const variantLabelText = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "12px",
});

const inlineDemo = css({
  fontSize: "15px",
  lineHeight: 1.8,
  color: "text.secondary",
  marginBottom: "16px",
});
