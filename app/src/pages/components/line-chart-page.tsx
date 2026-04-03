import { css } from "styled-system/css";
import { LineChart } from "@sunbeam/beam-ui/components/ui/charts";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

/* ------------------------------------------------------------------ */
/* Sample data                                                         */
/* ------------------------------------------------------------------ */
const CODE_FREQUENCY_DATA = [
  { label: "W1", additions: 320, deletions: 120 },
  { label: "W2", additions: 480, deletions: 200 },
  { label: "W3", additions: 210, deletions: 90 },
  { label: "W4", additions: 590, deletions: 310 },
  { label: "W5", additions: 430, deletions: 170 },
  { label: "W6", additions: 280, deletions: 140 },
  { label: "W7", additions: 710, deletions: 250 },
  { label: "W8", additions: 360, deletions: 180 },
  { label: "W9", additions: 520, deletions: 220 },
  { label: "W10", additions: 640, deletions: 290 },
  { label: "W11", additions: 470, deletions: 160 },
  { label: "W12", additions: 550, deletions: 230 },
];

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
const LINE_CHART_PROPS = [
  { name: "data", type: "ChartDataPoint[]", required: true, description: "Array of data points. Each must have a `label` string key." },
  { name: "lines", type: '{ key: string; color?: string; label?: string }[]', required: true, description: "Lines to render. `key` maps to a data field." },
  { name: "height", type: "number", required: false, description: "Chart height in pixels. Defaults to 300." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function LineChartPage() {
  return (
    <ComponentPage
      name="LineChart"
      description="A line chart component for visualizing trends over time. Wraps Recharts with Beam design system theming."
      importPath='import { LineChart } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <LineChart
          data={CODE_FREQUENCY_DATA}
          lines={[
            { key: "additions", color: "#fa520f", label: "Additions" },
            { key: "deletions", color: "#ffb83e", label: "Deletions" },
          ]}
        />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={LINE_CHART_PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}LineChart{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> data = [{"\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"W1"</span>, additions: <span className={syn.number}>320</span>, deletions: <span className={syn.number}>120</span>{" },"}{"\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"W2"</span>, additions: <span className={syn.number}>480</span>, deletions: <span className={syn.number}>200</span>{" },"}{"\n"}
              {"  "}...{"\n"}
              ]{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>LineChart</span>{"\n"}
              {"  "}<span className={syn.prop}>data</span>={"{"}data{"}"}{"\n"}
              {"  "}<span className={syn.prop}>lines</span>={"{["}{"{ "}key: <span className={syn.string}>"additions"</span>, color: <span className={syn.string}>"#fa520f"</span>, label: <span className={syn.string}>"Additions"</span>{" },"}{"\n"}
              {"          "}{"{ "}key: <span className={syn.string}>"deletions"</span>, color: <span className={syn.string}>"#ffb83e"</span>, label: <span className={syn.string}>"Deletions"</span>{" }"}]{"}"}  {"\n"}
              {"  "}<span className={syn.prop}>height</span>={"{"}<span className={syn.number}>320</span>{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <h3 className={variantLabel}>Multi-line -- Additions & Deletions</h3>
      <p className={variantNote}>Two lines tracking code frequency over 12 weeks with custom height.</p>
      <div className={variantBox}>
        <LineChart
          data={CODE_FREQUENCY_DATA}
          lines={[
            { key: "additions", color: "#fa520f", label: "Additions" },
            { key: "deletions", color: "#ffb83e", label: "Deletions" },
          ]}
          height={320}
        />
      </div>

      <h3 className={variantLabel}>Single Line -- Additions Only</h3>
      <p className={variantNote}>A single-line variant showing only additions.</p>
      <div className={variantBox}>
        <LineChart
          data={CODE_FREQUENCY_DATA}
          lines={[
            { key: "additions", color: "#fa520f", label: "Additions" },
          ]}
          height={280}
        />
      </div>
    </ComponentPage>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */
const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBox = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
const variantNote = css({ fontSize: "14px", color: "text.secondary", marginBottom: "16px", lineHeight: 1.6 });
