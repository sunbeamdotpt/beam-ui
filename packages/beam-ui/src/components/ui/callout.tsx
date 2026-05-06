import { type ReactNode } from "react";
import { css, cx } from "styled-system/css";
import { token } from "styled-system/tokens";
import { Icon } from "./icon";

/**
 * Visual variant tokens for {@link Callout}.
 *
 * - `tip` — PRO TIP label with sunbeam orange left border (lightbulb icon).
 * - `warning` — WARNING label with sunshine red left border (warning icon).
 * - `info` — INFO label with sunshine yellow left border (info icon).
 */
type CalloutVariant = "tip" | "warning" | "info";

/** Props for {@link Callout}. */
interface CalloutProps {
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

/**
 * Highlighted callout box with icon and label for emphasis.
 *
 * Three semantic variants (tip, warning, info) each with distinct color and accessibility role.
 * Content is italicized and secondary-colored; the label is uppercase and bold.
 *
 * @example
 * ```tsx
 * <Callout variant="tip">Use this technique for better performance.</Callout>
 * <Callout variant="warning">This change is irreversible.</Callout>
 * <Callout variant="info">New feature available in v2.0.</Callout>
 * ```
 */
export function Callout({ children, variant = "tip", className }: CalloutProps): ReactNode {
  return (
    <div
      role={roleMap[variant]}
      className={cx(
        css({
          padding: "24px",
          backgroundColor: "bg.card",
          borderRadius: "0",
          borderLeft: "4px solid",
        }),
        className
      )}
      style={{ borderLeftColor: borderColorMap[variant] }}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "button",
          marginBottom: "8px",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        })}
        style={{ color: textColorMap[variant] }}
      >
        <Icon name={iconMap[variant]} size={20} aria-hidden="true" />
        <span>{labelMap[variant]}</span>
      </div>
      <div
        className={css({
          fontSize: "14px",
          color: "text.secondary",
          lineHeight: 1.7,
          fontStyle: "italic",
        })}
      >
        {children}
      </div>
    </div>
  );
}
