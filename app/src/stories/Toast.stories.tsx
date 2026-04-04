import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SuccessToast as SuccessToastRender, ErrorToast as ErrorToastRender, InfoToast as InfoToastRender, Dismissible as DismissibleRender } from "@sunbeam/beam-ui/components/ui/toast.story";

const meta: Meta = {
  title: "UI/Toast",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SuccessToast: Story = {
  render: () => <SuccessToastRender />,
};

export const ErrorToast: Story = {
  render: () => <ErrorToastRender />,
};

export const InfoToast: Story = {
  render: () => <InfoToastRender />,
};

export const Dismissible: Story = {
  render: () => <DismissibleRender />,
};
