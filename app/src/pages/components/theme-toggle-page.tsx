import { css } from "styled-system/css";
import { ThemeToggle } from "@sunbeam/beam-ui/components/ui/theme-toggle";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "variant", type: '"icon" | "switch" | "pill"', required: false, description: 'Visual style. "icon" is a compact button, "switch" is a labeled toggle, "pill" is a segmented control. Defaults to "icon".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function ThemeTogglePage() {
  return (
    <ComponentPage
      name="ThemeToggle"
      description="A theme switcher component that toggles between light and dark mode. Persists the preference via a cross-domain cookie so all Sunbeam sites share the same theme. Falls back to system prefers-color-scheme on first visit."
      importPath='import { ThemeToggle } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <div className={previewItem}>
          <h4 className={previewLabel}>Icon</h4>
          <ThemeToggle variant="icon" />
        </div>
        <div className={previewItem}>
          <h4 className={previewLabel}>Switch</h4>
          <ThemeToggle variant="switch" />
        </div>
        <div className={previewItem}>
          <h4 className={previewLabel}>Pill</h4>
          <ThemeToggle variant="pill" />
        </div>
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}ThemeToggle{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Icon button (compact, for headers)"}</span>{"\n"}
              {"<"}<span className={syn.fn}>ThemeToggle</span> {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Labeled switch"}</span>{"\n"}
              {"<"}<span className={syn.fn}>ThemeToggle</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"switch"</span> {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Segmented pill control"}</span>{"\n"}
              {"<"}<span className={syn.fn}>ThemeToggle</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"pill"</span> {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Icon</h3>
        <p className={variantDesc}>Compact square button showing sun or moon. Best for headers and toolbars.</p>
        <ThemeToggle variant="icon" />
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Switch</h3>
        <p className={variantDesc}>Toggle switch with a label. Shows current mode name and icon.</p>
        <ThemeToggle variant="switch" />
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Pill</h3>
        <p className={variantDesc}>Segmented control with Light/Dark options. Active option highlighted in sunbeam orange.</p>
        <ThemeToggle variant="pill" />
      </div>
    </ComponentPage>
  );
}

const previewRow = css({ display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const previewItem = css({ display: "flex", flexDirection: "column", gap: "12px" });
const previewLabel = css({ fontSize: "12px", fontWeight: "button", textTransform: "uppercase", letterSpacing: "0.1em", color: "text.muted" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "8px" });
const variantDesc = css({ fontSize: "14px", color: "text.secondary", marginBottom: "16px", lineHeight: 1.5 });
