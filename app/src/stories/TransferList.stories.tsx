import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { EmptySelected as EmptySelectedRender, AllSelected as AllSelectedRender } from "@sunbeam/beam-ui/components/ui/transfer-list.story";

const meta: Meta = {
  title: "UI/TransferList",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const EmptySelected: Story = {
  render: () => <EmptySelectedRender />,
};

export const AllSelected: Story = {
  render: () => <AllSelectedRender />,
};
