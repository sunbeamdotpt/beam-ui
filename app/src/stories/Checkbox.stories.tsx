import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Checked as CheckedRender, Unchecked as UncheckedRender, Disabled as DisabledRender, DisabledChecked as DisabledCheckedRender, Indeterminate as IndeterminateRender, WithoutLabel as WithoutLabelRender } from "@sunbeam/beam-ui/components/ui/checkbox.story";

const meta: Meta = {
  title: "UI/Checkbox",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Checked: Story = {
  render: () => <CheckedRender />,
};

export const Unchecked: Story = {
  render: () => <UncheckedRender />,
};

export const Disabled: Story = {
  render: () => <DisabledRender />,
};

export const DisabledChecked: Story = {
  render: () => <DisabledCheckedRender />,
};

export const Indeterminate: Story = {
  render: () => <IndeterminateRender />,
};

export const WithoutLabel: Story = {
  render: () => <WithoutLabelRender />,
};
