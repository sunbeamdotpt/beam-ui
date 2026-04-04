import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SingleCard as SingleCardRender } from "@sunbeam/beam-ui/components/ui/capability-card.story";

const meta: Meta = {
  title: "UI/CapabilityCard",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SingleCard: Story = {
  render: () => <SingleCardRender />,
};
