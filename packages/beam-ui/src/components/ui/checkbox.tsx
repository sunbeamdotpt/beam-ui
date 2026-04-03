import { useRef, useEffect } from "react";
import { css, cx } from "styled-system/css";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
  className,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      className={cx(
        wrapper,
        disabled ? disabledStyle : undefined,
        className
      )}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={hiddenInput}
      />
      <div
        className={cx(
          box,
          checked || indeterminate ? boxChecked : undefined
        )}
      >
        {indeterminate ? (
          <svg width="10" height="2" viewBox="0 0 10 2" fill="none" aria-hidden="true">
            <rect width="10" height="2" rx="1" fill="white" />
          </svg>
        ) : checked ? (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </div>
      {label && <span className={labelStyle}>{label}</span>}
    </label>
  );
}

const wrapper = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  userSelect: "none",
});

const disabledStyle = css({
  opacity: 0.5,
  cursor: "not-allowed",
});

const hiddenInput = css({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
});

const box = css({
  width: "18px",
  height: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "sm",
  backgroundColor: "transparent",
  transition: "all 0.15s ease",
  flexShrink: 0,
  "input:focus-visible + &": {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "2px",
  },
});

const boxChecked = css({
  backgroundColor: "#fa520f",
  borderColor: "#fa520f",
});

const labelStyle = css({
  fontSize: "14px",
  color: "text.primary",
  fontFamily: "body",
  lineHeight: 1.4,
});
