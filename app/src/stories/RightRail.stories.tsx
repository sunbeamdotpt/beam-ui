import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { FewItems as FewItemsRender, ManyItems as ManyItemsRender } from "@sunbeam/beam-ui/components/shell/right-rail.story";

const meta: Meta = {
  title: "Shell/RightRail",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const FewItems: Story = {
  render: () => <FewItemsRender />,
};

export const ManyItems: Story = {
  render: () => <ManyItemsRender />,
};
