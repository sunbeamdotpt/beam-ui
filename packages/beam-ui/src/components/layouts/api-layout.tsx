import { Outlet } from "react-router-dom";
import { css } from "styled-system/css";
import { Sidebar } from "../shell/sidebar";
import { apiSidebar } from "../../data/navigation";

const body = css({
  display: "flex",
  flex: 1,
  overflow: "hidden",
  height: "calc(100vh - 64px)",
});

const panels = css({
  display: "flex",
  flex: 1,
  overflow: "hidden",
});

export const apiLeftPanel = css({
  width: "55%",
  overflowY: "auto",
  bg: "bg.page",
  paddingInline: "24px",
});

export const apiRightPanel = css({
  width: "45%",
  overflowY: "auto",
  bg: "sunbeam.black",
  color: "white",
});

export function ApiLayout() {
  return (
    <div className={body}>
      <Sidebar sections={apiSidebar} />
      <div className={panels}>
        <Outlet />
      </div>
    </div>
  );
}
