import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithoutLabel as WithoutLabelRender, Disabled as DisabledRender, CustomPlaceholder as CustomPlaceholderRender } from "@sunbeam/beam-ui/components/ui/date-picker.story";

const meta: Meta = {
  title: "UI/DatePicker",
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

export const Disabled: Story = {
  render: () => <DisabledRender />,
};

export const CustomPlaceholder: Story = {
  render: () => <CustomPlaceholderRender />,
};
