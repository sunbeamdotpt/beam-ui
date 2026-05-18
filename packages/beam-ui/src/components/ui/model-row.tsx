import { type ReactNode } from "react";
import { css } from "styled-system/css";
import { Icon } from "./icon";
import { Badge } from "./badge";

/** Props for {@link ModelRow}. */
interface ModelRowProps {
  /** Model name / display label. */
  name: string;
  /** Material Symbol icon name for the model. */
  icon: string;
  /** Tier/category badge text (e.g., "PREMIUM", "STANDARD", "BETA"). */
  tier: string;
  /** Version string (e.g., "1.0", "2.5-alpha"). */
  version: string;
  /** Short description of the model. */
  description: string;
  /** Optional link target. If provided, row becomes a link (internal route or external URL). */
  href?: string;
}

const row = css({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "16px",
  margin: "-16px",
  borderRadius: "0",
  border: "1px solid transparent",
  transition: "all 0.15s ease",
  textDecoration: "none",
  color: "text.primary",
  cursor: "pointer",
  _hover: {
    bg: "bg.page",
    borderColor: "border.default",
  },
});

const iconBox = css({
  width: "40px",
  height: "40px",
  minWidth: "40px",
  bg: "bg.card",
  borderRadius: "md",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "sunbeam.orange",
});

const info = css({
  flex: 1,
  minWidth: 0,
});

const nameRow = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "2px",
});

const nameText = css({
  fontWeight: "button",
  fontSize: "14px",
});


const desc = css({
  fontSize: "12px",
  color: "text.secondary",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "200px",
});

const versionText = css({
  fontSize: "10px",
  fontWeight: "button",
  color: "text.muted",
  whiteSpace: "nowrap",
});

/**
 * Single-row display for a model with icon, name, tier badge, version, and description.
 * Optionally renders as a link if href is provided.
 *
 * @example
 * ```tsx
 * <ModelRow
 *   name="GPT-4"
 *   icon="auto_awesome"
 *   tier="premium"
 *   version="1.0"
 *   description="Advanced language model"
 *   href="/models/gpt-4"
 * />
 * ```
 */
export function ModelRow({ name, icon: iconName, tier, version, description, href }: ModelRowProps): ReactNode {
  const content = (
    <>
      <div className={iconBox}>
        <Icon name={iconName} size={20} />
      </div>
      <div className={info}>
        <div className={nameRow}>
          <span className={nameText}>{name}</span>
          <Badge variant={tier as any}>{tier.toUpperCase()}</Badge>
        </div>
        <p className={desc}>{description}</p>
      </div>
      <span className={versionText}>{version}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={row} aria-label={`View ${name} model details`}>
        {content}
      </a>
    );
  }

  return <div className={row}>{content}</div>;
}
