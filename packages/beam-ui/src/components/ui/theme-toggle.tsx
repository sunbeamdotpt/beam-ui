import { css, cx } from "styled-system/css";
import { useTheme } from "../../hooks/use-theme";
import { Icon } from "./icon";

interface ThemeToggleProps {
  /** "icon" shows sun/moon, "switch" shows a labeled toggle, "pill" shows a segmented control */
  variant?: "icon" | "switch" | "pill";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  if (variant === "pill") {
    return (
      <div className={cx(pillContainer, className)} role="radiogroup" aria-label="Color theme">
        <button
          className={cx(pillOption, !isDark && pillActive)}
          onClick={() => isDark && toggle()}
          role="radio"
          aria-checked={!isDark}
          aria-label="Light mode"
        >
          <Icon name="light_mode" size={16} />
          <span>Light</span>
        </button>
        <button
          className={cx(pillOption, isDark && pillActive)}
          onClick={() => !isDark && toggle()}
          role="radio"
          aria-checked={isDark}
          aria-label="Dark mode"
        >
          <Icon name="dark_mode" size={16} />
          <span>Dark</span>
        </button>
      </div>
    );
  }

  if (variant === "switch") {
    return (
      <button
        className={cx(switchBtn, className)}
        onClick={toggle}
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className={switchTrack}>
          <span className={cx(switchThumb, isDark && switchThumbDark)} />
        </span>
        <span className={switchLabel}>
          <Icon name={isDark ? "dark_mode" : "light_mode"} size={16} />
          {isDark ? "Dark" : "Light"}
        </span>
      </button>
    );
  }

  // Default: icon variant — matches the header's theme button
  return (
    <button
      className={cx(iconBtn, className)}
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: "20px", color: isDark ? "#ffd06a" : undefined }}
      >
        {isDark ? "dark_mode" : "light_mode"}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const iconBtn = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  color: "text.secondary",
  fontSize: "20px",
  transition: "color 0.2s",
  _hover: {
    color: "accent",
  },
});

const switchBtn = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
});

const switchTrack = css({
  position: "relative",
  width: "40px",
  height: "22px",
  borderRadius: "full",
  backgroundColor: "border.default",
  transition: "background-color 0.2s ease",
});

const switchThumb = css({
  position: "absolute",
  top: "2px",
  left: "2px",
  width: "18px",
  height: "18px",
  borderRadius: "full",
  backgroundColor: "white",
  transition: "transform 0.2s ease",
  shadow: "sm",
});

const switchThumbDark = css({
  transform: "translateX(18px)",
  backgroundColor: "sunbeam.orange",
});

const switchLabel = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "13px",
  fontWeight: "button",
  color: "text.secondary",
  fontFamily: "body",
});

const pillContainer = css({
  display: "inline-flex",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  padding: "2px",
  gap: "2px",
});

const pillOption = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 14px",
  fontSize: "12px",
  fontWeight: "button",
  fontFamily: "body",
  color: "text.muted",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  transition: "all 0.15s ease",
  _hover: {
    color: "text.primary",
  },
});

const pillActive = css({
  backgroundColor: "sunbeam.orange",
  color: "white",
  _hover: {
    color: "white",
  },
});
