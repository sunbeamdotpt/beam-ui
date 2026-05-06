import { type ReactNode } from "react";
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipPositioner,
  TooltipContent,
  TooltipArrow,
  TooltipArrowTip,
} from "@ark-ui/react/tooltip";
import { css } from "styled-system/css";

/** Props for {@link Tooltip}. */
interface TooltipProps {
  /** Tooltip text displayed on hover. */
  content: string;
  /** Element that triggers the tooltip. */
  children: ReactNode;
  /** Tooltip placement relative to the trigger. Defaults to `"top"`. */
  position?: "top" | "bottom" | "left" | "right";
}

const contentStyle = css({
  backgroundColor: "sunbeam.black",
  color: "white",
  fontSize: "12px",
  padding: "6px 12px",
  borderRadius: "sm",
  lineHeight: 1.4,
  maxWidth: "240px",
  zIndex: 1000,
});

const arrowStyle = css({
  "--arrow-size": "8px",
  "--arrow-background": "var(--colors-sunbeam-black)",
});

/**
 * Accessible tooltip using Ark UI with 200ms open delay and positioned arrow.
 * Content is plain text; black background with white text.
 *
 * @example
 * ```tsx
 * <Tooltip content="Save changes" position="top">
 *   <button>Save</button>
 * </Tooltip>
 * ```
 */
export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  return (
    <TooltipRoot openDelay={200} positioning={{ placement: position }}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipPositioner>
        <TooltipContent className={contentStyle}>
          <TooltipArrow className={arrowStyle}>
            <TooltipArrowTip />
          </TooltipArrow>
          {content}
        </TooltipContent>
      </TooltipPositioner>
    </TooltipRoot>
  );
}
