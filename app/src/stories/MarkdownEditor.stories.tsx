import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Empty as EmptyRender, TallEditor as TallEditorRender } from "@sunbeam/beam-ui/components/ui/markdown-editor.story";

const meta: Meta = {
  title: "UI/MarkdownEditor",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Empty: Story = {
  render: () => <EmptyRender />,
};

export const TallEditor: Story = {
  render: () => <TallEditorRender />,
};
