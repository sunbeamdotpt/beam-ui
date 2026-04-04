import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithoutLabel as WithoutLabelRender, ManyOptions as ManyOptionsRender } from "@sunbeam/beam-ui/components/ui/radio-group.story";

const meta: Meta = {
  title: "UI/RadioGroup",
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

export const ManyOptions: Story = {
  render: () => <ManyOptionsRender />,
};
