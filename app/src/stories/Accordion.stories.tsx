import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Single as SingleRender, AllExpanded as AllExpandedRender } from "@sunbeam/beam-ui/components/ui/accordion.story";

const meta: Meta = {
  title: "UI/Accordion",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Single: Story = {
  render: () => <SingleRender />,
};

export const AllExpanded: Story = {
  render: () => <AllExpandedRender />,
};
