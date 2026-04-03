import { useState } from "react";
import { css } from "styled-system/css";
import { Combobox } from "@sunbeam/beam-ui/components/ui/combobox";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "options", type: "ComboboxOption[]", required: true, description: "Array of { value, label } options." },
  { name: "value", type: "string", required: true, description: "Currently selected value." },
  { name: "onChange", type: "(value: string) => void", required: true, description: "Callback when selection changes." },
  { name: "placeholder", type: "string", required: false, description: 'Input placeholder text. Defaults to "Search...".' },
  { name: "disabled", type: "boolean", required: false, description: "Disables the combobox." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const FRAMEWORKS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
];

export function ComboboxPage() {
  const [value, setValue] = useState("react");

  return (
    <ComponentPage
      name="Combobox"
      description="An autocomplete input with filterable dropdown options. Built on Ark UI Combobox."
      importPath='import { Combobox } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <div className={css({ maxWidth: "300px" })}>
          <Combobox options={FRAMEWORKS} value={value} onChange={setValue} placeholder="Search frameworks..." />
        </div>
        <p className={css({ marginTop: "12px", fontSize: "13px", color: "text.muted" })}>Selected: {value}</p>
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}useState{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"react"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}Combobox{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [value, setValue] = <span className={syn.fn}>useState</span>(<span className={syn.string}>""</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Combobox</span>{"\n"}
              {"  "}<span className={syn.prop}>options</span>={"{"}[{"{ "}<span className={syn.prop}>value</span>: <span className={syn.string}>"a"</span>, <span className={syn.prop}>label</span>: <span className={syn.string}>"Option A"</span>{" }"}]{"}"}{"\n"}
              {"  "}<span className={syn.prop}>value</span>={"{"}value{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setValue{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Disabled</h3>
        <div className={css({ maxWidth: "300px" })}>
          <Combobox options={FRAMEWORKS} value="react" onChange={() => {}} disabled />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
