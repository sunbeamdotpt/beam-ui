# LabelPicker

> Multi-select popover for issue/PR labels with color indicators and search.

> **[View rendered page](https://design.sunbeam.pt/components/label-picker?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { LabelPicker } from "@sunbeam/beam-ui/components/ui/label-picker"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| options | `LabelOption[]` | Yes | Available labels with id, name, color, description |
| selected | `string[]` | Yes | Selected label IDs |
| onChange | `(selected: string[]) => void` | Yes | Selection change handler |
| placeholder | `string` | No | Trigger placeholder text |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<LabelPicker options={labels} selected={selectedIds} onChange={setSelectedIds} />
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
