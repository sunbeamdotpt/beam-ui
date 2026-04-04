import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { DefaultVariant as DefaultVariantRender, CompactVariant as CompactVariantRender, BorderedVariant as BorderedVariantRender, Ordered as OrderedRender, Unordered as UnorderedRender, WithDescriptions as WithDescriptionsRender, WithIcons as WithIconsRender, OrderedCompact as OrderedCompactRender, OrderedBordered as OrderedBorderedRender } from "@sunbeam/beam-ui/components/ui/list.story";

const meta: Meta = {
  title: "UI/List",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const DefaultVariant: Story = {
  render: () => <DefaultVariantRender />,
};

export const CompactVariant: Story = {
  render: () => <CompactVariantRender />,
};

export const BorderedVariant: Story = {
  render: () => <BorderedVariantRender />,
};

export const Ordered: Story = {
  render: () => <OrderedRender />,
};

export const Unordered: Story = {
  render: () => <UnorderedRender />,
};

export const WithDescriptions: Story = {
  render: () => <WithDescriptionsRender />,
};

export const WithIcons: Story = {
  render: () => <WithIconsRender />,
};

export const OrderedCompact: Story = {
  render: () => <OrderedCompactRender />,
};

export const OrderedBordered: Story = {
  render: () => <OrderedBorderedRender />,
};
