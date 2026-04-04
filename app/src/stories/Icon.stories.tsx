import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Filled as FilledRender, WithLabel as WithLabelRender, Large as LargeRender, Small as SmallRender, CustomSize as CustomSizeRender } from "@sunbeam/beam-ui/components/ui/icon.story";

const meta: Meta = {
  title: "UI/Icon",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Filled: Story = {
  render: () => <FilledRender />,
};

export const WithLabel: Story = {
  render: () => <WithLabelRender />,
};

export const Large: Story = {
  render: () => <LargeRender />,
};

export const Small: Story = {
  render: () => <SmallRender />,
};

export const CustomSize: Story = {
  render: () => <CustomSizeRender />,
};
