import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { ReadOnly as ReadOnlyRender, MinimalCard as MinimalCardRender, CriticalPriority as CriticalPriorityRender } from "@sunbeam/beam-ui/components/ui/kanban-card-detail.story";

const meta: Meta = {
  title: "UI/KanbanCardDetail",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const ReadOnly: Story = {
  render: () => <ReadOnlyRender />,
};

export const MinimalCard: Story = {
  render: () => <MinimalCardRender />,
};

export const CriticalPriority: Story = {
  render: () => <CriticalPriorityRender />,
};
