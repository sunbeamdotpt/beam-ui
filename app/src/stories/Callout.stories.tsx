import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Tip as TipRender, Warning as WarningRender, Info as InfoRender } from "@sunbeam/beam-ui/components/ui/callout.story";

const meta: Meta = {
  title: "UI/Callout",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Tip: Story = {
  render: () => <TipRender />,
};

export const Warning: Story = {
  render: () => <WarningRender />,
};

export const Info: Story = {
  render: () => <InfoRender />,
};
