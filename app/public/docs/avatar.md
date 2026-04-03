# Avatar

> User avatar with image support and initial fallback.

> **[View rendered page](https://design.sunbeam.pt/components/avatar?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Avatar } from "@sunbeam/beam-ui/components/ui/avatar"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| name | `string` | Yes | User display name (used for initials) |
| src | `string` | No | Image URL |
| size | `"sm" | "md" | "lg"` | No | Size: sm (32px), md (40px), lg (56px) |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<Avatar name="Sienna Cruz" src="/avatar.jpg" size="md" />
```

## Variants
- sm: 32px
- md: 40px (default)
- lg: 56px

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
