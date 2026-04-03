import { useState } from "react";
import { css } from "styled-system/css";
import { Select } from "@sunbeam/beam-ui/components/ui/select";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "options", type: "{ value: string; label: string }[]", required: true, description: "Array of selectable options." },
  { name: "value", type: "string", required: true, description: "The currently selected value." },
  { name: "onChange", type: "(value: string) => void", required: true, description: "Callback fired when selection changes." },
  { name: "placeholder", type: "string", required: false, description: 'Placeholder text. Defaults to "Select...".' },
  { name: "disabled", type: "boolean", required: false, description: "Disables the select. Defaults to false." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const BUCKET_OPTIONS = [
  { value: "assets-prod", label: "assets-prod" },
  { value: "assets-staging", label: "assets-staging" },
  { value: "backups", label: "backups" },
  { value: "logs", label: "logs" },
];

export function SelectPage() {
  const [bucket, setBucket] = useState("");

  return (
    <ComponentPage
      name="Select"
      description="A dropdown select component built on Ark UI. Supports keyboard navigation, custom positioning, and accessible labeling."
      importPath='import { Select } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <div className={selectWrapper}>
          <Select
            options={BUCKET_OPTIONS}
            value={bucket}
            onChange={setBucket}
            placeholder="Choose a bucket..."
          />
        </div>
        <div className={selectWrapper}>
          <Select
            options={BUCKET_OPTIONS}
            value="backups"
            onChange={() => {}}
            disabled
          />
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
              <span className={syn.keyword}>import</span> {"{ "}useState{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"react"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}Select{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> options = [{"\n"}
              {"  "}{"{ "}<span className={syn.prop}>value</span>: <span className={syn.string}>"assets-prod"</span>, <span className={syn.prop}>label</span>: <span className={syn.string}>"assets-prod"</span>{" },"}{"\n"}
              {"  "}{"{ "}<span className={syn.prop}>value</span>: <span className={syn.string}>"backups"</span>, <span className={syn.prop}>label</span>: <span className={syn.string}>"backups"</span>{" },"}{"\n"}
              ]{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [value, setValue] = <span className={syn.fn}>useState</span>(<span className={syn.string}>""</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Select</span>{"\n"}
              {"  "}<span className={syn.prop}>options</span>={"{"}options{"}"}{"\n"}
              {"  "}<span className={syn.prop}>value</span>={"{"}value{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setValue{"}"}{"\n"}
              {"  "}<span className={syn.prop}>placeholder</span>=<span className={syn.string}>"Choose a bucket..."</span>{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Default</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "280px" })}>
          <Select
            options={BUCKET_OPTIONS}
            value=""
            onChange={() => {}}
            placeholder="Choose a bucket..."
          />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Disabled</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "280px" })}>
          <Select
            options={BUCKET_OPTIONS}
            value="assets-prod"
            onChange={() => {}}
            disabled
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
  marginBottom: "32px",
});

const selectWrapper = css({
  width: "240px",
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
