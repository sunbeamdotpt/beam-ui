import { css } from "styled-system/css";
import { Card } from "@sunbeam/beam-ui/components/ui/card";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "icon", type: "string", required: true, description: "Material Symbols icon name shown at the top of the card." },
  { name: "title", type: "string", required: true, description: "Card heading text." },
  { name: "description", type: "string", required: true, description: "Body text below the title." },
  { name: "ctaLabel", type: "string", required: true, description: "Label for the call-to-action link." },
  { name: "ctaHref", type: "string", required: true, description: "Route path for the CTA link." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function CardPage() {
  return (
    <ComponentPage
      name="Card"
      description="A content card with icon, title, description, and a call-to-action link. Ideal for feature highlights or navigation tiles."
      importPath='import { Card } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewArea}>
        <Card
          icon="auto_awesome"
          title="Getting Started"
          description="Learn the fundamentals of the Sunbeam platform and start building your first integration."
          ctaLabel="Read Guide"
          ctaHref="/docs"
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
              <span className={syn.keyword}>import</span> {"{ "}Card{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Card</span>{"\n"}
              {"  "}<span className={syn.prop}>icon</span>=<span className={syn.string}>"auto_awesome"</span>{"\n"}
              {"  "}<span className={syn.prop}>title</span>=<span className={syn.string}>"Getting Started"</span>{"\n"}
              {"  "}<span className={syn.prop}>description</span>=<span className={syn.string}>"Learn the fundamentals..."</span>{"\n"}
              {"  "}<span className={syn.prop}>ctaLabel</span>=<span className={syn.string}>"Read Guide"</span>{"\n"}
              {"  "}<span className={syn.prop}>ctaHref</span>=<span className={syn.string}>"/docs"</span>{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      <p className={bodyText}>
        Card is a single-variant component. Customize the icon, title, description, and CTA to fit different content needs.
      </p>
      <div className={css({ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" })}>
        <Card icon="code" title="API Reference" description="Explore the full API surface area." ctaLabel="View API" ctaHref="/api" />
        <Card icon="palette" title="Design Tokens" description="Browse colors, typography, and spacing." ctaLabel="View Tokens" ctaHref="/" />
      </div>
    </ComponentPage>
  );
}

const previewArea = css({
  maxWidth: "400px",
  marginBottom: "32px",
});

const bodyText = css({
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
});
