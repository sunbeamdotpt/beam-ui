import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPositioner,
  SelectControl,
  SelectValueText,
  createListCollection,
} from "@ark-ui/react/select";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

/** Single select option. */
interface SelectOption {
  /** Unique value. */
  value: string;
  /** Display label. */
  label: string;
}

/** Props for {@link Select}. */
interface SelectProps {
  /** Array of available options. */
  options: SelectOption[];
  /** Currently selected value. */
  value: string;
  /** Fired when selection changes. */
  onChange: (value: string) => void;
  /** Placeholder text. Defaults to `"Select…"`. */
  placeholder?: string;
  /** Disable the select. Defaults to `false`. */
  disabled?: boolean;
  /** Additional CSS class. */
  className?: string;
}

/**
 * Dropdown select using Ark UI with keyboard navigation and custom styling.
 * Displays dropdown below trigger by default.
 *
 * @example
 * ```tsx
 * <Select
 *   options={[
 *     { value: "a", label: "Option A" },
 *     { value: "b", label: "Option B" },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 *   placeholder="Choose..."
 * />
 * ```
 */
export function Select({
  options,
  value,
  onChange,
  placeholder = "Select…",
  disabled = false,
  className,
}: SelectProps) {
  const collection = createListCollection({
    items: options,
    itemToValue: (item) => item.value,
    itemToString: (item) => item.label,
  });

  return (
    <SelectRoot
      collection={collection}
      value={[value]}
      onValueChange={(details) => {
        const next = details.value[0];
        if (next !== undefined) onChange(next);
      }}
      disabled={disabled}
      positioning={{ sameWidth: true }}
    >
      <SelectControl className={cx(control, className)}>
        <SelectTrigger className={trigger}>
          <SelectValueText placeholder={placeholder} />
          <Icon name="expand_more" size={20} />
        </SelectTrigger>
      </SelectControl>

      <SelectPositioner>
        <SelectContent className={content}>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              item={option}
              className={item}
            >
              <SelectItemText>{option.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPositioner>
    </SelectRoot>
  );
}

const control = css({
  width: "100%",
});

const trigger = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "10px 12px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "0",
  fontSize: "14px",
  fontFamily: "body",
  color: "text.primary",
  cursor: "pointer",
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
});

const content = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  shadow: "golden",
  zIndex: 50,
  maxHeight: "240px",
  overflowY: "auto",
});

const item = css({
  display: "flex",
  alignItems: "center",
  padding: "8px 12px",
  fontSize: "14px",
  fontFamily: "body",
  color: "text.primary",
  cursor: "pointer",
  transition: "all 0.1s ease",
  outline: "none",
  _hover: {
    backgroundColor: "bg.card",
  },
  _highlighted: {
    backgroundColor: "bg.card",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "-2px",
  },
  _selected: {
    color: "sunbeam.orange",
  },
});
