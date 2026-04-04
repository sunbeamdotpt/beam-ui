import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { UserProfile as UserProfileRender } from "@sunbeam/beam-ui/components/ui/hover-card.story";

const meta: Meta = {
  title: "UI/HoverCard",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const UserProfile: Story = {
  render: () => <UserProfileRender />,
};
