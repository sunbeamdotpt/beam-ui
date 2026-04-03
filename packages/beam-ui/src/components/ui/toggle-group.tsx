import {
  ToggleGroupRoot,
  ToggleGroupItem,
} from "@ark-ui/react/toggle-group";
import { css, cx } from "styled-system/css";

interface ToggleGroupOption {
  value: string;
  label: string;
}

interface ToggleGroupProps {
  items: ToggleGroupOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ToggleGroup({ items, value, onChange, className }: ToggleGroupProps) {
  return (
    <ToggleGroupRoot
      value={[value]}
      onValueChange={(details) => {
        const next = details.value[0];
        if (next !== undefined) onChange(next);
      }}
      className={cx(root, className)}
    >
      {items.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          className={cx(
            itemBase,
            value === item.value ? itemActive : itemInactive,
          )}
        >
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroupRoot>
  );
}

const root = css({
  display: "inline-flex",
  gap: "0",
});

const itemBase = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 16px",
  fontSize: "14px",
  fontFamily: "body",
  fontWeight: "button",
  border: "1px solid",
  cursor: "pointer",
  transition: "all 0.15s ease",
  outline: "none",
  marginLeft: "-1px",
  _first: { marginLeft: "0" },
});

const itemActive = css({
  backgroundColor: "sunbeam.orange",
  color: "white",
  borderColor: "sunbeam.orange",
  zIndex: 1,
});

const itemInactive = css({
  backgroundColor: "bg.card",
  color: "text.primary",
  borderColor: "border.default",
  _hover: {
    borderColor: "sunbeam.orange",
    zIndex: 1,
  },
});
