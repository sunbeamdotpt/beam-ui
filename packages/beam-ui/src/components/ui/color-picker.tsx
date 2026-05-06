import { useState, useId } from "react";
import { css, cx } from "styled-system/css";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
  PopoverCloseTrigger,
} from "@ark-ui/react/popover";
import { Icon } from "./icon";

/** Props for {@link ColorPicker}. */
interface ColorPickerProps {
  /** Current hex color value (e.g., `"#FF5733"`). */
  value: string;
  /** Callback fired when the user selects a color; receives the hex string. */
  onChange: (value: string) => void;
  /** Array of preset hex colors to display in the swatch grid. Defaults to a curated palette. */
  presets?: string[];
  /** Optional label shown above the color picker. */
  label?: string;
  /** Extra CSS class names to apply to the root container. */
  className?: string;
}

const DEFAULT_PRESETS = [
  "#EF4444", "#F97316", "#F59E0B", "#EAB308",
  "#84CC16", "#22C55E", "#14B8A6", "#06B6D4",
  "#3B82F6", "#6366F1", "#8B5CF6", "#A855F7",
  "#D946EF", "#EC4899", "#F43F5E", "#78716C",
  "#DC2626", "#EA580C", "#D97706", "#059669",
];

/**
 * Popover-based color picker with hex input and preset swatches.
 *
 * Displays a trigger button showing the current color; opens a popover with a preset swatch grid,
 * live preview, and manual hex input. Only accepts valid 6-digit hex colors.
 *
 * @example
 * ```tsx
 * <ColorPicker value={color} onChange={setColor} label="Brand Color" />
 * ```
 */
export function ColorPicker({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  label,
  className,
}: ColorPickerProps) {
  const hexInputId = useId();
  const [hexInput, setHexInput] = useState(value);

  const handleHexChange = (hex: string) => {
    setHexInput(hex);
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(hex);
    }
  };

  const handleSwatchClick = (color: string) => {
    setHexInput(color);
    onChange(color);
  };

  return (
    <div className={cx(wrapper, className)}>
      {label && <label className={labelStyle}>{label}</label>}
      <PopoverRoot positioning={{ placement: "bottom-start" }}>
        <PopoverTrigger className={triggerStyle}>
          <span
            className={triggerSwatch}
            style={{ backgroundColor: value }}
            aria-hidden="true"
          />
          <span className={triggerHex}>{value.toUpperCase()}</span>
          <Icon name="expand_more" size={16} />
        </PopoverTrigger>

        <PopoverPositioner>
          <PopoverContent className={contentStyle}>
            <div className={popoverHeader}>
              <span className={popoverTitle}>Choose color</span>
              <PopoverCloseTrigger className={closeBtn} aria-label="Close color picker">
                <Icon name="close" size={16} />
              </PopoverCloseTrigger>
            </div>

            <div className={previewRow}>
              <span
                className={previewSwatch}
                style={{ backgroundColor: value }}
                aria-hidden="true"
              />
              <span className={previewHex}>{value.toUpperCase()}</span>
            </div>

            <div className={swatchGrid}>
              {presets.map((color) => (
                <button
                  key={color}
                  className={cx(
                    swatchButton,
                    value.toUpperCase() === color.toUpperCase()
                      ? swatchSelected
                      : undefined
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => handleSwatchClick(color)}
                  aria-label={`Select color ${color}`}
                  type="button"
                />
              ))}
            </div>

            <div className={hexInputRow}>
              <label htmlFor={hexInputId} className={hexLabel}>HEX</label>
              <input
                id={hexInputId}
                className={hexInputStyle}
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                maxLength={7}
                spellCheck={false}
              />
            </div>
          </PopoverContent>
        </PopoverPositioner>
      </PopoverRoot>
    </div>
  );
}

const wrapper = css({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

const labelStyle = css({
  fontSize: "12px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "text.secondary",
  fontFamily: "body",
});

const triggerStyle = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 12px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "0",
  cursor: "pointer",
  fontSize: "13px",
  fontFamily: "mono",
  color: "text.primary",
  transition: "all 0.15s ease",
  _hover: {
    borderColor: "sunbeam.orange",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "2px",
  },
});

const triggerSwatch = css({
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  border: "1px solid",
  borderColor: "border.default",
  flexShrink: 0,
});

const triggerHex = css({
  fontSize: "13px",
  fontFamily: "mono",
  color: "text.primary",
});

const contentStyle = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  shadow: "golden",
  padding: "16px",
  zIndex: 50,
  outline: "none",
  width: "260px",
});

const popoverHeader = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "12px",
});

const popoverTitle = css({
  fontSize: "14px",
  fontWeight: "heading",
  fontFamily: "body",
  color: "text.primary",
});

const closeBtn = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "text.secondary",
  padding: "4px",
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "2px",
  },
});

const previewRow = css({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "14px",
});

const previewSwatch = css({
  width: "36px",
  height: "36px",
  borderRadius: "4px",
  border: "1px solid",
  borderColor: "border.default",
  flexShrink: 0,
});

const previewHex = css({
  fontSize: "14px",
  fontFamily: "mono",
  fontWeight: "heading",
  color: "text.primary",
});

const swatchGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 24px)",
  gap: "8px",
  marginBottom: "14px",
  justifyContent: "start",
});

const swatchButton = css({
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  border: "2px solid transparent",
  cursor: "pointer",
  padding: 0,
  transition: "all 0.15s ease",
  outline: "none",
  _hover: {
    transform: "scale(1.15)",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "2px",
  },
});

const swatchSelected = css({
  borderColor: "sunbeam.orange",
  ringWidth: "2px",
  ringColor: "sunbeam.orange",
  ringOffset: "1px",
});

const hexInputRow = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  borderTop: "1px solid",
  borderColor: "border.default",
  paddingTop: "12px",
});

const hexLabel = css({
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "text.muted",
  fontFamily: "body",
});

const hexInputStyle = css({
  flex: 1,
  padding: "6px 8px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "0",
  fontSize: "13px",
  fontFamily: "mono",
  color: "text.primary",
  outline: "none",
  _focus: {
    ringWidth: "2px",
    ringColor: "sunbeam.orange",
    borderColor: "transparent",
  },
});
