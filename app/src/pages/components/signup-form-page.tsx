import { useState } from "react";
import { css } from "styled-system/css";
import { SignUpForm } from "@sunbeam/beam-ui/components/ui/auth-form";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
const SIGNUP_PROPS = [
  { name: "onSubmit", type: "(data: { username, email, password }) => void", required: true, description: "Callback with form values on submit." },
  { name: "error", type: "string", required: false, description: "Error message to display." },
  { name: "loading", type: "boolean", required: false, description: "Disables inputs and shows loading indicator." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function SignUpFormPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <ComponentPage
      name="SignUpForm"
      description="A self-contained sign-up form card with username, email, and password fields. Includes validation states and loading indicator."
      importPath='import { SignUpForm } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <SignUpForm
          onSubmit={(data) => {
            if (!data.username || !data.email || !data.password) {
              setError("All fields are required.");
            } else {
              setError("");
              setLoading(true);
              setTimeout(() => setLoading(false), 1500);
            }
          }}
          error={error || undefined}
          loading={loading}
        />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={SIGNUP_PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}SignUpForm{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>SignUpForm</span>{"\n"}
              {"  "}<span className={syn.prop}>onSubmit</span>={"{"}({"{ "}username, email, password{" }"}) {"=> "}register(username, email, password){"}"}{"\n"}
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
      <p className={variantNote}>Clean sign-up form with no errors.</p>
      <div className={variantBlock}>
        <SignUpForm onSubmit={() => {}} />
      </div>

      <h3 className={variantLabel}>With Error</h3>
      <p className={variantNote}>Sign-up form displaying a validation error.</p>
      <div className={variantBlock}>
        <SignUpForm
          onSubmit={() => {}}
          error="Username is already taken."
        />
      </div>

      <h3 className={variantLabel}>Loading State</h3>
      <p className={variantNote}>Sign-up form with inputs disabled during registration.</p>
      <div className={variantBlock}>
        <SignUpForm
          onSubmit={() => {}}
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
