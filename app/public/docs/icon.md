# Icon

> Props for {@link Icon}. */
export interface IconProps {
  /** Material Symbol icon name (e.g., "home", "settings", "check"). */
  name: string;
  /** Icon size in pixels or CSS unit string. If numeric, converted to `px`. */
  size?: number | string;
  /** Apply filled variant (FILL 1 font-variation). Defaults to `false`. */
  filled?: boolean;
  /** Optional CSS class for additional styling. */
  className?: string;
  /** When provided, the icon is treated as meaningful: role="img" + aria-label. Otherwise aria-hidden="true". */
  label?: string;
}

/** Material Symbol icon with optional filled variant and accessibility support. * @example ```tsx <Icon name="home" size={20} /> <Icon name="settings" filled label="Settings" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/icon?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Icon } from "@sunbeam/beam-ui/components/ui/icon"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| name | `string` | Yes | Material Symbol icon name (e.g., "home", "settings", "check"). |
| size | `number | string` | No | Icon size in pixels or CSS unit string. If numeric, converted to `px`. |
| filled | `boolean` | No | Apply filled variant (FILL 1 font-variation). Defaults to `false`. |
| className | `string` | No | Optional CSS class for additional styling. |
| label | `string` | No | When provided, the icon is treated as meaningful: role="img" + aria-label. Otherwise aria-hidden="true". |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
