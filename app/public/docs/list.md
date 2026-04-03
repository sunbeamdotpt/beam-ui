# List

> Flexible list component with icon support and multiple layout variants.

> **[View rendered page](https://design.sunbeam.pt/components/list?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { List } from "@sunbeam/beam-ui/components/ui/list"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `ListItem[]` | Yes | Array of { label, description?, icon?, href? } |
| ordered | `boolean` | No | Render as ordered list |
| variant | `"default" | "compact" | "bordered"` | No | Layout variant |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<List items={[{ label: "Item 1", icon: "star" }]} variant="bordered" />
```

## Variants
- default: Standard spacing
- compact: Tight spacing
- bordered: Items with border separators

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
