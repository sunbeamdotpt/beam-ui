import { type ReactNode } from "react";
import { css } from "styled-system/css";
import { Icon } from "./icon.tsx";

/** Props for {@link FeatureTile}. */
interface FeatureTileProps {
  /** Display name of the feature (e.g., "Analytics", "File Upload"). */
  name: string;
  /** URL endpoint or path for this feature. */
  endpoint: string;
  /** Material Design icon name to display above the name. */
  icon: string;
}

/**
 * Compact feature tile with icon, name, and endpoint.
 *
 * Typically used in a grid of available features or services.
 * Displays a large icon, feature name, and endpoint path with hover effect.
 *
 * @example
 * ```tsx
 * <FeatureTile name="Analytics" endpoint="/api/analytics" icon="analytics" />
 * ```
 */

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

// FeatureTile function is documented above, before const tile
export function FeatureTile({ name, endpoint, icon: iconName }: FeatureTileProps): ReactNode {
  return (
    <div className={tile}>
      <Icon name={iconName} size={24} className={tileIcon} aria-hidden="true" />
      <h3 className={tileName}>{name}</h3>
      <p className={tileEndpoint}>{endpoint}</p>
    </div>
  );
}
