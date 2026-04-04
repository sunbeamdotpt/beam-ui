import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { Featured as FeaturedRender, Premier as PremierRender, Verified as VerifiedRender, Partner as PartnerRender, Community as CommunityRender, Stable as StableRender, New as NewRender, Beta as BetaRender, Preview as PreviewRender, Experimental as ExperimentalRender, Deprecated as DeprecatedRender, Open as OpenRender, Draft as DraftRender, Review as ReviewRender, Approved as ApprovedRender, Merged as MergedRender, Closed as ClosedRender, Revision as RevisionRender, Critical as CriticalRender, High as HighRender, Medium as MediumRender, Low as LowRender, Section as SectionRender, AllTier as AllTierRender, AllReleaseStage as AllReleaseStageRender, AllWorkStatus as AllWorkStatusRender, AllPriority as AllPriorityRender } from "@sunbeam/beam-ui/components/ui/badge.story";

const meta: Meta = {
  title: "UI/Badge",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const Featured: Story = {
  render: () => <FeaturedRender />,
};

export const Premier: Story = {
  render: () => <PremierRender />,
};

export const Verified: Story = {
  render: () => <VerifiedRender />,
};

export const Partner: Story = {
  render: () => <PartnerRender />,
};

export const Community: Story = {
  render: () => <CommunityRender />,
};

export const Stable: Story = {
  render: () => <StableRender />,
};

export const New: Story = {
  render: () => <NewRender />,
};

export const Beta: Story = {
  render: () => <BetaRender />,
};

export const Preview: Story = {
  render: () => <PreviewRender />,
};

export const Experimental: Story = {
  render: () => <ExperimentalRender />,
};

export const Deprecated: Story = {
  render: () => <DeprecatedRender />,
};

export const Open: Story = {
  render: () => <OpenRender />,
};

export const Draft: Story = {
  render: () => <DraftRender />,
};

export const Review: Story = {
  render: () => <ReviewRender />,
};

export const Approved: Story = {
  render: () => <ApprovedRender />,
};

export const Merged: Story = {
  render: () => <MergedRender />,
};

export const Closed: Story = {
  render: () => <ClosedRender />,
};

export const Revision: Story = {
  render: () => <RevisionRender />,
};

export const Critical: Story = {
  render: () => <CriticalRender />,
};

export const High: Story = {
  render: () => <HighRender />,
};

export const Medium: Story = {
  render: () => <MediumRender />,
};

export const Low: Story = {
  render: () => <LowRender />,
};

export const Section: Story = {
  render: () => <SectionRender />,
};

export const AllTier: Story = {
  render: () => <AllTierRender />,
};

export const AllReleaseStage: Story = {
  render: () => <AllReleaseStageRender />,
};

export const AllWorkStatus: Story = {
  render: () => <AllWorkStatusRender />,
};

export const AllPriority: Story = {
  render: () => <AllPriorityRender />,
};
