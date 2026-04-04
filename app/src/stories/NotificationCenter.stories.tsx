import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { AllRead as AllReadRender, EmptyNotifications as EmptyNotificationsRender } from "@sunbeam/beam-ui/components/ui/notification-center.story";

const meta: Meta = {
  title: "UI/NotificationCenter",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const AllRead: Story = {
  render: () => <AllReadRender />,
};

export const EmptyNotifications: Story = {
  render: () => <EmptyNotificationsRender />,
};
