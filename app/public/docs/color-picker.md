# ColorPicker

> Props for {@link ColorPicker}. */
export interface ColorPickerProps {
  /** Current hex color value (e.g., `"#FF5733"`). */
  value: string;
  /** Callback fired when the user selects a color; receives the hex string. */
  onChange: (value: string) => void;
  /** Array of preset hex colors to display in the swatch grid. Defaults to a curated palette. */
  presets?: string[];
  /** Optional label shown above the color picker. */
  label?: string;
  /** Extra CSS class names to apply to the root container. */
  className?: string;
}

const DEFAULT_PRESETS = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#EAB308",
  "#84CC16",
  "#22C55E",
  "#14B8A6",
  "#06B6D4",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#A855F7",
  "#D946EF",
  "#EC4899",
  "#F43F5E",
  "#78716C",
  "#DC2626",
  "#EA580C",
  "#D97706",
  "#059669",
];

/** Popover-based color picker with hex input and preset swatches. * Displays a trigger button showing the current color; opens a popover with a preset swatch grid, live preview, and manual hex input. Only accepts valid 6-digit hex colors. * @example ```tsx <ColorPicker value={color} onChange={setColor} label="Brand Color" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/color-picker?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { ColorPicker } from "@sunbeam/beam-ui/components/ui/color-picker"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Current hex color value (e.g., `"#FF5733"`). |
| onChange | `(value: string) => void` | Yes | Callback fired when the user selects a color; receives the hex string. |
| presets | `string[]` | No | Array of preset hex colors to display in the swatch grid. Defaults to a curated palette. |
| label | `string` | No | Optional label shown above the color picker. |
| className | `string` | No | Extra CSS class names to apply to the root container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
