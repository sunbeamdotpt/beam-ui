# Sidebar

> Props for {@link Sidebar}. */
export interface SidebarProps {
  /** Navigation sections to render. Each section has a title and list of items. */
  sections: NavSection[];
  /** Current path used to compute active items. */
  currentPath?: string;
  /** Component used to render links. Defaults to a plain `<a>`. */
  linkAs?: LinkComponent;
}

export interface SidebarItemProps {
  item: NavSection["items"][number];
  currentPath: string;
  LinkAs: LinkComponent;
}

function SidebarItem({ item, currentPath, LinkAs }: SidebarItemProps) {
  const isActive = currentPath === item.href;
  const hasChildren = item.children && item.children.length > 0;
  const childActive = hasChildren ? item.children!.some((c) => currentPath === c.href) : false;
  const [open, setOpen] = useState(isActive || childActive);

  if (!hasChildren) {
    return (
      <LinkAs
        href={item.href}
        className={isActive ? itemLinkActive : itemLink}
        {...(isActive ? { "aria-current": "page" as const } : {})}
      >
        <span>{item.label}</span>
      </LinkAs>
    );
  }

  return (
    <CollapsibleRoot open={open} onOpenChange={(d) => setOpen(d.open)}>
      <CollapsibleTrigger
        className={isActive || childActive ? collapsibleTriggerActive : collapsibleTrigger}
      >
        <span>{item.label}</span>
        <span className={open ? chevronOpen : chevron}>&#x203A;</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className={childList} role="list">
          {item.children!.map((child) => {
            const sameAsParent = child.href === item.href;
            const onParentPage = sameAsParent && currentPath === item.href;
            const cActive = !sameAsParent && currentPath === child.href;
            return (
              <li key={child.label}>
                <LinkAs
                  href={child.href}
                  className={cActive
                    ? childLinkActive
                    : onParentPage
                    ? childLabelOnPage
                    : sameAsParent
                    ? childLabel
                    : childLink}
                  {...(cActive ? { "aria-current": "page" as const } : {})}
                >
                  {child.label}
                </LinkAs>
              </li>
            );
          })}
        </ul>
      </CollapsibleContent>
    </CollapsibleRoot>
  );
}

/** Left-side navigation rail for documentation and API reference sites. * Renders a sticky sidebar with collapsible sections and nested links. Handles active state based on the `currentPath` prop. The consumer supplies the link component (React Router, TanStack Router, Fresh, etc.) via `linkAs`; otherwise plain `<a>` tags are used. * @example ```tsx <Sidebar sections={docsSidebar} currentPath="/components/button" /> ```

> **[View rendered page](https://design.sunbeam.pt/shell/sidebar?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Sidebar } from "@sunbeam/beam-ui/components/shell/sidebar"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| sections | `NavSection[]` | Yes | Navigation sections to render. Each section has a title and list of items. |
| currentPath | `string` | No | Current path used to compute active items. |
| linkAs | `LinkComponent` | No | Component used to render links. Defaults to a plain `<a>`. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
