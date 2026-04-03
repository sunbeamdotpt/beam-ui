import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from "@ark-ui/react/collapsible";
import { css } from "styled-system/css";
import { token } from "styled-system/tokens";
import type { NavSection } from "../../data/navigation";

const aside = css({
  width: "240px",
  minWidth: "240px",
  position: "sticky",
  top: "64px",
  height: "calc(100vh - 64px)",
  overflowY: "auto",
  bg: "bg.page",
  paddingInline: "24px",
  paddingBlock: "32px",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    bg: "sunshine.300",
    borderRadius: "10px",
  },
});

const sectionGroup = css({
  marginBottom: "32px",
});

const sectionHeader = css({
  fontSize: "11px",
  fontWeight: "button",
  color: "sectionLabel",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  marginBottom: "16px",
});

const itemList = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const itemLink = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBlock: "8px",
  paddingInline: "12px",
  fontSize: "14px",
  fontWeight: "body",
  color: "text.secondary",
  textDecoration: "none",
  borderLeft: "3px solid transparent",
  transition: "all 0.15s",
  _hover: {
    color: "accent",
  },
});

const itemLinkActive = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBlock: "8px",
  paddingInline: "12px",
  fontSize: "14px",
  fontWeight: "button",
  color: "accent",
  textDecoration: "none",
  borderLeft: "3px solid",
  borderLeftColor: "sunbeam.orange",
  bg: "rgba(255, 240, 194, 0.3)",
});

const collapsibleTrigger = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  paddingBlock: "8px",
  paddingInline: "12px",
  fontSize: "14px",
  fontWeight: "body",
  color: "text.primary",
  textDecoration: "none",
  bg: "transparent",
  border: "none",
  cursor: "pointer",
  borderLeft: "3px solid transparent",
  transition: "all 0.15s",
  _hover: {
    color: "accent",
  },
});

const collapsibleTriggerActive = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  paddingBlock: "8px",
  paddingInline: "12px",
  fontSize: "14px",
  fontWeight: "button",
  color: "text.primary",
  bg: "transparent",
  border: "none",
  cursor: "pointer",
  borderLeft: "3px solid transparent",
});

const chevron = css({
  fontSize: "18px",
  transition: "transform 0.2s",
  color: "text.muted",
  lineHeight: 1,
});

const chevronOpen = css({
  fontSize: "18px",
  transition: "transform 0.2s",
  transform: "rotate(90deg)",
  color: "text.muted",
  lineHeight: 1,
});

const childList = css({
  marginLeft: "16px",
  borderLeft: "1px solid",
  borderLeftColor: "border.default",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  paddingBlock: "2px",
});

const childLink = css({
  display: "block",
  paddingBlock: "8px",
  paddingLeft: "16px",
  fontSize: "14px",
  fontWeight: "body",
  color: "text.secondary",
  textDecoration: "none",
  borderLeft: "3px solid transparent",
  marginLeft: "-1px",
  transition: "all 0.15s",
  _hover: {
    color: "accent",
  },
});

const childLinkActive = css({
  display: "block",
  paddingBlock: "8px",
  paddingLeft: "16px",
  fontSize: "14px",
  fontWeight: "button",
  color: "accent",
  textDecoration: "none",
  borderLeft: "3px solid",
  borderLeftColor: "sunbeam.orange",
  marginLeft: "-1px",
  bg: "rgba(255, 240, 194, 0.3)",
});

interface SidebarProps {
  sections: NavSection[];
}

function SidebarItem({ item }: { item: NavSection["items"][number] }) {
  const location = useLocation();
  const isActive = location.pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;
  const childActive = hasChildren
    ? item.children!.some((c) => location.pathname === c.href)
    : false;
  const [open, setOpen] = useState(isActive || childActive);

  if (!hasChildren) {
    return (
      <Link
        to={item.href}
        className={isActive ? itemLinkActive : itemLink}
        {...(isActive ? { "aria-current": "page" as const } : {})}
      >
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <CollapsibleRoot open={open} onOpenChange={(d) => setOpen(d.open)}>
      <CollapsibleTrigger
        className={isActive || childActive ? collapsibleTriggerActive : collapsibleTrigger}
      >
        <span>{item.label}</span>
        <span className={open ? chevronOpen : chevron}>&#x203A;</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className={childList}>
          {item.children!.map((child) => {
            const cActive = location.pathname === child.href;
            return (
              <Link
                key={child.label}
                to={child.href}
                className={cActive ? childLinkActive : childLink}
                {...(cActive ? { "aria-current": "page" as const } : {})}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      </CollapsibleContent>
    </CollapsibleRoot>
  );
}

export function Sidebar({ sections }: SidebarProps) {
  return (
    <aside className={aside} aria-label="Documentation navigation">
      {sections.map((section) => (
        <div key={section.title} className={sectionGroup}>
          <h3 className={sectionHeader}>{section.title}</h3>
          <div className={itemList}>
            {section.items.map((item) => (
              <SidebarItem key={item.label} item={item} />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
