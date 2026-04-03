# Badge

> Status indicator label for tagging content with semantic meaning.

> **[View rendered page](https://design.sunbeam.pt/components/badge?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Badge } from "@sunbeam/beam-ui/components/ui/badge"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | Yes | Badge label |
| variant | `"premier" | "open" | "beta" | "experimental" | "deprecated" | "new" | "stable" | "preview" | "community" | "partner" | "verified" | "featured" | "section"` | No | Visual variant |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<Badge variant="beta">Beta</Badge>
```

## Variants
- premier: Orange background
- open: Gold background
- beta: Yellow background
- deprecated: Muted style
- section: Section header label

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
