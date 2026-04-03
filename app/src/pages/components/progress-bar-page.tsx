import { useState } from "react";
import { css } from "styled-system/css";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { ProgressBar } from "@sunbeam/beam-ui/components/ui/progress-bar";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "value", type: "number", required: true, description: "Current progress value (0-100). Values are clamped to this range." },
  { name: "variant", type: '"default" | "success" | "error"', required: false, description: 'Color variant for the fill bar. Defaults to "default".' },
  { name: "showLabel", type: "boolean", required: false, description: "When true, displays the percentage label to the right of the bar." },
  { name: "size", type: '"sm" | "md"', required: false, description: 'Track height: sm (4px) or md (8px). Defaults to "md".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names applied to the track." },
];

const VARIANTS = ["default", "success", "error"] as const;

export function ProgressBarPage() {
  const [value, setValue] = useState(45);

  return (
    <ComponentPage
      name="ProgressBar"
      description="A horizontal progress indicator with animated fill transitions. Supports three color variants, two sizes, and an optional percentage label."
      importPath='import { ProgressBar } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <div className={controlRow}>
          <Button variant="primary" onClick={() => setValue((v) => Math.max(0, v - 10))}>-10</Button>
          <span className={valueLabel}>{value}%</span>
          <Button variant="primary" onClick={() => setValue((v) => Math.min(100, v + 10))}>+10</Button>
        </div>
        <div className={barStack}>
          {VARIANTS.map((v) => (
            <div key={v} className={barRow}>
              <span className={barRowLabel}>{v}</span>
              <ProgressBar value={value} variant={v} showLabel size="md" />
            </div>
          ))}
        </div>
        <div className={barStack}>
          <h4 className={sizeLabel}>Small size</h4>
          <ProgressBar value={value} variant="default" size="sm" />
        </div>
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
              <span className={syn.keyword}>import</span> {"{ "}ProgressBar{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Basic usage"}</span>{"\n"}
              {"<"}<span className={syn.fn}>ProgressBar</span> <span className={syn.prop}>value</span>={"{45}"} {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// With label and success variant"}</span>{"\n"}
              {"<"}<span className={syn.fn}>ProgressBar</span> <span className={syn.prop}>value</span>={"{80}"} <span className={syn.prop}>variant</span>=<span className={syn.string}>"success"</span> <span className={syn.prop}>showLabel</span> {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      {VARIANTS.map((v) => (
        <div key={v} className={variantBlock}>
          <h3 className={variantLabelText}>{v}</h3>
          <div className={css({ marginBottom: "16px", maxWidth: "400px" })}>
            <ProgressBar value={65} variant={v} showLabel />
          </div>
          <CodeBlock
            tabs={[{
              label: "TSX",
              content: (
                <pre><code>
                  {"<"}<span className={syn.fn}>ProgressBar</span> <span className={syn.prop}>value</span>={"{65}"} <span className={syn.prop}>variant</span>=<span className={syn.string}>"{v}"</span> <span className={syn.prop}>showLabel</span> {"/>"}
                </code></pre>
              ),
            }]}
          />
        </div>
      ))}
    </ComponentPage>
  );
}

const previewBox = css({
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "32px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

const controlRow = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
});

const valueLabel = css({
  fontSize: "24px",
  fontWeight: "heading",
  color: "text.primary",
  fontFamily: "mono",
  minWidth: "60px",
  textAlign: "center",
});

const barStack = css({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const barRow = css({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

const barRowLabel = css({
  fontSize: "12px",
  fontWeight: "button",
  color: "text.muted",
  textTransform: "capitalize",
});

const sizeLabel = css({
  fontSize: "12px",
  fontWeight: "button",
  color: "text.muted",
});

const variantBlock = css({
  marginBottom: "40px",
});

const variantLabelText = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  textTransform: "capitalize",
  marginBottom: "12px",
});
