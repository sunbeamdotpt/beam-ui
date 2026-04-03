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
  token("colors.sunbeam.orange"),
  token("colors.sunshine.700"),
  token("colors.beam.orange"),
  token("colors.sunshine.500"),
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
