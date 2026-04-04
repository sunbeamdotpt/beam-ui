import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { ModifierKey as ModifierKeyRender, Shortcut as ShortcutRender, ArrowKeys as ArrowKeysRender, WindowsPlatform as WindowsPlatformRender, LinuxPlatform as LinuxPlatformRender, MacPlatform as MacPlatformRender } from "@sunbeam/beam-ui/components/ui/kbd.story";

const meta: Meta = {
  title: "UI/Kbd",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const ModifierKey: Story = {
  render: () => <ModifierKeyRender />,
};

export const Shortcut: Story = {
  render: () => <ShortcutRender />,
};

export const ArrowKeys: Story = {
  render: () => <ArrowKeysRender />,
};

export const WindowsPlatform: Story = {
  render: () => <WindowsPlatformRender />,
};

export const LinuxPlatform: Story = {
  render: () => <LinuxPlatformRender />,
};

export const MacPlatform: Story = {
  render: () => <MacPlatformRender />,
};
