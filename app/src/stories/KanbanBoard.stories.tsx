import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { EmptyBoard as EmptyBoardRender, SingleColumn as SingleColumnRender } from "@sunbeam/beam-ui/components/ui/kanban-board.story";

const meta: Meta = {
  title: "UI/KanbanBoard",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const EmptyBoard: Story = {
  render: () => <EmptyBoardRender />,
};

export const SingleColumn: Story = {
  render: () => <SingleColumnRender />,
};
