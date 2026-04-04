import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Empty as EmptyRender, ManyReactions as ManyReactionsRender } from "@sunbeam/beam-ui/components/ui/reaction-picker.story";

const meta: Meta = {
  title: "UI/ReactionPicker",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Empty: Story = {
  render: () => <EmptyRender />,
};

export const ManyReactions: Story = {
  render: () => <ManyReactionsRender />,
};
