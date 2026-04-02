import { css } from "styled-system/css";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "name", type: "string", required: true, description: "Material Symbols icon name (e.g. \"search\", \"arrow_forward\")." },
  { name: "size", type: "number | string", required: false, description: "Icon size in pixels (number) or CSS value (string)." },
  { name: "filled", type: "boolean", required: false, description: "Whether to use the filled variant of the icon." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const COMMON_ICONS = [
  "search", "home", "settings", "favorite", "star",
  "arrow_forward", "arrow_back", "check", "close", "add",
  "edit", "delete", "info", "warning", "lightbulb",
  "content_copy", "visibility", "code", "palette", "auto_awesome",
];

const SIZES = [16, 20, 24, 32, 48];

export function IconPage() {
  return (
    <ComponentPage
      name="Icon"
      description="A thin wrapper around Material Symbols Outlined. Supports size, fill variation, and custom class names."
      importPath='import { Icon } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>

      <h3 className={subLabel}>Common icons</h3>
      <div className={iconGrid}>
        {COMMON_ICONS.map((name) => (
          <div key={name} className={iconCell}>
            <Icon name={name} size={24} />
            <span className={iconName}>{name}</span>
          </div>
        ))}
      </div>

      <h3 className={subLabel}>Sizes</h3>
      <div className={sizeRow}>
        {SIZES.map((s) => (
          <div key={s} className={sizeCell}>
            <Icon name="auto_awesome" size={s} filled />
            <span className={iconName}>{s}px</span>
          </div>
        ))}
      </div>

      <h3 className={subLabel}>Filled vs outlined</h3>
      <div className={css({ display: "flex", gap: "32px", marginBottom: "32px" })}>
        <div className={sizeCell}>
          <Icon name="favorite" size={32} />
          <span className={iconName}>outlined</span>
        </div>
        <div className={sizeCell}>
          <Icon name="favorite" size={32} filled />
          <span className={iconName}>filled</span>
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
              <span className={syn.keyword}>import</span> {"{ "}Icon{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Basic"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Icon</span> <span className={syn.prop}>name</span>=<span className={syn.string}>"search"</span> <span className={syn.prop}>size</span>={"{"}<span className={syn.number}>24</span>{"}"} {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Filled variant"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Icon</span> <span className={syn.prop}>name</span>=<span className={syn.string}>"favorite"</span> <span className={syn.prop}>size</span>={"{"}<span className={syn.number}>32</span>{"}"} <span className={syn.prop}>filled</span> {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      <p className={bodyText}>
        Icon is a single-variant component. Visual variation comes from the Material Symbols library. Use the <code className={inlineCode}>filled</code> prop to toggle between outlined and filled styles.
      </p>
    </ComponentPage>
  );
}

const iconGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "8px",
  marginBottom: "32px",
});

const iconCell = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  padding: "16px 8px",
  backgroundColor: "bg.card",
  color: "text.primary",
});

const iconName = css({
  fontFamily: "mono",
  fontSize: "10px",
  color: "text.muted",
  textAlign: "center",
});

const sizeRow = css({
  display: "flex",
  alignItems: "flex-end",
  gap: "24px",
  marginBottom: "32px",
});

const sizeCell = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  color: "text.primary",
});

const subLabel = css({
  fontSize: "16px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "16px",
  marginTop: "24px",
});

const bodyText = css({
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
});

const inlineCode = css({
  backgroundColor: "bg.card",
  padding: "2px 8px",
  fontFamily: "mono",
  fontSize: "13px",
  color: "text.primary",
  fontWeight: "heading",
  border: "1px solid",
  borderColor: "border.default",
});
