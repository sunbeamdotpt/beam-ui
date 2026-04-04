import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithoutTitle as WithoutTitleRender, RichContent as RichContentRender } from "@sunbeam/beam-ui/components/ui/popover.story";

const meta: Meta = {
  title: "UI/Popover",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const WithoutTitle: Story = {
  render: () => <WithoutTitleRender />,
};

export const RichContent: Story = {
  render: () => <RichContentRender />,
};
