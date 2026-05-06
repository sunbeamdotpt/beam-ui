import {
  ToggleGroupRoot,
  ToggleGroupItem,
} from "@ark-ui/react/toggle-group";
import { css, cx } from "styled-system/css";

/** Option for {@link ToggleGroup}. */
interface ToggleGroupOption {
  /** Unique identifier for the option. */
  value: string;
  /** Display label. */
  label: string;
}

/** Props for {@link ToggleGroup}. */
interface ToggleGroupProps {
  /** Array of toggle options with value and label. */
  items: ToggleGroupOption[];
  /** Currently selected option value. */
  value: string;
  /** Called when an option is clicked with its value. */
  onChange: (value: string) => void;
  /** Optional CSS class applied to the root container. */
  className?: string;
}

/**
 * Radio-style toggle group using Ark UI primitives with borderless button layout.
 * Single-select; only one option can be active at a time.
 *
 * @example
 * ```tsx
 * const [view, setView] = useState("grid");
 * <ToggleGroup
 *   items={[
 *     { value: "grid", label: "Grid" },
 *     { value: "list", label: "List" },
 *   ]}
 *   value={view}
 *   onChange={setView}
 * />
 * ```
 */
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
  marginLeft: "-1px",
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "2px",
    zIndex: 2,
  },
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
