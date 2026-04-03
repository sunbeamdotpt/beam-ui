import { useState } from "react";
import { css } from "styled-system/css";
import { NumberInput } from "@sunbeam/beam-ui/components/ui/number-input";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "value", type: "number", required: true, description: "Current numeric value." },
  { name: "onChange", type: "(value: number) => void", required: true, description: "Callback when value changes." },
  { name: "min", type: "number", required: false, description: "Minimum allowed value." },
  { name: "max", type: "number", required: false, description: "Maximum allowed value." },
  { name: "step", type: "number", required: false, description: "Increment step. Defaults to 1." },
  { name: "label", type: "string", required: false, description: "Label text above the input." },
];

export function NumberInputPage() {
  const [val, setVal] = useState(5);

  return (
    <ComponentPage
      name="NumberInput"
      description="A numeric input with increment/decrement controls. Built on Ark UI NumberInput."
      importPath='import { NumberInput } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <div className={css({ maxWidth: "200px" })}>
          <NumberInput value={val} onChange={setVal} min={0} max={100} label="Quantity" />
        </div>
        <p className={css({ marginTop: "12px", fontSize: "13px", color: "text.muted" })}>Value: {val}</p>
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
              <span className={syn.keyword}>import</span> {"{ "}NumberInput{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [val, setVal] = <span className={syn.fn}>useState</span>(<span className={syn.number}>5</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>NumberInput</span>{"\n"}
              {"  "}<span className={syn.prop}>value</span>={"{"}val{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setVal{"}"}{"\n"}
              {"  "}<span className={syn.prop}>min</span>={"{"}0{"}"}{"\n"}
              {"  "}<span className={syn.prop}>max</span>={"{"}100{"}"}{"\n"}
              {"  "}<span className={syn.prop}>label</span>=<span className={syn.string}>"Quantity"</span>{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>With step</h3>
        <div className={css({ maxWidth: "200px" })}>
          <NumberInput value={50} onChange={() => {}} min={0} max={100} step={10} label="Percentage" />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
