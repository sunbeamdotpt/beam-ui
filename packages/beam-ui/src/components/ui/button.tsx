import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { css, cx } from "styled-system/css";

type Variant = "dark" | "cream" | "ghost" | "text" | "primary";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-disabled"?: boolean;
}

const base = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  textDecoration: "none",
  border: "none",
  lineHeight: 1,
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "2px",
  },
});

const variants: Record<Variant, string> = {
  dark: css({
    backgroundColor: "sunbeam.black",
    color: "white",
    padding: "10px 20px",
    borderRadius: "0",
    _hover: { backgroundColor: "sunbeam.flame" },
    _active: { transform: "scale(0.95)" },
  }),
  cream: css({
    backgroundColor: { base: "beam.gold", _dark: "beam.gold" },
    color: "sunbeam.black",
    padding: "10px 20px",
    borderRadius: "0",
    border: "1px solid",
    borderColor: { base: "sunshine.500", _dark: "sunshine.300" },
    _hover: { backgroundColor: { base: "sunshine.300", _dark: "sunshine.300" } },
  }),
  ghost: css({
    backgroundColor: "transparent",
    color: "text.primary",
    border: "1px solid",
    borderColor: "border.default",
    padding: "10px 20px",
    borderRadius: "0",
    _hover: { borderColor: "sunbeam.orange", color: "sunbeam.orange" },
  }),
  text: css({
    backgroundColor: "transparent",
    color: "sunbeam.orange",
    padding: 0,
    textDecoration: "underline",
    textUnderlineOffset: "4px",
    _hover: { textDecorationColor: "sunbeam.orange" },
  }),
  primary: css({
    backgroundColor: "sunbeam.orange",
    color: "white",
    padding: "10px 20px",
    borderRadius: "0",
    _hover: { backgroundColor: "sunbeam.flame" },
    _active: { transform: "scale(0.95)" },
  }),
};

const disabledStyle = css({
  opacity: 0.5,
  cursor: "not-allowed",
  pointerEvents: "none",
});

export function Button({
  children,
  variant = "dark",
  href,
  className,
  onClick,
  type = "button",
  disabled,
  "aria-disabled": ariaDisabled,
}: ButtonProps) {
  const classes = cx(base, variants[variant], disabled && disabledStyle, className);

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-disabled={ariaDisabled}>
      {children}
    </button>
  );
}
