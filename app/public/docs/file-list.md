# FileList

> File browser with list/grid layouts, selection, and metadata display.

> **[View rendered page](https://design.sunbeam.pt/components/file-list?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { FileList } from "@sunbeam/beam-ui/components/ui/file-list"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `FileItem[]` | Yes | File items with id, name, type, size, modified |
| selected | `Set<string>` | Yes | Selected file IDs |
| onSelect | `(selected: Set<string>) => void` | Yes | Selection change handler |
| onOpen | `(item: FileItem) => void` | No | File/folder open handler |
| layout | `"list" | "grid"` | No | View layout mode |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<FileList items={files} selected={selectedIds} onSelect={setSelectedIds} />
```

## Features
- List and grid layouts
- File/folder type icons
- Multi-select with checkboxes
- Size and modified metadata

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
