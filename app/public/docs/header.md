# Header

> A single item that can appear in the header search dropdown. */
export interface HeaderSearchItem {
  /** Display label. */
  label: string;
  /** Navigation target URL path. */
  href: string;
  /** Optional section heading for grouping results. */
  section?: string;
}

/** A simple navigation link rendered in the desktop header bar. */
export interface HeaderNavLink {
  /** Display label. */
  label: string;
  /** Navigation target URL path. */
  href: string;
}

/** A single breadcrumb item. */
export interface HeaderBreadcrumbItem {
  /** Display label. */
  label: string;
  /** Optional navigation target. Omit for the current page. */
  href?: string;
}

function buildSearchItems(sections?: NavSection[]): HeaderSearchItem[] {
  if (!sections) return [];
  return sections.flatMap((section) =>
    section.items.flatMap((item) => {
      const results: HeaderSearchItem[] = [
        { label: item.label, href: item.href, section: section.title },
      ];
      if (item.children) {
        item.children.forEach((child) =>
          results.push({ label: child.label, href: child.href, section: section.title })
        );
      }
      return results;
    })
  );
}

/** Default active matcher: exact for root, prefix otherwise. */
function defaultIsActive(_label: string, href: string, currentPath: string): boolean {
  if (href === "/") return currentPath === "/";
  return currentPath.startsWith(href);
}

/** Props for {@link Header}. */
export interface HeaderProps {
  /** Show a theme toggle button (right-aligned). Defaults to true. */
  showThemeToggle?: boolean;
  /** Extra elements rendered in the right group before the theme toggle. */
  actions?: ReactNode;
  /** Replace the default brand link with a custom element. */
  brand?: ReactNode;
  /** Navigation links for the desktop header bar. Defaults to beam-ui docs links. Ignored when `breadcrumbs` is set. */
  navLinks?: HeaderNavLink[];
  /** Breadcrumb items shown in place of nav links. When set, nav links are hidden. */
  breadcrumbs?: HeaderBreadcrumbItem[];
  /** Sections for the mobile drawer sidebar. Defaults to beam-ui docs sidebar. */
  drawerSections?: NavSection[];
  /** Searchable items for the Cmd+K search. Defaults to items derived from drawerSections. */
  searchItems?: HeaderSearchItem[];
  /** Placeholder text for the search input. Defaults to "Search docs...". */
  searchPlaceholder?: string;
  /** Show the search input and Cmd+K shortcut. Defaults to true. */
  showSearch?: boolean;
  /** Remove the max-width constraint so the header spans the full viewport. Defaults to false. */
  fullWidth?: boolean;
  /** Current path used to compute active states and close the mobile drawer on navigation. */
  currentPath?: string;
  /** Component used to render links. Defaults to a plain `<a>`. */
  linkAs?: LinkComponent;
  /** Called when the user selects a search result or a nav link should trigger client-side navigation. */
  onNavigate?: (href: string) => void;
  /** Override the default active-state matcher. */
  isActive?: (label: string, href: string, currentPath: string) => boolean;
}

/** Fixed top navigation header with logo, nav links or breadcrumbs (desktop), search (with Cmd+K support), mobile menu drawer, and optional theme toggle. * All data sources are configurable via props. When omitted, sensible defaults (beam-ui documentation navigation) are used so the component works out of the box. The component is router-agnostic: pass `linkAs` (your router's `Link`) and `currentPath`/`onNavigate` to wire it into any routing framework. * @example ```tsx <Header brand={<Link href="/">My App</Link>} navLinks={[{ label: "Dashboard", href: "/" }, { label: "Settings", href: "/settings" }]} currentPath="/settings" searchPlaceholder="Search..." /> ``` * @example ```tsx <Header brand={<Link href="/">My App</Link>} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Settings" }]} showSearch={false} /> ```

> **[View rendered page](https://design.sunbeam.pt/shell/header?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Header } from "@sunbeam/beam-ui/components/shell/header"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| showThemeToggle | `boolean` | No | Show a theme toggle button (right-aligned). Defaults to true. |
| actions | `ReactNode` | No | Extra elements rendered in the right group before the theme toggle. |
| brand | `ReactNode` | No | Replace the default brand link with a custom element. |
| navLinks | `HeaderNavLink[]` | No | Navigation links for the desktop header bar. Defaults to beam-ui docs links. Ignored when `breadcrumbs` is set. |
| breadcrumbs | `HeaderBreadcrumbItem[]` | No | Breadcrumb items shown in place of nav links. When set, nav links are hidden. |
| drawerSections | `NavSection[]` | No | Sections for the mobile drawer sidebar. Defaults to beam-ui docs sidebar. |
| searchItems | `HeaderSearchItem[]` | No | Searchable items for the Cmd+K search. Defaults to items derived from drawerSections. |
| searchPlaceholder | `string` | No | Placeholder text for the search input. Defaults to "Search docs...". |
| showSearch | `boolean` | No | Show the search input and Cmd+K shortcut. Defaults to true. |
| fullWidth | `boolean` | No | Remove the max-width constraint so the header spans the full viewport. Defaults to false. |
| currentPath | `string` | No | Current path used to compute active states and close the mobile drawer on navigation. |
| linkAs | `LinkComponent` | No | Component used to render links. Defaults to a plain `<a>`. |
| onNavigate | `(href: string) => void` | No | Called when the user selects a search result or a nav link should trigger client-side navigation. |
| isActive | `(label: string, href: string, currentPath: string) => boolean` | No | Override the default active-state matcher. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
