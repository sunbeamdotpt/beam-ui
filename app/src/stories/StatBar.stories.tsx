import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { LowPerformance as LowPerformanceRender, Multimodal as MultimodalRender } from "@sunbeam/beam-ui/components/ui/stat-bar.story";

const meta: Meta = {
  title: "UI/StatBar",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const LowPerformance: Story = {
  render: () => <LowPerformanceRender />,
};

export const Multimodal: Story = {
  render: () => <MultimodalRender />,
};
