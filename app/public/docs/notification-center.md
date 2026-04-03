# NotificationItem

> Material Symbol icon name, or a ReactNode for custom icons */
  icon?: string;
  title: string;
  /** Grouping key — notifications are grouped by this value (e.g., repo name, app name, channel) */
  group?: string;
  /** Secondary text — timestamp, sender, channel, etc. */
  subtitle?: string;
  /** Human-readable timestamp */
  timestamp?: string;
  read: boolean;
  /** Optional action URL */
  href?: string;
  /** Any additional metadata the consumer wants to attach */
  meta?: Record<string, unknown>;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClickNotification?: (notification: Notification) => void;
  /** Header title. Defaults to "Notifications" */
  title?: string;
  /** Trigger icon. Defaults to "notifications" */
  triggerIcon?: string;
  /** Make groups collapsible with unread count badges. Defaults to false. */
  collapsibleGroups?: boolean;
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

/** Standalone notification row — usable outside the NotificationCenter dropdown.

> **[View rendered page](https://design.sunbeam.pt/components/notification-center?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { NotificationItem } from "@sunbeam/beam-ui/components/ui/notification-center"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| notifications | `Notification[]` | Yes |  |
| onMarkRead | `(id: string) => void` | Yes |  |
| onMarkAllRead | `() => void` | Yes |  |
| onClickNotification | `(notification: Notification) => void` | No |  |
| title | `string` | No | Header title. Defaults to "Notifications" |
| triggerIcon | `string` | No | Trigger icon. Defaults to "notifications" |
| collapsibleGroups | `boolean` | No | Make groups collapsible with unread count badges. Defaults to false. |
| className | `string` | No |  |

## Also Exports
- `NotificationCenter`
- `notificationIcons`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
