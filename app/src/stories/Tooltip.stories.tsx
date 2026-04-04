import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { TopPosition as TopPositionRender, BottomPosition as BottomPositionRender, LeftPosition as LeftPositionRender, RightPosition as RightPositionRender } from "@sunbeam/beam-ui/components/ui/tooltip.story";

const meta: Meta = {
  title: "UI/Tooltip",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const TopPosition: Story = {
  render: () => <TopPositionRender />,
};

export const BottomPosition: Story = {
  render: () => <BottomPositionRender />,
};

export const LeftPosition: Story = {
  render: () => <LeftPositionRender />,
};

export const RightPosition: Story = {
  render: () => <RightPositionRender />,
};
