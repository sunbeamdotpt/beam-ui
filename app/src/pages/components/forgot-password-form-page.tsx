import { useState } from "react";
import { css } from "styled-system/css";
import { ForgotPasswordForm } from "@sunbeam/beam-ui/components/ui/auth-form";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
const FORGOT_PROPS = [
  { name: "onSubmit", type: "(email: string) => void", required: true, description: "Callback with email on submit." },
  { name: "error", type: "string", required: false, description: "Error message to display." },
  { name: "loading", type: "boolean", required: false, description: "Disables inputs and shows loading indicator." },
  { name: "success", type: "boolean", required: false, description: "When true, shows success message instead of form." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function ForgotPasswordFormPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <ComponentPage
      name="ForgotPasswordForm"
      description="A self-contained forgot-password form card with an email field. Supports loading, error, and success states for the password reset flow."
      importPath='import { ForgotPasswordForm } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <ForgotPasswordForm
          onSubmit={(email) => {
            if (email) {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setSuccess(true);
              }, 1500);
            }
          }}
          success={success}
          loading={loading}
        />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={FORGOT_PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}ForgotPasswordForm{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>ForgotPasswordForm</span>{"\n"}
              {"  "}<span className={syn.prop}>onSubmit</span>={"{"}(email) {"=> "}sendResetLink(email){"}"}{"\n"}
              {"  "}<span className={syn.prop}>error</span>={"{"}error{"}"}{"\n"}
              {"  "}<span className={syn.prop}>loading</span>={"{"}isLoading{"}"}{"\n"}
              {"  "}<span className={syn.prop}>success</span>={"{"}emailSent{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <h3 className={variantLabel}>Default</h3>
      <p className={variantNote}>Clean forgot-password form ready for email input.</p>
      <div className={variantBlock}>
        <ForgotPasswordForm onSubmit={() => {}} />
      </div>

      <h3 className={variantLabel}>Success State</h3>
      <p className={variantNote}>Confirmation message shown after the reset link is sent.</p>
      <div className={variantBlock}>
        <ForgotPasswordForm onSubmit={() => {}} success={true} />
      </div>

      <h3 className={variantLabel}>With Error</h3>
      <p className={variantNote}>Forgot-password form displaying an error.</p>
      <div className={variantBlock}>
        <ForgotPasswordForm
          onSubmit={() => {}}
          error="No account found with that email address."
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
