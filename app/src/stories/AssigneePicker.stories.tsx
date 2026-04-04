import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { NoSelection as NoSelectionRender, MultipleSelected as MultipleSelectedRender } from "@sunbeam/beam-ui/components/ui/assignee-picker.story";

const meta: Meta = {
  title: "UI/AssigneePicker",
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

export const MultipleSelected: Story = {
  render: () => <MultipleSelectedRender />,
};
