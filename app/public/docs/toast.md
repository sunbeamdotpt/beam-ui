# Toast

> Temporary notification message with auto-dismiss after 3 seconds.

> **[View rendered page](https://design.sunbeam.pt/components/toast?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Toast } from "@sunbeam/beam-ui/components/ui/toast"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| message | `string` | Yes | Toast message text |
| variant | `"success" | "error" | "info"` | No | Visual variant |
| visible | `boolean` | Yes | Visibility state |
| onDismiss | `() => void` | No | Dismiss callback |

## Usage
```tsx
<Toast message="Saved!" variant="success" visible={show} onDismiss={() => setShow(false)} />
```

## Variants
- success: Green border
- error: Red border
- info: Blue border

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
