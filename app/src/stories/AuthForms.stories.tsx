import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SignUp as SignUpRender, ForgotPassword as ForgotPasswordRender, ForgotPasswordSuccess as ForgotPasswordSuccessRender, TwoFactor as TwoFactorRender, LoginWithError as LoginWithErrorRender, LoginLoading as LoginLoadingRender, SignUpWithError as SignUpWithErrorRender, SignUpLoading as SignUpLoadingRender, ForgotPasswordWithError as ForgotPasswordWithErrorRender, ForgotPasswordLoading as ForgotPasswordLoadingRender, TwoFactorWithError as TwoFactorWithErrorRender, TwoFactorLoading as TwoFactorLoadingRender } from "@sunbeam/beam-ui/components/ui/auth-form.story";

const meta: Meta = {
  title: "UI/AuthForms",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SignUp: Story = {
  render: () => <SignUpRender />,
};

export const ForgotPassword: Story = {
  render: () => <ForgotPasswordRender />,
};

export const ForgotPasswordSuccess: Story = {
  render: () => <ForgotPasswordSuccessRender />,
};

export const TwoFactor: Story = {
  render: () => <TwoFactorRender />,
};

export const LoginWithError: Story = {
  render: () => <LoginWithErrorRender />,
};

export const LoginLoading: Story = {
  render: () => <LoginLoadingRender />,
};

export const SignUpWithError: Story = {
  render: () => <SignUpWithErrorRender />,
};

export const SignUpLoading: Story = {
  render: () => <SignUpLoadingRender />,
};

export const ForgotPasswordWithError: Story = {
  render: () => <ForgotPasswordWithErrorRender />,
};

export const ForgotPasswordLoading: Story = {
  render: () => <ForgotPasswordLoadingRender />,
};

export const TwoFactorWithError: Story = {
  render: () => <TwoFactorWithErrorRender />,
};

export const TwoFactorLoading: Story = {
  render: () => <TwoFactorLoadingRender />,
};
