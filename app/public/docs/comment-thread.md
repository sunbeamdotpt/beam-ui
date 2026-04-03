# CommentThread

> Threaded comment display with markdown rendering, reactions, and timeline events.

> **[View rendered page](https://design.sunbeam.pt/components/comment-thread?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { CommentThread } from "@sunbeam/beam-ui/components/ui/comment-thread"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| comments | `Comment[]` | Yes | Comment objects with author, body, reactions |
| events | `TimelineEvent[]` | No | Timeline events (labels, merges, etc.) |
| onAddComment | `(body: string) => void` | No | New comment handler |
| onReact | `(commentId: string, emoji: string) => void` | No | Reaction handler |
| currentUser | `object` | No | Current user for reply form |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<CommentThread comments={comments} onAddComment={handleAdd} />
```

## Features
- Markdown-rendered comment bodies
- Emoji reactions
- Timeline events (labels, merges, etc.)
- Reply editor

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
