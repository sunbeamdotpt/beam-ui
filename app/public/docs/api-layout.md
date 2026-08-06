# ApiLayout

> CSS class for API layout's left content panel (55% width on desktop). */
export const apiLeftPanel: string = css({
  width: { base: "100%", lg: "55%" },
  overflowY: "auto",
  bg: "bg.page",
  paddingInline: "6",
});

/** CSS class for API layout's right panel (45% width on desktop, dark background). */
export const apiRightPanel: string = css({
  width: { base: "100%", lg: "45%" },
  overflowY: "auto",
  bg: "sunbeam.black",
  color: "white",
});

/** Props for {@link ApiLayout}. */
export interface ApiLayoutProps {
  /** Page content. */
  children: ReactNode;
  /** Current path used to compute active sidebar item. */
  currentPath?: string;
  /** Component used to render links. Defaults to a plain `<a>`. */
  linkAs?: LinkComponent;
}

/** Two-column layout for API documentation. Sidebar on the left (hidden on mobile), split main content area with left panel for prose and right panel for code examples. * @example ```tsx <ApiLayout currentPath="/api/chat"> <MyApiPage /> </ApiLayout> ```

> **[View rendered page](https://design.sunbeam.pt/layouts/api-layout?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { ApiLayout } from "@sunbeam/beam-ui/components/layouts/api-layout"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | Yes | Page content. |
| currentPath | `string` | No | Current path used to compute active sidebar item. |
| linkAs | `LinkComponent` | No | Component used to render links. Defaults to a plain `<a>`. |

## Also Exports
- `apiLeftPanel`
- `apiRightPanel`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
