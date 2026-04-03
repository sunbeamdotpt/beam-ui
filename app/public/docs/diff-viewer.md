# DiffViewer

> Side-by-side or unified diff viewer for code review.

> **[View rendered page](https://design.sunbeam.pt/components/diff-viewer?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { DiffViewer } from "@sunbeam/beam-ui/components/ui/diff-viewer"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| hunks | `DiffHunk[]` | Yes | Diff hunks with header and lines |
| oldFileName | `string` | No | Original file name |
| newFileName | `string` | No | New file name |
| mode | `"unified" | "split"` | No | View mode |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<DiffViewer hunks={diffHunks} oldFileName="old.ts" newFileName="new.ts" mode="split" />
```

## Features
- Unified and split view modes
- Line number gutters
- Add/remove/context line coloring

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
