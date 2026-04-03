import { useState } from "react";
import { css } from "styled-system/css";
import { TextInput } from "@sunbeam/beam-ui/components/ui/text-input";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "value", type: "string", required: true, description: "The current input value." },
  { name: "onChange", type: "(value: string) => void", required: true, description: "Callback fired when value changes." },
  { name: "placeholder", type: "string", required: false, description: "Placeholder text shown when empty." },
  { name: "label", type: "string", required: false, description: "Label displayed above the input." },
  { name: "error", type: "string", required: false, description: "Error message displayed below the input." },
  { name: "disabled", type: "boolean", required: false, description: "Disables the input. Defaults to false." },
  { name: "type", type: '"text" | "password" | "email" | "number"', required: false, description: 'HTML input type. Defaults to "text".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function TextInputPage() {
  const [defaultVal, setDefaultVal] = useState("");
  const [labelVal, setLabelVal] = useState("");
  const [errorVal, setErrorVal] = useState("bad-bucket-name!");
  const [disabledVal] = useState("read-only-bucket");

  return (
    <ComponentPage
      name="TextInput"
      description="A text input component with optional label, error message, and support for disabled and multiple input types."
      importPath='import { TextInput } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewGrid}>
        <TextInput
          value={defaultVal}
          onChange={setDefaultVal}
          label="Bucket Name"
          placeholder="Enter bucket name..."
        />
        <TextInput
          value={labelVal}
          onChange={setLabelVal}
          label="Bucket Name"
          placeholder="my-bucket"
        />
        <TextInput
          value={errorVal}
          onChange={setErrorVal}
          label="Bucket Name"
          error="Bucket name contains invalid characters."
        />
        <TextInput
          value={disabledVal}
          onChange={() => {}}
          label="Bucket Name"
          disabled
        />
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
              <span className={syn.keyword}>import</span> {"{ "}TextInput{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [name, setName] = <span className={syn.fn}>useState</span>(<span className={syn.string}>""</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>TextInput</span>{"\n"}
              {"  "}<span className={syn.prop}>value</span>={"{"}name{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setName{"}"}{"\n"}
              {"  "}<span className={syn.prop}>label</span>=<span className={syn.string}>"Bucket Name"</span>{"\n"}
              {"  "}<span className={syn.prop}>placeholder</span>=<span className={syn.string}>"my-bucket"</span>{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Default</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "320px" })}>
          <TextInput value="" onChange={() => {}} placeholder="Enter value..." />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>With Label</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "320px" })}>
          <TextInput value="" onChange={() => {}} label="Email" placeholder="name@example.com" type="email" />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>With Error</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "320px" })}>
          <TextInput value="oops" onChange={() => {}} label="Bucket Name" error="This name is already taken." />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Disabled</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "320px" })}>
          <TextInput value="locked-value" onChange={() => {}} label="Bucket Name" disabled />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  alignItems: "start",
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
