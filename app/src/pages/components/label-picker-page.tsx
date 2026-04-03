import { useState } from "react";
import { css } from "styled-system/css";
import { LabelPicker } from "@sunbeam/beam-ui/components/ui/label-picker";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "options", type: "LabelOption[]", required: true, description: "Array of label options with id, name, color, and optional description." },
  { name: "selected", type: "string[]", required: true, description: "Array of selected label IDs." },
  { name: "onChange", type: "(selected: string[]) => void", required: true, description: "Callback fired when selection changes." },
  { name: "placeholder", type: "string", required: false, description: 'Placeholder text. Defaults to "Labels".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const SAMPLE_LABELS = [
  { id: "bug", name: "bug", color: "#d73a4a", description: "Something isn't working" },
  { id: "feature", name: "feature", color: "#0075ca", description: "New feature or request" },
  { id: "docs", name: "documentation", color: "#0e8a16", description: "Improvements or additions to docs" },
  { id: "enhancement", name: "enhancement", color: "#a2eeef", description: "Improvement to existing functionality" },
  { id: "help", name: "help wanted", color: "#008672", description: "Extra attention is needed" },
  { id: "priority", name: "priority: high", color: "#b60205" },
  { id: "wontfix", name: "wontfix", color: "#ffffff", description: "This will not be worked on" },
];

export function LabelPickerPage() {
  const [selected, setSelected] = useState<string[]>(["bug", "feature"]);

  return (
    <ComponentPage
      name="LabelPicker"
      description="A multi-select dropdown for choosing labels with color swatches. Supports search filtering and displays selected labels as colored pills."
      importPath='import { LabelPicker } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <div className={pickerWrapper}>
          <LabelPicker
            options={SAMPLE_LABELS}
            selected={selected}
            onChange={setSelected}
            placeholder="Add labels..."
          />
        </div>
      </div>
      <p className={selectionText}>
        Selected: {selected.length === 0 ? "none" : selected.join(", ")}
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
              <span className={syn.keyword}>import</span> {"{ "}LabelPicker{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> labels = [{"\n"}
              {"  "}{"{ "}<span className={syn.prop}>id</span>: <span className={syn.string}>"bug"</span>, <span className={syn.prop}>name</span>: <span className={syn.string}>"bug"</span>, <span className={syn.prop}>color</span>: <span className={syn.string}>"#d73a4a"</span>{" },"}{"\n"}
              {"  "}{"{ "}<span className={syn.prop}>id</span>: <span className={syn.string}>"feature"</span>, <span className={syn.prop}>name</span>: <span className={syn.string}>"feature"</span>, <span className={syn.prop}>color</span>: <span className={syn.string}>"#0075ca"</span>{" },"}{"\n"}
              ]{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [selected, setSelected] = <span className={syn.fn}>useState</span>(<span className={syn.string}>[]</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>LabelPicker</span>{"\n"}
              {"  "}<span className={syn.prop}>options</span>={"{"}labels{"}"}{"\n"}
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
          <LabelPicker
            options={SAMPLE_LABELS}
            selected={[]}
            onChange={() => {}}
            placeholder="Add labels..."
          />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Pre-selected</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "320px" })}>
          <LabelPicker
            options={SAMPLE_LABELS}
            selected={["bug", "priority", "docs"]}
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
