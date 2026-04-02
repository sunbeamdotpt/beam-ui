import { Outlet } from "react-router-dom";
import { css } from "styled-system/css";
import { Sidebar } from "../shell/sidebar";
import { apiSidebar } from "../../data/navigation";

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
    <div className={body}>
      <div className={sidebarWrapper}>
        <Sidebar sections={apiSidebar} />
      </div>
      <div className={panels}>
        <Outlet />
      </div>
    </div>
  );
}
