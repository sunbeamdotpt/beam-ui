import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithoutSelection as WithoutSelectionRender, Sortable as SortableRender, Selectable as SelectableRender, WithCaption as WithCaptionRender } from "@sunbeam/beam-ui/components/ui/table.story";

const meta: Meta = {
  title: "UI/Table",
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

export const Sortable: Story = {
  render: () => <SortableRender />,
};

export const Selectable: Story = {
  render: () => <SelectableRender />,
};

export const WithCaption: Story = {
  render: () => <WithCaptionRender />,
};
