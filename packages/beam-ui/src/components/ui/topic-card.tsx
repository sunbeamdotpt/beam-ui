import { Link } from "react-router-dom";
import { css } from "styled-system/css";
import { Icon } from "./icon";

interface TopicCardProps {
  title: string;
  icon: string;
  description: string;
  href?: string;
}

const card = css({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "32px",
  bg: "bg.card",
  border: "1px solid",
  borderColor: "border.warm",
  textDecoration: "none",
  color: "text.primary",
  transition: "border-color 0.2s ease",
  _hover: {
    borderColor: "sunbeam.orange",
  },
});

const iconStyle = css({
  color: "sunbeam.orange",
  fontSize: "36px",
});

const titleStyle = css({
  fontSize: "20px",
  fontWeight: "heading",
  color: "text.primary",
});

const descStyle = css({
  fontSize: "14px",
  color: "text.secondary",
  lineHeight: 1.6,
});

export function TopicCard({ title, icon: iconName, description, href = "/guides" }: TopicCardProps) {
  return (
    <Link to={href} className={card}>
      <Icon name={iconName} size={36} className={iconStyle} />
      <h3 className={titleStyle}>{title}</h3>
      <p className={descStyle}>{description}</p>
    </Link>
  );
}
