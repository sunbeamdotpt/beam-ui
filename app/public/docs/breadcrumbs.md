# Breadcrumbs

> A single breadcrumb item. */
export interface BreadcrumbItem {
  /** Display label. */
  label: string;
  /** Optional navigation target. Omit for the current page. */
  href?: string;
}

/** Props for {@link Breadcrumbs}. */
export interface BreadcrumbsProps {
  /** Array of breadcrumb items. Last item is rendered as current page (no link). */
  items: BreadcrumbItem[];
  /** Optional class name to override or extend default styles. */
  className?: string;
  /** Component used to render links. Defaults to a plain `<a>`. */
  linkAs?: LinkComponent;
}

/** Hierarchical breadcrumb navigation showing the current page location within a site structure. Last item is always shown as the current page without a link. Interactive items use the link component supplied by the consumer (or a plain `<a>` if none is supplied). * @example ```tsx <Breadcrumbs items={[ { label: "Home", href: "/" }, { label: "Docs", href: "/docs" }, { label: "Components" } ]} /> ```

> **[View rendered page](https://design.sunbeam.pt/shell/breadcrumbs?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `BreadcrumbItem[]` | Yes | Array of breadcrumb items. Last item is rendered as current page (no link). |
| className | `string` | No | Optional class name to override or extend default styles. |
| linkAs | `LinkComponent` | No | Component used to render links. Defaults to a plain `<a>`. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
