import { Outlet, useOutletContext } from "react-router-dom";
import { css } from "styled-system/css";
import { Sidebar } from "../shell/sidebar";
import { RightRail } from "../shell/right-rail";
import { docsSidebar } from "../../data/navigation";
import { useState } from "react";

const body = css({
  display: "flex",
  alignItems: "flex-start",
  maxWidth: "1440px",
  marginInline: "auto",
  width: "100%",
});

const sidebarWrapper = css({
  display: { base: "none", lg: "block" },
});

const rightRailWrapper = css({
  display: { base: "none", lg: "block" },
});

const content = css({
  flex: 1,
  minWidth: 0,
  paddingInline: { base: "24px", md: "48px", lg: "120px" },
  paddingBlock: "32px",
  overflow: "visible",
});

const center = css({
  maxWidth: "720px",
});

export interface DocsTocItem {
  label: string;
  id: string;
}

interface DocsContext {
  setToc: (items: DocsTocItem[]) => void;
}

export function useDocsContext() {
  return useOutletContext<DocsContext>();
}

export function DocsLayout() {
  const [toc, setToc] = useState<DocsTocItem[]>([]);

  return (
    <div className={body}>
      <div className={sidebarWrapper}>
        <Sidebar sections={docsSidebar} />
      </div>
      <div className={content}>
        <div className={center} data-content="center">
          <Outlet context={{ setToc } satisfies DocsContext} />
        </div>
      </div>
      {toc.length > 0 && (
        <div className={rightRailWrapper}>
          <RightRail items={toc} />
        </div>
      )}
    </div>
  );
}
