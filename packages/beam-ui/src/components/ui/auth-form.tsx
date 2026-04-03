import { useState } from "react";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";
import { Spinner } from "./spinner";
import { TextInput } from "./text-input";
import { Checkbox } from "./checkbox";
import { Button } from "./button";
import { PinInput } from "./pin-input";
import { Callout } from "./callout";

/* ------------------------------------------------------------------ */
/* LoginForm                                                           */
/* ------------------------------------------------------------------ */

interface OAuthProvider {
  name: string;
  icon: string;
  onClick: () => void;
}

interface LoginFormProps {
  onSubmit: (username: string, password: string, remember: boolean) => void;
  oauthProviders?: OAuthProvider[];
  error?: string;
  loading?: boolean;
}

export function LoginForm({
  onSubmit,
  oauthProviders,
  error,
  loading = false,
}: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password, remember);
  };

  return (
    <div className={card}>
      <h2 className={title}>Sign In</h2>
      {error && <Callout variant="warning">{error}</Callout>}
      <form onSubmit={handleSubmit} className={form}>
        <TextInput
          label="Username or Email"
          value={username}
          onChange={setUsername}
          placeholder="you@example.com"
          disabled={loading}
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter password"
          disabled={loading}
        />
        <div className={row}>
          <Checkbox
            checked={remember}
            onChange={setRemember}
            label="Remember me"
            disabled={loading}
          />
        </div>
        <Button variant="primary" type="submit" className={fullWidth}>
          {loading && <Spinner size="sm" color="#ffffff" />}
          Sign In
        </Button>
      </form>

      {oauthProviders && oauthProviders.length > 0 && (
        <>
          <div className={divider}>
            <span className={dividerLine} />
            <span className={dividerText}>or</span>
            <span className={dividerLine} />
          </div>
          <div className={oauthList}>
            {oauthProviders.map((provider) => (
              <Button
                key={provider.name}
                variant="ghost"
                onClick={provider.onClick}
                className={fullWidth}
              >
                <Icon name={provider.icon} size={18} />
                {provider.name}
              </Button>
            ))}
          </div>
        </>
      )}

      <div className={links}>
        <span className={linkText}>
          Don't have an account? <a className={link}>Sign up</a>
        </span>
        <a className={link}>Forgot your password?</a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SignUpForm                                                           */
/* ------------------------------------------------------------------ */

interface SignUpFormProps {
  onSubmit: (data: { username: string; email: string; password: string }) => void;
  error?: string;
  loading?: boolean;
}

export function SignUpForm({ onSubmit, error, loading = false }: SignUpFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, email, password });
  };

  return (
    <div className={card}>
      <h2 className={title}>Create Account</h2>
      {error && <Callout variant="warning">{error}</Callout>}
      <form onSubmit={handleSubmit} className={form}>
        <TextInput
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="Choose a username"
          disabled={loading}
        />
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          disabled={loading}
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Create a password"
          disabled={loading}
        />
        <Button variant="primary" type="submit" className={fullWidth}>
          {loading && <Spinner size="sm" color="#ffffff" />}
          Create Account
        </Button>
      </form>
      <div className={links}>
        <span className={linkText}>
          Already have an account? <a className={link}>Sign in</a>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ForgotPasswordForm                                                  */
/* ------------------------------------------------------------------ */

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
  error?: string;
  loading?: boolean;
  success?: boolean;
}

export function ForgotPasswordForm({
  onSubmit,
  error,
  loading = false,
  success = false,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className={card}>
      <h2 className={title}>Forgot Password</h2>
      {error && <Callout variant="warning">{error}</Callout>}
      {success ? (
        <Callout variant="tip">
          A password reset link has been sent to your email address.
        </Callout>
      ) : (
        <form onSubmit={handleSubmit} className={form}>
          <p className={subtitle}>
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            disabled={loading}
          />
          <Button variant="primary" type="submit" className={fullWidth}>
            {loading && <Spinner size="sm" color="#ffffff" />}
            Send Reset Link
          </Button>
        </form>
      )}
      <div className={links}>
        <a className={link}>Back to sign in</a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TwoFactorForm                                                       */
/* ------------------------------------------------------------------ */

interface TwoFactorFormProps {
  onSubmit: (code: string) => void;
  onScratchCode: () => void;
  error?: string;
  loading?: boolean;
}

export function TwoFactorForm({
  onSubmit,
  onScratchCode,
  error,
  loading = false,
}: TwoFactorFormProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <div className={card}>
      <h2 className={title}>Two-Factor Authentication</h2>
      <p className={subtitle}>Enter the 6-digit code from your authenticator app.</p>
      {error && <Callout variant="warning">{error}</Callout>}
      <form onSubmit={handleSubmit} className={form}>
        <div className={centered}>
          <PinInput length={6} value={code} onChange={setCode} />
        </div>
        <Button variant="primary" type="submit" className={fullWidth}>
          {loading && <Spinner size="sm" color="#ffffff" />}
          Verify
        </Button>
      </form>
      <div className={links}>
        <button className={linkBtn} onClick={onScratchCode}>
          Use a scratch code instead
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared styles                                                       */
/* ------------------------------------------------------------------ */

const card = css({
  maxWidth: "400px",
  width: "100%",
  margin: "0 auto",
  backgroundColor: "bg.page",
  border: "2px solid",
  borderColor: "border.default",
  padding: "32px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  shadow: "golden",
});

const title = css({
  fontSize: "24px",
  fontWeight: "heading",
  fontFamily: "heading",
  color: "text.primary",
  textAlign: "center",
  margin: 0,
});

const subtitle = css({
  fontSize: "14px",
  fontFamily: "body",
  color: "text.secondary",
  lineHeight: 1.5,
  textAlign: "center",
  margin: 0,
});

const form = css({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const row = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const fullWidth = css({
  width: "100%",
  justifyContent: "center",
});

const divider = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const dividerLine = css({
  flex: 1,
  height: "1px",
  backgroundColor: "border.default",
});

const dividerText = css({
  fontSize: "12px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "text.muted",
  fontFamily: "body",
});

const oauthList = css({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const links = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  marginTop: "8px",
});

const linkText = css({
  fontSize: "13px",
  fontFamily: "body",
  color: "text.secondary",
});

const link = css({
  fontSize: "13px",
  fontFamily: "body",
  color: "sunbeam.orange",
  cursor: "pointer",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  _hover: {
    textDecorationColor: "sunbeam.orange",
  },
});

const linkBtn = css({
  fontSize: "13px",
  fontFamily: "body",
  color: "sunbeam.orange",
  cursor: "pointer",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  background: "none",
  border: "none",
  padding: 0,
  _hover: {
    textDecorationColor: "sunbeam.orange",
  },
});

const centered = css({
  display: "flex",
  justifyContent: "center",
});
