import { Outlet, useLocation } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { Sidebar } from "../shell/sidebar.tsx";
import { RightRail } from "../shell/right-rail.tsx";
import { docsSidebar } from "../../data/navigation.ts";
import { useState, createContext, useContext, type ReactNode } from "react";

const body = css({
  display: "flex",
  alignItems: "stretch",
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

const center = css({
  maxWidth: "720px",
});

/** Single item in the table of contents shown in {@link RightRail}. */
export interface DocsTocItem {
  /** Display label for the heading. */
  label: string;
  /** Unique ID matching the heading's `id` attribute for smooth scrolling. */
  id: string;
}

interface DocsContextValue {
  setToc: (items: DocsTocItem[]) => void;
}

const DocsContext = createContext<DocsContextValue | null>(null);

/**
 * Retrieve the table-of-contents setter from {@link DocsLayout} context.
 * Used by child pages to populate the right-rail navigation.
 *
 * @returns Object with `setToc` function to update the visible TOC.
 */
export function useDocsContext(): DocsContextValue {
  const ctx = useContext(DocsContext);
  if (!ctx) {
    throw new Error("useDocsContext must be used within a DocsLayout");
  }
  return ctx;
}

/**
 * Three-column docs layout: sidebar (navigation), center (content), and right rail (TOC).
 * Sidebar and right rail hide on tablet and below. Manages table-of-contents state via outlet context.
 *
 * @param pageDates Optional map of route paths to last-updated timestamps, shown in the right rail.
 *
 * @example
 * ```tsx
 * <DocsLayout pageDates={{ "/docs/intro": "2026-05-01" }}>
 *   <Outlet />
 * </DocsLayout>
 * ```
 */
export function DocsLayout({ pageDates }: { pageDates?: Record<string, string> } = {}): ReactNode {
  const [toc, setToc] = useState<DocsTocItem[]>([]);
  const location = useLocation();
  const lastUpdated = pageDates?.[location.pathname];

  return (
    <>
    <a href="#main-content" className={srOnly}>Skip to main content</a>
    <div className={body}>
      <div className={sidebarWrapper}>
        <Sidebar sections={docsSidebar} />
      </div>
      <main className={content} id="main-content">
        <div className={center} data-content="center">
          <DocsContext.Provider value={{ setToc }}>
            <Outlet />
          </DocsContext.Provider>
        </div>
      </main>
      {toc.length > 0 && (
        <div className={rightRailWrapper}>
          <RightRail items={toc} lastUpdated={lastUpdated} />
        </div>
      )}
    </div>
    </>
  );
}
