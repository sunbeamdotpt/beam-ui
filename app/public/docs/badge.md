# Badge

> * Visual variant tokens for {@link Badge}. * **Tier / Recognition**: `featured`, `premier`, `verified`, `partner`, `community` — warm gold/orange palette for status. **Release Stage**: `stable`, `new`, `beta`, `preview`, `experimental`, `deprecated` — temperature progression from cool to hot. **Work Status**: `open`, `draft`, `review`, `approved`, `merged`, `closed`, `revision` — solid, distinct status colors. **Priority**: `critical`, `high`, `medium`, `low` — urgency-coded reds and greens. **Utility**: `section` — renders as a horizontal rule with label (special layout). /
export type BadgeVariant =
  // Tier / Recognition
  | "featured"
  | "premier"
  | "verified"
  | "partner"
  | "community"
  // Release Stage
  | "stable"
  | "new"
  | "beta"
  | "preview"
  | "experimental"
  | "deprecated"
  // Work Status
  | "open"
  | "draft"
  | "review"
  | "approved"
  | "merged"
  | "closed"
  | "revision"
  // Priority
  | "critical"
  | "high"
  | "medium"
  | "low"
  // Utility
  | "section";

/** Props for {@link Badge}. */
export interface BadgeProps {
  /** Badge label text. */
  children: React.ReactNode;
  /** Visual style. Defaults to `"premier"`. */
  variant?: BadgeVariant;
  /** Additional Panda CSS classes. */
  className?: string;
}

const base = css({
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  lineHeight: 1,
});

/** For token-based colors (Panda resolves these) */
const pill = (bg: string, fg: string, border?: string) =>
  css({
    backgroundColor: bg,
    color: fg,
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
    ...(border ? { border: "1px solid", borderColor: border } : {}),
  });

const variants: Record<Exclude<BadgeVariant, "section">, string> = {
  // Tier / Recognition — warm palette
  featured: pill("sunbeam.orange", "white", "bright.yellow"),
  premier: pill("sunbeam.orange", "white"),
  verified: pill("sunshine.900", "white"),
  partner: pill("beam.orange", "white"),
  community: pill("beam.gold", "sunbeam.black", "sunshine.500"),

  // Release Stage — temperature progression
  stable: pill("sunshine.300", "sunbeam.black"),
  new: pill("beam.gold", "sunbeam.black"),
  beta: pill("sunshine.500", "sunbeam.black"),
  preview: pill("sunbeam.flame", "white"),
  experimental: pill("bright.yellow", "sunbeam.black"),
  deprecated: pill("rgba(127, 99, 21, 0.15)", "text.secondary"),

  // Work Status — solid, distinct, readable in both modes
  open: css({
    backgroundColor: "#166534",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),
  draft: css({
    backgroundColor: "#525252",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),
  review: css({
    backgroundColor: "#92400e",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),
  approved: css({
    backgroundColor: "#15803d",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),
  merged: css({
    backgroundColor: "#7e22ce",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),
  closed: css({
    backgroundColor: "#991b1b",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),
  revision: css({
    backgroundColor: "#c2410c",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),

  // Priority — solid, urgency-coded
  critical: css({
    backgroundColor: "#dc2626",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),
  high: css({
    backgroundColor: "#ea580c",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),
  medium: css({
    backgroundColor: "#d97706",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),
  low: css({
    backgroundColor: "#0d9488",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),
};

/** Section badge renders as a label on a horizontal rule. * Used to visually separate sections in long-form content. The label is left-aligned with an orange background, and a decorative line extends to the right. /
function SectionBadge({ children, className }: Omit<BadgeProps, "variant">): ReactNode {
  return (
    <div
      className={cx(
        css({
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "40px",
        }),
        className,
      )}
    >
      <span
        className={cx(
          base,
          css({
            fontSize: "10px",
            color: "sunbeam.orange",
            backgroundColor: "rgba(250, 82, 15, 0.1)",
            padding: "4px 8px",
            borderRadius: "sm",
            whiteSpace: "nowrap",
          }),
        )}
      >
        {children}
      </span>
      <div
        aria-hidden="true"
        className={css({
          height: "1px",
          flex: 1,
          backgroundColor: "border.warm",
        })}
      />
    </div>
  );
}

/** Compact labeled badge for status, priority, and release stage tagging. * Supports 25+ semantic variants organized by tier, release stage, work status, and priority. The `section` variant renders a horizontal divider instead. * @example ```tsx <Badge variant="new">New Feature</Badge> <Badge variant="critical">Urgent</Badge> <Badge variant="section">Documentation</Badge> ```

> **[View rendered page](https://design.sunbeam.pt/components/badge?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Badge } from "@sunbeam/beam-ui/components/ui/badge"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `React.ReactNode` | Yes | Badge label text. |
| variant | `BadgeVariant` | No | Visual style. Defaults to `"premier"`. |
| className | `string` | No | Additional Panda CSS classes. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
