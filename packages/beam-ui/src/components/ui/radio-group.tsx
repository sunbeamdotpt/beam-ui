import { useId, type ReactNode } from "react";
import {
  RadioGroupRoot,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemText,
  RadioGroupItemHiddenInput,
} from "@ark-ui/react/radio-group";
import { css } from "styled-system/css";

/** Single radio option. */
interface RadioOption {
  /** Unique value for this option. */
  value: string;
  /** Display label. */
  label: string;
}

/** Props for {@link RadioGroup}. */
interface RadioGroupProps {
  /** Array of radio options. */
  options: RadioOption[];
  /** Currently selected value. */
  value: string;
  /** Fired when selection changes. */
  onChange: (value: string) => void;
  /** Optional group label. */
  label?: string;
}

/**
 * Radio button group with keyboard navigation and optional label.
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   options={[
 *     { value: "opt1", label: "Option 1" },
 *     { value: "opt2", label: "Option 2" },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 *   label="Choose one:"
 * />
 * ```
 */
export function RadioGroup({ options, value, onChange, label }: RadioGroupProps): ReactNode {
  const labelId = useId();
  return (
    <RadioGroupRoot
      value={value}
      onValueChange={(details) => onChange(details.value)}
      className={root}
      aria-labelledby={label ? labelId : undefined}
    >
      {label && <span className={groupLabel} id={labelId}>{label}</span>}
      {options.map((option) => (
        <RadioGroupItem key={option.value} value={option.value} className={item}>
          <RadioGroupItemControl className={control} />
          <RadioGroupItemText className={text}>{option.label}</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
      ))}
    </RadioGroupRoot>
  );
}

const root = css({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const groupLabel = css({
  fontSize: "14px",
  fontWeight: "body",
  color: "text.primary",
  fontFamily: "body",
  marginBottom: "2px",
});

const item = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
});

const control = css({
  width: "18px",
  height: "18px",
  borderRadius: "full",
  border: "2px solid",
  borderColor: "border.default",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "all 0.15s ease",
  _checked: {
    borderColor: "sunbeam.orange",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "2px",
  },
  _before: {
    content: '""',
    display: "block",
    width: "8px",
    height: "8px",
    borderRadius: "full",
    backgroundColor: "transparent",
    transition: "all 0.15s ease",
  },
  "&[data-state=checked]::before": {
    backgroundColor: "sunbeam.orange",
  },
});

const text = css({
  fontSize: "14px",
  color: "text.primary",
  fontFamily: "body",
  lineHeight: 1.4,
});
