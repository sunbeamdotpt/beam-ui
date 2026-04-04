import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithoutActions as WithoutActionsRender, LongContent as LongContentRender } from "@sunbeam/beam-ui/components/ui/dialog.story";

const meta: Meta = {
  title: "UI/Dialog",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const WithoutActions: Story = {
  render: () => <WithoutActionsRender />,
};

export const LongContent: Story = {
  render: () => <LongContentRender />,
};
