import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SingleRow as SingleRowRender } from "@sunbeam/beam-ui/components/ui/model-row.story";

const meta: Meta = {
  title: "UI/ModelRow",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SingleRow: Story = {
  render: () => <SingleRowRender />,
};
