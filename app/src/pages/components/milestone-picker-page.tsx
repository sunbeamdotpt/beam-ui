import { useState } from "react";
import { css } from "styled-system/css";
import { MilestonePicker } from "@sunbeam/beam-ui/components/ui/milestone-picker";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "options", type: "MilestoneOption[]", required: true, description: "Array of milestone options with id, title, dueDate, progress, open, and closed counts." },
  { name: "selected", type: "string | null", required: true, description: "The selected milestone ID, or null." },
  { name: "onChange", type: "(selected: string | null) => void", required: true, description: "Callback fired when selection changes. Clicking a selected milestone deselects it." },
  { name: "placeholder", type: "string", required: false, description: 'Placeholder text. Defaults to "Milestone".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const SAMPLE_MILESTONES = [
  { id: "v1", title: "v1.0 Launch", dueDate: "Apr 30, 2026", progress: 72, open: 7, closed: 18 },
  { id: "v1.1", title: "v1.1 Patch", dueDate: "May 15, 2026", progress: 30, open: 14, closed: 6 },
  { id: "v2", title: "v2.0 Redesign", dueDate: "Aug 1, 2026", progress: 5, open: 38, closed: 2 },
  { id: "backlog", title: "Backlog", progress: 0, open: 23, closed: 0 },
];

export function MilestonePickerPage() {
  const [selected, setSelected] = useState<string | null>("v1");

  return (
    <ComponentPage
      name="MilestonePicker"
      description="A single-select dropdown for assigning a milestone. Shows progress bars, due dates, and open/closed counts for each milestone."
      importPath='import { MilestonePicker } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <div className={pickerWrapper}>
          <MilestonePicker
            options={SAMPLE_MILESTONES}
            selected={selected}
            onChange={setSelected}
            placeholder="Set milestone..."
          />
        </div>
      </div>
      <p className={selectionText}>
        Selected: {selected ?? "none"}
      </p>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}useState{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"react"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}MilestonePicker{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> milestones = [{"\n"}
              {"  "}{"{ "}<span className={syn.prop}>id</span>: <span className={syn.string}>"v1"</span>, <span className={syn.prop}>title</span>: <span className={syn.string}>"v1.0"</span>, <span className={syn.prop}>progress</span>: <span className={syn.string}>72</span>, <span className={syn.prop}>open</span>: <span className={syn.string}>7</span>, <span className={syn.prop}>closed</span>: <span className={syn.string}>18</span>{" },"}{"\n"}
              ]{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [selected, setSelected] = <span className={syn.fn}>useState</span>(<span className={syn.keyword}>null</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>MilestonePicker</span>{"\n"}
              {"  "}<span className={syn.prop}>options</span>={"{"}milestones{"}"}{"\n"}
              {"  "}<span className={syn.prop}>selected</span>={"{"}selected{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setSelected{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Empty state</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "280px" })}>
          <MilestonePicker
            options={SAMPLE_MILESTONES}
            selected={null}
            onChange={() => {}}
            placeholder="Set milestone..."
          />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>With selection</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "280px" })}>
          <MilestonePicker
            options={SAMPLE_MILESTONES}
            selected="v2"
            onChange={() => {}}
          />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewRow = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  gap: "24px",
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "16px",
});

const pickerWrapper = css({
  width: "300px",
});

const selectionText = css({
  fontSize: "13px",
  fontFamily: "mono",
  color: "text.muted",
  marginBottom: "32px",
});

const variantBlock = css({
  marginBottom: "40px",
});

const variantLabel = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  textTransform: "capitalize",
  marginBottom: "12px",
});
