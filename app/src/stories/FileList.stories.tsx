import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { GridLayout as GridLayoutRender, BodyFont as BodyFontRender, ListLayout as ListLayoutRender, MonoFont as MonoFontRender, GridMonoFont as GridMonoFontRender, EmptyList as EmptyListRender } from "@sunbeam/beam-ui/components/ui/file-list.story";

const meta: Meta = {
  title: "UI/FileList",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const GridLayout: Story = {
  render: () => <GridLayoutRender />,
};

export const BodyFont: Story = {
  render: () => <BodyFontRender />,
};

export const ListLayout: Story = {
  render: () => <ListLayoutRender />,
};

export const MonoFont: Story = {
  render: () => <MonoFontRender />,
};

export const GridMonoFont: Story = {
  render: () => <GridMonoFontRender />,
};

export const EmptyList: Story = {
  render: () => <EmptyListRender />,
};
