import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { MultipleTabs as MultipleTabsRender, WithStreamToggle as WithStreamToggleRender } from "@sunbeam/beam-ui/components/ui/code-block.story";

const meta: Meta = {
  title: "UI/CodeBlock",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const MultipleTabs: Story = {
  render: () => <MultipleTabsRender />,
};

export const WithStreamToggle: Story = {
  render: () => <WithStreamToggleRender />,
};
