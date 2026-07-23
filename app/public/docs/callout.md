# Callout

> * Visual variant tokens for {@link Callout}. * - `tip` — PRO TIP label with sunbeam orange left border (lightbulb icon). - `warning` — WARNING label with sunshine red left border (warning icon). - `info` — INFO label with sunshine yellow left border (info icon). /
type CalloutVariant = "tip" | "warning" | "info";

/** Props for {@link Callout}. */
export interface CalloutProps {
  /** Callout message content. */
  children: ReactNode;
  /** Visual style and semantics. Defaults to `"tip"`. */
  variant?: CalloutVariant;
  /** Additional Panda CSS classes. */
  className?: string;
}

const iconMap: Record<CalloutVariant, string> = {
  tip: "lightbulb",
  warning: "warning",
  info: "info",
};

const labelMap: Record<CalloutVariant, string> = {
  tip: "PRO TIP",
  warning: "WARNING",
  info: "INFO",
};

const borderColorMap: Record<CalloutVariant, string> = {
  tip: token("colors.sunbeam.orange"),
  warning: token("colors.sunshine.900"),
  info: token("colors.sunshine.700"),
};

const textColorMap: Record<CalloutVariant, string> = {
  tip: token("colors.sunbeam.orange"),
  warning: token("colors.sunshine.900"),
  info: token("colors.sunshine.700"),
};

const roleMap: Record<CalloutVariant, string> = {
  tip: "note",
  warning: "alert",
  info: "note",
};

/** Highlighted callout box with icon and label for emphasis. * Three semantic variants (tip, warning, info) each with distinct color and accessibility role. Content is italicized and secondary-colored; the label is uppercase and bold. * @example ```tsx <Callout variant="tip">Use this technique for better performance.</Callout> <Callout variant="warning">This change is irreversible.</Callout> <Callout variant="info">New feature available in v2.0.</Callout> ```

> **[View rendered page](https://design.sunbeam.pt/components/callout?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Callout } from "@sunbeam/beam-ui/components/ui/callout"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | Yes | Callout message content. |
| variant | `CalloutVariant` | No | Visual style and semantics. Defaults to `"tip"`. |
| className | `string` | No | Additional Panda CSS classes. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
