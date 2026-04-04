import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Disabled as DisabledRender, EmptyState as EmptyStateRender } from "@sunbeam/beam-ui/components/ui/combobox.story";

const meta: Meta = {
  title: "UI/Combobox",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Disabled: Story = {
  render: () => <DisabledRender />,
};

export const EmptyState: Story = {
  render: () => <EmptyStateRender />,
};
