import { type ReactNode } from "react";
import {
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardPositioner,
  HoverCardContent,
} from "@ark-ui/react/hover-card";
import { css, cx } from "styled-system/css";

interface HoverCardProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export function HoverCard({ trigger, children, className }: HoverCardProps) {
  return (
    <HoverCardRoot openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        <span className={triggerStyle}>{trigger}</span>
      </HoverCardTrigger>
      <HoverCardPositioner>
        <HoverCardContent className={cx(content, className)}>
          {children}
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCardRoot>
  );
}

const triggerStyle = css({
  display: "inline-flex",
  cursor: "pointer",
});

const content = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  shadow: "golden",
  padding: "16px",
  fontSize: "14px",
  fontFamily: "body",
  color: "text.primary",
  lineHeight: 1.5,
  zIndex: 50,
  maxWidth: "320px",
});
