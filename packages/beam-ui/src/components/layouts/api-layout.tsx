import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { css } from "styled-system/css";
import { Sidebar } from "../shell/sidebar";
import { apiSidebar } from "../../data/navigation";

const srOnly = css({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
  _focus: {
    position: "fixed",
    top: "4px",
    left: "4px",
    width: "auto",
    height: "auto",
    padding: "8px 16px",
    margin: 0,
    overflow: "visible",
    clip: "auto",
    whiteSpace: "normal",
    zIndex: 9999,
    bg: "bg.card",
    color: "accent",
    fontWeight: "button",
    fontSize: "14px",
    border: "2px solid",
    borderColor: "accent",
  },
});

const body = css({
  display: "flex",
  flex: 1,
  overflow: "hidden",
  height: { base: "auto", lg: "calc(100vh - 64px)" },
  minHeight: { base: "calc(100vh - 64px)", lg: "auto" },
  flexDirection: { base: "column", lg: "row" },
});

const sidebarWrapper = css({
  display: { base: "none", lg: "block" },
});

const panels = css({
  display: "flex",
  flex: 1,
  overflow: { base: "visible", lg: "hidden" },
  flexDirection: { base: "column", lg: "row" },
});

/** CSS class for API layout's left content panel (55% width on desktop). */
export const apiLeftPanel: string = css({
  width: { base: "100%", lg: "55%" },
  overflowY: "auto",
  bg: "bg.page",
  paddingInline: "24px",
});

/** CSS class for API layout's right panel (45% width on desktop, dark background). */
export const apiRightPanel: string = css({
  width: { base: "100%", lg: "45%" },
  overflowY: "auto",
  bg: "sunbeam.black",
  color: "white",
});

/**
 * Two-column layout for API documentation. Sidebar on the left (hidden on mobile),
 * split main content area with left panel for prose and right panel for code examples.
 *
 * @example
 * ```tsx
 * <ApiLayout />
 * ```
 */
export function ApiLayout(): ReactNode {
  return (
    <>
    <a href="#main-content" className={srOnly}>Skip to main content</a>
    <div className={body}>
      <div className={sidebarWrapper}>
        <Sidebar sections={apiSidebar} />
      </div>
      <main className={panels} id="main-content">
        <Outlet />
      </main>
    </div>
    </>
  );
}
