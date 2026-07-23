# List

> A single list item with optional icon, description, and link. */
interface ListItem {
  /** Primary text for the list item. */
  label: string;
  /** Optional secondary text. Hidden in compact variant. */
  description?: string;
  /** Optional Material Symbol icon name. */
  icon?: string;
  /** Optional href (internal route or external URL). If provided, item becomes a link. */
  href?: string;
}

/** Visual style variant for the list. */
type Variant = "default" | "compact" | "bordered";

/** Props for {@link List}. */
export interface ListProps {
  /** Array of items to display. */
  items: ListItem[];
  /** If true, render as `<ol>` (numbered). Defaults to `<ul>` (unordered). */
  ordered?: boolean;
  /** Visual style. Defaults to `"default"`. */
  variant?: Variant;
  /** Optional CSS class for the list container. */
  className?: string;
  /** Component used to render item links. Defaults to a plain `<a>`. */
  linkAs?: LinkComponent;
}

/** Semantic list with optional icons, descriptions, and links in three visual styles. Items may link to internal routes or external URLs. * @example ```tsx <List variant="default" items={[ { label: "Home", icon: "home", href: "/" }, { label: "Settings", description: "Configure your account", icon: "settings", href: "/settings" }, ]} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/list?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { List } from "@sunbeam/beam-ui/components/ui/list"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `ListItem[]` | Yes | Array of items to display. |
| ordered | `boolean` | No | If true, render as `<ol>` (numbered). Defaults to `<ul>` (unordered). |
| variant | `Variant` | No | Visual style. Defaults to `"default"`. |
| className | `string` | No | Optional CSS class for the list container. |
| linkAs | `LinkComponent` | No | Component used to render item links. Defaults to a plain `<a>`. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
