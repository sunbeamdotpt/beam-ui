# NotificationItem

> A single notification in the notification center. */
export interface Notification {
  /** Unique notification identifier. */
  id: string;
  /** Material Symbol icon name (e.g., from {@link notificationIcons}). */
  icon?: string;
  /** Primary notification text. */
  title: string;
  /** Grouping key — notifications are grouped by this value (e.g., repo name, app name, channel). */
  group?: string;
  /** Secondary text — sender, channel, etc. */
  subtitle?: string;
  /** Human-readable timestamp. */
  timestamp?: string;
  /** Whether the notification has been marked as read. */
  read: boolean;
  /** Optional action URL. */
  href?: string;
  /** Any additional metadata the consumer wants to attach. */
  meta?: Record<string, unknown>;
}

/** Props for {@link NotificationCenter}. */
export interface NotificationCenterProps {
  /** Array of notifications to display. */
  notifications: Notification[];
  /** Called when user marks a single notification as read. */
  onMarkRead: (id: string) => void;
  /** Called when user clicks "Mark all as read" button. */
  onMarkAllRead: () => void;
  /** Optional callback when user clicks a notification. */
  onClickNotification?: (notification: Notification) => void;
  /** Header title. Defaults to `"Notifications"`. */
  title?: string;
  /** Trigger icon name. Defaults to `"notifications"`. */
  triggerIcon?: string;
  /** If true, groups are collapsible with unread count badges. Defaults to `false`. */
  collapsibleGroups?: boolean;
  /** Optional CSS class for the trigger button. */
  className?: string;
}

/** Built-in icon suggestions for common notification types */
export const notificationIcons = {
  // Code forge
  issue: "bug_report",
  pr: "merge",
  release: "new_releases",
  mention: "alternate_email",
  review: "rate_review",
  commit: "commit",
  // Communication
  email: "mail",
  chat: "chat",
  dm: "forum",
  // Calendar
  event: "event",
  reminder: "alarm",
  // Storage
  upload: "cloud_upload",
  share: "share",
  // System
  security: "security",
  update: "system_update",
  warning: "warning",
  info: "info",
} as const;

/** Standalone notification row — usable outside the {@link NotificationCenter} dropdown. Displays icon, title, subtitle, timestamp, and optional read-mark button. * @example ```tsx <NotificationItem notification={notif} onMarkRead={(id) => markAsRead(id)} onClick={(notif) => openNotification(notif)} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/notification-center?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { NotificationItem } from "@sunbeam/beam-ui/components/ui/notification-center"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| notifications | `Notification[]` | Yes | Array of notifications to display. |
| onMarkRead | `(id: string) => void` | Yes | Called when user marks a single notification as read. |
| onMarkAllRead | `() => void` | Yes | Called when user clicks "Mark all as read" button. |
| onClickNotification | `(notification: Notification) => void` | No | Optional callback when user clicks a notification. |
| title | `string` | No | Header title. Defaults to `"Notifications"`. |
| triggerIcon | `string` | No | Trigger icon name. Defaults to `"notifications"`. |
| collapsibleGroups | `boolean` | No | If true, groups are collapsible with unread count badges. Defaults to `false`. |
| className | `string` | No | Optional CSS class for the trigger button. |

## Also Exports
- `NotificationCenter`
- `notificationIcons`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
