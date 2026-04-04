import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { LineChartOnly as LineChartOnlyRender, BarChartOnly as BarChartOnlyRender, PieChartExample as PieChartExampleRender, DonutChart as DonutChartRender, AreaChartExample as AreaChartExampleRender } from "@sunbeam/beam-ui/components/ui/charts.story";

const meta: Meta = {
  title: "UI/Charts",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const LineChartOnly: Story = {
  render: () => <LineChartOnlyRender />,
};

export const BarChartOnly: Story = {
  render: () => <BarChartOnlyRender />,
};

export const PieChartExample: Story = {
  render: () => <PieChartExampleRender />,
};

export const DonutChart: Story = {
  render: () => <DonutChartRender />,
};

export const AreaChartExample: Story = {
  render: () => <AreaChartExampleRender />,
};
