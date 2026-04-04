import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { LargeVariant as LargeVariantRender, HorizontalVariant as HorizontalVariantRender, SmallVariant as SmallVariantRender } from "@sunbeam/beam-ui/components/ui/bento-item.story";

const meta: Meta = {
  title: "UI/BentoItem",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const LargeVariant: Story = {
  render: () => <LargeVariantRender />,
};

export const HorizontalVariant: Story = {
  render: () => <HorizontalVariantRender />,
};

export const SmallVariant: Story = {
  render: () => <SmallVariantRender />,
};
