import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithoutLabel as WithoutLabelRender, CustomRange as CustomRangeRender } from "@sunbeam/beam-ui/components/ui/slider.story";

const meta: Meta = {
  title: "UI/Slider",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const WithoutLabel: Story = {
  render: () => <WithoutLabelRender />,
};

export const CustomRange: Story = {
  render: () => <CustomRangeRender />,
};
