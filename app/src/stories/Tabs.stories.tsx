import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { DefaultVariant as DefaultVariantRender, DarkVariant as DarkVariantRender } from "@sunbeam/beam-ui/components/ui/tabs.story";

const meta: Meta = {
  title: "UI/Tabs",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const DefaultVariant: Story = {
  render: () => <DefaultVariantRender />,
};

export const DarkVariant: Story = {
  render: () => <DarkVariantRender />,
};
