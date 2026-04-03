import { useState } from "react";
import { css } from "styled-system/css";
import { PinInput } from "@sunbeam/beam-ui/components/ui/pin-input";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "value", type: "string", required: true, description: "Current pin value as a string." },
  { name: "onChange", type: "(value: string) => void", required: true, description: "Callback when value changes." },
  { name: "length", type: "number", required: false, description: "Number of input fields. Defaults to 4." },
  { name: "mask", type: "boolean", required: false, description: "Masks input like a password." },
  { name: "label", type: "string", required: false, description: "Label text above the inputs." },
];

export function PinInputPage() {
  const [pin, setPin] = useState("");

  return (
    <ComponentPage
      name="PinInput"
      description="A segmented input for entering PIN codes or OTPs. Built on Ark UI PinInput."
      importPath='import { PinInput } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <PinInput value={pin} onChange={setPin} label="Enter PIN" />
        <p className={css({ marginTop: "12px", fontSize: "13px", color: "text.muted" })}>Value: {pin || "(empty)"}</p>
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
              <span className={syn.keyword}>import</span> {"{ "}PinInput{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [pin, setPin] = <span className={syn.fn}>useState</span>(<span className={syn.string}>""</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>PinInput</span> <span className={syn.prop}>value</span>={"{"}pin{"}"} <span className={syn.prop}>onChange</span>={"{"}setPin{"}"} <span className={syn.prop}>label</span>=<span className={syn.string}>"OTP"</span> {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Masked (6 digits)</h3>
        <PinInput value="" onChange={() => {}} length={6} mask label="Security code" />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
