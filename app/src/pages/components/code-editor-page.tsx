import { useState } from "react";
import { css } from "styled-system/css";
import { CodeEditor } from "@sunbeam/beam-ui/components/ui/code-editor";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "value", type: "string", required: true, description: "Current editor content." },
  { name: "onChange", type: "(value: string) => void", required: true, description: "Called when the editor content changes." },
  { name: "language", type: "string", required: false, description: "Language for syntax highlighting (e.g. javascript, python, tsx, rust, go, etc.)." },
  { name: "height", type: "string", required: false, description: 'CSS height of the editor container. Defaults to "300px".' },
  { name: "readOnly", type: "boolean", required: false, description: "If true, the editor is read-only." },
  { name: "showLineNumbers", type: "boolean", required: false, description: "Show line numbers in the gutter. Defaults to true." },
  { name: "softWrap", type: "boolean", required: false, description: "If true, long lines wrap instead of scrolling." },
  { name: "placeholder", type: "string", required: false, description: "Placeholder text shown when the editor is empty." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const JS_SAMPLE = `// Fibonacci generator
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}`;

const PYTHON_SAMPLE = `# Quick sort implementation
def quicksort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

numbers = [38, 27, 43, 3, 9, 82, 10]
print(quicksort(numbers))`;

const MARKDOWN_SAMPLE = `# Project README

This is a long line of markdown text that should wrap when soft-wrap is enabled, demonstrating how the editor handles paragraphs and flowing content without horizontal scrolling.

## Features

- **Fast** rendering with CodeMirror 6
- Syntax highlighting for 15+ languages
- Accessible by default with ARIA attributes
- Theming that adapts to light and dark modes

## Installation

\`\`\`bash
npm install @sunbeam/beam-ui
\`\`\`

> Note: CodeMirror language packages are loaded dynamically to keep the initial bundle small.`;

export function CodeEditorPage() {
  const [jsValue, setJsValue] = useState(JS_SAMPLE);
  const [pyValue] = useState(PYTHON_SAMPLE);
  const [mdValue, setMdValue] = useState(MARKDOWN_SAMPLE);

  return (
    <ComponentPage
      name="CodeEditor"
      description="In-browser code editor powered by CodeMirror 6 with syntax highlighting, line numbers, and Beam-themed styling. Supports 15+ languages."
      importPath='import { CodeEditor } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>

      {/* Editable JavaScript */}
      <div className={previewBox}>
        <h3 className={sectionLabel}>Editable — JavaScript</h3>
        <CodeEditor
          value={jsValue}
          onChange={setJsValue}
          language="javascript"
          height="280px"
        />
      </div>

      {/* Read-only Python */}
      <div className={previewBox}>
        <h3 className={sectionLabel}>Read-only — Python</h3>
        <CodeEditor
          value={pyValue}
          onChange={() => {}}
          language="python"
          height="240px"
          readOnly
        />
      </div>

      {/* Soft-wrap Markdown */}
      <div className={previewBox}>
        <h3 className={sectionLabel}>Soft wrap — Markdown</h3>
        <CodeEditor
          value={mdValue}
          onChange={setMdValue}
          language="markdown"
          height="300px"
          softWrap
        />
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
              <span className={syn.keyword}>import</span> {"{ "}CodeEditor{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>function</span> <span className={syn.fn}>Editor</span>() {"{"}
              {"\n"}{"  "}<span className={syn.keyword}>const</span> [code, setCode] = <span className={syn.fn}>useState</span>(<span className={syn.string}>""</span>){"\n"}
              {"\n"}{"  "}<span className={syn.keyword}>return</span> ({"\n"}
              {"    <"}<span className={syn.fn}>CodeEditor</span>{"\n"}
              {"      "}<span className={syn.prop}>value</span>={"{"}code{"}"}{"\n"}
              {"      "}<span className={syn.prop}>onChange</span>={"{"}setCode{"}"}{"\n"}
              {"      "}<span className={syn.prop}>language</span>=<span className={syn.string}>"typescript"</span>{"\n"}
              {"      "}<span className={syn.prop}>height</span>=<span className={syn.string}>"400px"</span>{"\n"}
              {"    />"}{"\n"}
              {"  )"}
              {"\n"}{"}"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Supported languages</h3>
        <p className={variantDesc}>
          JavaScript, TypeScript, TSX, JSX, Python, HTML, CSS, JSON, Markdown,
          Rust, Go, Java, C/C++, XML, SQL, YAML, and PHP. Language modules
          are loaded dynamically on demand.
        </p>
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Accessibility</h3>
        <p className={variantDesc}>
          CodeMirror 6 provides built-in accessibility including keyboard
          navigation, screen reader announcements, and proper ARIA roles.
          The editor container includes an aria-label indicating the language
          and read-only state.
        </p>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "24px",
  border: "1px solid",
  borderColor: "border.default",
});

const sectionLabel = css({
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "text.muted",
  marginBottom: "16px",
});

const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "8px" });
const variantDesc = css({ fontSize: "14px", color: "text.secondary", lineHeight: 1.7 });
