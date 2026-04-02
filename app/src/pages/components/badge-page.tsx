import { css } from "styled-system/css";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "variant", type: '"premier" | "open" | "section"', required: false, description: 'Visual style of the badge. Defaults to "premier".' },
  { name: "children", type: "ReactNode", required: true, description: "Badge label content." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function BadgePage() {
  return (
    <ComponentPage
      name="Badge"
      description="Compact labels for status, tier, or section dividers. The section variant renders as a label with a horizontal rule."
      importPath='import { Badge } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <Badge variant="premier">Premier</Badge>
        <Badge variant="open">Open</Badge>
      </div>
      <Badge variant="section">Section Label</Badge>

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
              <span className={syn.keyword}>import</span> {"{ "}Badge{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Badge</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"premier"</span>{">"}Premier{"</"}<span className={syn.fn}>Badge</span>{">"}{"\n"}
              {"<"}<span className={syn.fn}>Badge</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"open"</span>{">"}Open{"</"}<span className={syn.fn}>Badge</span>{">"}{"\n"}
              {"<"}<span className={syn.fn}>Badge</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"section"</span>{">"}Section{"</"}<span className={syn.fn}>Badge</span>{">"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>premier</h3>
        <div className={css({ marginBottom: "16px" })}><Badge variant="premier">Premier</Badge></div>
        <CodeBlock tabs={[{ label: "TSX", content: (<pre><code>{"<"}<span className={syn.fn}>Badge</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"premier"</span>{">"}Premier{"</"}<span className={syn.fn}>Badge</span>{">"}</code></pre>) }]} />
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>open</h3>
        <div className={css({ marginBottom: "16px" })}><Badge variant="open">Open</Badge></div>
        <CodeBlock tabs={[{ label: "TSX", content: (<pre><code>{"<"}<span className={syn.fn}>Badge</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"open"</span>{">"}Open{"</"}<span className={syn.fn}>Badge</span>{">"}</code></pre>) }]} />
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>section</h3>
        <div className={css({ marginBottom: "16px" })}><Badge variant="section">Section Label</Badge></div>
        <CodeBlock tabs={[{ label: "TSX", content: (<pre><code>{"<"}<span className={syn.fn}>Badge</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"section"</span>{">"}Section Label{"</"}<span className={syn.fn}>Badge</span>{">"}</code></pre>) }]} />
      </div>
    </ComponentPage>
  );
}

const previewRow = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "16px",
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "24px",
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
