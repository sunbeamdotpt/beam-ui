import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { FlatNodes as FlatNodesRender, DeepNesting as DeepNestingRender } from "@sunbeam/beam-ui/components/ui/tree-view.story";

const meta: Meta = {
  title: "UI/TreeView",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const FlatNodes: Story = {
  render: () => <FlatNodesRender />,
};

export const DeepNesting: Story = {
  render: () => <DeepNestingRender />,
};
