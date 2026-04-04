import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithoutSelection as WithoutSelectionRender, EmptyList as EmptyListRender, SingleItem as SingleItemRender, Selectable as SelectableRender, WithLoadMore as WithLoadMoreRender } from "@sunbeam/beam-ui/components/ui/work-item-list.story";

const meta: Meta = {
  title: "UI/WorkItemList",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const WithoutSelection: Story = {
  render: () => <WithoutSelectionRender />,
};

export const EmptyList: Story = {
  render: () => <EmptyListRender />,
};

export const SingleItem: Story = {
  render: () => <SingleItemRender />,
};

export const Selectable: Story = {
  render: () => <SelectableRender />,
};

export const WithLoadMore: Story = {
  render: () => <WithLoadMoreRender />,
};
