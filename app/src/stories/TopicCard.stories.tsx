import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SingleCard as SingleCardRender, WithoutHref as WithoutHrefRender } from "@sunbeam/beam-ui/components/ui/topic-card.story";

const meta: Meta = {
  title: "UI/TopicCard",
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

export const WithoutHref: Story = {
  render: () => <WithoutHrefRender />,
};
