import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SingleSection as SingleSectionRender, ManySections as ManySectionsRender } from "@sunbeam/beam-ui/components/shell/sidebar.story";

const meta: Meta = {
  title: "Shell/Sidebar",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SingleSection: Story = {
  render: () => <SingleSectionRender />,
};

export const ManySections: Story = {
  render: () => <ManySectionsRender />,
};
