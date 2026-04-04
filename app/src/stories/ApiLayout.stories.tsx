import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Standalone as StandaloneRender } from "@sunbeam/beam-ui/components/layouts/api-layout.story";

const meta: Meta = {
  title: "Layout/ApiLayout",
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
