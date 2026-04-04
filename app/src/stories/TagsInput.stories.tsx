import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Empty as EmptyRender, WithMax as WithMaxRender, WithoutLabel as WithoutLabelRender } from "@sunbeam/beam-ui/components/ui/tags-input.story";

const meta: Meta = {
  title: "UI/TagsInput",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Empty: Story = {
  render: () => <EmptyRender />,
};

export const WithMax: Story = {
  render: () => <WithMaxRender />,
};

export const WithoutLabel: Story = {
  render: () => <WithoutLabelRender />,
};
