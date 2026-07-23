// @storyName NotificationCenter
import { useState } from "react";
import {
  type Notification,
  NotificationCenter,
  notificationIcons,
} from "./notification-center.tsx";

const initial: Notification[] = [
  {
    id: "1",
    icon: notificationIcons.pr,
    title: "PR #42 merged: Add dark mode support",
    group: "beam-ui",
    subtitle: "Alice",
    timestamp: "5 min ago",
    read: false,
  },
  {
    id: "2",
    icon: notificationIcons.issue,
    title: "Issue #108: Button hover state broken in Safari",
    group: "beam-ui",
    subtitle: "Bob",
    timestamp: "22 min ago",
    read: false,
  },
  {
    id: "3",
    icon: notificationIcons.mention,
    title: "Carol mentioned you in #design-system",
    group: "Slack",
    timestamp: "1 hr ago",
    read: true,
  },
  {
    id: "4",
    icon: notificationIcons.release,
    title: "v1.4.0 released",
    group: "beam-ui",
    timestamp: "3 hr ago",
    read: true,
  },
];

export default function NotificationCenterStory() {
  const [notifications, setNotifications] = useState(initial);

  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}>
      <NotificationCenter
        notifications={notifications}
        onMarkRead={markRead}
        onMarkAllRead={markAllRead}
        onClickNotification={(n) => console.log("Clicked:", n.title)}
        collapsibleGroups
      />
    </div>
  );
}

export function AllRead() {
  const allRead = initial.map((n) => ({ ...n, read: true }));
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}>
      <NotificationCenter notifications={allRead} onMarkRead={() => {}} onMarkAllRead={() => {}} />
    </div>
  );
}

export function EmptyNotifications() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}>
      <NotificationCenter notifications={[]} onMarkRead={() => {}} onMarkAllRead={() => {}} />
    </div>
  );
}
