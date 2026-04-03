# WorkItemList

> WorkItemList component.

> **[View rendered page](https://design.sunbeam.pt/components/work-item-list?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { WorkItemList } from "@sunbeam/beam-ui/components/ui/work-item-list"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `WorkItemRow[]` | Yes |  |
| selected | `Set<string>` | No |  |
| onSelect | `(selected: Set<string>) => void` | No |  |
| selectable | `boolean` | No |  |
| onLoadMore | `() => void` | No |  |
| className | `string` | No |  |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
