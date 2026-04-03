import { type ReactNode } from "react";
import { css } from "styled-system/css";
import { Icon } from "./icon";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "64px",
  textAlign: "center",
  gap: "16px",
});

const iconStyle = css({
  color: "text.muted",
});

const titleStyle = css({
  fontSize: "24px",
  fontWeight: "heading",
  color: "text.primary",
  lineHeight: 1.3,
});

const descriptionStyle = css({
  fontSize: "14px",
  color: "text.secondary",
  lineHeight: 1.6,
  maxWidth: "400px",
});

const actionStyle = css({
  marginTop: "8px",
});

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className={containerStyle}>
      {icon && <Icon name={icon} size={48} className={iconStyle} />}
      <h3 className={titleStyle}>{title}</h3>
      {description && <p className={descriptionStyle}>{description}</p>}
      {action && <div className={actionStyle}>{action}</div>}
    </div>
  );
}
