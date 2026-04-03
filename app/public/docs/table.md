# Table

> Table component.

> **[View rendered page](https://design.sunbeam.pt/components/table?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Table } from "@sunbeam/beam-ui/components/ui/table"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| columns | `Column[]` | Yes |  |
| rows | `Array<Record<string, any>>` | Yes |  |
| onSort | `(key: string, dir: "asc" | "desc") => void` | No |  |
| selectable | `boolean` | No |  |
| onSelect | `(selectedKeys: string[]) => void` | No |  |
| rowKey | `string` | No |  |
| className | `string` | No |  |
| caption | `string` | No | Accessible caption for the table (visually hidden by default) |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
