import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Empty as EmptyRender, HighActivity as HighActivityRender } from "@sunbeam/beam-ui/components/ui/activity-heatmap.story";

const meta: Meta = {
  title: "UI/ActivityHeatmap",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Empty: Story = {
  render: () => <EmptyRender />,
};

export const HighActivity: Story = {
  render: () => <HighActivityRender />,
};
