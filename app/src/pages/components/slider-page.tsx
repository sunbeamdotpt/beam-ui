import { useState } from "react";
import { css } from "styled-system/css";
import { Slider } from "@sunbeam/beam-ui/components/ui/slider";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "value", type: "number", required: true, description: "Current slider value." },
  { name: "onChange", type: "(value: number) => void", required: true, description: "Callback when value changes." },
  { name: "min", type: "number", required: false, description: "Minimum value. Defaults to 0." },
  { name: "max", type: "number", required: false, description: "Maximum value. Defaults to 100." },
  { name: "step", type: "number", required: false, description: "Step increment. Defaults to 1." },
  { name: "label", type: "string", required: false, description: "Label text above the slider." },
];

export function SliderPage() {
  const [vol, setVol] = useState(60);

  return (
    <ComponentPage
      name="Slider"
      description="A draggable slider for selecting a numeric value within a range. Built on Ark UI Slider."
      importPath='import { Slider } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <div className={css({ maxWidth: "400px", width: "100%" })}>
          <Slider value={vol} onChange={setVol} label="Volume" />
        </div>
        <p className={css({ marginTop: "12px", fontSize: "13px", color: "text.muted" })}>Value: {vol}</p>
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
              <span className={syn.keyword}>import</span> {"{ "}Slider{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [val, setVal] = <span className={syn.fn}>useState</span>(<span className={syn.number}>50</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Slider</span> <span className={syn.prop}>value</span>={"{"}val{"}"} <span className={syn.prop}>onChange</span>={"{"}setVal{"}"} <span className={syn.prop}>label</span>=<span className={syn.string}>"Volume"</span> {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Custom range</h3>
        <div className={css({ maxWidth: "400px" })}>
          <Slider value={25} onChange={() => {}} min={0} max={50} step={5} label="Temperature" />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
