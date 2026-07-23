import { css } from "styled-system/css";
import { Card } from "@sunbeam/beam-ui/components/ui/card";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "as", type: "ElementType", required: false, description: "Element or component to render. Defaults to article (or a when href is set)." },
  { name: "variant", type: '"elevated" | "outlined"', required: false, description: "Surface style. Defaults to elevated, or outlined for static content cards." },
  { name: "icon", type: "string", required: false, description: "Material icon name. Enables content-card mode when title is provided." },
  { name: "title", type: "string", required: false, description: "Card heading. Enables content-card mode." },
  { name: "description", type: "string", required: false, description: "Body text below the title." },
  { name: "href", type: "string", required: false, description: "Makes the whole card a link." },
  { name: "action", type: "{ label: string; href: string }", required: false, description: "Renders a separate CTA link inside the card." },
  { name: "children", type: "ReactNode", required: false, description: "Generic card content. Ignored when title is provided." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function CardPage() {
  return (
    <ComponentPage
      name="Card"
      description="Single card implementation. Use as a generic surface, a structured content card, or a link card."
      importPath='import { Card } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewArea}>
        <Card>
          <h3 className={css({ fontSize: "20px", fontWeight: "heading", marginBottom: "8px" })}>
            Generic card
          </h3>
          <p className={css({ color: "text.secondary" })}>
            Compose any content inside the Card surface.
          </p>
        </Card>
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
              {"  "}<span className={syn.prop}>icon</span>=<span className={syn.string}>"code"</span>{"\n"}
              {"  "}<span className={syn.prop}>title</span>=<span className={syn.string}>"API Reference"</span>{"\n"}
              {"  "}<span className={syn.prop}>description</span>=<span className={syn.string}>"Explore the full API surface area."</span>{"\n"}
              {"  "}<span className={syn.prop}>action</span>={"{{"} <span className={syn.prop}>label</span>: <span className={syn.string}>"View API"</span>, <span className={syn.prop}>href</span>: <span className={syn.string}>"/api"</span> {"}}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      <p className={bodyText}>
        Pass <code>icon</code>, <code>title</code>, and <code>description</code> to render a structured
        content card. Add <code>action</code> for an internal CTA, <code>href</code> to make the whole
        card a link, or <code>variant="outlined"</code> for a bordered static card.
      </p>
      <div className={css({ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" })}>
        <Card
          icon="code"
          title="With CTA"
          description="Internal call-to-action link."
          action={{ label: "View API", href: "/api" }}
        />
        <Card
          icon="palette"
          title="Link card"
          description="The whole card surface is a link."
          href="/"
          variant="outlined"
        />
        <Card
          icon="shield"
          title="Static card"
          description="No link, bordered surface."
          variant="outlined"
        />
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
