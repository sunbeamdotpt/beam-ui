# Checkbox

> Checkbox input with label, indeterminate state, and Beam styling.

> **[View rendered page](https://design.sunbeam.pt/components/checkbox?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Checkbox } from "@sunbeam/beam-ui/components/ui/checkbox"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| checked | `boolean` | Yes | Checked state |
| onChange | `(checked: boolean) => void` | Yes | Change handler |
| label | `string` | No | Label text |
| disabled | `boolean` | No | Disable the checkbox |
| indeterminate | `boolean` | No | Show indeterminate state |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<Checkbox checked={isChecked} onChange={setChecked} label="Accept terms" />
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
