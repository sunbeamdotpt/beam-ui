import { type ReactNode, type CSSProperties } from "react";
import { css, cx } from "styled-system/css";

interface ScrollAreaProps {
  children: ReactNode;
  maxHeight?: string;
  /** "visible" always shows themed scrollbar, "hover" hides until hover, "auto" uses browser default with theme colors */
  scrollbar?: "visible" | "hover" | "auto";
  /** Scroll direction */
  direction?: "vertical" | "horizontal" | "both";
  className?: string;
}

export function ScrollArea({
  children,
  maxHeight,
  scrollbar = "visible",
  direction = "vertical",
  className,
}: ScrollAreaProps) {
  const dirClass =
    direction === "horizontal" ? dirHorizontal
    : direction === "both" ? dirBoth
    : dirVertical;

  const barClass =
    scrollbar === "hover" ? barHover
    : scrollbar === "auto" ? barAuto
    : barVisible;

  const inlineStyle: CSSProperties = {};
  if (maxHeight) inlineStyle.maxHeight = maxHeight;

  // Firefox hover behavior needs JS for scrollbarColor toggle
  const hoverProps = scrollbar === "hover" ? {
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
      (e.currentTarget.style as any).scrollbarColor = "rgba(255,161,16,0.25) transparent";
    },
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
      (e.currentTarget.style as any).scrollbarColor = "transparent transparent";
    },
  } : {};

  // Firefox scrollbar inline styles (Panda can't compile these)
  const scrollbarInline: Record<string, string> =
    scrollbar === "hover"
      ? { scrollbarWidth: "thin", scrollbarColor: "transparent transparent" }
      : { scrollbarWidth: "thin", scrollbarColor: "rgba(255,161,16,0.25) transparent" };

  return (
    <div
      className={cx(base, dirClass, barClass, className)}
      style={{
        ...inlineStyle,
        ...scrollbarInline,
      }}
      {...hoverProps}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Base                                                                */
/* ------------------------------------------------------------------ */

const base = css({
  position: "relative",
});

const dirVertical = css({ overflowY: "auto", overflowX: "hidden" });
const dirHorizontal = css({ overflowX: "auto", overflowY: "hidden" });
const dirBoth = css({ overflow: "auto" });

/* ------------------------------------------------------------------ */
/* Scrollbar variants                                                  */
/* ------------------------------------------------------------------ */

/** Always visible, themed golden scrollbar */
const barVisible = css({
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(255,161,16,0.25) transparent",

  "&::-webkit-scrollbar": { width: "4px", height: "4px" },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255,161,16,0.25)",
    borderRadius: "9999px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "rgba(255,161,16,0.5)",
  },
  "&::-webkit-scrollbar-corner": { background: "transparent" },
});

/** Hidden by default, appears on hover with golden theme */
const barHover = css({
  /* Firefox: scrollbarColor toggled via JS events above */

  "&::-webkit-scrollbar": { width: "4px", height: "4px" },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
    borderRadius: "9999px",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    background: "rgba(255,161,16,0.25)",
  },
  "&:hover::-webkit-scrollbar-thumb:hover": {
    background: "rgba(255,161,16,0.5)",
  },
  "&::-webkit-scrollbar-corner": { background: "transparent" },
});

/** Browser default scrollbar with theme-matching colors */
const barAuto = css({
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(127,99,21,0.25) transparent",

  "&::-webkit-scrollbar": { width: "6px", height: "6px" },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(127,99,21,0.25)",
    borderRadius: "9999px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "rgba(127,99,21,0.4)",
  },
  "&::-webkit-scrollbar-corner": { background: "transparent" },
});
