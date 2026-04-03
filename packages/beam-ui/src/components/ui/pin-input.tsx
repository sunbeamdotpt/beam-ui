import {
  PinInputRoot,
  PinInputControl,
  PinInputInput,
  PinInputHiddenInput,
  PinInputLabel,
} from "@ark-ui/react/pin-input";
import { css } from "styled-system/css";

interface PinInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  mask?: boolean;
  label?: string;
}

export function PinInput({
  length = 4,
  value,
  onChange,
  mask = false,
  label,
}: PinInputProps) {
  const values = value.split("");

  return (
    <PinInputRoot
      value={values}
      onValueChange={(details) => onChange(details.value.join(""))}
      mask={mask}
      otp
      className={root}
    >
      {label && <PinInputLabel className={labelStyle}>{label}</PinInputLabel>}
      <PinInputControl className={control}>
        {Array.from({ length }, (_, i) => (
          <PinInputInput key={i} index={i} className={input} />
        ))}
      </PinInputControl>
      <PinInputHiddenInput />
    </PinInputRoot>
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
  gap: "8px",
});

const input = css({
  width: "48px",
  height: "48px",
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "heading",
  fontFamily: "body",
  color: "text.primary",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "md",
  outline: "none",
  transition: "all 0.15s ease",
  _focus: {
    borderColor: "sunbeam.orange",
    boxShadow: "0 0 0 2px rgba(250, 82, 15, 0.4)",
  },
});
