import { css, cx } from "../../system.ts";

import { type ReactNode, useState } from "react";
import {
  PopoverContent,
  PopoverPositioner,
  PopoverRoot,
  PopoverTrigger,
} from "@ark-ui/react/popover";
import { Icon } from "./icon.tsx";
import { Avatar } from "./avatar.tsx";

/** Represents a single user option in the picker. */
export interface UserOption {
  /** Unique user identifier. */
  id: string;
  /** Login username. */
  username: string;
  /** Display name. */
  displayName: string;
  /** Avatar image URL (optional). */
  avatarUrl?: string;
}

/** Props for {@link AssigneePicker}. */
export interface AssigneePickerProps {
  /** List of available users to pick from. */
  options: UserOption[];
  /** Array of selected user IDs. */
  selected: string[];
  /** Called with updated array of selected user IDs when selection changes. */
  onChange: (selected: string[]) => void;
  /** Placeholder text shown when no users are selected. Defaults to "Assignees". */
  placeholder?: string;
  /** Additional Panda CSS classes. */
  className?: string;
}

/**
 * Multi-select dropdown for assigning users.
 *
 * Shows selected avatars inline. Clicking opens a popover with a search input and checkbox list.
 * Multiple users can be selected simultaneously.
 *
 * @example
 * ```tsx
 * <AssigneePicker
 *   options={[
 *     { id: "1", username: "alice", displayName: "Alice Smith" },
 *     { id: "2", username: "bob", displayName: "Bob Jones" },
 *   ]}
 *   selected={["1"]}
 *   onChange={(ids) => setSprint({ ...sprint, assignees: ids })}
 * />
 * ```
 */
export function AssigneePicker({
  options,
  selected,
  onChange,
  placeholder = "Assignees",
  className,
}: AssigneePickerProps): ReactNode {
  const [query, setQuery] = useState("");

  const filtered = options.filter(
    (opt) =>
      opt.username.toLowerCase().includes(query.toLowerCase()) ||
      opt.displayName.toLowerCase().includes(query.toLowerCase()),
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
        <button className={cx(triggerStyle, className)} type="button">
          {selectedOptions.length === 0
            ? <span className={placeholderStyle}>{placeholder}</span>
            : (
              <span className={avatarRow}>
                {selectedOptions.map((opt) => (
                  <Avatar
                    key={opt.id}
                    name={opt.displayName}
                    src={opt.avatarUrl}
                    size="sm"
                    className={avatarSmall}
                  />
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
              placeholder="Filter users..."
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
                  type="button"
                >
                  <Avatar
                    name={opt.displayName}
                    src={opt.avatarUrl}
                    size="sm"
                    className={avatarSmall}
                  />
                  <span className={optionText}>
                    <span className={displayName}>{opt.displayName}</span>
                    <span className={username}>@{opt.username}</span>
                  </span>
                  {isSelected && <Icon name="check" size={16} className={checkIcon} />}
                </button>
              );
            })}
            {filtered.length === 0 && <span className={emptyText}>No users found</span>}
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

const placeholderStyle = css({
  color: "text.muted",
});

const avatarRow = css({
  display: "flex",
  alignItems: "center",
  flex: 1,
});

const avatarSmall = css({
  width: "24px!",
  height: "24px!",
  fontSize: "10px!",
  marginRight: "-4px",
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

const optionText = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  flex: 1,
  minWidth: 0,
});

const displayName = css({
  fontSize: "14px",
  color: "text.primary",
  fontWeight: "button",
});

const username = css({
  fontSize: "12px",
  color: "text.muted",
  fontFamily: "mono",
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
