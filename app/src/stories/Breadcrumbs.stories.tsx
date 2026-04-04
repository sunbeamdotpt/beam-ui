import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SingleItem as SingleItemRender, DeepPath as DeepPathRender } from "@sunbeam/beam-ui/components/shell/breadcrumbs.story";

const meta: Meta = {
  title: "Shell/Breadcrumbs",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SingleItem: Story = {
  render: () => <SingleItemRender />,
};

export const DeepPath: Story = {
  render: () => <DeepPathRender />,
};
