# Tabs

> Navigation tabs built on Ark UI with default and dark variants.

> **[View rendered page](https://design.sunbeam.pt/components/tabs?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Tabs } from "@sunbeam/beam-ui/components/ui/tabs"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `TabItem[]` | Yes | Tab items with value and label |
| activeValue | `string` | Yes | Currently active tab value |
| onChange | `(value: string) => void` | Yes | Tab change handler |
| variant | `"default" | "dark"` | No | Visual style |

## Usage
```tsx
<Tabs items={[{ value: "a", label: "Tab A" }]} activeValue="a" onChange={setTab} />
```

## Variants
- default: Light underline style
- dark: Dark background style

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
