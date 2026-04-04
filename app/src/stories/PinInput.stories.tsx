import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { FourDigit as FourDigitRender, SixDigit as SixDigitRender, Masked as MaskedRender } from "@sunbeam/beam-ui/components/ui/pin-input.story";

const meta: Meta = {
  title: "UI/PinInput",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const FourDigit: Story = {
  render: () => <FourDigitRender />,
};

export const SixDigit: Story = {
  render: () => <SixDigitRender />,
};

export const Masked: Story = {
  render: () => <MaskedRender />,
};
