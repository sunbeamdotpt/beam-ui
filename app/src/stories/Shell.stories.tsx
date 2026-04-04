import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithoutThemeToggle as WithoutThemeToggleRender, WithHeaderActions as WithHeaderActionsRender } from "@sunbeam/beam-ui/components/shell/shell.story";

const meta: Meta = {
  title: "Shell/Shell",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const WithoutThemeToggle: Story = {
  render: () => <WithoutThemeToggleRender />,
};

export const WithHeaderActions: Story = {
  render: () => <WithHeaderActionsRender />,
};
