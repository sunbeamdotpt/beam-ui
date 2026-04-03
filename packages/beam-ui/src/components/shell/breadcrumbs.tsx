import { Link } from "react-router-dom";
import { css } from "styled-system/css";

const nav = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "12px",
  fontWeight: "body",
  marginBottom: "32px",
});

const crumbLink = css({
  color: "accent",
  textDecoration: "none",
  transition: "opacity 0.2s",
  _hover: {
    opacity: 0.7,
  },
});

const crumbCurrent = css({
  color: "text.muted",
});

const separator = css({
  color: "text.muted",
  fontSize: "14px",
  lineHeight: 1,
  userSelect: "none",
});

interface BreadcrumbsProps {
  items: Array<{ label: string; href?: string }>;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className={nav} aria-label="Breadcrumb">
      <ol style={{ display: "flex", alignItems: "center", gap: "8px", listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {idx > 0 && <span className={separator} aria-hidden="true">&#x203A;</span>}
              {item.href && !isLast ? (
                <Link to={item.href} className={crumbLink}>
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? crumbCurrent : crumbLink} {...(isLast ? { "aria-current": "page" as const } : {})}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
