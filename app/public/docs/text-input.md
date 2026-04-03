# TextInput

> Text input field with label, error state, and multiple input types.

> **[View rendered page](https://design.sunbeam.pt/components/text-input?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { TextInput } from "@sunbeam/beam-ui/components/ui/text-input"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Input value |
| onChange | `(value: string) => void` | Yes | Change handler |
| placeholder | `string` | No | Placeholder text |
| label | `string` | No | Label text |
| error | `string` | No | Error message |
| disabled | `boolean` | No | Disable the input |
| type | `"text" | "password" | "email" | "number"` | No | HTML input type |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<TextInput value={name} onChange={setName} label="Name" placeholder="Enter name" />
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
