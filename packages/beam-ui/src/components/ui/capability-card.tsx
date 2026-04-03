import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

interface CapabilityCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

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
