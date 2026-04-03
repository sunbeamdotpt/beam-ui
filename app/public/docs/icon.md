# Icon

> Material Symbols icon wrapper with accessibility support.

> **[View rendered page](https://design.sunbeam.pt/components/icon?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Icon } from "@sunbeam/beam-ui/components/ui/icon"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| name | `string` | Yes | Material Symbols icon name |
| size | `number | string` | No | Icon size in px |
| filled | `boolean` | No | Use filled icon variant |
| label | `string` | No | Accessible label (sets role=img) |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<Icon name="settings" size={24} filled />
```

## Features
- Uses Material Symbols Outlined
- Auto aria-hidden when no label provided
- Supports filled/outlined toggle via font variation settings

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
