import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SimpleText as SimpleTextRender, CodeOnly as CodeOnlyRender, TableContent as TableContentRender } from "@sunbeam/beam-ui/components/ui/markdown-renderer.story";

const meta: Meta = {
  title: "UI/MarkdownRenderer",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SimpleText: Story = {
  render: () => <SimpleTextRender />,
};

export const CodeOnly: Story = {
  render: () => <CodeOnlyRender />,
};

export const TableContent: Story = {
  render: () => <TableContentRender />,
};
