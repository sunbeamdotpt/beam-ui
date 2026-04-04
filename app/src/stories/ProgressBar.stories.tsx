import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Success as SuccessRender, Error as ErrorRender, SmallSize as SmallSizeRender, MediumSize as MediumSizeRender, SmallDefault as SmallDefaultRender, SmallSuccess as SmallSuccessRender, SmallError as SmallErrorRender, MediumDefault as MediumDefaultRender, MediumSuccess as MediumSuccessRender, MediumError as MediumErrorRender, WithoutLabel as WithoutLabelRender, Empty as EmptyRender, Full as FullRender } from "@sunbeam/beam-ui/components/ui/progress-bar.story";

const meta: Meta = {
  title: "UI/ProgressBar",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Success: Story = {
  render: () => <SuccessRender />,
};

export const Error: Story = {
  render: () => <ErrorRender />,
};

export const SmallSize: Story = {
  render: () => <SmallSizeRender />,
};

export const MediumSize: Story = {
  render: () => <MediumSizeRender />,
};

export const SmallDefault: Story = {
  render: () => <SmallDefaultRender />,
};

export const SmallSuccess: Story = {
  render: () => <SmallSuccessRender />,
};

export const SmallError: Story = {
  render: () => <SmallErrorRender />,
};

export const MediumDefault: Story = {
  render: () => <MediumDefaultRender />,
};

export const MediumSuccess: Story = {
  render: () => <MediumSuccessRender />,
};

export const MediumError: Story = {
  render: () => <MediumErrorRender />,
};

export const WithoutLabel: Story = {
  render: () => <WithoutLabelRender />,
};

export const Empty: Story = {
  render: () => <EmptyRender />,
};

export const Full: Story = {
  render: () => <FullRender />,
};
