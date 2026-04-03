# DatePicker

> Calendar date picker built on Ark UI with day/month/year navigation.

> **[View rendered page](https://design.sunbeam.pt/components/date-picker?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { DatePicker } from "@sunbeam/beam-ui/components/ui/date-picker"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | No | Selected date value (ISO string) |
| onChange | `(value: string) => void` | No | Date change handler |
| label | `string` | No | Input label |
| placeholder | `string` | No | Input placeholder |

## Usage
```tsx
<DatePicker value={date} onChange={setDate} label="Due date" />
```

## Features
- Full calendar grid navigation
- Month and year view switching
- Keyboard accessible

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
