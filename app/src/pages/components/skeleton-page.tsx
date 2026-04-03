import { css } from "styled-system/css";
import { Skeleton } from "@sunbeam/beam-ui/components/ui/skeleton";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "variant", type: '"text" | "circle" | "rect"', required: false, description: 'Shape of the skeleton. Defaults to "text".' },
  { name: "width", type: "string", required: false, description: "CSS width value. Circle variant auto-sets height to match." },
  { name: "height", type: "string", required: false, description: "CSS height value." },
  { name: "count", type: "number", required: false, description: "Renders multiple skeleton elements in a vertical stack. Defaults to 1." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function SkeletonPage() {
  return (
    <ComponentPage
      name="Skeleton"
      description="An animated placeholder that indicates content is loading. Supports text lines, circles, and rectangles with a shimmer animation."
      importPath='import { Skeleton } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <div className={previewSection}>
          <h4 className={previewLabel}>Text (3 lines)</h4>
          <Skeleton variant="text" count={3} />
        </div>
        <div className={previewSection}>
          <h4 className={previewLabel}>Circle</h4>
          <Skeleton variant="circle" width="48px" />
        </div>
        <div className={previewSection}>
          <h4 className={previewLabel}>Rectangle</h4>
          <Skeleton variant="rect" width="200px" height="120px" />
        </div>
        <div className={previewSection}>
          <h4 className={previewLabel}>Card-like composition</h4>
          <div className={cardSkeleton}>
            <Skeleton variant="circle" width="40px" />
            <div className={cardLines}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
        </div>
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
              <span className={syn.keyword}>import</span> {"{ "}Skeleton{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Text lines"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Skeleton</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"text"</span> <span className={syn.prop}>count</span>={"{3}"} {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Circle avatar placeholder"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Skeleton</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"circle"</span> <span className={syn.prop}>width</span>=<span className={syn.string}>"48px"</span> {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Rectangle image placeholder"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Skeleton</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"rect"</span> <span className={syn.prop}>width</span>=<span className={syn.string}>"200px"</span> <span className={syn.prop}>height</span>=<span className={syn.string}>"120px"</span> {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabelText}>text</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "400px" })}>
          <Skeleton variant="text" count={2} />
        </div>
        <CodeBlock
          tabs={[{
            label: "TSX",
            content: (
              <pre><code>
                {"<"}<span className={syn.fn}>Skeleton</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"text"</span> <span className={syn.prop}>count</span>={"{2}"} {"/>"}
              </code></pre>
            ),
          }]}
        />
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabelText}>circle</h3>
        <div className={css({ marginBottom: "16px" })}>
          <Skeleton variant="circle" width="56px" />
        </div>
        <CodeBlock
          tabs={[{
            label: "TSX",
            content: (
              <pre><code>
                {"<"}<span className={syn.fn}>Skeleton</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"circle"</span> <span className={syn.prop}>width</span>=<span className={syn.string}>"56px"</span> {"/>"}
              </code></pre>
            ),
          }]}
        />
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabelText}>rect</h3>
        <div className={css({ marginBottom: "16px" })}>
          <Skeleton variant="rect" width="300px" height="80px" />
        </div>
        <CodeBlock
          tabs={[{
            label: "TSX",
            content: (
              <pre><code>
                {"<"}<span className={syn.fn}>Skeleton</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"rect"</span> <span className={syn.prop}>width</span>=<span className={syn.string}>"300px"</span> <span className={syn.prop}>height</span>=<span className={syn.string}>"80px"</span> {"/>"}
              </code></pre>
            ),
          }]}
        />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "32px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
});

const previewSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

const previewLabel = css({
  fontSize: "12px",
  fontWeight: "button",
  color: "text.muted",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
});

const cardSkeleton = css({
  display: "flex",
  gap: "16px",
  alignItems: "flex-start",
});

const cardLines = css({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const variantBlock = css({
  marginBottom: "40px",
});

const variantLabelText = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "12px",
});
