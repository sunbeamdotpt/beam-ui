import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithoutLineNumbers as WithoutLineNumbersRender, PythonCode as PythonCodeRender, WithHighlightedLines as WithHighlightedLinesRender, LightTheme as LightThemeRender, DarkTheme as DarkThemeRender } from "@sunbeam/beam-ui/components/ui/syntax-highlighter.story";

const meta: Meta = {
  title: "UI/SyntaxHighlighter",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const WithoutLineNumbers: Story = {
  render: () => <WithoutLineNumbersRender />,
};

export const PythonCode: Story = {
  render: () => <PythonCodeRender />,
};

export const WithHighlightedLines: Story = {
  render: () => <WithHighlightedLinesRender />,
};

export const LightTheme: Story = {
  render: () => <LightThemeRender />,
};

export const DarkTheme: Story = {
  render: () => <DarkThemeRender />,
};
