import { type ReactNode } from "react";
import {
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardPositioner,
  HoverCardContent,
} from "@ark-ui/react/hover-card";
import { css, cx } from "styled-system/css";

/** Props for {@link HoverCard}. */
interface HoverCardProps {
  /** Content that triggers the hover card on mouse hover. */
  trigger: ReactNode;
  /** Content displayed in the popover when hovering. */
  children: ReactNode;
  /** Optional CSS class for the popover content container. */
  className?: string;
}

/**
 * Popover that appears on hover with a 300ms open delay and 100ms close delay.
 *
 * @example
 * ```tsx
 * <HoverCard trigger={<span>Hover me</span>}>
 *   <p>This appears on hover</p>
 * </HoverCard>
 * ```
 */
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
