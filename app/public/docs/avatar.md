# Avatar

> Avatar component.

> **[View rendered page](https://design.sunbeam.pt/components/avatar?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Avatar } from "@sunbeam/beam-ui/components/ui/avatar"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| name | `string` | Yes | Person's name (used for initials fallback and accessibility). |
| src | `string` | No | Image URL; if omitted, renders initials on a colored background. |
| size | `"sm" | "md" | "lg"` | No | Avatar size. Defaults to `"md"` (40px). |
| className | `string` | No | Additional Panda CSS classes. |
| style | `CSSProperties` | No | Inline styles applied to the root element. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
