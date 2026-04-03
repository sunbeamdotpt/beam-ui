import { type ReactNode } from "react";
import {
  ToggleRoot,
} from "@ark-ui/react/toggle";
import { css, cx } from "styled-system/css";

interface ToggleProps {
  pressed: boolean;
  onChange: (pressed: boolean) => void;
  children: ReactNode;
  className?: string;
}

export function Toggle({ pressed, onChange, children, className }: ToggleProps) {
  return (
    <ToggleRoot
      pressed={pressed}
      onPressedChange={(pressed) => onChange(pressed)}
      className={cx(toggle, pressed ? togglePressed : toggleUnpressed, className)}
    >
      {children}
    </ToggleRoot>
  );
}

const toggle = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  padding: "8px 16px",
  fontSize: "14px",
  fontFamily: "body",
  fontWeight: "button",
  border: "1px solid",
  cursor: "pointer",
  transition: "all 0.15s ease",
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "2px",
  },
});

const toggleUnpressed = css({
  backgroundColor: "bg.card",
  color: "text.primary",
  borderColor: "border.default",
  _hover: {
    borderColor: "sunbeam.orange",
  },
});

const togglePressed = css({
  backgroundColor: "sunbeam.orange",
  color: "white",
  borderColor: "sunbeam.orange",
  _hover: {
    backgroundColor: "sunbeam.flame",
  },
});
