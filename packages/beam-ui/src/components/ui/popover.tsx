import { type ReactNode } from "react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
  PopoverTitle,
  PopoverCloseTrigger,
} from "@ark-ui/react/popover";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Popover({
  trigger,
  children,
  title,
  className,
}: PopoverProps) {
  return (
    <PopoverRoot positioning={{ placement: "bottom" }}>
      <PopoverTrigger asChild>
        <span className={triggerStyle}>{trigger}</span>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent className={cx(content, className)}>
          <div className={header}>
            {title && <PopoverTitle className={titleStyle}>{title}</PopoverTitle>}
            <PopoverCloseTrigger className={closeButton}>
              <Icon name="close" size={16} />
            </PopoverCloseTrigger>
          </div>
          <div className={body}>{children}</div>
        </PopoverContent>
      </PopoverPositioner>
    </PopoverRoot>
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
  zIndex: 50,
  outline: "none",
  maxWidth: "360px",
});

const header = css({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: "16px 16px 0",
});

const titleStyle = css({
  fontSize: "16px",
  fontWeight: "heading",
  fontFamily: "heading",
  color: "text.primary",
  margin: 0,
  lineHeight: 1.3,
});

const closeButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "text.secondary",
  padding: "4px",
  marginLeft: "auto",
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
});

const body = css({
  padding: "12px 16px 16px",
  fontSize: "14px",
  fontFamily: "body",
  color: "text.primary",
  lineHeight: 1.5,
});
