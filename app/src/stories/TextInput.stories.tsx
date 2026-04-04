import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithError as WithErrorRender, Disabled as DisabledRender, Password as PasswordRender, EmailType as EmailTypeRender, NumberType as NumberTypeRender, TextType as TextTypeRender } from "@sunbeam/beam-ui/components/ui/text-input.story";

const meta: Meta = {
  title: "UI/TextInput",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const WithError: Story = {
  render: () => <WithErrorRender />,
};

export const Disabled: Story = {
  render: () => <DisabledRender />,
};

export const Password: Story = {
  render: () => <PasswordRender />,
};

export const EmailType: Story = {
  render: () => <EmailTypeRender />,
};

export const NumberType: Story = {
  render: () => <NumberTypeRender />,
};

export const TextType: Story = {
  render: () => <TextTypeRender />,
};
