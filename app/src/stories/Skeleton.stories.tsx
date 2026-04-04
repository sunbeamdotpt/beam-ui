import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { TextVariant as TextVariantRender, CircleVariant as CircleVariantRender, RectVariant as RectVariantRender, SingleLine as SingleLineRender, LargeCircle as LargeCircleRender } from "@sunbeam/beam-ui/components/ui/skeleton.story";

const meta: Meta = {
  title: "UI/Skeleton",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const TextVariant: Story = {
  render: () => <TextVariantRender />,
};

export const CircleVariant: Story = {
  render: () => <CircleVariantRender />,
};

export const RectVariant: Story = {
  render: () => <RectVariantRender />,
};

export const SingleLine: Story = {
  render: () => <SingleLineRender />,
};

export const LargeCircle: Story = {
  render: () => <LargeCircleRender />,
};
