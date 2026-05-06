import { useMemo, useState } from "react";
import {
  ComboboxRoot,
  ComboboxControl,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxItemText,
  ComboboxPositioner,
  ComboboxTrigger,
  createListCollection,
} from "@ark-ui/react/combobox";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

/** Single option in a {@link Combobox}. */
interface ComboboxOption {
  /** Internal identifier for this option. */
  value: string;
  /** Display label shown in the dropdown and input. */
  label: string;
}

/** Props for {@link Combobox}. */
interface ComboboxProps {
  /** Array of options to display in the dropdown. */
  options: ComboboxOption[];
  /** Currently selected option value. */
  value: string;
  /** Callback fired when the user selects an option; receives the option's value. */
  onChange: (value: string) => void;
  /** Placeholder text shown in the input when no option is selected. Defaults to `"Search..."`. */
  placeholder?: string;
  /** If true, the combobox is disabled and cannot be interacted with. Defaults to false. */
  disabled?: boolean;
  /** Extra CSS class names to apply to the root component. */
  className?: string;
}

/**
 * Searchable dropdown combobox with filter-as-you-type and keyboard navigation.
 *
 * Typing in the input filters the options list by label. Arrow keys navigate, Enter selects.
 * Supports disabled state. Integrates with Ark UI's ComboboxRoot for accessibility.
 *
 * @example
 * ```tsx
 * <Combobox
 *   options={[{ value: "ts", label: "TypeScript" }]}
 *   value={lang}
 *   onChange={setLang}
 * />
 * ```
 */
export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
  className,
}: ComboboxProps) {
  const [inputValue, setInputValue] = useState("");

  const filtered = useMemo(() => {
    if (!inputValue) return options;
    const lower = inputValue.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(lower));
  }, [options, inputValue]);

  const collection = useMemo(
    () =>
      createListCollection({
        items: filtered,
        itemToValue: (item) => item.value,
        itemToString: (item) => item.label,
      }),
    [filtered],
  );

  return (
    <ComboboxRoot
      collection={collection}
      value={[value]}
      onValueChange={(details) => {
        const next = details.value[0];
        if (next !== undefined) onChange(next);
      }}
      inputBehavior="autohighlight"
      onInputValueChange={(details) => setInputValue(details.inputValue)}
      disabled={disabled}
      positioning={{ sameWidth: true }}
      className={cx(className)}
    >
      <ComboboxControl className={control}>
        <ComboboxInput className={input} placeholder={placeholder} />
        <ComboboxTrigger className={triggerBtn} aria-label="Toggle suggestions">
          <Icon name="expand_more" size={20} />
        </ComboboxTrigger>
      </ComboboxControl>

      <ComboboxPositioner>
        <ComboboxContent className={content}>
          {filtered.length === 0 ? (
            <div className={empty} role="status">No results found</div>
          ) : (
            filtered.map((option) => (
              <ComboboxItem
                key={option.value}
                item={option}
                className={item}
              >
                <ComboboxItemText>{option.label}</ComboboxItemText>
              </ComboboxItem>
            ))
          )}
        </ComboboxContent>
      </ComboboxPositioner>
    </ComboboxRoot>
  );
}

const control = css({
  display: "flex",
  alignItems: "center",
  width: "100%",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "0",
  transition: "all 0.15s ease",
  _focusWithin: {
    ringWidth: "2px",
    ringColor: "sunbeam.orange",
    borderColor: "transparent",
  },
});

const input = css({
  flex: 1,
  padding: "10px 12px",
  background: "none",
  border: "none",
  outline: "none",
  fontSize: "14px",
  fontFamily: "body",
  color: "text.primary",
  _placeholder: {
    color: "text.muted",
  },
  _disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

const triggerBtn = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 8px",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "text.secondary",
  _hover: {
    color: "text.primary",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "sunbeam.orange",
    outlineOffset: "-2px",
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
  _selected: {
    color: "sunbeam.orange",
  },
});

const empty = css({
  padding: "8px 12px",
  fontSize: "14px",
  fontFamily: "body",
  color: "text.muted",
});
