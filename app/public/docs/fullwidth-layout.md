# FullwidthLayout

> Props for {@link FullwidthLayout}. */
export interface FullwidthLayoutProps {
  /** Page content. */
  children: ReactNode;
  /** Current path used to compute active sidebar item. */
  currentPath?: string;
  /** Component used to render links. Defaults to a plain `<a>`. */
  linkAs?: LinkComponent;
}

/** Two-column layout with sidebar and full-width centered content. Sidebar hides on tablet and below. No right rail or additional columns. * @example ```tsx <FullwidthLayout currentPath="/models"> <MyPage /> </FullwidthLayout> ```

> **[View rendered page](https://design.sunbeam.pt/layouts/fullwidth-layout?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { FullwidthLayout } from "@sunbeam/beam-ui/components/layouts/fullwidth-layout"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | Yes | Page content. |
| currentPath | `string` | No | Current path used to compute active sidebar item. |
| linkAs | `LinkComponent` | No | Component used to render links. Defaults to a plain `<a>`. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
