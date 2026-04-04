import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { CustomTrigger as CustomTriggerRender, LongValue as LongValueRender } from "@sunbeam/beam-ui/components/ui/clipboard.story";

const meta: Meta = {
  title: "UI/Clipboard",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const CustomTrigger: Story = {
  render: () => <CustomTriggerRender />,
};

export const LongValue: Story = {
  render: () => <LongValueRender />,
};
