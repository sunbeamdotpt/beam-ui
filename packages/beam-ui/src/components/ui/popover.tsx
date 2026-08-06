import { css, cx } from "../../system.ts";

import type { ReactNode } from "react";
import {
  PopoverCloseTrigger,
  PopoverContent,
  PopoverPositioner,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@ark-ui/react/popover";
import { Icon } from "./icon.tsx";

/** Props for {@link Popover}. */
export interface PopoverProps {
  /** Element or text that triggers the popover on click. */
  trigger: ReactNode;
  /** Content displayed inside the popover body. */
  children: ReactNode;
  /** Optional header title. */
  title?: string;
  /** Additional CSS class. */
  className?: string;
}

/**
 * Floating popover with trigger, optional title, and close button using Ark UI.
 * Opens on trigger click, closes on outside click or close button.
 *
 * @example
 * ```tsx
 * <Popover trigger={<button type="button">Info</button>} title="Help">
 *   <p>Additional information here</p>
 * </Popover>
 * ```
 */
export function Popover({
  trigger,
  children,
  title,
  className,
}: PopoverProps): ReactNode {
  return (
    <PopoverRoot positioning={{ placement: "bottom" }}>
      <PopoverTrigger asChild>
        <span className={triggerStyle}>{trigger}</span>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent className={cx(content, className)}>
          <div className={header}>
            {title && <PopoverTitle className={titleStyle}>{title}</PopoverTitle>}
            <PopoverCloseTrigger
              className={closeButton}
              aria-label="Close popover"
            >
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
  maxWidth: "90",
});

const header = css({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: "4 4 0",
});

const titleStyle = css({
  fontSize: "md",
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
  padding: "1",
  marginLeft: "auto",
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
});

const body = css({
  padding: "3 4 4",
  fontSize: "sm",
  fontFamily: "body",
  color: "text.primary",
  lineHeight: 1.5,
});
