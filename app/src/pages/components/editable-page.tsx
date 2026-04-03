import { useState } from "react";
import { css } from "styled-system/css";
import { Editable } from "@sunbeam/beam-ui/components/ui/editable";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "value", type: "string", required: true, description: "The current text value." },
  { name: "onChange", type: "(value: string) => void", required: true, description: "Callback when value is committed." },
  { name: "placeholder", type: "string", required: false, description: 'Placeholder text. Defaults to "Click to edit...".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function EditablePage() {
  const [text, setText] = useState("Click me to edit this text");

  return (
    <ComponentPage
      name="Editable"
      description="An inline editable text field. Click to edit, press Enter to commit. Built on Ark UI Editable."
      importPath='import { Editable } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <div className={css({ maxWidth: "400px" })}>
          <Editable value={text} onChange={setText} />
        </div>
        <p className={css({ marginTop: "12px", fontSize: "13px", color: "text.muted" })}>Value: {text}</p>
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
              <span className={syn.keyword}>import</span> {"{ "}Editable{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [text, setText] = <span className={syn.fn}>useState</span>(<span className={syn.string}>"Edit me"</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Editable</span> <span className={syn.prop}>value</span>={"{"}text{"}"} <span className={syn.prop}>onChange</span>={"{"}setText{"}"} {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>With placeholder</h3>
        <div className={css({ maxWidth: "400px" })}>
          <Editable value="" onChange={() => {}} placeholder="Type something..." />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
