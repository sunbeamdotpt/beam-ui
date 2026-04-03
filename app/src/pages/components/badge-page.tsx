import { css } from "styled-system/css";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const TIER_VARIANTS = ["featured", "premier", "verified", "partner", "community"] as const;
const RELEASE_VARIANTS = ["stable", "new", "beta", "preview", "experimental", "deprecated"] as const;
const STATUS_VARIANTS = ["open", "draft", "review", "approved", "merged", "closed", "revision"] as const;
const PRIORITY_VARIANTS = ["critical", "high", "medium", "low"] as const;
const ALL_VARIANTS = [...TIER_VARIANTS, ...RELEASE_VARIANTS, ...STATUS_VARIANTS, ...PRIORITY_VARIANTS, "section"] as const;

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
      description="Compact labels for status, tier, priority, and workflow states. 25 variants organized into four categories: Tier/Recognition, Release Stage, Work Status, and Priority. Plus a section divider utility."
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

      {[
        { title: "Tier / Recognition", desc: "Who you are — trust signals and community standing", variants: TIER_VARIANTS },
        { title: "Release Stage", desc: "What state it's in — lifecycle from experimental to deprecated", variants: RELEASE_VARIANTS },
        { title: "Work Status", desc: "What's happening — workflow states for issues and pull requests", variants: STATUS_VARIANTS },
        { title: "Priority", desc: "How urgent — from critical to low", variants: PRIORITY_VARIANTS },
      ].map((group) => (
        <div key={group.title} className={css({ marginBottom: "32px" })}>
          <h3 className={variantName} style={{ marginBottom: "4px", fontSize: "16px", color: "var(--colors-text\\.primary, #fff)" }}>{group.title}</h3>
          <p className={css({ fontSize: "13px", color: "text.muted", marginBottom: "16px" })}>{group.desc}</p>
          <div className={variantGrid}>
            {group.variants.map((v) => (
              <div key={v} className={variantItem}>
                <Badge variant={v}>{v}</Badge>
                <span className={variantName}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className={css({ marginTop: "16px" })}>
        <h3 className={variantName} style={{ marginBottom: "4px", fontSize: "16px" }}>Utility</h3>
        <p className={css({ fontSize: "13px", color: "text.muted", marginBottom: "12px" })}>Section divider with horizontal rule</p>
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
