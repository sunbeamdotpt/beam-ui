import { css } from "styled-system/css";
import { AreaChart } from "@sunbeam/beam-ui/components/ui/charts";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

/* ------------------------------------------------------------------ */
/* Sample data                                                         */
/* ------------------------------------------------------------------ */
const ACTIVITY_DATA = [
  { label: "Jan", issues: 45, prs: 32, reviews: 28 },
  { label: "Feb", issues: 52, prs: 41, reviews: 35 },
  { label: "Mar", issues: 38, prs: 29, reviews: 22 },
  { label: "Apr", issues: 61, prs: 48, reviews: 40 },
  { label: "May", issues: 55, prs: 43, reviews: 37 },
  { label: "Jun", issues: 70, prs: 56, reviews: 45 },
  { label: "Jul", issues: 48, prs: 35, reviews: 30 },
  { label: "Aug", issues: 63, prs: 51, reviews: 42 },
  { label: "Sep", issues: 72, prs: 58, reviews: 48 },
  { label: "Oct", issues: 58, prs: 44, reviews: 38 },
  { label: "Nov", issues: 67, prs: 52, reviews: 43 },
  { label: "Dec", issues: 54, prs: 40, reviews: 33 },
];

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
const AREA_CHART_PROPS = [
  { name: "data", type: "ChartDataPoint[]", required: true, description: "Array of data points with a `label` key." },
  { name: "areas", type: '{ key: string; color?: string; label?: string }[]', required: true, description: "Areas to render. `key` maps to a data field." },
  { name: "height", type: "number", required: false, description: "Chart height in pixels. Defaults to 300." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function AreaChartPage() {
  return (
    <ComponentPage
      name="AreaChart"
      description="An area chart component for visualizing trends with filled regions. Supports multiple stacked areas with Beam theming."
      importPath='import { AreaChart } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <AreaChart
          data={ACTIVITY_DATA}
          areas={[
            { key: "issues", color: "#fa520f", label: "Issues" },
            { key: "prs", color: "#ffb83e", label: "Pull Requests" },
            { key: "reviews", color: "#ffd06a", label: "Reviews" },
          ]}
          height={320}
        />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={AREA_CHART_PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}AreaChart{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> data = [{"\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"Jan"</span>, issues: <span className={syn.number}>45</span>, prs: <span className={syn.number}>32</span>{" },"}{"\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"Feb"</span>, issues: <span className={syn.number}>52</span>, prs: <span className={syn.number}>41</span>{" },"}{"\n"}
              {"  "}...{"\n"}
              ]{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>AreaChart</span>{"\n"}
              {"  "}<span className={syn.prop}>data</span>={"{"}data{"}"}{"\n"}
              {"  "}<span className={syn.prop}>areas</span>={"{["}{"{ "}key: <span className={syn.string}>"issues"</span>, color: <span className={syn.string}>"#fa520f"</span>, label: <span className={syn.string}>"Issues"</span>{" },"}{"\n"}
              {"          "}{"{ "}key: <span className={syn.string}>"prs"</span>, color: <span className={syn.string}>"#ffb83e"</span>, label: <span className={syn.string}>"PRs"</span>{" }"}]{"}"}  {"\n"}
              {"  "}<span className={syn.prop}>height</span>={"{"}<span className={syn.number}>320</span>{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <h3 className={variantLabel}>Multi-area -- Activity over Time</h3>
      <p className={variantNote}>Issues, pull requests, and reviews tracked over 12 months.</p>
      <div className={variantBox}>
        <AreaChart
          data={ACTIVITY_DATA}
          areas={[
            { key: "issues", color: "#fa520f", label: "Issues" },
            { key: "prs", color: "#ffb83e", label: "Pull Requests" },
            { key: "reviews", color: "#ffd06a", label: "Reviews" },
          ]}
          height={320}
        />
      </div>

      <h3 className={variantLabel}>Single Area -- Issues Only</h3>
      <p className={variantNote}>A single area showing issue volume over time.</p>
      <div className={variantBox}>
        <AreaChart
          data={ACTIVITY_DATA}
          areas={[
            { key: "issues", color: "#fa520f", label: "Issues" },
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
