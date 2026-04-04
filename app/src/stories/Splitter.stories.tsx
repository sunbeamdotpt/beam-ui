import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Horizontal as HorizontalRender, Vertical as VerticalRender } from "@sunbeam/beam-ui/components/ui/splitter.story";

const meta: Meta = {
  title: "UI/Splitter",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Horizontal: Story = {
  render: () => <HorizontalRender />,
};

export const Vertical: Story = {
  render: () => <VerticalRender />,
};
