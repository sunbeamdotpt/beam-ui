# ThemeToggle

> Props for {@link ThemeToggle}. */
export interface ThemeToggleProps {
  /** Visual variant. Defaults to `"icon"`. */
  variant?: "icon" | "switch" | "pill";
  /** Optional CSS class applied to the button or container. */
  className?: string;
}

/** Theme toggle button that reads and updates theme via `useTheme` hook. Three variants: icon (sun/moon in header), switch (with label), pill (segmented control). Consumer must wrap in a theme provider for `useTheme` to work. * @example ```tsx // Icon variant (minimal, suitable for header) <ThemeToggle variant="icon" /> * // Switch variant (with label) <ThemeToggle variant="switch" /> * // Pill variant (segmented radio buttons) <ThemeToggle variant="pill" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/theme-toggle?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { ThemeToggle } from "@sunbeam/beam-ui/components/ui/theme-toggle"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| variant | `"icon" | "switch" | "pill"` | No | Visual variant. Defaults to `"icon"`. |
| className | `string` | No | Optional CSS class applied to the button or container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
