import { Outlet } from "react-router-dom";
import { css } from "styled-system/css";
import { Sidebar } from "../shell/sidebar";
import { docsSidebar } from "../../data/navigation";

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
  maxWidth: "1440px",
  marginInline: "auto",
  width: "100%",
});

const sidebarWrapper = css({
  display: { base: "none", lg: "block" },
});

const content = css({
  flex: 1,
  minWidth: 0,
  maxWidth: "900px",
  paddingInline: { base: "24px", md: "48px", lg: "120px" },
  paddingBlock: "32px",
  overflow: "visible",
});

export function FullwidthLayout() {
  return (
    <>
    <a href="#main-content" className={srOnly}>Skip to main content</a>
    <div className={body}>
      <div className={sidebarWrapper}>
        <Sidebar sections={docsSidebar} />
      </div>
      <main className={content} id="main-content">
        <Outlet />
      </main>
    </div>
    </>
  );
}
