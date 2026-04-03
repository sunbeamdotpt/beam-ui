import { css } from "styled-system/css";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const ALL_VARIANTS = [
  "featured", "premier", "verified", "partner",
  "stable", "new", "open", "community",
  "preview", "beta", "experimental", "deprecated",
  "section",
] as const;

const PROPS = [
  {
    name: "variant",
    type: ALL_VARIANTS.map(v => `"${v}"`).join(" | "),
    required: false,
    description: 'Visual style of the badge. Defaults to "premier". The "section" variant renders as a label with a horizontal rule.',
  },
  { name: "children", type: "ReactNode", required: true, description: "Badge label content." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function BadgePage() {
  return (
    <ComponentPage
      name="Badge"
      description="Compact labels for status, tier, category, or section dividers. Fourteen variants cover everything from model tiers to release stages."
      importPath='import { Badge } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        {ALL_VARIANTS.filter(v => v !== "section").map((v) => (
          <Badge key={v} variant={v}>{v}</Badge>
        ))}
      </div>
      <Badge variant="section">Section Divider</Badge>

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
              {"<"}<span className={syn.fn}>Badge</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"beta"</span>{">"}Beta{"</"}<span className={syn.fn}>Badge</span>{">"}{"\n"}
              {"<"}<span className={syn.fn}>Badge</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"section"</span>{">"}Section{"</"}<span className={syn.fn}>Badge</span>{">"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantGrid}>
        {ALL_VARIANTS.filter(v => v !== "section").map((v) => (
          <div key={v} className={variantItem}>
            <Badge variant={v}>{v}</Badge>
            <span className={variantName}>{v}</span>
          </div>
        ))}
      </div>

      <div className={css({ marginTop: "32px" })}>
        <h3 className={variantName} style={{ marginBottom: "12px" }}>section</h3>
        <Badge variant="section">Section Label</Badge>
      </div>
    </ComponentPage>
  );
}

const previewRow = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "12px",
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "24px",
});

const variantGrid = css({
  display: "grid",
  gridTemplateColumns: { base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
  gap: "16px",
});

const variantItem = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "8px",
  padding: "16px",
  backgroundColor: "bg.card",
  borderRadius: "0",
});

const variantName = css({
  fontSize: "12px",
  fontFamily: "mono",
  color: "text.muted",
});
