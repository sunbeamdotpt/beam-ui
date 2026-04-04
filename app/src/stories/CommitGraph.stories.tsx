import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { LinearHistory as LinearHistoryRender, WithTags as WithTagsRender } from "@sunbeam/beam-ui/components/ui/commit-graph.story";

const meta: Meta = {
  title: "UI/CommitGraph",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const LinearHistory: Story = {
  render: () => <LinearHistoryRender />,
};

export const WithTags: Story = {
  render: () => <WithTagsRender />,
};
