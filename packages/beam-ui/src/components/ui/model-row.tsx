import { Link } from "react-router-dom";
import { css } from "styled-system/css";
import { Icon } from "./icon";

interface ModelRowProps {
  name: string;
  icon: string;
  tier: "premier" | "open";
  version: string;
  description: string;
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

const premierBadge = css({
  fontSize: "10px",
  bg: "rgba(250, 82, 15, 0.1)",
  color: "sunbeam.orange",
  paddingInline: "6px",
  paddingBlock: "2px",
  borderRadius: "sm",
  fontWeight: "button",
  lineHeight: 1.2,
});

const openBadge = css({
  fontSize: "10px",
  bg: "rgba(255, 161, 16, 0.1)",
  color: "sunshine.700",
  paddingInline: "6px",
  paddingBlock: "2px",
  borderRadius: "sm",
  fontWeight: "button",
  lineHeight: 1.2,
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

export function ModelRow({ name, icon: iconName, tier, version, description, href }: ModelRowProps) {
  const content = (
    <>
      <div className={iconBox}>
        <Icon name={iconName} size={20} />
      </div>
      <div className={info}>
        <div className={nameRow}>
          <span className={nameText}>{name}</span>
          <span className={tier === "premier" ? premierBadge : openBadge}>
            {tier.toUpperCase()}
          </span>
        </div>
        <p className={desc}>{description}</p>
      </div>
      <span className={versionText}>{version}</span>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={row}>
        {content}
      </Link>
    );
  }

  return <div className={row}>{content}</div>;
}
