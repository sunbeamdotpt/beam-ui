import { css } from "styled-system/css";
import { Avatar } from "@sunbeam/beam-ui/components/ui/avatar";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "name", type: "string", required: true, description: "Full name used for initials fallback and color generation." },
  { name: "src", type: "string", required: false, description: "Image URL. If omitted, initials are shown on a colored background." },
  { name: "size", type: '"sm" | "md" | "lg"', required: false, description: 'Avatar size: sm (32px), md (40px), or lg (56px). Defaults to "md".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const SIZES = ["sm", "md", "lg"] as const;

const NAMES = [
  "Ada Lovelace",
  "Blaise Pascal",
  "Charles Babbage",
  "Dorothy Vaughan",
  "Emmy Noether",
  "Frances Allen",
];

export function AvatarPage() {
  return (
    <ComponentPage
      name="Avatar"
      description="A circular avatar component that displays a user image or falls back to colored initials. Background color is deterministically derived from the name."
      importPath='import { Avatar } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewSection}>
        <h3 className={previewLabel}>Sizes (with image)</h3>
        <div className={previewRow}>
          {SIZES.map((s) => (
            <Avatar key={s} name="Jane Doe" src="https://i.pravatar.cc/112?img=5" size={s} />
          ))}
        </div>
      </div>
      <div className={previewSection}>
        <h3 className={previewLabel}>Sizes (initials fallback)</h3>
        <div className={previewRow}>
          {SIZES.map((s) => (
            <Avatar key={s} name="Jane Doe" size={s} />
          ))}
        </div>
      </div>
      <div className={previewSection}>
        <h3 className={previewLabel}>Color cycling across names</h3>
        <div className={previewRow}>
          {NAMES.map((name) => (
            <Avatar key={name} name={name} size="md" />
          ))}
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
              <span className={syn.keyword}>import</span> {"{ "}Avatar{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// With an image"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Avatar</span> <span className={syn.prop}>name</span>=<span className={syn.string}>"Jane Doe"</span> <span className={syn.prop}>src</span>=<span className={syn.string}>"/avatars/jane.jpg"</span> <span className={syn.prop}>size</span>=<span className={syn.string}>"lg"</span> {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Initials fallback"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Avatar</span> <span className={syn.prop}>name</span>=<span className={syn.string}>"Ada Lovelace"</span> {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      {SIZES.map((s) => (
        <div key={s} className={variantBlock}>
          <h3 className={variantLabel}>{s} ({s === "sm" ? "32px" : s === "md" ? "40px" : "56px"})</h3>
          <div className={css({ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" })}>
            <Avatar name="Example User" src="https://i.pravatar.cc/112?img=12" size={s} />
            <Avatar name="Example User" size={s} />
          </div>
          <CodeBlock
            tabs={[{
              label: "TSX",
              content: (
                <pre><code>
                  {"<"}<span className={syn.fn}>Avatar</span> <span className={syn.prop}>name</span>=<span className={syn.string}>"Example User"</span> <span className={syn.prop}>size</span>=<span className={syn.string}>"{s}"</span> {"/>"}
                </code></pre>
              ),
            }]}
          />
        </div>
      ))}
    </ComponentPage>
  );
}

const previewSection = css({
  marginBottom: "24px",
});

const previewLabel = css({
  fontSize: "14px",
  fontWeight: "button",
  color: "text.secondary",
  marginBottom: "12px",
});

const previewRow = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "16px",
  padding: "32px",
  backgroundColor: "bg.card",
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
