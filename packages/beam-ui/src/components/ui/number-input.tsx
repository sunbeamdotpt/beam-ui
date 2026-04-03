import {
  NumberInputRoot,
  NumberInputLabel,
  NumberInputControl,
  NumberInputInput,
  NumberInputIncrementTrigger,
  NumberInputDecrementTrigger,
} from "@ark-ui/react/number-input";
import { css } from "styled-system/css";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

export function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
}: NumberInputProps) {
  return (
    <NumberInputRoot
      value={String(value)}
      onValueChange={(details) => onChange(details.valueAsNumber)}
      min={min}
      max={max}
      step={step}
      className={root}
    >
      {label && <NumberInputLabel className={labelStyle}>{label}</NumberInputLabel>}
      <NumberInputControl className={control}>
        <NumberInputDecrementTrigger className={trigger}>
          <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
            <path d="M0 1h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </NumberInputDecrementTrigger>
        <NumberInputInput className={input} />
        <NumberInputIncrementTrigger className={trigger}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </NumberInputIncrementTrigger>
      </NumberInputControl>
    </NumberInputRoot>
  );
}

const root = css({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

const labelStyle = css({
  fontSize: "14px",
  fontWeight: "body",
  color: "text.primary",
  fontFamily: "body",
});

const control = css({
  display: "flex",
  alignItems: "center",
  borderRadius: "md",
  border: "1px solid",
  borderColor: "border.default",
  overflow: "hidden",
});

const input = css({
  width: "100%",
  padding: "8px 12px",
  fontSize: "14px",
  fontFamily: "body",
  fontWeight: "body",
  color: "text.primary",
  backgroundColor: "bg.card",
  border: "none",
  outline: "none",
  textAlign: "center",
  _focus: {
    boxShadow: "0 0 0 2px token(colors.sunbeam.orange)",
  },
});

const trigger = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  flexShrink: 0,
  backgroundColor: "sunbeam.orange",
  color: "white",
  border: "none",
  cursor: "pointer",
  transition: "all 0.15s ease",
  _hover: {
    backgroundColor: "sunbeam.flame",
  },
  _disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});
