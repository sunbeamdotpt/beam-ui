# Shell

> Props for {@link Shell}. */
export interface ShellProps extends
  Pick<
    HeaderProps,
    | "showThemeToggle"
    | "brand"
    | "navLinks"
    | "breadcrumbs"
    | "drawerSections"
    | "searchItems"
    | "searchPlaceholder"
    | "showSearch"
    | "fullWidth"
    | "currentPath"
    | "linkAs"
    | "onNavigate"
    | "isActive"
  > {
  /** Extra elements rendered in the header's right group before the theme toggle */
  headerActions?: ReactNode;
  /** Replace the default Header with a custom element. */
  header?: ReactNode;
  /** Replace the default Footer with a custom element. */
  footer?: ReactNode;
  /** Content to render. */
  children?: ReactNode;
  className?: string;
}

const shellStyle = css({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const mainStyle = css({
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  position: "relative",
});

/** Top-level layout component combining Header, main content area, and Footer. * Arranges content in a flexible column. Accepts custom Header and Footer via props, or renders defaults. The default Header is wired with the router-agnostic props passed to Shell. * @example ```tsx <Shell showThemeToggle currentPath="/docs" linkAs={Link} onNavigate={navigate}> <MyPageContent /> </Shell> ```

> **[View rendered page](https://design.sunbeam.pt/shell/shell?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Shell } from "@sunbeam/beam-ui/components/shell/shell"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| headerActions | `ReactNode` | No | Extra elements rendered in the header's right group before the theme toggle |
| header | `ReactNode` | No | Replace the default Header with a custom element. |
| footer | `ReactNode` | No | Replace the default Footer with a custom element. |
| children | `ReactNode` | No | Content to render. |
| className | `string` | No |  |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
