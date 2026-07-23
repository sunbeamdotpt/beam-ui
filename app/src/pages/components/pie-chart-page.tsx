import { css } from "styled-system/css";
import { PieChart } from "@sunbeam/beam-ui/charts";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

/* ------------------------------------------------------------------ */
/* Sample data                                                         */
/* ------------------------------------------------------------------ */
const LANGUAGE_DATA = [
  { name: "TypeScript", value: 42 },
  { name: "Rust", value: 28 },
  { name: "Python", value: 15 },
  { name: "Go", value: 10 },
  { name: "Other", value: 5 },
];

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
const PIE_CHART_PROPS = [
  { name: "data", type: '{ name: string; value: number; color?: string }[]', required: true, description: "Slice data with name, value, and optional color." },
  { name: "height", type: "number", required: false, description: "Chart height in pixels. Defaults to 300." },
  { name: "donut", type: "boolean", required: false, description: "Render as a donut chart with hollow center." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function PieChartPage() {
  return (
    <ComponentPage
      name="PieChart"
      description="A pie chart component for visualizing proportional data. Supports both standard pie and donut variants with Beam theming."
      importPath='import { PieChart } from "@sunbeam/beam-ui/charts"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <PieChart data={LANGUAGE_DATA} height={280} />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PIE_CHART_PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}PieChart{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui/charts"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> data = [{"\n"}
              {"  "}{"{ "}name: <span className={syn.string}>"TypeScript"</span>, value: <span className={syn.number}>42</span>{" },"}{"\n"}
              {"  "}{"{ "}name: <span className={syn.string}>"Rust"</span>, value: <span className={syn.number}>28</span>{" },"}{"\n"}
              {"  "}...{"\n"}
              ]{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>PieChart</span> <span className={syn.prop}>data</span>={"{"}data{"}"} <span className={syn.prop}>height</span>={"{"}<span className={syn.number}>280</span>{"}"} {"/>"}{"\n"}
              {"\n"}
              {"// Donut variant"}{"\n"}
              {"<"}<span className={syn.fn}>PieChart</span> <span className={syn.prop}>data</span>={"{"}data{"}"} <span className={syn.prop}>donut</span> {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <h3 className={variantLabel}>Standard Pie -- Language Composition</h3>
      <p className={variantNote}>Repository language breakdown as a standard pie chart.</p>
      <div className={variantBox}>
        <PieChart data={LANGUAGE_DATA} height={280} />
      </div>

      <h3 className={variantLabel}>Donut -- Language Composition</h3>
      <p className={variantNote}>Same data rendered as a donut chart with a hollow center.</p>
      <div className={variantBox}>
        <PieChart data={LANGUAGE_DATA} height={280} donut />
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
