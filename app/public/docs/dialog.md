# Dialog

> Modal dialog with title, content area, and optional action buttons. Built on Ark UI.

> **[View rendered page](https://design.sunbeam.pt/components/dialog?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Dialog } from "@sunbeam/beam-ui/components/ui/dialog"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| open | `boolean` | Yes | Controlled open state |
| onClose | `() => void` | Yes | Close handler |
| title | `string` | Yes | Dialog heading |
| children | `ReactNode` | Yes | Dialog body content |
| actions | `ReactNode` | No | Footer action buttons |

## Usage
```tsx
<Dialog open={isOpen} onClose={() => setOpen(false)} title="Confirm">
  <p>Are you sure?</p>
</Dialog>
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
