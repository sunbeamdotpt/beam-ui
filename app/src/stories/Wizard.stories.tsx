import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { TwoSteps as TwoStepsRender, ModalWizard as ModalWizardRender, CustomLabels as CustomLabelsRender } from "@sunbeam/beam-ui/components/ui/wizard.story";

const meta: Meta = {
  title: "UI/Wizard",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const TwoSteps: Story = {
  render: () => <TwoStepsRender />,
};

export const ModalWizard: Story = {
  render: () => <ModalWizardRender />,
};

export const CustomLabels: Story = {
  render: () => <CustomLabelsRender />,
};
