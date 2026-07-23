import { useState } from "react";
import { css } from "styled-system/css";
import { MarkdownEditor } from "@sunbeam/beam-ui/markdown";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "value", type: "string", required: true, description: "The current markdown content." },
  { name: "onChange", type: "(value: string) => void", required: true, description: "Callback when the content changes." },
  { name: "placeholder", type: "string", required: false, description: "Placeholder text for the textarea." },
  { name: "minHeight", type: "string", required: false, description: "Minimum height of the editor area. Defaults to '200px'." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const INITIAL_CONTENT = `## Hello World

This is a **markdown editor** with a live preview.

- Supports *bold*, *italic*, and \`inline code\`
- Has a toolbar for quick formatting
- Renders preview using MarkdownRenderer

### Code Example

\`\`\`ts
function greet(name: string) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> Blockquotes work too!

| Feature | Status |
| ------- | ------ |
| Bold    | Done   |
| Preview | Done   |
`;

export function MarkdownEditorPage() {
  const [value, setValue] = useState(INITIAL_CONTENT);

  return (
    <ComponentPage
      name="MarkdownEditor"
      description="A rich text editor for composing Markdown content with a formatting toolbar and live preview tab."
      importPath='import { MarkdownEditor } from "@sunbeam/beam-ui/markdown"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <MarkdownEditor
          value={value}
          onChange={setValue}
          placeholder="Write some markdown..."
          minHeight="300px"
        />
        <p className={css({ marginTop: "16px", fontSize: "13px", color: "text.muted" })}>
          Use the toolbar buttons to format text, or switch to the Preview tab to see rendered output.
        </p>
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
              <span className={syn.keyword}>import</span> {"{ "}MarkdownEditor{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui/markdown"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [value, setValue] = <span className={syn.fn}>useState</span>(<span className={syn.string}>""</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>MarkdownEditor</span>{"\n"}
              {"  "}<span className={syn.prop}>value</span>={"{"}value{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setValue{"}"}{"\n"}
              {"  "}<span className={syn.prop}>placeholder</span>=<span className={syn.string}>"Write markdown..."</span>{"\n"}
              {"  "}<span className={syn.prop}>minHeight</span>=<span className={syn.string}>"300px"</span>{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Minimal (empty state)</h3>
        <MarkdownEditor
          value=""
          onChange={() => {}}
          placeholder="Start typing..."
          minHeight="120px"
        />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
