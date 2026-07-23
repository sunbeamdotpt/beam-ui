# SearchInput

> Props for {@link SearchInput}. */
export interface SearchInputProps {
  /** Additional CSS class. */
  className?: string;
}

// Build a flat list of all nav items for search
const allNavItems = docsSidebar.flatMap((section) =>
  section.items.flatMap((item) => {
    const results = [{ label: item.label, href: item.href, section: section.title }];
    if (item.children) {
      item.children.forEach((child) =>
        results.push({ label: child.label, href: child.href, section: section.title })
      );
    }
    return results;
  })
);

/** Searchable documentation input with keyboard shortcuts and live filtering. Responds to Cmd+K / Ctrl+K, displays filtered results grouped by section. * @example ```tsx <SearchInput /> ```

> **[View rendered page](https://design.sunbeam.pt/components/search-input?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { SearchInput } from "@sunbeam/beam-ui/components/ui/search-input"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| className | `string` | No | Additional CSS class. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
