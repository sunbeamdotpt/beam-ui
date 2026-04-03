import { css } from "styled-system/css";
import { Icon } from "./icon";

interface FeatureTileProps {
  name: string;
  endpoint: string;
  icon: string;
}

const tile = css({
  padding: "20px",
  bg: "bg.page",
  borderRadius: "0",
  transition: "background 0.15s ease",
  _hover: {
    bg: "bg.card",
  },
});

const tileIcon = css({
  color: "sunbeam.orange",
  display: "block",
  marginBottom: "16px",
});

const tileName = css({
  fontWeight: "button",
  fontSize: "14px",
  marginBottom: "4px",
  color: "text.primary",
});

const tileEndpoint = css({
  fontSize: "10px",
  fontFamily: "mono",
  color: "text.muted",
});

export function FeatureTile({ name, endpoint, icon: iconName }: FeatureTileProps) {
  return (
    <div className={tile}>
      <Icon name={iconName} size={24} className={tileIcon} aria-hidden="true" />
      <h3 className={tileName}>{name}</h3>
      <p className={tileEndpoint}>{endpoint}</p>
    </div>
  );
}
