# MilestonePicker

> Single-select popover for milestones with progress indicators.

> **[View rendered page](https://design.sunbeam.pt/components/milestone-picker?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { MilestonePicker } from "@sunbeam/beam-ui/components/ui/milestone-picker"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| options | `MilestoneOption[]` | Yes | Available milestones with id, title, dueDate, progress, open, closed |
| selected | `string | null` | Yes | Selected milestone ID |
| onChange | `(selected: string | null) => void` | Yes | Selection change handler |
| placeholder | `string` | No | Trigger placeholder text |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<MilestonePicker options={milestones} selected={milestoneId} onChange={setMilestoneId} />
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
