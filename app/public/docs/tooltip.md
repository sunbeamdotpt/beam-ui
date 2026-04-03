# Tooltip

> Hoverable tooltip overlay built on Ark UI.

> **[View rendered page](https://design.sunbeam.pt/components/tooltip?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Tooltip } from "@sunbeam/beam-ui/components/ui/tooltip"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| content | `string` | Yes | Tooltip text |
| children | `ReactNode` | Yes | Trigger element |
| position | `"top" | "bottom" | "left" | "right"` | No | Tooltip placement |

## Usage
```tsx
<Tooltip content="Settings"><Icon name="settings" /></Tooltip>
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
