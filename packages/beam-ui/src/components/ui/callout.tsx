import { type ReactNode } from "react";
import { css, cx } from "styled-system/css";
import { token } from "styled-system/tokens";
import { Icon } from "./icon";

type CalloutVariant = "tip" | "warning" | "info";

interface CalloutProps {
  children: ReactNode;
  variant?: CalloutVariant;
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

export function Callout({ children, variant = "tip", className }: CalloutProps) {
  return (
    <div
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
        <Icon name={iconMap[variant]} size={20} />
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
