import {
  ProgressRoot,
  ProgressTrack,
  ProgressRange,
  ProgressValueText,
} from "@ark-ui/react/progress";
import { css, cx } from "styled-system/css";

type ProgressVariant = "default" | "success" | "error";

interface ProgressBarProps {
  value: number;
  variant?: ProgressVariant;
  showLabel?: boolean;
  size?: "sm" | "md";
  className?: string;
}

const fillColors: Record<ProgressVariant, string> = {
  default: "sunbeam.orange",
  success: "sunshine.700",
  error: "sunbeam.flame",
};

export function ProgressBar({
  value,
  variant = "default",
  showLabel = false,
  size = "md",
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const height = size === "sm" ? "4px" : "8px";

  return (
    <ProgressRoot
      value={clamped}
      className={cx(showLabel ? wrapperStyle : undefined, className)}
    >
      <ProgressTrack className={trackStyle} style={{ height }}>
        <ProgressRange
          className={cx(
            fillStyle,
            css({ backgroundColor: fillColors[variant] }),
          )}
        />
      </ProgressTrack>
      {showLabel && (
        <ProgressValueText className={labelStyle} />
      )}
    </ProgressRoot>
  );
}

const wrapperStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const trackStyle = css({
  width: "100%",
  backgroundColor: "bg.card",
  borderRadius: "full",
  overflow: "hidden",
});

const fillStyle = css({
  height: "100%",
  borderRadius: "full",
  transition: "width 0.4s ease",
});

const labelStyle = css({
  fontSize: "12px",
  fontWeight: "button",
  color: "text.secondary",
  whiteSpace: "nowrap",
});
