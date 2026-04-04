import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SplitMode as SplitModeRender, UnifiedMode as UnifiedModeRender } from "@sunbeam/beam-ui/components/ui/diff-viewer.story";

const meta: Meta = {
  title: "UI/DiffViewer",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SplitMode: Story = {
  render: () => <SplitModeRender />,
};

export const UnifiedMode: Story = {
  render: () => <UnifiedModeRender />,
};
