import {
  SwitchRoot,
  SwitchControl,
  SwitchThumb,
  SwitchLabel,
  SwitchHiddenInput,
} from "@ark-ui/react/switch";
import { css, cx } from "styled-system/css";

/** Props for {@link Switch}. */
interface SwitchProps {
  /** Checked state. */
  checked: boolean;
  /** Fired when toggled. */
  onChange: (checked: boolean) => void;
  /** Optional label beside the toggle. */
  label?: string;
  /** Disable interaction. Defaults to `false`. */
  disabled?: boolean;
  /** Additional CSS class. */
  className?: string;
}

/**
 * Accessible toggle switch with optional label using Ark UI.
 * Animated thumb with orange accent when checked.
 *
 * @example
 * ```tsx
 * <Switch checked={enabled} onChange={setEnabled} label="Dark mode" />
 * ```
 */
export function Switch({
  checked,
  onChange,
  label,
  disabled = false,
  className,
}: SwitchProps) {
  return (
    <SwitchRoot
      checked={checked}
      onCheckedChange={(details) => onChange(details.checked)}
      disabled={disabled}
      className={cx(root, className)}
    >
      <SwitchControl className={control}>
        <SwitchThumb className={thumb} />
      </SwitchControl>
      {label && <SwitchLabel className={labelStyle}>{label}</SwitchLabel>}
      <SwitchHiddenInput />
    </SwitchRoot>
  );
}

const root = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  _disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

const control = css({
  display: "inline-flex",
  alignItems: "center",
  width: "40px",
  height: "24px",
  padding: "2px",
  borderRadius: "full",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  transition: "all 0.2s ease",
  flexShrink: 0,
  "&[data-state=checked]": {
    backgroundColor: "sunbeam.orange",
    borderColor: "sunbeam.orange",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "2px",
  },
});

const thumb = css({
  width: "18px",
  height: "18px",
  borderRadius: "full",
  backgroundColor: "white",
  transition: "transform 0.2s ease",
  boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
  "&[data-state=checked]": {
    transform: "translateX(16px)",
  },
});

const labelStyle = css({
  fontSize: "14px",
  color: "text.primary",
  fontFamily: "body",
  lineHeight: 1.4,
  userSelect: "none",
});
