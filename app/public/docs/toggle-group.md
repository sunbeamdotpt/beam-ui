# ToggleGroup

> Option for {@link ToggleGroup}. */
interface ToggleGroupOption {
  /** Unique identifier for the option. */
  value: string;
  /** Display label. */
  label: string;
}

/** Props for {@link ToggleGroup}. */
export interface ToggleGroupProps {
  /** Array of toggle options with value and label. */
  items: ToggleGroupOption[];
  /** Currently selected option value. */
  value: string;
  /** Called when an option is clicked with its value. */
  onChange: (value: string) => void;
  /** Optional CSS class applied to the root container. */
  className?: string;
}

/** Radio-style toggle group using Ark UI primitives with borderless button layout. Single-select; only one option can be active at a time. * @example ```tsx const [view, setView] = useState("grid"); <ToggleGroup items={[ { value: "grid", label: "Grid" }, { value: "list", label: "List" }, ]} value={view} onChange={setView} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/toggle-group?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { ToggleGroup } from "@sunbeam/beam-ui/components/ui/toggle-group"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `ToggleGroupOption[]` | Yes | Array of toggle options with value and label. |
| value | `string` | Yes | Currently selected option value. |
| onChange | `(value: string) => void` | Yes | Called when an option is clicked with its value. |
| className | `string` | No | Optional CSS class applied to the root container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
