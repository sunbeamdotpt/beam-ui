import { css } from "styled-system/css";
import { Callout } from "@sunbeam/beam-ui/components/ui/callout";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "variant", type: '"tip" | "warning" | "info"', required: false, description: 'Visual style and icon. Defaults to "tip".' },
  { name: "children", type: "ReactNode", required: true, description: "Callout body content." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function CalloutPage() {
  return (
    <ComponentPage
      name="Callout"
      description="Contextual admonition blocks for tips, warnings, and informational notes. Each variant has a distinct color accent and icon."
      importPath='import { Callout } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewStack}>
        <Callout variant="tip">For best results, keep your API key secure and rotate it regularly.</Callout>
        <Callout variant="warning">This endpoint is rate-limited to 100 requests per minute.</Callout>
        <Callout variant="info">Version 2 of the API introduces breaking changes to the response format.</Callout>
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
              <span className={syn.keyword}>import</span> {"{ "}Callout{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Callout</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"tip"</span>{">"}{"\n"}
              {"  "}Keep your API key secure.{"\n"}
              {"</"}<span className={syn.fn}>Callout</span>{">"}{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Callout</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"warning"</span>{">"}{"\n"}
              {"  "}Rate-limited to 100 req/min.{"\n"}
              {"</"}<span className={syn.fn}>Callout</span>{">"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>tip</h3>
        <Callout variant="tip">Pro tips help users get the most out of the platform.</Callout>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>warning</h3>
        <Callout variant="warning">Warnings alert users to potential issues or limitations.</Callout>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>info</h3>
        <Callout variant="info">Info callouts provide additional context or background.</Callout>
      </div>
    </ComponentPage>
  );
}

const previewStack = css({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginBottom: "32px",
});

const variantBlock = css({
  marginBottom: "32px",
});

const variantLabel = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  textTransform: "capitalize",
  marginBottom: "12px",
});
