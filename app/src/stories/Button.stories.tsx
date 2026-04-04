import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Primary as PrimaryRender, Dark as DarkRender, Cream as CreamRender, Ghost as GhostRender, Text as TextRender, Disabled as DisabledRender, DisabledDark as DisabledDarkRender, DisabledCream as DisabledCreamRender, DisabledGhost as DisabledGhostRender, AsLink as AsLinkRender, SubmitType as SubmitTypeRender, ResetType as ResetTypeRender } from "@sunbeam/beam-ui/components/ui/button.story";

const meta: Meta = {
  title: "UI/Button",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Primary: Story = {
  render: () => <PrimaryRender />,
};

export const Dark: Story = {
  render: () => <DarkRender />,
};

export const Cream: Story = {
  render: () => <CreamRender />,
};

export const Ghost: Story = {
  render: () => <GhostRender />,
};

export const Text: Story = {
  render: () => <TextRender />,
};

export const Disabled: Story = {
  render: () => <DisabledRender />,
};

export const DisabledDark: Story = {
  render: () => <DisabledDarkRender />,
};

export const DisabledCream: Story = {
  render: () => <DisabledCreamRender />,
};

export const DisabledGhost: Story = {
  render: () => <DisabledGhostRender />,
};

export const AsLink: Story = {
  render: () => <AsLinkRender />,
};

export const SubmitType: Story = {
  render: () => <SubmitTypeRender />,
};

export const ResetType: Story = {
  render: () => <ResetTypeRender />,
};
