import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Empty as EmptyRender, WithLongText as WithLongTextRender } from "@sunbeam/beam-ui/components/ui/editable.story";

const meta: Meta = {
  title: "UI/Editable",
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

export const WithLongText: Story = {
  render: () => <WithLongTextRender />,
};
