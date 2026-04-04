import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithoutLabel as WithoutLabelRender, CustomPresets as CustomPresetsRender } from "@sunbeam/beam-ui/components/ui/color-picker.story";

const meta: Meta = {
  title: "UI/ColorPicker",
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

export const CustomPresets: Story = {
  render: () => <CustomPresetsRender />,
};
