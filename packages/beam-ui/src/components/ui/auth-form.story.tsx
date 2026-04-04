// @storyName AuthForms
import { LoginForm, SignUpForm, ForgotPasswordForm, TwoFactorForm } from "./auth-form";

export default function AuthFormsStory() {
  return (
    <LoginForm
      onSubmit={(username, password, remember) => {
        console.log("Login:", { username, password, remember });
      }}
      oauthProviders={[
        { name: "Continue with GitHub", icon: "code", onClick: () => {} },
        { name: "Continue with Google", icon: "g_mobiledata", onClick: () => {} },
      ]}
    />
  );
}

export function SignUp() { return <SignUpForm onSubmit={() => {}} />; }
export function ForgotPassword() { return <ForgotPasswordForm onSubmit={() => {}} />; }
export function ForgotPasswordSuccess() { return <ForgotPasswordForm onSubmit={() => {}} success />; }
export function TwoFactor() { return <TwoFactorForm onSubmit={() => {}} onScratchCode={() => {}} />; }
export function LoginWithError() {
  return (
    <LoginForm
      onSubmit={() => {}}
      error="Invalid username or password. Please try again."
    />
  );
}
export function LoginLoading() {
  return <LoginForm onSubmit={() => {}} loading />;
}
export function SignUpWithError() {
  return <SignUpForm onSubmit={() => {}} error="Username is already taken." />;
}
export function SignUpLoading() {
  return <SignUpForm onSubmit={() => {}} loading />;
}
export function ForgotPasswordWithError() {
  return <ForgotPasswordForm onSubmit={() => {}} error="No account found with that email." />;
}
export function ForgotPasswordLoading() {
  return <ForgotPasswordForm onSubmit={() => {}} loading />;
}
export function TwoFactorWithError() {
  return <TwoFactorForm onSubmit={() => {}} onScratchCode={() => {}} error="Invalid code. Please try again." />;
}
export function TwoFactorLoading() {
  return <TwoFactorForm onSubmit={() => {}} onScratchCode={() => {}} loading />;
}
