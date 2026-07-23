import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { GenericContainer as GenericContainerRender, StaticOutlined as StaticOutlinedRender } from "@sunbeam/beam-ui/components/ui/card.story";

const meta: Meta = {
  title: "UI/Card",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const GenericContainer: Story = {
  render: () => <GenericContainerRender />,
};

export const StaticOutlined: Story = {
  render: () => <StaticOutlinedRender />,
};
