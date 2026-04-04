import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SingleComment as SingleCommentRender, TimelineOnly as TimelineOnlyRender } from "@sunbeam/beam-ui/components/ui/comment-thread.story";

const meta: Meta = {
  title: "UI/CommentThread",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SingleComment: Story = {
  render: () => <SingleCommentRender />,
};

export const TimelineOnly: Story = {
  render: () => <TimelineOnlyRender />,
};
