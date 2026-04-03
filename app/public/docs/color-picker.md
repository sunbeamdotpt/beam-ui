# ColorPicker

> Color selection popover with preset palette and hex input.

> **[View rendered page](https://design.sunbeam.pt/components/color-picker?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { ColorPicker } from "@sunbeam/beam-ui/components/ui/color-picker"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Current color hex value |
| onChange | `(value: string) => void` | Yes | Color change handler |
| presets | `string[]` | No | Custom color presets (defaults to 20 colors) |
| label | `string` | No | Input label |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<ColorPicker value={color} onChange={setColor} label="Label color" />
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
