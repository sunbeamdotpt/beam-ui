import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Small as SmallRender, Medium as MediumRender, Large as LargeRender, Accent as AccentRender, WithLabel as WithLabelRender, CustomColor as CustomColorRender } from "@sunbeam/beam-ui/components/ui/spinner.story";

const meta: Meta = {
  title: "UI/Spinner",
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

export const Accent: Story = {
  render: () => <AccentRender />,
};

export const WithLabel: Story = {
  render: () => <WithLabelRender />,
};

export const CustomColor: Story = {
  render: () => <CustomColorRender />,
};
