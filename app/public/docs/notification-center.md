# NotificationCenter

> Popover notification list with type icons and mark-read functionality.

> **[View rendered page](https://design.sunbeam.pt/components/notification-center?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { NotificationCenter } from "@sunbeam/beam-ui/components/ui/notification-center"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| notifications | `Notification[]` | Yes | Notification objects with id, type, title, repo, timestamp, read |
| onMarkRead | `(id: string) => void` | Yes | Mark single notification read |
| onMarkAllRead | `() => void` | Yes | Mark all notifications read |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<NotificationCenter notifications={notifs} onMarkRead={markRead} onMarkAllRead={markAllRead} />
```

## Features
- Type-specific icons (issue, PR, release, mention, review)
- Unread badge count
- Mark all read action

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
