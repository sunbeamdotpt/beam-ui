import { Link } from "react-router-dom";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

interface CardProps {
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  className?: string;
}

export function Card({
  icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  className,
}: CardProps) {
  return (
    <article
      className={cx(
        css({
          backgroundColor: "bg.card",
          padding: { base: "24px", lg: "40px" },
          borderRadius: "0",
          shadow: "golden",
          transition: "all 0.3s ease",
          _hover: { translateY: "-1px" },
        }),
        className
      )}
    >
      <div
        className={css({
          width: "48px",
          height: "48px",
          backgroundColor: "transparent",
          borderRadius: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          color: "sunbeam.orange",
        })}
      >
        <Icon name={icon} size={30} filled aria-hidden="true" />
      </div>
      <h3
        className={css({
          fontSize: "24px",
          fontWeight: "heading",
          color: "text.primary",
          textTransform: "uppercase",
          letterSpacing: "-0.025em",
          marginBottom: "16px",
        })}
      >
        {title}
      </h3>
      <p
        className={css({
          color: "text.secondary",
          lineHeight: 1.7,
          marginBottom: "24px",
        })}
      >
        {description}
      </p>
      <Link
        to={ctaHref}
        className={css({
          color: "sunbeam.orange",
          fontWeight: "button",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          textTransform: "uppercase",
          fontSize: "14px",
          letterSpacing: "0.1em",
          textDecoration: "none",
          transition: "gap 0.2s ease",
          _hover: { gap: "12px" },
        })}
      >
        {ctaLabel} <Icon name="arrow_forward" size={14} />
      </Link>
    </article>
  );
}
