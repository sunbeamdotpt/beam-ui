import { css } from "styled-system/css";
import { BarChart } from "@sunbeam/beam-ui/components/ui/charts";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

/* ------------------------------------------------------------------ */
/* Sample data                                                         */
/* ------------------------------------------------------------------ */
const COMMITS_DATA = [
  { label: "Mon", commits: 12 },
  { label: "Tue", commits: 19 },
  { label: "Wed", commits: 15 },
  { label: "Thu", commits: 22 },
  { label: "Fri", commits: 18 },
  { label: "Sat", commits: 6 },
  { label: "Sun", commits: 3 },
];

const MULTI_BAR_DATA = [
  { label: "Mon", merged: 8, open: 4, closed: 2 },
  { label: "Tue", merged: 12, open: 7, closed: 3 },
  { label: "Wed", merged: 10, open: 5, closed: 4 },
  { label: "Thu", merged: 15, open: 8, closed: 2 },
  { label: "Fri", merged: 11, open: 6, closed: 5 },
  { label: "Sat", merged: 3, open: 2, closed: 1 },
  { label: "Sun", merged: 2, open: 1, closed: 0 },
];

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
const BAR_CHART_PROPS = [
  { name: "data", type: "ChartDataPoint[]", required: true, description: "Array of data points with a `label` key." },
  { name: "bars", type: '{ key: string; color?: string; label?: string }[]', required: true, description: "Bars to render. `key` maps to a data field." },
  { name: "height", type: "number", required: false, description: "Chart height in pixels. Defaults to 300." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function BarChartPage() {
  return (
    <ComponentPage
      name="BarChart"
      description="A bar chart component for visualizing categorical data. Supports single and multi-bar configurations with Beam theming."
      importPath='import { BarChart } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <BarChart
          data={COMMITS_DATA}
          bars={[{ key: "commits", color: "#fa520f", label: "Commits" }]}
          height={280}
        />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={BAR_CHART_PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}BarChart{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> data = [{"\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"Mon"</span>, commits: <span className={syn.number}>12</span>{" },"}{"\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"Tue"</span>, commits: <span className={syn.number}>19</span>{" },"}{"\n"}
              {"  "}...{"\n"}
              ]{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>BarChart</span>{"\n"}
              {"  "}<span className={syn.prop}>data</span>={"{"}data{"}"}{"\n"}
              {"  "}<span className={syn.prop}>bars</span>={"{[{ "}key: <span className={syn.string}>"commits"</span>, color: <span className={syn.string}>"#fa520f"</span>, label: <span className={syn.string}>"Commits"</span>{" }]}"}{"\n"}
              {"  "}<span className={syn.prop}>height</span>={"{"}<span className={syn.number}>280</span>{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <h3 className={variantLabel}>Single Bar -- Commits per Day</h3>
      <p className={variantNote}>Weekly commit distribution with a single data series.</p>
      <div className={variantBox}>
        <BarChart
          data={COMMITS_DATA}
          bars={[{ key: "commits", color: "#fa520f", label: "Commits" }]}
          height={280}
        />
      </div>

      <h3 className={variantLabel}>Multi-bar -- Pull Request Activity</h3>
      <p className={variantNote}>Merged, open, and closed PRs per day shown as grouped bars.</p>
      <div className={variantBox}>
        <BarChart
          data={MULTI_BAR_DATA}
          bars={[
            { key: "merged", color: "#fa520f", label: "Merged" },
            { key: "open", color: "#ffb83e", label: "Open" },
            { key: "closed", color: "#ffd06a", label: "Closed" },
          ]}
          height={320}
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
