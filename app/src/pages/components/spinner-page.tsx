import { css } from "styled-system/css";
import { Spinner } from "@sunbeam/beam-ui/components/ui/spinner";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "size", type: '"sm" | "md" | "lg"', required: false, description: 'Spinner diameter. sm=20px, md=32px, lg=48px. Defaults to "md".' },
  { name: "label", type: "string", required: false, description: "Text shown below the spinner. Also used as the aria-label for screen readers." },
  { name: "accent", type: "boolean", required: false, description: "Use sunbeam orange instead of muted golden. Defaults to false." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function SpinnerPage() {
  return (
    <ComponentPage
      name="Spinner"
      description="An animated loading indicator with size variants, optional label, and accent color mode. Uses role='status' for screen reader announcements."
      importPath='import { Spinner } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <div className={previewItem}>
          <h4 className={previewLabel}>Small</h4>
          <Spinner size="sm" />
        </div>
        <div className={previewItem}>
          <h4 className={previewLabel}>Medium</h4>
          <Spinner size="md" />
        </div>
        <div className={previewItem}>
          <h4 className={previewLabel}>Large</h4>
          <Spinner size="lg" />
        </div>
        <div className={previewItem}>
          <h4 className={previewLabel}>Accent</h4>
          <Spinner size="md" accent />
        </div>
        <div className={previewItem}>
          <h4 className={previewLabel}>With label</h4>
          <Spinner size="md" accent label="Loading..." />
        </div>
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}Spinner{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Default"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Spinner</span> {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Large accent with label"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Spinner</span> <span className={syn.prop}>size</span>=<span className={syn.string}>"lg"</span> <span className={syn.prop}>accent</span> <span className={syn.prop}>label</span>=<span className={syn.string}>"Saving..."</span> {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Inline with text"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Button</span>{">"}{"<"}<span className={syn.fn}>Spinner</span> <span className={syn.prop}>size</span>=<span className={syn.string}>"sm"</span> {">"} Submitting...{"</"}<span className={syn.fn}>Button</span>{">"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Sizes</h3>
        <div className={css({ display: "flex", alignItems: "center", gap: "32px", marginBottom: "24px" })}>
          <Spinner size="sm" label="sm (20px)" />
          <Spinner size="md" label="md (32px)" />
          <Spinner size="lg" label="lg (48px)" />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Muted vs accent</h3>
        <div className={css({ display: "flex", alignItems: "center", gap: "32px", marginBottom: "24px" })}>
          <Spinner size="lg" label="Muted (default)" />
          <Spinner size="lg" accent label="Accent" />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Loading state pattern</h3>
        <div className={css({ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "48px", backgroundColor: "bg.card" })}>
          <Spinner size="lg" accent />
          <p className={css({ fontSize: "sm", color: "text.secondary" })}>Fetching repository data...</p>
        </div>
      </div>
    </ComponentPage>
  );
}

const previewRow = css({ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center", gap: "40px", padding: "40px", backgroundColor: "bg.card", marginBottom: "32px" });
const previewItem = css({ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", minWidth: "80px" });
const previewLabel = css({ fontSize: "2xs", fontWeight: "button", textTransform: "uppercase", letterSpacing: "0.1em", color: "text.muted" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "lg", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
