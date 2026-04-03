import { css } from "styled-system/css";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { Tooltip } from "@sunbeam/beam-ui/components/ui/tooltip";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "content", type: "string", required: true, description: "Text displayed inside the tooltip." },
  { name: "children", type: "ReactNode", required: true, description: "The trigger element that the tooltip attaches to." },
  { name: "position", type: '"top" | "bottom" | "left" | "right"', required: false, description: 'Placement of the tooltip relative to the trigger. Defaults to "top".' },
];

const POSITIONS = ["top", "bottom", "left", "right"] as const;

export function TooltipPage() {
  return (
    <ComponentPage
      name="Tooltip"
      description="A small overlay that appears on hover to provide additional context for an element. Supports four placement positions with an arrow indicator."
      importPath='import { Tooltip } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        {POSITIONS.map((pos) => (
          <Tooltip key={pos} content={`Tooltip on ${pos}`} position={pos}>
            <span><Button variant="cream">{pos}</Button></span>
          </Tooltip>
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
              <span className={syn.keyword}>import</span> {"{ "}Tooltip{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Tooltip</span> <span className={syn.prop}>content</span>=<span className={syn.string}>"Save changes"</span> <span className={syn.prop}>position</span>=<span className={syn.string}>"top"</span>{">"}{"\n"}
              {"  <"}<span className={syn.fn}>Button</span>{">"}Save{"</"}<span className={syn.fn}>Button</span>{">"}{"\n"}
              {"</"}<span className={syn.fn}>Tooltip</span>{">"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      {POSITIONS.map((pos) => (
        <div key={pos} className={variantBlock}>
          <h3 className={variantLabel}>{pos}</h3>
          <div className={css({ marginBottom: "16px" })}>
            <Tooltip content={`This tooltip appears on ${pos}`} position={pos}>
              <span><Button variant="ghost">Hover me ({pos})</Button></span>
            </Tooltip>
          </div>
          <CodeBlock
            tabs={[{
              label: "TSX",
              content: (
                <pre><code>
                  {"<"}<span className={syn.fn}>Tooltip</span> <span className={syn.prop}>content</span>=<span className={syn.string}>"Info"</span> <span className={syn.prop}>position</span>=<span className={syn.string}>"{pos}"</span>{">"}{"\n"}
                  {"  <"}<span className={syn.fn}>Button</span>{">"}Hover me{"</"}<span className={syn.fn}>Button</span>{">"}{"\n"}
                  {"</"}<span className={syn.fn}>Tooltip</span>{">"}
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
  justifyContent: "center",
  gap: "32px",
  padding: "64px 32px",
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
