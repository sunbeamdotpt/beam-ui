import { useState } from "react";
import { css } from "styled-system/css";
import { Checkbox } from "@sunbeam/beam-ui/components/ui/checkbox";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "checked", type: "boolean", required: true, description: "Whether the checkbox is checked." },
  { name: "onChange", type: "(checked: boolean) => void", required: true, description: "Callback fired when checked state changes." },
  { name: "label", type: "string", required: false, description: "Text label displayed next to the checkbox." },
  { name: "disabled", type: "boolean", required: false, description: "Disables the checkbox. Defaults to false." },
  { name: "indeterminate", type: "boolean", required: false, description: "Displays the indeterminate (minus) state. Defaults to false." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function CheckboxPage() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  return (
    <ComponentPage
      name="Checkbox"
      description="A checkbox component supporting checked, unchecked, indeterminate, and disabled states. Includes an optional text label."
      importPath='import { Checkbox } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <Checkbox checked={checked1} onChange={setChecked1} label="Unchecked" />
        <Checkbox checked={checked2} onChange={setChecked2} label="Checked" />
        <Checkbox checked={checked3} onChange={setChecked3} label="Indeterminate" indeterminate />
        <Checkbox checked={checked4} onChange={setChecked4} label="Disabled" disabled />
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
              <span className={syn.keyword}>import</span> {"{ "}Checkbox{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [checked, setChecked] = <span className={syn.fn}>useState</span>(false){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Checkbox</span>{"\n"}
              {"  "}<span className={syn.prop}>checked</span>={"{"}checked{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setChecked{"}"}{"\n"}
              {"  "}<span className={syn.prop}>label</span>=<span className={syn.string}>"Accept terms"</span>{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Unchecked</h3>
        <div className={css({ marginBottom: "16px" })}>
          <Checkbox checked={false} onChange={() => {}} label="Unchecked" />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Checked</h3>
        <div className={css({ marginBottom: "16px" })}>
          <Checkbox checked={true} onChange={() => {}} label="Checked" />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Indeterminate</h3>
        <div className={css({ marginBottom: "16px" })}>
          <Checkbox checked={false} onChange={() => {}} label="Indeterminate" indeterminate />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Disabled</h3>
        <div className={css({ marginBottom: "16px" })}>
          <Checkbox checked={false} onChange={() => {}} label="Disabled" disabled />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewRow = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "24px",
  padding: "32px",
  backgroundColor: "bg.card",
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
