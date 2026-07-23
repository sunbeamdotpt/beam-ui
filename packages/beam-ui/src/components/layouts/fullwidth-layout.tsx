import { css } from "../../system.ts";

import type { ReactNode } from "react";
import { Sidebar } from "../shell/sidebar.tsx";
import { docsSidebar } from "../../data/navigation.ts";
import type { LinkComponent } from "../../utils/polymorphic.ts";

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

/** Props for {@link FullwidthLayout}. */
export interface FullwidthLayoutProps {
  /** Page content. */
  children: ReactNode;
  /** Current path used to compute active sidebar item. */
  currentPath?: string;
  /** Component used to render links. Defaults to a plain `<a>`. */
  linkAs?: LinkComponent;
}

/**
 * Two-column layout with sidebar and full-width centered content.
 * Sidebar hides on tablet and below. No right rail or additional columns.
 *
 * @example
 * ```tsx
 * <FullwidthLayout currentPath="/models">
 *   <MyPage />
 * </FullwidthLayout>
 * ```
 */
export function FullwidthLayout({
  children,
  currentPath = "",
  linkAs,
}: FullwidthLayoutProps): ReactNode {
  return (
    <>
      <a href="#main-content" className={srOnly}>Skip to main content</a>
      <div className={body}>
        <div className={sidebarWrapper}>
          <Sidebar sections={docsSidebar} currentPath={currentPath} linkAs={linkAs} />
        </div>
        <main className={content} id="main-content">
          {children}
        </main>
      </div>
    </>
  );
}
