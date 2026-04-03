import { css } from "styled-system/css";
import { MarkdownRenderer } from "@sunbeam/beam-ui/components/ui/markdown-renderer";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "content", type: "string", required: true, description: "GFM Markdown string to render." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const SAMPLE_MARKDOWN = `# Heading 1

## Heading 2

### Heading 3

Paragraphs with **bold**, *italic*, and ~~strikethrough~~ text.

[Visit Sunbeam](https://sunbeam.example.com) for more info.

> Blockquotes can contain **rich text** and
> span multiple lines.

#### Code

Inline code: \`const x = 42;\`

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Sunbeam"));
\`\`\`

#### Table

| Feature       | Status   | Priority |
|---------------|----------|----------|
| Markdown      | Done     | High     |
| Syntax HL     | Planned  | Medium   |
| Export        | Backlog  | Low      |

#### Task List

- [x] Parse GFM markdown
- [x] Sanitize HTML output
- [ ] Add syntax highlighting
- [ ] Export to PDF

#### Image

![Placeholder](https://via.placeholder.com/600x200?text=Sunbeam+Placeholder)

---

*End of preview.*
`;

const MATH_MARKDOWN = `## Math in Markdown

The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$, which gives us the roots of any quadratic equation.

Here's a display equation — the Gaussian integral:

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$

Some more inline math: Einstein's $E = mc^2$, the Pythagorean theorem $a^2 + b^2 = c^2$, and Euler's identity $e^{i\\pi} + 1 = 0$.

$$
\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}
$$
`;

export function MarkdownRendererPage() {
  return (
    <ComponentPage
      name="MarkdownRenderer"
      description="Client-side GFM Markdown renderer using unified/remark/rehype. Produces semantically correct, sanitized HTML with scoped styling. Supports LaTeX math via KaTeX ($...$ inline, $$...$$ block)."
      importPath='import { MarkdownRenderer } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>

      <div className={previewBox}>
        <h3 className={sectionLabel}>Full markdown demo</h3>
        <MarkdownRenderer content={SAMPLE_MARKDOWN} />
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}MarkdownRenderer{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> markdown = <span className={syn.string}>`# Hello World\n\nSome **bold** text.`</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>MarkdownRenderer</span> <span className={syn.prop}>content</span>={"{"}markdown{"}"} {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>GFM Extensions</h3>
        <p className={variantDesc}>
          Supports GitHub Flavored Markdown including tables, task lists,
          strikethrough, and auto-linked URLs. All output is sanitized via
          rehype-sanitize for safe rendering.
        </p>
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Accessibility</h3>
        <p className={variantDesc}>
          Links are distinguished by both color and underline decoration.
          All rendered HTML uses semantic elements (headings, lists, tables)
          for proper screen reader support.
        </p>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>LaTeX Math</h3>
        <p className={variantDesc}>
          Use <code className={css({ fontFamily: "mono", fontSize: "xs" })}>$...$</code> for inline math
          and <code className={css({ fontFamily: "mono", fontSize: "xs" })}>$$...$$</code> for display math.
          KaTeX loads lazily only when math is detected.
        </p>
        <CodeBlock
          tabs={[{
            label: "Markdown",
            content: (
              <pre><code>
                {"## Math in Markdown\n"}
                {"\n"}
                {"The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$,\n"}
                {"which gives us the roots of any quadratic equation.\n"}
                {"\n"}
                {"Here's a display equation — the Gaussian integral:\n"}
                {"\n"}
                {"$$\n"}
                {"\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}\n"}
                {"$$\n"}
                {"\n"}
                {"Some more inline math: Einstein's $E = mc^2$, the Pythagorean\n"}
                {"theorem $a^2 + b^2 = c^2$, and Euler's identity $e^{i\\pi} + 1 = 0$.\n"}
                {"\n"}
                {"$$\n"}
                {"\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}\n"}
                {"$$"}
              </code></pre>
            ),
          }]}
        />
        <div className={previewBox}>
          <MarkdownRenderer content={MATH_MARKDOWN} />
        </div>
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
