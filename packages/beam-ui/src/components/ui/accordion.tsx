import { type ReactNode } from "react";
import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionItemIndicator,
} from "@ark-ui/react/accordion";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

interface AccordionEntry {
  value: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionEntry[];
  multiple?: boolean;
  defaultValue?: string[];
  className?: string;
}

export function Accordion({
  items,
  multiple = false,
  defaultValue,
  className,
}: AccordionProps) {
  return (
    <AccordionRoot
      multiple={multiple}
      defaultValue={defaultValue}
      className={cx(root, className)}
    >
      {items.map((entry) => (
        <AccordionItem key={entry.value} value={entry.value} className={item}>
          <AccordionItemTrigger className={trigger}>
            <span>{entry.title}</span>
            <AccordionItemIndicator className={indicator}>
              <Icon name="expand_more" size={20} />
            </AccordionItemIndicator>
          </AccordionItemTrigger>
          <AccordionItemContent className={content}>
            <div className={panel}>{entry.content}</div>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}

const root = css({
  width: "100%",
});

const item = css({
  borderBottom: "1px solid",
  borderColor: "border.default",
});

const trigger = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "12px 0",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "heading",
  fontFamily: "body",
  color: "text.primary",
  outline: "none",
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
});

const indicator = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "text.secondary",
  transition: "transform 0.2s ease, color 0.15s ease",
  "[data-state=open] &": {
    transform: "rotate(180deg)",
    color: "sunbeam.orange",
  },
});

const content = css({
  overflow: "hidden",
});

const panel = css({
  padding: "12px",
  fontSize: "14px",
  fontFamily: "body",
  color: "text.primary",
  lineHeight: 1.5,
  backgroundColor: "bg.card",
});
