import { css, cx } from "styled-system/css";
import { token } from "styled-system/tokens";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: 32,
  md: 40,
  lg: 56,
} as const;

const backgroundColors = [
  "#fa520f", // sunbeam orange
  "#4a9eff", // steel blue
  "#5bb8a6", // teal
  "#a855f7", // purple
  "#ef4444", // red
  "#22c55e", // green
  "#ec4899", // pink
  "#f59e0b", // amber
  "#6366f1", // indigo
  "#14b8a6", // cyan
  "#e11d48", // rose
  "#8b5cf6", // violet
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return backgroundColors[Math.abs(hash) % backgroundColors.length];
}

const base = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "full",
  border: "2px solid",
  borderColor: "bg.page",
  overflow: "hidden",
  flexShrink: 0,
});

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const dim = sizes[size];
  const fontSize = Math.round(dim * 0.38);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cx(base, className)}
        style={{ width: dim, height: dim }}
      />
    );
  }

  return (
    <span
      className={cx(base, className)}
      style={{
        width: dim,
        height: dim,
        backgroundColor: getColor(name),
        color: "white",
        fontSize,
        fontWeight: 600,
      }}
    >
      {getInitials(name)}
    </span>
  );
}
