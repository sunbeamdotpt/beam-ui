import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Inline as InlineRender, DisplayMode as DisplayModeRender, Matrix as MatrixRender } from "@sunbeam/beam-ui/components/ui/math-renderer.story";

const meta: Meta = {
  title: "UI/MathRenderer",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Inline: Story = {
  render: () => <InlineRender />,
};

export const DisplayMode: Story = {
  render: () => <DisplayModeRender />,
};

export const Matrix: Story = {
  render: () => <MatrixRender />,
};
