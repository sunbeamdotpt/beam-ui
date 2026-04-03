# KanbanCardDetail

> KanbanCardDetail component.

> **[View rendered page](https://design.sunbeam.pt/components/kanban-card-detail?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { KanbanCardDetail } from "@sunbeam/beam-ui/components/ui/kanban-card-detail"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| card | `KanbanCardData` | Yes |  |
| open | `boolean` | Yes |  |
| onClose | `() => void` | Yes |  |
| onSave | `(card: KanbanCardData) => void` | No |  |
| onDelete | `(id: string) => void` | No |  |
| readOnly | `boolean` | No |  |
| className | `string` | No |  |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
