import { useState } from "react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
} from "@ark-ui/react/popover";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

export interface MilestoneOption {
  id: string;
  title: string;
  dueDate?: string;
  progress: number;
  open: number;
  closed: number;
}

interface MilestonePickerProps {
  options: MilestoneOption[];
  selected: string | null;
  onChange: (selected: string | null) => void;
  placeholder?: string;
  className?: string;
}

export function MilestonePicker({
  options,
  selected,
  onChange,
  placeholder = "Milestone",
  className,
}: MilestonePickerProps) {
  const [query, setQuery] = useState("");

  const filtered = options.filter((opt) =>
    opt.title.toLowerCase().includes(query.toLowerCase()),
  );

  const selectedOption = options.find((o) => o.id === selected);

  function handleSelect(id: string) {
    if (selected === id) {
      onChange(null);
    } else {
      onChange(id);
    }
  }

  return (
    <PopoverRoot positioning={{ placement: "bottom-start" }} onOpenChange={() => setQuery("")}>
      <PopoverTrigger asChild>
        <button className={cx(triggerStyle, className)}>
          <Icon name="flag" size={16} className={triggerIcon} />
          <span className={selectedOption ? triggerText : placeholderStyle}>
            {selectedOption ? selectedOption.title : placeholder}
          </span>
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
              placeholder="Filter milestones..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={listWrapper}>
            {filtered.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  className={optionRow}
                  onClick={() => handleSelect(opt.id)}
                >
                  <span className={optionMain}>
                    <span className={optionTitle}>
                      <Icon name="flag" size={14} className={milestoneIcon} />
                      {opt.title}
                    </span>
                    <span className={optionMeta}>
                      {opt.dueDate && (
                        <span className={dueDate}>Due {opt.dueDate}</span>
                      )}
                      <span className={counts}>
                        {opt.closed} closed / {opt.open} open
                      </span>
                    </span>
                    <span className={progressTrack}>
                      <span
                        className={progressFill}
                        style={{ width: `${Math.max(0, Math.min(100, opt.progress))}%` }}
                      />
                    </span>
                  </span>
                  {isSelected && (
                    <Icon name="check" size={16} className={checkIcon} />
                  )}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <span className={emptyText}>No milestones found</span>
            )}
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </PopoverRoot>
  );
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

const triggerIcon = css({
  color: "text.muted",
  flexShrink: 0,
});

const triggerText = css({
  flex: 1,
  textAlign: "left",
});

const placeholderStyle = css({
  color: "text.muted",
  flex: 1,
  textAlign: "left",
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
  width: "320px",
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
  maxHeight: "300px",
  overflowY: "auto",
});

const optionRow = css({
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  width: "100%",
  padding: "10px 12px",
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

const optionMain = css({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  flex: 1,
  minWidth: 0,
});

const optionTitle = css({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "14px",
  color: "text.primary",
  fontWeight: "button",
});

const milestoneIcon = css({
  color: "text.muted",
  flexShrink: 0,
});

const optionMeta = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "12px",
  color: "text.muted",
});

const dueDate = css({});

const counts = css({});

const progressTrack = css({
  width: "100%",
  height: "4px",
  backgroundColor: "bg.card",
  borderRadius: "full",
  overflow: "hidden",
  marginTop: "2px",
});

const progressFill = css({
  height: "100%",
  backgroundColor: "sunbeam.orange",
  borderRadius: "full",
  transition: "width 0.3s ease",
});

const checkIcon = css({
  color: "sunbeam.orange",
  flexShrink: 0,
  marginTop: "2px",
});

const emptyText = css({
  display: "block",
  padding: "16px",
  fontSize: "13px",
  color: "text.muted",
  textAlign: "center",
});
