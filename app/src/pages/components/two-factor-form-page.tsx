import { useState } from "react";
import { css } from "styled-system/css";
import { TwoFactorForm } from "@sunbeam/beam-ui/components/ui/auth-form";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
const TWOFACTOR_PROPS = [
  { name: "onSubmit", type: "(code: string) => void", required: true, description: "Callback with the entered code." },
  { name: "onScratchCode", type: "() => void", required: true, description: "Callback when user clicks scratch code link." },
  { name: "error", type: "string", required: false, description: "Error message to display." },
  { name: "loading", type: "boolean", required: false, description: "Disables inputs and shows loading indicator." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function TwoFactorFormPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <ComponentPage
      name="TwoFactorForm"
      description="A self-contained two-factor authentication form with a 6-digit code input, scratch code fallback link, and built-in validation states."
      importPath='import { TwoFactorForm } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <TwoFactorForm
          onSubmit={(code) => {
            if (code.length < 6) {
              setError("Please enter all 6 digits.");
            } else {
              setError("");
              setLoading(true);
              setTimeout(() => setLoading(false), 1500);
            }
          }}
          onScratchCode={() => alert("Scratch code flow")}
          error={error || undefined}
          loading={loading}
        />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={TWOFACTOR_PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}TwoFactorForm{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>TwoFactorForm</span>{"\n"}
              {"  "}<span className={syn.prop}>onSubmit</span>={"{"}(code) {"=> "}verify2FA(code){"}"}{"\n"}
              {"  "}<span className={syn.prop}>onScratchCode</span>={"{"}() {"=> "}showScratchCodeInput(){"}"}{"\n"}
              {"  "}<span className={syn.prop}>error</span>={"{"}error{"}"}{"\n"}
              {"  "}<span className={syn.prop}>loading</span>={"{"}isLoading{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <h3 className={variantLabel}>Default</h3>
      <p className={variantNote}>Clean two-factor form ready for code input.</p>
      <div className={variantBlock}>
        <TwoFactorForm
          onSubmit={() => {}}
          onScratchCode={() => alert("Scratch code flow")}
        />
      </div>

      <h3 className={variantLabel}>With Error</h3>
      <p className={variantNote}>Two-factor form displaying a validation error.</p>
      <div className={variantBlock}>
        <TwoFactorForm
          onSubmit={() => {}}
          onScratchCode={() => alert("Scratch code flow")}
          error="Invalid code. Please try again."
        />
      </div>

      <h3 className={variantLabel}>Loading State</h3>
      <p className={variantNote}>Two-factor form with inputs disabled during verification.</p>
      <div className={variantBlock}>
        <TwoFactorForm
          onSubmit={() => {}}
          onScratchCode={() => alert("Scratch code flow")}
          loading={true}
        />
      </div>
    </ComponentPage>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */
const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
const variantNote = css({ fontSize: "14px", color: "text.secondary", marginBottom: "16px", lineHeight: 1.6 });
