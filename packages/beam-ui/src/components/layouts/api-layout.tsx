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

export const apiLeftPanel = css({
  width: { base: "100%", lg: "55%" },
  overflowY: "auto",
  bg: "bg.page",
  paddingInline: "24px",
});

export const apiRightPanel = css({
  width: { base: "100%", lg: "45%" },
  overflowY: "auto",
  bg: "sunbeam.black",
  color: "white",
});

export function ApiLayout() {
  return (
    <>
    <a href="#main-content" className={srOnly}>Skip to main content</a>
    <div className={body}>
      <div className={sidebarWrapper}>
        <Sidebar sections={apiSidebar} />
      </div>
      <main className={panels} role="main" id="main-content">
        <Outlet />
      </main>
    </div>
    </>
  );
}
