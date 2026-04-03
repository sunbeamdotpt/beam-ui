# Table

> Data table with sortable columns, row selection, and accessible caption.

> **[View rendered page](https://design.sunbeam.pt/components/table?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Table } from "@sunbeam/beam-ui/components/ui/table"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| columns | `Column[]` | Yes | Column definitions with key, label, sortable, width |
| rows | `Record<string, any>[]` | Yes | Row data array |
| onSort | `(key: string, dir: "asc" | "desc") => void` | No | Sort handler |
| selectable | `boolean` | No | Enable row selection checkboxes |
| onSelect | `(selectedKeys: string[]) => void` | No | Selection change handler |
| rowKey | `string` | No | Key field for row identity (default: "id") |
| caption | `string` | No | Accessible table caption |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<Table
  columns={[{ key: "name", label: "Name", sortable: true }]}
  rows={[{ id: "1", name: "Item" }]}
/>
```

## Features
- Sortable columns with direction indicators
- Select-all and per-row checkboxes
- Visually hidden accessible caption

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
