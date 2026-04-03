import { css, cx } from "styled-system/css";

interface SkeletonProps {
  width?: string;
  height?: string;
  variant?: "text" | "circle" | "rect";
  count?: number;
  className?: string;
}

const shimmerName = "beam-shimmer";

const base = css({
  backgroundColor: { base: "rgba(127,99,21,0.10)", _dark: "rgba(255,255,255,0.06)" },
  border: "1px solid",
  borderColor: "border.default",
  backgroundImage: {
    base: "linear-gradient(90deg, transparent 0%, rgba(127,99,21,0.15) 50%, transparent 100%)",
    _dark: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
  },
  backgroundSize: "200% 100%",
  animationName: shimmerName,
  animationDuration: "1.8s",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
});

const textStyle = css({
  width: "100%",
  height: "16px",
  borderRadius: "sm",
});

const circleStyle = css({
  borderRadius: "full",
});

const rectStyle = css({
  borderRadius: "sm",
});

const stackStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export function Skeleton({
  width,
  height,
  variant = "text",
  count = 1,
  className,
}: SkeletonProps) {
  const variantStyle =
    variant === "text"
      ? textStyle
      : variant === "circle"
        ? circleStyle
        : rectStyle;

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;
  if (variant === "circle" && width && !height) style.height = width;

  const single = (
    <div
      role="status"
      aria-label="Loading"
      className={cx(base, variantStyle, className)}
      style={style}
    />
  );

  if (count <= 1) return single;

  return (
    <div role="status" aria-label="Loading" className={stackStyle}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} aria-hidden="true" className={cx(base, variantStyle, className)} style={style} />
      ))}
    </div>
  );
}
