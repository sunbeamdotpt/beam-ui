import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SimpleMenu as SimpleMenuRender, WithDangerItem as WithDangerItemRender } from "@sunbeam/beam-ui/components/ui/context-menu.story";

const meta: Meta = {
  title: "UI/ContextMenu",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SimpleMenu: Story = {
  render: () => <SimpleMenuRender />,
};

export const WithDangerItem: Story = {
  render: () => <WithDangerItemRender />,
};
