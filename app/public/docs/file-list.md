# FileList

> FileList component.

> **[View rendered page](https://design.sunbeam.pt/components/file-list?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { FileList } from "@sunbeam/beam-ui/components/ui/file-list"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `FileItem[]` | Yes |  |
| selected | `Set<string>` | Yes |  |
| onSelect | `(selected: Set<string>) => void` | Yes |  |
| onOpen | `(item: FileItem) => void` | No |  |
| layout | `"list" | "grid"` | No |  |
| className | `string` | No |  |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
