# HoverCard

> Props for {@link HoverCard}. */
export interface HoverCardProps {
  /** Content that triggers the hover card on mouse hover. */
  trigger: ReactNode;
  /** Content displayed in the popover when hovering. */
  children: ReactNode;
  /** Optional CSS class for the popover content container. */
  className?: string;
}

/** Popover that appears on hover with a 300ms open delay and 100ms close delay. * @example ```tsx <HoverCard trigger={<span>Hover me</span>}> <p>This appears on hover</p> </HoverCard> ```

> **[View rendered page](https://design.sunbeam.pt/components/hover-card?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { HoverCard } from "@sunbeam/beam-ui/components/ui/hover-card"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| trigger | `ReactNode` | Yes | Content that triggers the hover card on mouse hover. |
| children | `ReactNode` | Yes | Content displayed in the popover when hovering. |
| className | `string` | No | Optional CSS class for the popover content container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
