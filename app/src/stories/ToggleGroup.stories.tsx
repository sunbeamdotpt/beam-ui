import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { TwoItems as TwoItemsRender, ManyItems as ManyItemsRender } from "@sunbeam/beam-ui/components/ui/toggle-group.story";

const meta: Meta = {
  title: "UI/ToggleGroup",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const TwoItems: Story = {
  render: () => <TwoItemsRender />,
};

export const ManyItems: Story = {
  render: () => <ManyItemsRender />,
};
