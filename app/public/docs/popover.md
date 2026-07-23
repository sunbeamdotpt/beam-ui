# Popover

> Props for {@link Popover}. */
export interface PopoverProps {
  /** Element or text that triggers the popover on click. */
  trigger: ReactNode;
  /** Content displayed inside the popover body. */
  children: ReactNode;
  /** Optional header title. */
  title?: string;
  /** Additional CSS class. */
  className?: string;
}

/** Floating popover with trigger, optional title, and close button using Ark UI. Opens on trigger click, closes on outside click or close button. * @example ```tsx <Popover trigger={<button type="button">Info</button>} title="Help"> <p>Additional information here</p> </Popover> ```

> **[View rendered page](https://design.sunbeam.pt/components/popover?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Popover } from "@sunbeam/beam-ui/components/ui/popover"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| trigger | `ReactNode` | Yes | Element or text that triggers the popover on click. |
| children | `ReactNode` | Yes | Content displayed inside the popover body. |
| title | `string` | No | Optional header title. |
| className | `string` | No | Additional CSS class. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
