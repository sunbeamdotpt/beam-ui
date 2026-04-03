import { css, cx } from "styled-system/css";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  type?: "text" | "password" | "email" | "number";
  className?: string;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  type = "text",
  className,
}: TextInputProps) {
  return (
    <div className={cx(wrapper, className)}>
      {label && <label className={labelStyle}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cx(input, error ? inputError : undefined)}
      />
      {error && <p className={errorText}>{error}</p>}
    </div>
  );
}

const wrapper = css({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  width: "100%",
});

const labelStyle = css({
  fontSize: "12px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "text.secondary",
  fontFamily: "body",
});

const input = css({
  width: "100%",
  padding: "10px 12px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "0",
  fontSize: "14px",
  fontFamily: "body",
  color: "text.primary",
  outline: "none",
  transition: "all 0.15s ease",
  _focus: {
    ringWidth: "2px",
    ringColor: "sunbeam.orange",
    borderColor: "transparent",
  },
  _disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  _placeholder: {
    color: "text.muted",
  },
});

const inputError = css({
  borderColor: "sunbeam.orange",
});

const errorText = css({
  fontSize: "12px",
  color: "sunbeam.orange",
  fontFamily: "body",
  margin: 0,
});
