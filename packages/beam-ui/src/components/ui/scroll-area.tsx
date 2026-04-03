import { type ReactNode } from "react";
import { css, cx } from "styled-system/css";

interface ScrollAreaProps {
  children: ReactNode;
  maxHeight?: string;
  className?: string;
}

export function ScrollArea({ children, maxHeight = "300px", className }: ScrollAreaProps) {
  return (
    <div className={cx(container, className)} style={{ maxHeight }}>
      {children}
    </div>
  );
}

const container = css({
  overflow: "auto",
  position: "relative",

  /* Warm golden scrollbar */
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(127,99,21,0.25) transparent",

  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(127,99,21,0.25)",
    borderRadius: "9999px",
    transition: "background-color 0.15s ease",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(127,99,21,0.4)",
  },
  "&::-webkit-scrollbar-corner": {
    background: "transparent",
  },
});
