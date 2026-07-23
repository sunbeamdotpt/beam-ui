/**
 * Button component documentation page.
 *
 * Live preview of all button variants with props table and usage examples.
 */
import { css } from "styled-system/css";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "variant", type: '"dark" | "cream" | "ghost" | "text" | "primary"', required: false, description: "Visual style of the button. Defaults to \"dark\"." },
  { name: "as", type: "ElementType", required: false, description: "Element or component to render (polymorphic). Defaults to <button type=\"button\"> (or <a> when href is set)." },
  { name: "href", type: "string", required: false, description: "If provided, renders as a link (internal or external)." },
  { name: "children", type: "ReactNode", required: true, description: "Button label content." },
  { name: "onClick", type: "() => void", required: false, description: "Click handler for button mode." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const VARIANTS = ["dark", "cream", "ghost", "text", "primary"] as const;

export function ButtonPage() {
  return (
    <ComponentPage
      name="Button"
      description="A versatile button component supporting five visual variants. Renders as a button, internal link, or external anchor depending on props."
      importPath='import { Button } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        {VARIANTS.map((v) => (
          <Button key={v} variant={v}>{v}</Button>
        ))}
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
              <span className={syn.keyword}>import</span> {"{ "}Button{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Basic usage"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Button</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"primary"</span>{">"}Click me{"</"}<span className={syn.fn}>Button</span>{">"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// As a link"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Button</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"dark"</span> <span className={syn.prop}>href</span>=<span className={syn.string}>"/docs"</span>{">"}Read docs{"</"}<span className={syn.fn}>Button</span>{">"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      {VARIANTS.map((v) => (
        <div key={v} className={variantBlock}>
          <h3 className={variantLabel}>{v}</h3>
          <div className={css({ marginBottom: "16px" })}>
            <Button variant={v}>{v} button</Button>
          </div>
          <CodeBlock
            tabs={[{
              label: "TSX",
              content: (
                <pre><code>
                  {"<"}<span className={syn.fn}>Button</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"{v}"</span>{">"}{v} button{"</"}<span className={syn.fn}>Button</span>{">"}
                </code></pre>
              ),
            }]}
          />
        </div>
      ))}
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
