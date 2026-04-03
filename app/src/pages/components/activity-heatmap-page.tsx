import { useMemo } from "react";
import { css } from "styled-system/css";
import { ActivityHeatmap } from "@sunbeam/beam-ui/components/ui/activity-heatmap";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "data", type: "ActivityDay[]", required: true, description: "Array of { date: string, count: number } objects. Dates are YYYY-MM-DD." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

function generateSampleData() {
  const data: { date: string; count: number }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    // Weighted random: mostly 0s, some low, few high
    const rand = Math.random();
    let count = 0;
    if (rand > 0.4) count = Math.floor(Math.random() * 3);
    if (rand > 0.75) count = Math.floor(Math.random() * 6) + 3;
    if (rand > 0.92) count = Math.floor(Math.random() * 8) + 8;

    data.push({ date: dateStr, count });
  }
  return data;
}

export function ActivityHeatmapPage() {
  const sampleData = useMemo(() => generateSampleData(), []);
  const totalContributions = sampleData.reduce((sum, d) => sum + d.count, 0);

  return (
    <ComponentPage
      name="ActivityHeatmap"
      description="A GitHub-style contribution heatmap that visualizes daily activity over the past year. Color intensity scales with count using the sunbeam palette."
      importPath='import { ActivityHeatmap } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <p className={css({ fontSize: "14px", fontWeight: "heading", color: "text.primary", marginBottom: "12px" })}>
          {totalContributions.toLocaleString()} contributions in the last year
        </p>
        <ActivityHeatmap data={sampleData} />
        <div className={legendRow}>
          <span className={legendLabel}>Less</span>
          <div className={legendSwatch} style={{ backgroundColor: "rgba(255,161,16,0.08)" }} />
          <div className={legendSwatch} style={{ backgroundColor: "rgba(255,208,106,0.25)" }} />
          <div className={legendSwatch} style={{ backgroundColor: "#ffd06a" }} />
          <div className={legendSwatch} style={{ backgroundColor: "#ffb83e" }} />
          <div className={legendSwatch} style={{ backgroundColor: "#fa520f" }} />
          <span className={legendLabel}>More</span>
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
              <span className={syn.keyword}>import</span> {"{ "}ActivityHeatmap{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> data = [{"\n"}
              {"  "}{"{ "}date: <span className={syn.string}>"2026-01-15"</span>, count: <span className={syn.number}>4</span>{" },"}{"\n"}
              {"  "}{"{ "}date: <span className={syn.string}>"2026-01-16"</span>, count: <span className={syn.number}>12</span>{" },"}{"\n"}
              {"  "}...{"\n"}
              ]{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>ActivityHeatmap</span> <span className={syn.prop}>data</span>={"{"}data{"}"} {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Color scale</h3>
        <div className={scaleGrid}>
          <div className={scaleItem}>
            <div className={scaleBox} style={{ backgroundColor: "rgba(255,161,16,0.08)" }} />
            <span className={scaleLabel}>0 (empty)</span>
          </div>
          <div className={scaleItem}>
            <div className={scaleBox} style={{ backgroundColor: "rgba(255,208,106,0.25)" }} />
            <span className={scaleLabel}>1-2</span>
          </div>
          <div className={scaleItem}>
            <div className={scaleBox} style={{ backgroundColor: "#ffd06a" }} />
            <span className={scaleLabel}>3-5</span>
          </div>
          <div className={scaleItem}>
            <div className={scaleBox} style={{ backgroundColor: "#ffb83e" }} />
            <span className={scaleLabel}>6-9</span>
          </div>
          <div className={scaleItem}>
            <div className={scaleBox} style={{ backgroundColor: "#fa520f" }} />
            <span className={scaleLabel}>10+</span>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px", overflowX: "auto" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });

const legendRow = css({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginTop: "12px",
});

const legendLabel = css({
  fontSize: "10px",
  fontFamily: "body",
  color: "text.muted",
  marginLeft: "2px",
  marginRight: "2px",
});

const legendSwatch = css({
  width: "12px",
  height: "12px",
  borderRadius: "2px",
});

const scaleGrid = css({
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
});

const scaleItem = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const scaleBox = css({
  width: "24px",
  height: "24px",
  borderRadius: "2px",
  border: "1px solid",
  borderColor: "border.default",
});

const scaleLabel = css({
  fontSize: "12px",
  fontFamily: "mono",
  color: "text.muted",
});
