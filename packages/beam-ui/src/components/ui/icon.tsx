import { css, cx } from "styled-system/css";

interface IconProps {
  name: string;
  size?: number | string;
  filled?: boolean;
  className?: string;
  /** When provided, the icon is treated as meaningful: role="img" + aria-label. Otherwise aria-hidden="true". */
  label?: string;
}

export function Icon({ name, size, filled, className, label }: IconProps) {
  const style: React.CSSProperties = {
    fontSize: typeof size === "number" ? `${size}px` : size,
    lineHeight: 1,
  };
  if (filled) {
    style.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24";
  }

  return (
    <span
      className={cx("material-symbols-outlined", base, className)}
      style={style}
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true as const })}
    >
      {name}
    </span>
  );
}

const base = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});
