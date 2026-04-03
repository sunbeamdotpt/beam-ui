# CommentThread

> CommentThread component.

> **[View rendered page](https://design.sunbeam.pt/components/comment-thread?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { CommentThread } from "@sunbeam/beam-ui/components/ui/comment-thread"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `(Comment | TimelineEvent)[]` | Yes |  |
| onReply | `(body: string) => void` | No |  |
| onEdit | `(id: string, body: string) => void` | No |  |
| onReaction | `(commentId: string, emoji: string) => void` | No |  |
| className | `string` | No |  |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
