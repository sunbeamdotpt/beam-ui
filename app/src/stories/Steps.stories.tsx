import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { FirstStep as FirstStepRender, LastStep as LastStepRender, TwoSteps as TwoStepsRender } from "@sunbeam/beam-ui/components/ui/steps.story";

const meta: Meta = {
  title: "UI/Steps",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const FirstStep: Story = {
  render: () => <FirstStepRender />,
};

export const LastStep: Story = {
  render: () => <LastStepRender />,
};

export const TwoSteps: Story = {
  render: () => <TwoStepsRender />,
};
