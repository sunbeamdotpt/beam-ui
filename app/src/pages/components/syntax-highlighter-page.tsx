import { css } from "styled-system/css";
import { SyntaxHighlighter } from "@sunbeam/beam-ui/syntax-highlighter";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "code", type: "string", required: true, description: "The source code string to highlight." },
  { name: "language", type: "string", required: true, description: "Language identifier (e.g. 'javascript', 'python', 'tsx')." },
  { name: "theme", type: '"light" | "dark"', required: false, description: "Color theme. Auto-detects from useTheme if not provided." },
  { name: "showLineNumbers", type: "boolean", required: false, description: "Show a line number gutter column." },
  { name: "highlightLines", type: "number[]", required: false, description: "Array of 1-based line numbers to highlight with a subtle background." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const JS_EXAMPLE = `import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok", ts: Date.now() }));
});

server.listen(3000, () => {
  console.log("Listening on :3000");
});`;

const PYTHON_EXAMPLE = `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}`;

const HIGHLIGHT_EXAMPLE = `function fibonacci(n: number): number {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

console.log(fibonacci(10)); // 55`;

export function SyntaxHighlighterPage() {
  return (
    <ComponentPage
      name="SyntaxHighlighter"
      description="Client-side syntax highlighting powered by Shiki. Supports multiple languages, line numbers, and line highlighting with automatic theme detection."
      importPath='import { SyntaxHighlighter } from "@sunbeam/beam-ui/syntax-highlighter"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <SyntaxHighlighter code={JS_EXAMPLE} language="javascript" showLineNumbers />
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
              <span className={syn.keyword}>import</span> {"{ "}SyntaxHighlighter{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui/syntax-highlighter"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> code = <span className={syn.string}>`const x = 42;`</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>SyntaxHighlighter</span>{"\n"}
              {"  "}<span className={syn.prop}>code</span>={"{"}code{"}"}{"\n"}
              {"  "}<span className={syn.prop}>language</span>=<span className={syn.string}>"javascript"</span>{"\n"}
              {"  "}<span className={syn.prop}>showLineNumbers</span>{"\n"}
              {"  "}<span className={syn.prop}>highlightLines</span>={"{["}<span className={syn.number}>1</span>{"]}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <h3 className={variantLabel}>JavaScript with line numbers</h3>
      <div className={variantBox}>
        <SyntaxHighlighter code={JS_EXAMPLE} language="javascript" showLineNumbers />
      </div>

      <h3 className={variantLabel}>Python without line numbers</h3>
      <div className={variantBox}>
        <SyntaxHighlighter code={PYTHON_EXAMPLE} language="python" />
      </div>

      <h3 className={variantLabel}>Highlighted lines (lines 2, 5, 6, 7)</h3>
      <div className={variantBox}>
        <SyntaxHighlighter
          code={HIGHLIGHT_EXAMPLE}
          language="typescript"
          showLineNumbers
          highlightLines={[2, 5, 6, 7]}
        />
      </div>

      <h3 className={variantLabel}>Auto theme detection</h3>
      <p className={variantNote}>
        The component reads the current theme from useTheme and selects github-light or github-dark automatically.
        Toggle the site theme to see the colors update.
      </p>
      <div className={variantBox}>
        <SyntaxHighlighter
          code={`const greeting = "Hello, Sunbeam!";\nconsole.log(greeting);`}
          language="javascript"
        />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBox = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
const variantNote = css({ fontSize: "14px", color: "text.secondary", marginBottom: "16px", lineHeight: 1.6 });
