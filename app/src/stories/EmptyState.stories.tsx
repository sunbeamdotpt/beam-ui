import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { WithoutAction as WithoutActionRender, WithoutDescription as WithoutDescriptionRender, WithButtonAction as WithButtonActionRender } from "@sunbeam/beam-ui/components/ui/empty-state.story";

const meta: Meta = {
  title: "UI/EmptyState",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const WithoutAction: Story = {
  render: () => <WithoutActionRender />,
};

export const WithoutDescription: Story = {
  render: () => <WithoutDescriptionRender />,
};

export const WithButtonAction: Story = {
  render: () => <WithButtonActionRender />,
};
