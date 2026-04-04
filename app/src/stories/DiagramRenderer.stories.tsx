import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SequenceDiagram as SequenceDiagramRender, PieChart as PieChartRender } from "@sunbeam/beam-ui/components/ui/diagram-renderer.story";

const meta: Meta = {
  title: "UI/DiagramRenderer",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SequenceDiagram: Story = {
  render: () => <SequenceDiagramRender />,
};

export const PieChart: Story = {
  render: () => <PieChartRender />,
};
