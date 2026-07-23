# Switch

> Props for {@link Switch}. */
export interface SwitchProps {
  /** Checked state. */
  checked: boolean;
  /** Fired when toggled. */
  onChange: (checked: boolean) => void;
  /** Optional label beside the toggle. */
  label?: string;
  /** Disable interaction. Defaults to `false`. */
  disabled?: boolean;
  /** Additional CSS class. */
  className?: string;
}

/** Accessible toggle switch with optional label using Ark UI. Animated thumb with orange accent when checked. * @example ```tsx <Switch checked={enabled} onChange={setEnabled} label="Dark mode" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/switch?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Switch } from "@sunbeam/beam-ui/components/ui/switch"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| checked | `boolean` | Yes | Checked state. |
| onChange | `(checked: boolean) => void` | Yes | Fired when toggled. |
| label | `string` | No | Optional label beside the toggle. |
| disabled | `boolean` | No | Disable interaction. Defaults to `false`. |
| className | `string` | No | Additional CSS class. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
