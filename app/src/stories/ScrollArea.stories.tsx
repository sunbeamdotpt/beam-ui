import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { HoverScrollbar as HoverScrollbarRender, Horizontal as HorizontalRender, AutoScrollbar as AutoScrollbarRender, VisibleScrollbar as VisibleScrollbarRender, VerticalDirection as VerticalDirectionRender, BothDirections as BothDirectionsRender } from "@sunbeam/beam-ui/components/ui/scroll-area.story";

const meta: Meta = {
  title: "UI/ScrollArea",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const HoverScrollbar: Story = {
  render: () => <HoverScrollbarRender />,
};

export const Horizontal: Story = {
  render: () => <HorizontalRender />,
};

export const AutoScrollbar: Story = {
  render: () => <AutoScrollbarRender />,
};

export const VisibleScrollbar: Story = {
  render: () => <VisibleScrollbarRender />,
};

export const VerticalDirection: Story = {
  render: () => <VerticalDirectionRender />,
};

export const BothDirections: Story = {
  render: () => <BothDirectionsRender />,
};
