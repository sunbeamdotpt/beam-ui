# EmptyState

> Placeholder for empty content areas with icon, message, and optional action.

> **[View rendered page](https://design.sunbeam.pt/components/empty-state?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { EmptyState } from "@sunbeam/beam-ui/components/ui/empty-state"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| icon | `string` | No | Material Symbols icon name |
| title | `string` | Yes | Empty state heading |
| description | `string` | No | Explanatory text |
| action | `ReactNode` | No | Action button or link |

## Usage
```tsx
<EmptyState icon="inbox" title="No items" description="Create your first item" action={<Button>Create</Button>} />
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
