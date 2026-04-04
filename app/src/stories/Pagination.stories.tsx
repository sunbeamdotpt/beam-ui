import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { FirstPage as FirstPageRender, LastPage as LastPageRender, WithPageSize as WithPageSizeRender } from "@sunbeam/beam-ui/components/ui/pagination.story";

const meta: Meta = {
  title: "UI/Pagination",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const FirstPage: Story = {
  render: () => <FirstPageRender />,
};

export const LastPage: Story = {
  render: () => <LastPageRender />,
};

export const WithPageSize: Story = {
  render: () => <WithPageSizeRender />,
};
