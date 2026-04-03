import { useState } from "react";
import { css } from "styled-system/css";
import { RadioGroup } from "@sunbeam/beam-ui/components/ui/radio-group";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "options", type: "RadioOption[]", required: true, description: "Array of { value, label } options." },
  { name: "value", type: "string", required: true, description: "Currently selected value." },
  { name: "onChange", type: "(value: string) => void", required: true, description: "Callback when selection changes." },
  { name: "label", type: "string", required: false, description: "Group label text." },
];

const SIZES = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

export function RadioGroupPage() {
  const [size, setSize] = useState("md");

  return (
    <ComponentPage
      name="RadioGroup"
      description="A group of radio buttons for single selection. Built on Ark UI RadioGroup."
      importPath='import { RadioGroup } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <RadioGroup options={SIZES} value={size} onChange={setSize} label="Size" />
        <p className={css({ marginTop: "12px", fontSize: "13px", color: "text.muted" })}>Selected: {size}</p>
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
              <span className={syn.keyword}>import</span> {"{ "}RadioGroup{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [value, setValue] = <span className={syn.fn}>useState</span>(<span className={syn.string}>"md"</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>RadioGroup</span>{"\n"}
              {"  "}<span className={syn.prop}>options</span>={"{"}[{"{ "}<span className={syn.prop}>value</span>: <span className={syn.string}>"sm"</span>, <span className={syn.prop}>label</span>: <span className={syn.string}>"Small"</span>{" }"}]{"}"}{"\n"}
              {"  "}<span className={syn.prop}>value</span>={"{"}value{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setValue{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Without label</h3>
        <RadioGroup options={SIZES} value="lg" onChange={() => {}} />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
