import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Pressed as PressedRender, Unpressed as UnpressedRender } from "@sunbeam/beam-ui/components/ui/toggle.story";

const meta: Meta = {
  title: "UI/Toggle",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Pressed: Story = {
  render: () => <PressedRender />,
};

export const Unpressed: Story = {
  render: () => <UnpressedRender />,
};
