import { css, cx } from "styled-system/css";

interface IconProps {
  name: string;
  size?: number | string;
  filled?: boolean;
  className?: string;
}

export function Icon({ name, size, filled, className }: IconProps) {
  return (
    <span
      className={cx(
        "material-symbols-outlined",
        css({
          fontSize: typeof size === "number" ? `${size}px` : size,
          fontVariationSettings: filled
            ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
            : undefined,
          lineHeight: 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }),
        className
      )}
    >
      {name}
    </span>
  );
}
