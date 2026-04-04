import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithoutLabel as WithoutLabelRender, LargeStep as LargeStepRender } from "@sunbeam/beam-ui/components/ui/number-input.story";

const meta: Meta = {
  title: "UI/NumberInput",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const WithoutLabel: Story = {
  render: () => <WithoutLabelRender />,
};

export const LargeStep: Story = {
  render: () => <LargeStepRender />,
};
