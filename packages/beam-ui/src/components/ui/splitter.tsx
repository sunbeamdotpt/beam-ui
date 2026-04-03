import { type ReactNode } from "react";
import {
  SplitterRoot,
  SplitterPanel,
  SplitterResizeTrigger,
} from "@ark-ui/react/splitter";
import { css } from "styled-system/css";

interface SplitterProps {
  children: [ReactNode, ReactNode];
  direction?: "horizontal" | "vertical";
  defaultSize?: number;
}

export function Splitter({
  children,
  direction = "horizontal",
  defaultSize = 50,
}: SplitterProps) {
  const orientation = direction === "horizontal" ? "horizontal" : "vertical";

  return (
    <SplitterRoot
      orientation={orientation}
      size={[
        { id: "panel-a", size: defaultSize },
        { id: "panel-b", size: 100 - defaultSize },
      ]}
      className={root}
    >
      <SplitterPanel id="panel-a" className={panel}>
        {children[0]}
      </SplitterPanel>

      <SplitterResizeTrigger id="panel-a:panel-b" className={direction === "horizontal" ? handleH : handleV}>
        <div className={direction === "horizontal" ? handleBarH : handleBarV} />
      </SplitterResizeTrigger>

      <SplitterPanel id="panel-b" className={panel}>
        {children[1]}
      </SplitterPanel>
    </SplitterRoot>
  );
}

const root = css({
  display: "flex",
  width: "100%",
  height: "100%",
});

const panel = css({
  overflow: "auto",
});

const handleH = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "8px",
  cursor: "col-resize",
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  transition: "all 0.15s ease",
  _hover: {
    "& > div": {
      backgroundColor: "sunbeam.orange",
    },
  },
  _active: {
    "& > div": {
      backgroundColor: "sunbeam.orange",
    },
  },
});

const handleV = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "8px",
  cursor: "row-resize",
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  transition: "all 0.15s ease",
  _hover: {
    "& > div": {
      backgroundColor: "sunbeam.orange",
    },
  },
  _active: {
    "& > div": {
      backgroundColor: "sunbeam.orange",
    },
  },
});

const handleBarH = css({
  width: "2px",
  height: "32px",
  backgroundColor: "border.default",
  borderRadius: "full",
  transition: "background-color 0.15s ease",
});

const handleBarV = css({
  height: "2px",
  width: "32px",
  backgroundColor: "border.default",
  borderRadius: "full",
  transition: "background-color 0.15s ease",
});
