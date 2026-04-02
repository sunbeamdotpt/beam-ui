import { Outlet } from "react-router-dom";
import { css } from "styled-system/css";
import { Sidebar } from "../shell/sidebar";
import { docsSidebar } from "../../data/navigation";

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
    <div className={body}>
      <div className={sidebarWrapper}>
        <Sidebar sections={docsSidebar} />
      </div>
      <main className={content}>
        <Outlet />
      </main>
    </div>
  );
}
