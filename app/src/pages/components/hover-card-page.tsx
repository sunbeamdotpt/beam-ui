import { css } from "styled-system/css";
import { HoverCard } from "@sunbeam/beam-ui/components/ui/hover-card";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "trigger", type: "ReactNode", required: true, description: "The element that triggers the hover card." },
  { name: "children", type: "ReactNode", required: true, description: "Content displayed inside the hover card." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function HoverCardPage() {
  return (
    <ComponentPage
      name="HoverCard"
      description="A card that appears on hover, useful for previews and additional context. Built on Ark UI HoverCard."
      importPath='import { HoverCard } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <HoverCard
          trigger={<span className={link}>Hover over me</span>}
        >
          <div>
            <strong>Preview Card</strong>
            <p className={css({ marginTop: "4px", color: "text.secondary", fontSize: "13px" })}>
              This is additional context that appears on hover. Useful for user profiles, link previews, and more.
            </p>
          </div>
        </HoverCard>
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}HoverCard{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>HoverCard</span> <span className={syn.prop}>trigger</span>={"{"}{"<"}span{">"}Hover me{"</"}span{">"}{"}"}{">"}
              {"\n"}{"  "}{"<"}p{">"}Card content{"</"}p{">"}{"\n"}
              {"</"}<span className={syn.fn}>HoverCard</span>{">"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Rich content</h3>
        <HoverCard trigger={<span className={link}>User profile</span>}>
          <div className={css({ display: "flex", gap: "12px", alignItems: "center" })}>
            <div className={avatar}>S</div>
            <div>
              <strong>Sienna</strong>
              <p className={css({ fontSize: "12px", color: "text.muted" })}>Design Engineer</p>
            </div>
          </div>
        </HoverCard>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
const link = css({ color: "sunbeam.orange", textDecoration: "underline", cursor: "pointer", fontSize: "14px" });
const avatar = css({ width: "36px", height: "36px", borderRadius: "full", backgroundColor: "sunbeam.orange", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "heading", fontSize: "14px" });
