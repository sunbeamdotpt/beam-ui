import { type ReactNode } from "react";
import { Outlet } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { Header } from "./header";
import { Footer } from "./footer";

/** Props for {@link Shell}. */
interface ShellProps {
  /** Show the theme toggle in the header. Defaults to true. */
  showThemeToggle?: boolean;
  /** Extra elements rendered in the header's right group before the theme toggle */
  headerActions?: ReactNode;
  /** Replace the default Header with a custom element. */
  header?: ReactNode;
  /** Replace the default Footer with a custom element. */
  footer?: ReactNode;
  /** Content to render. If omitted, renders <Outlet /> for React Router. */
  children?: ReactNode;
  className?: string;
}

const shellStyle = css({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const mainStyle = css({
  flex: 1,
  paddingTop: "64px",
});

/**
 * Top-level layout component combining Header, main content area, and Footer.
 *
 * Arranges content in a flexible column with fixed header (64px) and footer.
 * Accepts custom Header and Footer via props, or renders defaults.
 * Automatically renders children into a Router Outlet if not provided.
 *
 * @example
 * ```tsx
 * <Shell showThemeToggle={true} headerActions={<Settings />}>
 *   <MyPageContent />
 * </Shell>
 * ```
 */
export function Shell({
  showThemeToggle = true,
  headerActions,
  header,
  footer,
  children,
  className,
}: ShellProps): ReactNode {
  return (
    <div className={className ?? shellStyle}>
      {header !== undefined ? header : <Header showThemeToggle={showThemeToggle} actions={headerActions} />}
      <div className={mainStyle}>
        {children ?? <Outlet />}
      </div>
      {footer !== undefined ? footer : <Footer />}
    </div>
  );
}
