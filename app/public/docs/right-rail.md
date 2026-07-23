# RightRail

> Props for {@link RightRail}. */
export interface RightRailProps {
  /** Table-of-contents items: each must correspond to a section heading with a matching `id`. */
  items: Array<{ label: string; id: string }>;
  /** Optional timestamp (e.g., "May 1, 2026") shown at the bottom. */
  lastUpdated?: string;
}

/** Sticky right-side navigation panel showing an on-page table of contents with smooth scroll-to and active-section tracking. Includes utility actions (copy link, copy as markdown, report issue). * @example ```tsx <RightRail items={[ { label: "Installation", id: "installation" }, { label: "Usage", id: "usage" } ]} lastUpdated="May 1, 2026" /> ```

> **[View rendered page](https://design.sunbeam.pt/shell/right-rail?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { RightRail } from "@sunbeam/beam-ui/components/shell/right-rail"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `Array<{ label: string` | Yes | Table-of-contents items: each must correspond to a section heading with a matching `id`. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
