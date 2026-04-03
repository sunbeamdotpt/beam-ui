# ProgressBar

> Determinate progress indicator built on Ark UI with size and color variants.

> **[View rendered page](https://design.sunbeam.pt/components/progress-bar?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { ProgressBar } from "@sunbeam/beam-ui/components/ui/progress-bar"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `number` | Yes | Progress value (0-100) |
| variant | `"default" | "success" | "error"` | No | Color variant |
| showLabel | `boolean` | No | Show percentage label |
| size | `"sm" | "md"` | No | Track height |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<ProgressBar value={75} variant="success" showLabel />
```

## Variants
- default: Orange fill
- success: Gold fill
- error: Flame fill

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
