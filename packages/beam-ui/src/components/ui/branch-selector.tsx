import { useState } from "react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
} from "@ark-ui/react/popover";
import { TabsRoot, TabList, TabTrigger, TabContent } from "@ark-ui/react/tabs";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

interface BranchSelectorProps {
  branches: string[];
  tags: string[];
  current: string;
  defaultBranch?: string;
  onChange: (ref: string) => void;
  onCreateBranch?: (name: string) => void;
  className?: string;
}

export function BranchSelector({
  branches,
  tags,
  current,
  defaultBranch,
  onChange,
  onCreateBranch,
  className,
}: BranchSelectorProps) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("branches");

  const filteredBranches = branches.filter((b) =>
    b.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredTags = tags.filter((t) =>
    t.toLowerCase().includes(query.toLowerCase()),
  );

  const showCreateBranch =
    onCreateBranch &&
    query.length > 0 &&
    tab === "branches" &&
    !branches.some((b) => b.toLowerCase() === query.toLowerCase());

  const isBranch = branches.includes(current);

  return (
    <PopoverRoot
      positioning={{ placement: "bottom-start" }}
      onOpenChange={() => {
        setQuery("");
        setTab("branches");
      }}
    >
      <PopoverTrigger asChild>
        <button className={cx(triggerStyle, className)}>
          <Icon
            name={isBranch ? "fork_right" : "sell"}
            size={16}
            className={triggerIcon}
          />
          <span className={triggerText}>{current}</span>
          <Icon name="expand_more" size={18} className={chevron} />
        </button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent className={dropdown}>
          <TabsRoot
            value={tab}
            onValueChange={(details) => {
              setTab(details.value);
              setQuery("");
            }}
          >
            <TabList className={tabList}>
              <TabTrigger value="branches" className={tabTriggerStyle}>
                Branches
              </TabTrigger>
              <TabTrigger value="tags" className={tabTriggerStyle}>
                Tags
              </TabTrigger>
            </TabList>

            <div className={searchWrapper}>
              <Icon name="search" size={16} className={searchIcon} />
              <input
                type="text"
                className={searchInput}
                placeholder={tab === "branches" ? "Filter branches..." : "Filter tags..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <TabContent value="branches">
              <div className={listWrapper}>
                {filteredBranches.map((branch) => (
                  <button
                    key={branch}
                    className={optionRow}
                    onClick={() => onChange(branch)}
                  >
                    <Icon name="fork_right" size={16} className={refIcon} />
                    <span
                      className={cx(
                        refName,
                        current === branch ? currentRef : undefined,
                      )}
                    >
                      {branch}
                    </span>
                    {branch === defaultBranch && (
                      <span className={defaultBadge}>default</span>
                    )}
                    {current === branch && (
                      <Icon name="check" size={16} className={checkIcon} />
                    )}
                  </button>
                ))}
                {showCreateBranch && (
                  <button
                    className={createRow}
                    onClick={() => onCreateBranch(query)}
                  >
                    <Icon name="add" size={16} className={refIcon} />
                    <span className={createText}>
                      Create branch: <strong>{query}</strong>
                    </span>
                  </button>
                )}
                {filteredBranches.length === 0 && !showCreateBranch && (
                  <span className={emptyText}>No branches found</span>
                )}
              </div>
            </TabContent>

            <TabContent value="tags">
              <div className={listWrapper}>
                {filteredTags.map((tag) => (
                  <button
                    key={tag}
                    className={optionRow}
                    onClick={() => onChange(tag)}
                  >
                    <Icon name="sell" size={16} className={refIcon} />
                    <span
                      className={cx(
                        refName,
                        current === tag ? currentRef : undefined,
                      )}
                    >
                      {tag}
                    </span>
                    {current === tag && (
                      <Icon name="check" size={16} className={checkIcon} />
                    )}
                  </button>
                ))}
                {filteredTags.length === 0 && (
                  <span className={emptyText}>No tags found</span>
                )}
              </div>
            </TabContent>
          </TabsRoot>
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
  fontFamily: "mono",
  fontSize: "13px",
  color: "text.primary",
  minHeight: "36px",
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
  whiteSpace: "nowrap",
});

const chevron = css({
  color: "text.muted",
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

const tabList = css({
  display: "flex",
  gap: "0",
  borderBottom: "1px solid",
  borderColor: "border.default",
});

const tabTriggerStyle = css({
  flex: 1,
  padding: "10px 16px",
  fontSize: "12px",
  fontWeight: "button",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  bg: "transparent",
  border: "none",
  cursor: "pointer",
  color: "text.muted",
  borderBottom: "2px solid transparent",
  transition: "all 0.15s ease",
  _hover: {
    color: "text.primary",
  },
  _selected: {
    color: "sunbeam.orange",
    borderBottomColor: "sunbeam.orange",
  },
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
  gap: "8px",
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

const refIcon = css({
  color: "text.muted",
  flexShrink: 0,
});

const refName = css({
  fontSize: "13px",
  fontFamily: "mono",
  color: "text.primary",
  flex: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const currentRef = css({
  color: "sunbeam.orange",
  fontWeight: "button",
});

const defaultBadge = css({
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "text.muted",
  backgroundColor: "bg.card",
  padding: "2px 6px",
  border: "1px solid",
  borderColor: "border.default",
  flexShrink: 0,
});

const checkIcon = css({
  color: "sunbeam.orange",
  flexShrink: 0,
});

const createRow = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  width: "100%",
  padding: "8px 12px",
  border: "none",
  background: "none",
  cursor: "pointer",
  textAlign: "left",
  fontFamily: "body",
  borderTop: "1px solid",
  borderColor: "border.default",
  transition: "background-color 0.1s ease",
  _hover: {
    backgroundColor: "bg.card",
  },
});

const createText = css({
  fontSize: "13px",
  color: "sunbeam.orange",
});

const emptyText = css({
  display: "block",
  padding: "16px",
  fontSize: "13px",
  color: "text.muted",
  textAlign: "center",
});
