# Callout

> Highlighted information block for tips, warnings, and info notices.

> **[View rendered page](https://design.sunbeam.pt/components/callout?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Callout } from "@sunbeam/beam-ui/components/ui/callout"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | Yes | Callout content |
| variant | `"tip" | "warning" | "info"` | No | Visual variant with icon and border color |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<Callout variant="tip">Use keyboard shortcuts for faster navigation.</Callout>
```

## Variants
- tip: Orange border with lightbulb icon
- warning: Gold border with warning icon
- info: Sunshine border with info icon

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
