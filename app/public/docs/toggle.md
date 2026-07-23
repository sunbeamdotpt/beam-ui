# Toggle

> Props for {@link Toggle}. */
export interface ToggleProps {
  /** Whether the toggle is currently pressed (active). */
  pressed: boolean;
  /** Called when the toggle is clicked with the new pressed state. */
  onChange: (pressed: boolean) => void;
  /** Content displayed inside the button (text, icon, or both). */
  children: ReactNode;
  /** Optional CSS class applied to the button. */
  className?: string;
}

/** Button-style toggle using Ark UI that tracks pressed state. Changes appearance when active; fires onChange when clicked. * @example ```tsx const [bold, setBold] = useState(false); <Toggle pressed={bold} onChange={setBold}> <Icon name="format_bold" size={18} /> </Toggle> ```

> **[View rendered page](https://design.sunbeam.pt/components/toggle?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Toggle } from "@sunbeam/beam-ui/components/ui/toggle"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| pressed | `boolean` | Yes | Whether the toggle is currently pressed (active). |
| onChange | `(pressed: boolean) => void` | Yes | Called when the toggle is clicked with the new pressed state. |
| children | `ReactNode` | Yes | Content displayed inside the button (text, icon, or both). |
| className | `string` | No | Optional CSS class applied to the button. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
