import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { css } from "styled-system/css";
import { Header } from "./header";
import { Footer } from "./footer";

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

export function Shell({
  showThemeToggle = true,
  headerActions,
  header,
  footer,
  children,
  className,
}: ShellProps) {
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
