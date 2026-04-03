import { type ReactNode } from "react";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface WorkItemLabel {
  name: string;
  color: string;
}

export interface WorkItemBranch {
  base: string;
  head: string;
}

export interface WorkItemRow {
  id: string;
  icon?: ReactNode;
  title: string;
  href?: string;
  labels?: WorkItemLabel[];
  meta: ReactNode;
  branches?: WorkItemBranch;
  status?: ReactNode;
  commentCount?: number;
}

export interface WorkItemListProps {
  items: WorkItemRow[];
  selected?: Set<string>;
  onSelect?: (selected: Set<string>) => void;
  selectable?: boolean;
  onLoadMore?: () => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Checkbox                                                            */
/* ------------------------------------------------------------------ */

function Checkbox({ checked, onChange, ariaLabel }: { checked: boolean; onChange: () => void; ariaLabel?: string }) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      tabIndex={0}
      className={cx(checkboxOuter, checked && checkboxChecked)}
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); e.stopPropagation(); onChange(); } }}
    >
      {checked && <Icon name="check" size={14} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WorkItemList                                                        */
/* ------------------------------------------------------------------ */

export function WorkItemList({
  items,
  selected,
  onSelect,
  selectable = false,
  onLoadMore,
  className,
}: WorkItemListProps) {
  const sel = selected ?? new Set<string>();

  const toggle = (id: string) => {
    if (!onSelect) return;
    const next = new Set(sel);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelect(next);
  };

  return (
    <div className={cx(container, className)} role="list">
      {items.map((item) => {
        const isSelected = sel.has(item.id);
        return (
          <div
            key={item.id}
            role="listitem"
            className={cx(row, isSelected && rowSelected)}
          >
            {/* Left: checkbox + icon */}
            <div className={leftCol}>
              {selectable && (
                <Checkbox
                  checked={isSelected}
                  onChange={() => toggle(item.id)}
                  ariaLabel={`Select ${item.title}`}
                />
              )}
              {item.icon && <div className={iconCell}>{item.icon}</div>}
            </div>

            {/* Center: title, labels, meta+branches */}
            <div className={centerCol}>
              {/* Line 1: Title */}
              {item.href ? (
                <a href={item.href} className={titleLink}>{item.title}</a>
              ) : (
                <span className={titleText}>{item.title}</span>
              )}

              {/* Line 2: Labels */}
              {item.labels && item.labels.length > 0 && (
                <div className={labelRow}>
                  {item.labels.map((label) => (
                    <span
                      key={label.name}
                      className={labelBadge}
                      style={{
                        backgroundColor: `${label.color}18`,
                        color: label.color,
                        borderColor: `${label.color}40`,
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Line 3: Meta + branches */}
              <div className={metaRow}>
                <span className={metaText}>{item.meta}</span>
                {item.branches && (
                  <span className={branchInline}>
                    <span className={metaText}>&nbsp;·&nbsp;into&nbsp;</span>
                    <span className={branchPill}>{item.branches.base}</span>
                    <span className={metaText}>&nbsp;from&nbsp;</span>
                    <span className={branchPill}>{item.branches.head}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Right: status + comments */}
            <div className={rightCol}>
              {item.status}
              {item.commentCount != null && item.commentCount > 0 && (
                <span className={commentBadge} aria-label={`${item.commentCount} comment${item.commentCount !== 1 ? "s" : ""}`}>
                  <Icon name="chat_bubble_outline" size={14} />
                  {item.commentCount}
                </span>
              )}
            </div>
          </div>
        );
      })}

      {onLoadMore && (
        <div className={loadMoreBtn} role="button" tabIndex={0} onClick={onLoadMore} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onLoadMore!(); } }}>
          Load more
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const container = css({
  display: "flex",
  flexDirection: "column",
});

const row = css({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gap: "12px",
  padding: "12px 16px",
  cursor: "default",
  transition: "background 0.1s ease",
  _hover: { backgroundColor: "bg.card" },
  borderBottom: "1px solid",
  borderColor: "border.subtle",
  alignItems: "stretch",
});

const rowSelected = css({
  backgroundColor: "rgba(250, 82, 15, 0.06)",
});

const leftCol = css({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  paddingTop: "2px",
});

const iconCell = css({
  display: "flex",
  alignItems: "center",
});

const centerCol = css({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const titleLink = css({
  fontSize: "sm",
  fontWeight: "heading",
  color: "text.primary",
  textDecoration: "none",
  lineHeight: 1.4,
  _hover: { textDecoration: "underline" },
});

const titleText = css({
  fontSize: "sm",
  fontWeight: "heading",
  color: "text.primary",
  lineHeight: 1.4,
});

const labelRow = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
});

const labelBadge = css({
  display: "inline-block",
  fontSize: "2xs",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  lineHeight: 1,
  padding: "3px 8px",
  borderRadius: "sm",
  border: "1px solid",
  whiteSpace: "nowrap",
});

const metaRow = css({
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
});

const metaText = css({
  fontSize: "xs",
  color: "text.muted",
  fontFamily: "mono",
});

const branchInline = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "0",
});

const branchPill = css({
  display: "inline-block",
  fontSize: "xs",
  fontFamily: "mono",
  fontWeight: "body",
  padding: "0px 6px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  color: "text.primary",
  whiteSpace: "nowrap",
  marginInline: "4px",
  lineHeight: 1.5,
});

const rightCol = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "space-between",
  whiteSpace: "nowrap",
});

const commentBadge = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "xs",
  marginTop: "auto",
  color: "text.muted",
  fontFamily: "mono",
});

const checkboxOuter = css({
  width: "18px",
  height: "18px",
  minWidth: "18px",
  border: "1px solid",
  borderColor: { base: "rgba(127,99,21,0.3)", _dark: "rgba(255,161,16,0.35)" },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.15s ease",
});

const checkboxChecked = css({
  backgroundColor: "sunbeam.orange",
  borderColor: "sunbeam.orange",
  color: "white",
});

const loadMoreBtn = css({
  display: "flex",
  justifyContent: "center",
  padding: "12px 16px",
  cursor: "pointer",
  fontSize: "sm",
  fontWeight: "button",
  color: "text.muted",
  transition: "color 0.15s ease",
  _hover: { color: "text.primary" },
});
