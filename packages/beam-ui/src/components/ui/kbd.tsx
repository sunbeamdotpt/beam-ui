import { css, cx } from "styled-system/css";

interface KbdProps {
  children: string;
  className?: string;
}

const kbdStyle = css({
  display: "inline-block",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderBottomWidth: "2px",
  borderRadius: "sm",
  fontFamily: "mono",
  fontSize: "11px",
  fontWeight: "body",
  lineHeight: 1,
  padding: "3px 6px",
  color: "text.secondary",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
});

export function Kbd({ children, className }: KbdProps) {
  return <kbd className={cx(kbdStyle, className)}>{children}</kbd>;
}
