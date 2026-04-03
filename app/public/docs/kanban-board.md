# KanbanCardView

> Standalone card display — usable outside the board (e.g., in lists, detail panels).

> **[View rendered page](https://design.sunbeam.pt/components/kanban-board?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { KanbanCardView } from "@sunbeam/beam-ui/components/ui/kanban-board"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| columns | `KanbanColumn[]` | Yes |  |
| onChange | `(columns: KanbanColumn[]) => void` | Yes |  |
| onAddCard | `(columnId: string) => void` | No |  |
| className | `string` | No |  |

## Also Exports
- `KanbanBoard`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
