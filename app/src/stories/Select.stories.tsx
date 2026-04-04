import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Disabled as DisabledRender, CustomPlaceholder as CustomPlaceholderRender, ManyOptions as ManyOptionsRender } from "@sunbeam/beam-ui/components/ui/select.story";

const meta: Meta = {
  title: "UI/Select",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Disabled: Story = {
  render: () => <DisabledRender />,
};

export const CustomPlaceholder: Story = {
  render: () => <CustomPlaceholderRender />,
};

export const ManyOptions: Story = {
  render: () => <ManyOptionsRender />,
};
