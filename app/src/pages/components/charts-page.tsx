import { css } from "styled-system/css";
import { LineChart, BarChart, PieChart, AreaChart } from "@sunbeam/beam-ui/components/ui/charts";
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

const COMMITS_DATA = [
  { label: "Mon", commits: 12 },
  { label: "Tue", commits: 19 },
  { label: "Wed", commits: 15 },
  { label: "Thu", commits: 22 },
  { label: "Fri", commits: 18 },
  { label: "Sat", commits: 6 },
  { label: "Sun", commits: 3 },
];

const LANGUAGE_DATA = [
  { name: "TypeScript", value: 42 },
  { name: "Rust", value: 28 },
  { name: "Python", value: 15 },
  { name: "Go", value: 10 },
  { name: "Other", value: 5 },
];

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
const LINE_CHART_PROPS = [
  { name: "data", type: "ChartDataPoint[]", required: true, description: "Array of data points. Each must have a `label` string key." },
  { name: "lines", type: '{ key: string; color?: string; label?: string }[]', required: true, description: "Lines to render. `key` maps to a data field." },
  { name: "height", type: "number", required: false, description: "Chart height in pixels. Defaults to 300." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const BAR_CHART_PROPS = [
  { name: "data", type: "ChartDataPoint[]", required: true, description: "Array of data points with a `label` key." },
  { name: "bars", type: '{ key: string; color?: string; label?: string }[]', required: true, description: "Bars to render. `key` maps to a data field." },
  { name: "height", type: "number", required: false, description: "Chart height in pixels. Defaults to 300." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const PIE_CHART_PROPS = [
  { name: "data", type: '{ name: string; value: number; color?: string }[]', required: true, description: "Slice data with name, value, and optional color." },
  { name: "height", type: "number", required: false, description: "Chart height in pixels. Defaults to 300." },
  { name: "donut", type: "boolean", required: false, description: "Render as a donut chart with hollow center." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const AREA_CHART_PROPS = [
  { name: "data", type: "ChartDataPoint[]", required: true, description: "Array of data points with a `label` key." },
  { name: "areas", type: '{ key: string; color?: string; label?: string }[]', required: true, description: "Areas to render. `key` maps to a data field." },
  { name: "height", type: "number", required: false, description: "Chart height in pixels. Defaults to 300." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function ChartsPage() {
  return (
    <ComponentPage
      name="Charts"
      description="Styled chart components wrapping Recharts. Includes LineChart, BarChart, PieChart, and AreaChart with Beam design system theming."
      importPath='import { LineChart, BarChart, PieChart, AreaChart } from "@sunbeam/beam-ui"'
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

      <h3 className={propsSubheading}>LineChart</h3>
      <PropsTable props={LINE_CHART_PROPS} />

      <h3 className={propsSubheading}>BarChart</h3>
      <PropsTable props={BAR_CHART_PROPS} />

      <h3 className={propsSubheading}>PieChart</h3>
      <PropsTable props={PIE_CHART_PROPS} />

      <h3 className={propsSubheading}>AreaChart</h3>
      <PropsTable props={AREA_CHART_PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}LineChart, BarChart, PieChart, AreaChart{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> data = [{"\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"Jan"</span>, value: <span className={syn.number}>42</span>{" },"}{"\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"Feb"</span>, value: <span className={syn.number}>58</span>{" },"}{"\n"}
              {"  "}...{"\n"}
              ]{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>LineChart</span>{"\n"}
              {"  "}<span className={syn.prop}>data</span>={"{"}data{"}"}{"\n"}
              {"  "}<span className={syn.prop}>lines</span>={"{[{ "}key: <span className={syn.string}>"value"</span>, label: <span className={syn.string}>"Revenue"</span>{" }]}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <h3 className={variantLabel}>Line Chart -- Code Frequency</h3>
      <p className={variantNote}>Additions and deletions over 12 weeks.</p>
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

      <h3 className={variantLabel}>Bar Chart -- Commits per Day</h3>
      <p className={variantNote}>Weekly commit distribution.</p>
      <div className={variantBox}>
        <BarChart
          data={COMMITS_DATA}
          bars={[{ key: "commits", color: "#fa520f", label: "Commits" }]}
          height={280}
        />
      </div>

      <h3 className={variantLabel}>Pie Chart -- Language Composition</h3>
      <div className={chartRow}>
        <div className={chartHalf}>
          <p className={variantNote}>Standard pie</p>
          <PieChart data={LANGUAGE_DATA} height={280} />
        </div>
        <div className={chartHalf}>
          <p className={variantNote}>Donut variant</p>
          <PieChart data={LANGUAGE_DATA} height={280} donut />
        </div>
      </div>

      <h3 className={variantLabel}>Area Chart -- Activity over Time</h3>
      <p className={variantNote}>Issues, PRs, and reviews over 12 months.</p>
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
const propsSubheading = css({ fontSize: "16px", fontWeight: "heading", color: "text.primary", marginBottom: "8px", marginTop: "24px", fontFamily: "mono" });

const chartRow = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
  gap: "24px",
  marginBottom: "40px",
});

const chartHalf = css({
  display: "flex",
  flexDirection: "column",
});
