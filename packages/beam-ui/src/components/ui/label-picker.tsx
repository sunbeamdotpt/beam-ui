import { useState, type ReactNode } from "react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
} from "@ark-ui/react/popover";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

/** A single label option with name, color, and optional description. */
export interface LabelOption {
  /** Unique identifier for the label. */
  id: string;
  /** Label name / display text. */
  name: string;
  /** Hex color code for the label. */
  color: string;
  /** Optional description shown in the dropdown. */
  description?: string;
}

/** Props for {@link LabelPicker}. */
interface LabelPickerProps {
  /** Array of available labels to choose from. */
  options: LabelOption[];
  /** Array of selected label IDs. */
  selected: string[];
  /** Called when selection changes. Receives new array of selected label IDs. */
  onChange: (selected: string[]) => void;
  /** Placeholder text when no labels are selected. Defaults to `"Labels"`. */
  placeholder?: string;
  /** Optional CSS class for the trigger button. */
  className?: string;
}

/**
 * Multi-select dropdown for choosing labels with color swatches and optional descriptions.
 * Supports search filtering by label name or description.
 *
 * @example
 * ```tsx
 * <LabelPicker
 *   options={labels}
 *   selected={selectedLabelIds}
 *   onChange={setSelectedLabelIds}
 * />
 * ```
 */
export function LabelPicker({
  options,
  selected,
  onChange,
  placeholder = "Labels",
  className,
}: LabelPickerProps): ReactNode {
  const [query, setQuery] = useState("");

  const filtered = options.filter(
    (opt) =>
      opt.name.toLowerCase().includes(query.toLowerCase()) ||
      opt.description?.toLowerCase().includes(query.toLowerCase()),
  );

  const selectedOptions = options.filter((o) => selected.includes(o.id));

  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <PopoverRoot positioning={{ placement: "bottom-start" }} onOpenChange={() => setQuery("")}>
      <PopoverTrigger asChild>
        <button className={cx(triggerStyle, className)}>
          {selectedOptions.length === 0 ? (
            <span className={placeholderStyle}>{placeholder}</span>
          ) : (
            <span className={pillRow}>
              {selectedOptions.map((opt) => (
                <span
                  key={opt.id}
                  className={pill}
                  style={{ backgroundColor: opt.color, color: getContrastColor(opt.color) }}
                >
                  {opt.name}
                </span>
              ))}
            </span>
          )}
          <Icon name="expand_more" size={18} className={chevron} />
        </button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent className={dropdown}>
          <div className={searchWrapper}>
            <Icon name="search" size={16} className={searchIcon} />
            <input
              type="text"
              className={searchInput}
              placeholder="Filter labels..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={listWrapper}>
            {filtered.map((opt) => {
              const isSelected = selected.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  className={optionRow}
                  onClick={() => toggle(opt.id)}
                >
                  <span
                    className={colorSwatch}
                    style={{ backgroundColor: opt.color }}
                  />
                  <span className={optionText}>
                    <span className={optionName}>{opt.name}</span>
                    {opt.description && (
                      <span className={optionDesc}>{opt.description}</span>
                    )}
                  </span>
                  {isSelected && (
                    <Icon name="check" size={16} className={checkIcon} />
                  )}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <span className={emptyText}>No labels found</span>
            )}
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </PopoverRoot>
  );
}

function getContrastColor(hex: string): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000" : "#fff";
}

const triggerStyle = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 12px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  cursor: "pointer",
  fontFamily: "body",
  fontSize: "14px",
  color: "text.primary",
  minHeight: "36px",
  minWidth: "180px",
  transition: "border-color 0.15s ease",
  _hover: {
    borderColor: "sunbeam.orange",
  },
});

const placeholderStyle = css({
  color: "text.muted",
});

const pillRow = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
  flex: 1,
});

const pill = css({
  fontSize: "11px",
  fontWeight: "button",
  padding: "2px 8px",
  borderRadius: "full",
  lineHeight: 1.4,
  whiteSpace: "nowrap",
});

const chevron = css({
  color: "text.muted",
  marginLeft: "auto",
  flexShrink: 0,
});

const dropdown = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  shadow: "golden",
  zIndex: 50,
  outline: "none",
  width: "300px",
  overflow: "hidden",
});

const searchWrapper = css({
  position: "relative",
  padding: "8px",
  borderBottom: "1px solid",
  borderColor: "border.default",
});

const searchIcon = css({
  position: "absolute",
  left: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "text.muted",
});

const searchInput = css({
  width: "100%",
  padding: "6px 8px 6px 32px",
  border: "1px solid",
  borderColor: "border.default",
  backgroundColor: "bg.card",
  fontSize: "13px",
  fontFamily: "body",
  color: "text.primary",
  outline: "none",
  _focus: {
    borderColor: "sunbeam.orange",
  },
});

const listWrapper = css({
  maxHeight: "260px",
  overflowY: "auto",
});

const optionRow = css({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  padding: "8px 12px",
  border: "none",
  background: "none",
  cursor: "pointer",
  textAlign: "left",
  fontFamily: "body",
  transition: "background-color 0.1s ease",
  _hover: {
    backgroundColor: "bg.card",
  },
});

const colorSwatch = css({
  width: "16px",
  height: "16px",
  borderRadius: "full",
  flexShrink: 0,
});

const optionText = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  flex: 1,
  minWidth: 0,
});

const optionName = css({
  fontSize: "14px",
  color: "text.primary",
  fontWeight: "button",
});

const optionDesc = css({
  fontSize: "12px",
  color: "text.muted",
  lineHeight: 1.3,
});

const checkIcon = css({
  color: "sunbeam.orange",
  flexShrink: 0,
});

const emptyText = css({
  display: "block",
  padding: "16px",
  fontSize: "13px",
  color: "text.muted",
  textAlign: "center",
});
