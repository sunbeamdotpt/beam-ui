import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { IconVariant as IconVariantRender, SwitchVariant as SwitchVariantRender, PillVariant as PillVariantRender } from "@sunbeam/beam-ui/components/ui/theme-toggle.story";

const meta: Meta = {
  title: "UI/ThemeToggle",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const IconVariant: Story = {
  render: () => <IconVariantRender />,
};

export const SwitchVariant: Story = {
  render: () => <SwitchVariantRender />,
};

export const PillVariant: Story = {
  render: () => <PillVariantRender />,
};
