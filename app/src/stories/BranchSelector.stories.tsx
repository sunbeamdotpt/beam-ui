import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { OnTag as OnTagRender, WithoutCreateBranch as WithoutCreateBranchRender } from "@sunbeam/beam-ui/components/ui/branch-selector.story";

const meta: Meta = {
  title: "UI/BranchSelector",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const OnTag: Story = {
  render: () => <OnTagRender />,
};

export const WithoutCreateBranch: Story = {
  render: () => <WithoutCreateBranchRender />,
};
