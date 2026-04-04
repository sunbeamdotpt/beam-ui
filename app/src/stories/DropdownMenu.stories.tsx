import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { FlatItems as FlatItemsRender, WithDisabledItem as WithDisabledItemRender } from "@sunbeam/beam-ui/components/ui/dropdown-menu.story";

const meta: Meta = {
  title: "UI/DropdownMenu",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const FlatItems: Story = {
  render: () => <FlatItemsRender />,
};

export const WithDisabledItem: Story = {
  render: () => <WithDisabledItemRender />,
};
