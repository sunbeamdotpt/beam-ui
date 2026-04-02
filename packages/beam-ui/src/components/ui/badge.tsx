import { css, cx } from "styled-system/css";

type BadgeVariant = "premier" | "open" | "section";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const base = css({
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  lineHeight: 1,
});

const variants: Record<BadgeVariant, string> = {
  premier: css({
    backgroundColor: "sunbeam.orange",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),
  open: css({
    backgroundColor: "sunshine.700",
    color: "white",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "sm",
    display: "inline-block",
  }),
  section: css({
    fontSize: "10px",
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "sm",
  }),
};

/** Section badge renders as a label on a horizontal rule */
function SectionBadge({ children, className }: Omit<BadgeProps, "variant">) {
  return (
    <div
      className={cx(
        css({
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "40px",
        }),
        className
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
          })
        )}
      >
        {children}
      </span>
      <div
        className={css({
          height: "1px",
          flex: 1,
          backgroundColor: "border.warm",
        })}
      />
    </div>
  );
}

export function Badge({ children, variant = "premier", className }: BadgeProps) {
  if (variant === "section") {
    return <SectionBadge className={className}>{children}</SectionBadge>;
  }

  return (
    <span className={cx(base, variants[variant], className)}>{children}</span>
  );
}
