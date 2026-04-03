# Switch

> Toggle switch built on Ark UI for boolean settings.

> **[View rendered page](https://design.sunbeam.pt/components/switch?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Switch } from "@sunbeam/beam-ui/components/ui/switch"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| checked | `boolean` | Yes | Checked state |
| onChange | `(checked: boolean) => void` | Yes | Change handler |
| label | `string` | No | Label text |
| disabled | `boolean` | No | Disable the switch |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<Switch checked={isDark} onChange={setIsDark} label="Dark mode" />
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
