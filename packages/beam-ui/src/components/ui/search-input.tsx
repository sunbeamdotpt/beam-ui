import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

interface SearchInputProps {
  className?: string;
}

export function SearchInput({ className }: SearchInputProps) {
  return (
    <div className={cx(wrapper, className)}>
      <div className={iconLeft}>
        <Icon name="search" size={16} />
      </div>
      <input
        type="text"
        placeholder="Search docs..."
        readOnly
        aria-label="Search"
        className={input}
      />
      <div className={kbdWrapper}>
        <kbd className={kbd}>&#8984;K</kbd>
      </div>
    </div>
  );
}

const wrapper = css({
  position: "relative",
  display: "block",
});

const iconLeft = css({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: "12px",
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
  opacity: 0.5,
});

const input = css({
  backgroundColor: "rgba(255, 240, 194, 0.5)",
  border: "1px solid rgba(255, 208, 106, 0.3)",
  borderRadius: "0",
  paddingLeft: "40px",
  paddingRight: "48px",
  paddingTop: "8px",
  paddingBottom: "8px",
  fontSize: "14px",
  width: "256px",
  outline: "none",
  fontFamily: "body",
  color: "text.primary",
  _focus: {
    ringWidth: "2px",
    ringColor: "sunbeam.orange",
    borderColor: "transparent",
  },
});

const kbdWrapper = css({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: "12px",
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
});

const kbd = css({
  fontSize: "10px",
  fontWeight: "button",
  padding: "2px 6px",
  borderRadius: "sm",
  border: "1px solid rgba(255, 208, 106, 0.5)",
  opacity: 0.5,
  fontFamily: "body",
});
