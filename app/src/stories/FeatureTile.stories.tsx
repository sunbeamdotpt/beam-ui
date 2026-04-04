import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SingleTile as SingleTileRender } from "@sunbeam/beam-ui/components/ui/feature-tile.story";

const meta: Meta = {
  title: "UI/FeatureTile",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SingleTile: Story = {
  render: () => <SingleTileRender />,
};
