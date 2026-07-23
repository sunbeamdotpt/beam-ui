# useDocsContext

> Single item in the table of contents shown in {@link RightRail}. */
export interface DocsTocItem {
  /** Display label for the heading. */
  label: string;
  /** Unique ID matching the heading's `id` attribute for smooth scrolling. */
  id: string;
}

interface DocsContextValue {
  setToc: (items: DocsTocItem[]) => void;
}

const DocsContext = createContext<DocsContextValue | null>(null);

/** Retrieve the table-of-contents setter from {@link DocsLayout} context. Used by child pages to populate the right-rail navigation. * @returns Object with `setToc` function to update the visible TOC.

> **[View rendered page](https://design.sunbeam.pt/layouts/docs-layout?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | Yes | Page content. |
| pageDates | `Record<string, string>` | No | Optional map of route paths to last-updated timestamps, shown in the right rail. |
| currentPath | `string` | No | Current path used to compute active sidebar item and last-updated date. |
| linkAs | `LinkComponent` | No | Component used to render links. Defaults to a plain `<a>`. |

## Also Exports
- `DocsLayout`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
