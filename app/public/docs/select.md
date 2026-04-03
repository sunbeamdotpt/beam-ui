# Select

> Dropdown select input built on Ark UI with search and custom styling.

> **[View rendered page](https://design.sunbeam.pt/components/select?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Select } from "@sunbeam/beam-ui/components/ui/select"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| options | `SelectOption[]` | Yes | Array of { value, label } options |
| value | `string` | Yes | Selected value |
| onChange | `(value: string) => void` | Yes | Change handler |
| placeholder | `string` | No | Placeholder text |
| disabled | `boolean` | No | Disable the select |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<Select options={[{ value: "a", label: "Option A" }]} value={val} onChange={setVal} />
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
