import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Small as SmallRender, Medium as MediumRender, Large as LargeRender, WithImage as WithImageRender, SmallWithImage as SmallWithImageRender, LargeWithImage as LargeWithImageRender, SingleName as SingleNameRender } from "@sunbeam/beam-ui/components/ui/avatar.story";

const meta: Meta = {
  title: "UI/Avatar",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Small: Story = {
  render: () => <SmallRender />,
};

export const Medium: Story = {
  render: () => <MediumRender />,
};

export const Large: Story = {
  render: () => <LargeRender />,
};

export const WithImage: Story = {
  render: () => <WithImageRender />,
};

export const SmallWithImage: Story = {
  render: () => <SmallWithImageRender />,
};

export const LargeWithImage: Story = {
  render: () => <LargeWithImageRender />,
};

export const SingleName: Story = {
  render: () => <SingleNameRender />,
};
