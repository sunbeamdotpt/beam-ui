import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

/** Props for {@link CapabilityCard}. */
interface CapabilityCardProps {
  /** Material icon name (e.g., "star", "code", "settings"). */
  icon: string;
  /** Card heading; typically uppercase. */
  title: string;
  /** Description text; line-height 1.7 for readability. */
  description: string;
  /** Additional Panda CSS classes. */
  className?: string;
}

/**
 * Feature or capability showcase card.
 *
 * Displays an icon, title, and description. Subtle hover effect on border color.
 * Typically used in grids for feature listings or capability overviews.
 *
 * @example
 * ```tsx
 * <CapabilityCard
 *   icon="lightning_bolt"
 *   title="Fast Deployment"
 *   description="Deploy changes in seconds with our optimized pipeline."
 * />
 * ```
 */
export function CapabilityCard({
  icon,
  title,
  description,
  className,
}: CapabilityCardProps) {
  return (
    <article
      className={cx(
        css({
          backgroundColor: "bg.card",
          padding: "32px",
          border: "1px solid",
          borderColor: "border.warm",
          borderRadius: "0",
          transition: "all 0.2s ease",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          _hover: { borderColor: "rgba(250, 82, 15, 0.4)" },
        }),
        className
      )}
    >
      <Icon
        name={icon}
        size={24}
        className={css({ color: "sunbeam.orange" })}
        aria-hidden="true"
      />
      <h4
        className={css({
          fontWeight: "button",
          fontSize: "18px",
          color: "text.primary",
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
        })}
      >
        {title}
      </h4>
      <p
        className={css({
          fontSize: "14px",
          color: "text.secondary",
          lineHeight: 1.7,
        })}
      >
        {description}
      </p>
    </article>
  );
}
