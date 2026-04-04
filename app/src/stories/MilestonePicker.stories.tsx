import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { NoSelection as NoSelectionRender, SingleOption as SingleOptionRender } from "@sunbeam/beam-ui/components/ui/milestone-picker.story";

const meta: Meta = {
  title: "UI/MilestonePicker",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const NoSelection: Story = {
  render: () => <NoSelectionRender />,
};

export const SingleOption: Story = {
  render: () => <SingleOptionRender />,
};
