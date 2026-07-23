# KanbanCardView

> KanbanCardView component.

> **[View rendered page](https://design.sunbeam.pt/components/kanban-board?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { KanbanCardView } from "@sunbeam/beam-ui/components/ui/kanban-board"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| columns | `KanbanColumn[]` | Yes | Array of columns with their cards. |
| onChange | `(columns: KanbanColumn[]) => void` | Yes | Called whenever cards are reordered (within or between columns). Receives updated columns array. |
| onAddCard | `(columnId: string) => void` | No | Optional callback when user clicks "+ Add card" button for a specific column. |
| onCardClick | `(cardId: string) => void` | No | Optional callback when user clicks a card (not drag). Receives the card id. |
| className | `string` | No | Optional CSS class for the board container. |

## Also Exports
- `KanbanBoard`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
