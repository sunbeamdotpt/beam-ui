import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Standalone as StandaloneRender } from "@sunbeam/beam-ui/components/shell/header.story";

const meta: Meta = {
  title: "Shell/Header",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Standalone: Story = {
  render: () => <StandaloneRender />,
};
