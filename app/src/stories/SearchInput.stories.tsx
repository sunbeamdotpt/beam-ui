import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithCustomClass as WithCustomClassRender } from "@sunbeam/beam-ui/components/ui/search-input.story";

const meta: Meta = {
  title: "UI/SearchInput",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const WithCustomClass: Story = {
  render: () => <WithCustomClassRender />,
};
