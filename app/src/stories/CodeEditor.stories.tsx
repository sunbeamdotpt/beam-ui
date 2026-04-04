import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { ReadOnly as ReadOnlyRender, NoLineNumbers as NoLineNumbersRender, PythonLanguage as PythonLanguageRender, WithPlaceholder as WithPlaceholderRender } from "@sunbeam/beam-ui/components/ui/code-editor.story";

const meta: Meta = {
  title: "UI/CodeEditor",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const ReadOnly: Story = {
  render: () => <ReadOnlyRender />,
};

export const NoLineNumbers: Story = {
  render: () => <NoLineNumbersRender />,
};

export const PythonLanguage: Story = {
  render: () => <PythonLanguageRender />,
};

export const WithPlaceholder: Story = {
  render: () => <WithPlaceholderRender />,
};
