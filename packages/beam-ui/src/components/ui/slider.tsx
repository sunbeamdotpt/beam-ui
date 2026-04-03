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

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
}: SliderProps) {
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
