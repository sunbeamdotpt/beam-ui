import { css } from "styled-system/css";
import { MathRenderer } from "@sunbeam/beam-ui/components/ui/math-renderer";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "math", type: "string", required: true, description: "LaTeX math string to render." },
  { name: "display", type: "boolean", required: false, description: "If true, renders in display (block) mode. Defaults to false (inline)." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function MathRendererPage() {
  return (
    <ComponentPage
      name="MathRenderer"
      description="Client-side KaTeX renderer for LaTeX math expressions. Supports both inline and display (block) modes with graceful error handling."
      importPath='import { MathRenderer } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>

      {/* Inline examples */}
      <div className={previewBox}>
        <h3 className={sectionLabel}>Inline math</h3>
        <p className={proseText}>
          Einstein's famous equation{" "}
          <MathRenderer math="E = mc^2" />{" "}
          relates energy to mass. The Pythagorean theorem states{" "}
          <MathRenderer math="a^2 + b^2 = c^2" />.
        </p>
      </div>

      {/* Display examples */}
      <div className={previewBox}>
        <h3 className={sectionLabel}>Display math</h3>
        <p className={labelText}>Quadratic formula</p>
        <MathRenderer
          math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}"
          display
        />

        <p className={labelText}>Integral</p>
        <MathRenderer
          math="\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}"
          display
        />

        <p className={labelText}>Matrix</p>
        <MathRenderer
          math="\begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}"
          display
        />
      </div>

      {/* Error case */}
      <div className={previewBox}>
        <h3 className={sectionLabel}>Error handling</h3>
        <p className={proseText}>
          Invalid LaTeX gracefully falls back to showing the raw string:{" "}
        </p>
        <MathRenderer math="\frac{" />
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}MathRenderer{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Inline math"}</span>{"\n"}
              {"<p>The equation <"}<span className={syn.fn}>MathRenderer</span> <span className={syn.prop}>math</span>=<span className={syn.string}>"E = mc^2"</span> {"/> is famous.</p>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Display (block) math"}</span>{"\n"}
              {"<"}<span className={syn.fn}>MathRenderer</span>{"\n"}
              {"  "}<span className={syn.prop}>math</span>=<span className={syn.string}>{'"\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"'}</span>{"\n"}
              {"  "}<span className={syn.prop}>display</span>{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Inline vs Display</h3>
        <p className={variantDesc}>
          Inline mode flows with surrounding text. Display mode renders as a centered block
          with vertical padding — ideal for standalone equations.
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

const labelText = css({
  fontSize: "12px",
  color: "text.muted",
  fontFamily: "mono",
  marginBottom: "4px",
  marginTop: "16px",
});

const proseText = css({
  fontSize: "15px",
  lineHeight: 1.7,
  color: "text.primary",
});

const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "8px" });
const variantDesc = css({ fontSize: "14px", color: "text.secondary", lineHeight: 1.7 });
