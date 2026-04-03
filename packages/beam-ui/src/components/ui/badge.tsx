import { css, cx } from "styled-system/css";

type BadgeVariant =
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

const pillBase = css({
  fontSize: "10px",
  padding: "4px 8px",
  borderRadius: "sm",
  display: "inline-block",
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
  featured:     pill("sunbeam.orange", "white", "bright.yellow"),
  premier:      pill("sunbeam.orange", "white"),
  verified:     pill("sunshine.900", "white"),
  partner:      pill("beam.orange", "white"),
  community:    pill("beam.gold", "sunbeam.black", "sunshine.500"),

  // Release Stage — temperature progression
  stable:       pill("sunshine.300", "sunbeam.black"),
  new:          pill("beam.gold", "sunbeam.black"),
  beta:         pill("sunshine.500", "sunbeam.black"),
  preview:      pill("sunbeam.flame", "white"),
  experimental: pill("bright.yellow", "sunbeam.black"),
  deprecated:   pill("rgba(127, 99, 21, 0.15)", "text.secondary"),

  // Work Status — solid, distinct, readable in both modes
  open:         css({ backgroundColor: "#166534", color: "white", fontSize: "10px", padding: "4px 8px", borderRadius: "sm", display: "inline-block" }),
  draft:        css({ backgroundColor: "#525252", color: "white", fontSize: "10px", padding: "4px 8px", borderRadius: "sm", display: "inline-block" }),
  review:       css({ backgroundColor: "#92400e", color: "white", fontSize: "10px", padding: "4px 8px", borderRadius: "sm", display: "inline-block" }),
  approved:     css({ backgroundColor: "#15803d", color: "white", fontSize: "10px", padding: "4px 8px", borderRadius: "sm", display: "inline-block" }),
  merged:       css({ backgroundColor: "#7e22ce", color: "white", fontSize: "10px", padding: "4px 8px", borderRadius: "sm", display: "inline-block" }),
  closed:       css({ backgroundColor: "#991b1b", color: "white", fontSize: "10px", padding: "4px 8px", borderRadius: "sm", display: "inline-block" }),
  revision:     css({ backgroundColor: "#c2410c", color: "white", fontSize: "10px", padding: "4px 8px", borderRadius: "sm", display: "inline-block" }),

  // Priority — solid, urgency-coded
  critical:     css({ backgroundColor: "#dc2626", color: "white", fontSize: "10px", padding: "4px 8px", borderRadius: "sm", display: "inline-block" }),
  high:         css({ backgroundColor: "#ea580c", color: "white", fontSize: "10px", padding: "4px 8px", borderRadius: "sm", display: "inline-block" }),
  medium:       css({ backgroundColor: "#d97706", color: "white", fontSize: "10px", padding: "4px 8px", borderRadius: "sm", display: "inline-block" }),
  low:          css({ backgroundColor: "#0d9488", color: "white", fontSize: "10px", padding: "4px 8px", borderRadius: "sm", display: "inline-block" }),
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
