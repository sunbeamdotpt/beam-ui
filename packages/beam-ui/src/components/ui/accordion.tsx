import { css, cx } from "../../system.ts";

import type { ReactNode } from "react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRoot,
} from "@ark-ui/react/accordion";
import { Icon } from "./icon.tsx";

/** Represents a single accordion section. */
interface AccordionEntry {
  /** Unique identifier for the accordion item. */
  value: string;
  /** Visible heading text. */
  title: string;
  /** Content displayed when the item is expanded. */
  content: ReactNode;
}

/** Props for {@link Accordion}. */
export interface AccordionProps {
  /** Array of accordion items to render. */
  items: AccordionEntry[];
  /** If true, multiple sections can be expanded simultaneously; otherwise only one. Defaults to false. */
  multiple?: boolean;
  /** Section(s) expanded by default; array of `value` strings. */
  defaultValue?: string[];
  /** Additional Panda CSS classes. */
  className?: string;
}

/**
 * Collapsible accordion with one or many expandable sections.
 *
 * Each section shows a title and expands on click to reveal content. The expand/collapse
 * icon rotates 180° when open.
 *
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     { value: "q1", title: "How does it work?", content: "..." },
 *     { value: "q2", title: "Is it free?", content: "..." },
 *   ]}
 *   multiple={false}
 * />
 * ```
 */
export function Accordion({
  items,
  multiple = false,
  defaultValue,
  className,
}: AccordionProps): ReactNode {
  return (
    <AccordionRoot
      collapsible
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
  transition: "color 0.15s ease",
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "2px",
  },
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
