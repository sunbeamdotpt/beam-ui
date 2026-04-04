import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { On as OnRender, Off as OffRender, Disabled as DisabledRender, DisabledChecked as DisabledCheckedRender, WithoutLabel as WithoutLabelRender } from "@sunbeam/beam-ui/components/ui/switch.story";

const meta: Meta = {
  title: "UI/Switch",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const On: Story = {
  render: () => <OnRender />,
};

export const Off: Story = {
  render: () => <OffRender />,
};

export const Disabled: Story = {
  render: () => <DisabledRender />,
};

export const DisabledChecked: Story = {
  render: () => <DisabledCheckedRender />,
};

export const WithoutLabel: Story = {
  render: () => <WithoutLabelRender />,
};
