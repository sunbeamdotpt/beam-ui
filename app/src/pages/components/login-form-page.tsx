import { useState } from "react";
import { css } from "styled-system/css";
import { LoginForm } from "@sunbeam/beam-ui/components/ui/auth-form";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
const LOGIN_PROPS = [
  { name: "onSubmit", type: "(username, password, remember) => void", required: true, description: "Callback with form values on submit." },
  { name: "oauthProviders", type: "{ name, icon, onClick }[]", required: false, description: "OAuth provider buttons to show below the form." },
  { name: "error", type: "string", required: false, description: "Error message to display." },
  { name: "loading", type: "boolean", required: false, description: "Disables inputs and shows loading indicator." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function LoginFormPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <ComponentPage
      name="LoginForm"
      description="A self-contained login form card with username/password fields, remember-me toggle, OAuth provider buttons, and built-in validation states."
      importPath='import { LoginForm } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <LoginForm
          onSubmit={(user, pass) => {
            if (!user || !pass) {
              setError("Username and password are required.");
            } else {
              setError("");
              setLoading(true);
              setTimeout(() => setLoading(false), 1500);
            }
          }}
          oauthProviders={[
            { name: "Continue with Google", icon: "language", onClick: () => alert("Google OAuth") },
            { name: "Continue with GitHub", icon: "code", onClick: () => alert("GitHub OAuth") },
          ]}
          error={error || undefined}
          loading={loading}
        />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={LOGIN_PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}LoginForm{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>LoginForm</span>{"\n"}
              {"  "}<span className={syn.prop}>onSubmit</span>={"{"}(user, pass, remember) {"=> "}login(user, pass){"}"}{"\n"}
              {"  "}<span className={syn.prop}>error</span>={"{"}error{"}"}{"\n"}
              {"  "}<span className={syn.prop}>loading</span>={"{"}isLoading{"}"}{"\n"}
              {"  "}<span className={syn.prop}>oauthProviders</span>={"{"}[{"\n"}
              {"    "}{"{ "}name: <span className={syn.string}>"Google"</span>, icon: <span className={syn.string}>"language"</span>, onClick: googleAuth{" },"}{"\n"}
              {"    "}{"{ "}name: <span className={syn.string}>"GitHub"</span>, icon: <span className={syn.string}>"code"</span>, onClick: githubAuth{" }"}{"\n"}
              {"  "}]{"}"}  {"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <h3 className={variantLabel}>With OAuth Providers</h3>
      <p className={variantNote}>Login form with Google and GitHub OAuth buttons.</p>
      <div className={variantBlock}>
        <LoginForm
          onSubmit={() => {}}
          oauthProviders={[
            { name: "Continue with Google", icon: "language", onClick: () => alert("Google OAuth") },
            { name: "Continue with GitHub", icon: "code", onClick: () => alert("GitHub OAuth") },
          ]}
        />
      </div>

      <h3 className={variantLabel}>With Error</h3>
      <p className={variantNote}>Login form displaying an authentication error.</p>
      <div className={variantBlock}>
        <LoginForm
          onSubmit={() => {}}
          error="Invalid credentials. Please try again."
        />
      </div>

      <h3 className={variantLabel}>Loading State</h3>
      <p className={variantNote}>Login form with inputs disabled during authentication.</p>
      <div className={variantBlock}>
        <LoginForm
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
