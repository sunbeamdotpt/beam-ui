# KanbanBoard

> Drag-and-drop Kanban board built on dnd-kit with columns and cards.

> **[View rendered page](https://design.sunbeam.pt/components/kanban-board?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { KanbanBoard } from "@sunbeam/beam-ui/components/ui/kanban-board"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| columns | `KanbanColumn[]` | Yes | Column definitions with id, title, cardIds |
| cards | `Record<string, KanbanCard>` | Yes | Card data keyed by id |
| onMove | `(cardId: string, fromCol: string, toCol: string, index: number) => void` | No | Card move handler |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<KanbanBoard columns={cols} cards={cardMap} onMove={handleMove} />
```

## Features
- Drag-and-drop via dnd-kit
- Sortable cards within columns
- Cross-column card movement
- Card labels and assignee avatars

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
