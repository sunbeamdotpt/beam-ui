import { type ReactNode } from "react";
import {
  SliderRoot,
  SliderControl,
  SliderTrack,
  SliderRange,
  SliderThumb,
  SliderLabel,
  SliderHiddenInput,
} from "@ark-ui/react/slider";
import { css } from "styled-system/css";

/** Props for {@link Slider}. */
interface SliderProps {
  /** Current slider value. */
  value: number;
  /** Fired when value changes. */
  onChange: (value: number) => void;
  /** Minimum value. Defaults to `0`. */
  min?: number;
  /** Maximum value. Defaults to `100`. */
  max?: number;
  /** Increment step. Defaults to `1`. */
  step?: number;
  /** Optional label above slider. */
  label?: string;
}

/**
 * Horizontal slider with optional label using Ark UI.
 * Supports keyboard navigation (arrow keys, Home, End).
 *
 * @example
 * ```tsx
 * <Slider value={50} onChange={setValue} min={0} max={100} label="Volume" />
 * ```
 */
export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
}: SliderProps): ReactNode {
  return (
    <SliderRoot
      value={[value]}
      onValueChange={(details) => onChange(details.value[0])}
      min={min}
      max={max}
      step={step}
      className={root}
    >
      {label && <SliderLabel className={labelStyle}>{label}</SliderLabel>}
      <SliderControl className={control}>
        <SliderTrack className={track}>
          <SliderRange className={range} />
        </SliderTrack>
        <SliderThumb index={0} className={thumb}>
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </SliderRoot>
  );
}

const root = css({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  width: "100%",
});

const labelStyle = css({
  fontSize: "14px",
  fontWeight: "body",
  color: "text.primary",
  fontFamily: "body",
});

const control = css({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: "20px",
});

const track = css({
  width: "100%",
  height: "6px",
  borderRadius: "full",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  overflow: "hidden",
});

const range = css({
  height: "100%",
  backgroundColor: "sunbeam.orange",
  borderRadius: "full",
});

const thumb = css({
  width: "20px",
  height: "20px",
  borderRadius: "full",
  backgroundColor: "white",
  border: "2px solid",
  borderColor: "border.default",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
  cursor: "grab",
  transition: "border-color 0.15s ease",
  _hover: {
    borderColor: "sunbeam.orange",
  },
  _active: {
    cursor: "grabbing",
  },
  _focus: {
    outline: "none",
    borderColor: "sunbeam.orange",
    boxShadow: "0 0 0 3px rgba(250, 82, 15, 0.3)",
  },
});
