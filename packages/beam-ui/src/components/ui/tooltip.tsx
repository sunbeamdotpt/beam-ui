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

interface TooltipProps {
  content: string;
  children: ReactNode;
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
