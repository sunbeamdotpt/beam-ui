import { useState } from "react";
import { css } from "styled-system/css";
import {
  LoginForm,
  SignUpForm,
  ForgotPasswordForm,
  TwoFactorForm,
} from "@sunbeam/beam-ui/components/ui/auth-form";
import { Tabs } from "@sunbeam/beam-ui/components/ui/tabs";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const LOGIN_PROPS = [
  { name: "onSubmit", type: "(username, password, remember) => void", required: true, description: "Callback with form values on submit." },
  { name: "oauthProviders", type: "{ name, icon, onClick }[]", required: false, description: "OAuth provider buttons to show below the form." },
  { name: "error", type: "string", required: false, description: "Error message to display." },
  { name: "loading", type: "boolean", required: false, description: "Disables inputs and shows loading indicator." },
];

const SIGNUP_PROPS = [
  { name: "onSubmit", type: "(data: { username, email, password }) => void", required: true, description: "Callback with form values on submit." },
  { name: "error", type: "string", required: false, description: "Error message to display." },
  { name: "loading", type: "boolean", required: false, description: "Disables inputs and shows loading indicator." },
];

const FORGOT_PROPS = [
  { name: "onSubmit", type: "(email: string) => void", required: true, description: "Callback with email on submit." },
  { name: "error", type: "string", required: false, description: "Error message to display." },
  { name: "loading", type: "boolean", required: false, description: "Disables inputs and shows loading indicator." },
  { name: "success", type: "boolean", required: false, description: "When true, shows success message instead of form." },
];

const TWOFACTOR_PROPS = [
  { name: "onSubmit", type: "(code: string) => void", required: true, description: "Callback with the entered code." },
  { name: "onScratchCode", type: "() => void", required: true, description: "Callback when user clicks scratch code link." },
  { name: "error", type: "string", required: false, description: "Error message to display." },
  { name: "loading", type: "boolean", required: false, description: "Disables inputs and shows loading indicator." },
];

const TAB_ITEMS = [
  { value: "login", label: "Login" },
  { value: "signup", label: "Sign Up" },
  { value: "forgot", label: "Forgot Password" },
  { value: "2fa", label: "Two-Factor" },
];

export function AuthFormPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState("");

  return (
    <ComponentPage
      name="AuthForm"
      description="Composable authentication form components: LoginForm, SignUpForm, ForgotPasswordForm, and TwoFactorForm. Each is a self-contained card with validation, loading states, and navigation links."
      importPath='import { LoginForm, SignUpForm, ForgotPasswordForm, TwoFactorForm } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <Tabs items={TAB_ITEMS} activeValue={activeTab} onChange={setActiveTab} />
        <div className={formArea}>
          {activeTab === "login" && (
            <LoginForm
              onSubmit={(user, pass) => {
                if (!user || !pass) {
                  setLoginError("Username and password are required.");
                } else {
                  setLoginError("");
                  alert(`Sign in: ${user}`);
                }
              }}
              oauthProviders={[
                { name: "Continue with Google", icon: "language", onClick: () => alert("Google OAuth") },
                { name: "Continue with GitHub", icon: "code", onClick: () => alert("GitHub OAuth") },
              ]}
              error={loginError || undefined}
            />
          )}
          {activeTab === "signup" && (
            <SignUpForm
              onSubmit={(data) => {
                if (!data.username || !data.email || !data.password) {
                  setSignupError("All fields are required.");
                } else {
                  setSignupError("");
                  alert(`Signed up: ${data.username}`);
                }
              }}
              error={signupError || undefined}
            />
          )}
          {activeTab === "forgot" && (
            <ForgotPasswordForm
              onSubmit={(email) => {
                if (email) setForgotSuccess(true);
              }}
              success={forgotSuccess}
            />
          )}
          {activeTab === "2fa" && (
            <TwoFactorForm
              onSubmit={(code) => {
                if (code.length < 6) {
                  setTwoFactorError("Please enter all 6 digits.");
                } else {
                  setTwoFactorError("");
                  alert(`Code: ${code}`);
                }
              }}
              onScratchCode={() => alert("Scratch code flow")}
              error={twoFactorError || undefined}
            />
          )}
        </div>
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <h3 className={subHeading}>LoginForm</h3>
      <PropsTable props={LOGIN_PROPS} />
      <h3 className={subHeading}>SignUpForm</h3>
      <PropsTable props={SIGNUP_PROPS} />
      <h3 className={subHeading}>ForgotPasswordForm</h3>
      <PropsTable props={FORGOT_PROPS} />
      <h3 className={subHeading}>TwoFactorForm</h3>
      <PropsTable props={TWOFACTOR_PROPS} />

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
              {"  "}<span className={syn.prop}>oauthProviders</span>={"{"}[{"{ "}name: <span className={syn.string}>"Google"</span>, icon: <span className={syn.string}>"language"</span>, onClick: googleAuth{" }"}]{"}"}  {"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Login with Error</h3>
        <LoginForm
          onSubmit={() => {}}
          error="Invalid credentials. Please try again."
        />
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Forgot Password Success</h3>
        <ForgotPasswordForm onSubmit={() => {}} success={true} />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const formArea = css({ marginTop: "24px" });
const subHeading = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", marginBottom: "12px", marginTop: "24px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
