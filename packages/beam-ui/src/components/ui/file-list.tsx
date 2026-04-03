import { type ReactNode } from "react";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

export interface FileItem {
  id: string;
  name: string;
  icon?: string;
  type?: "file" | "folder";
  size?: string;
  modified?: string;
  meta?: ReactNode;
}

interface FileListProps {
  items: FileItem[];
  selected: Set<string>;
  onSelect: (selected: Set<string>) => void;
  onOpen?: (item: FileItem) => void;
  layout?: "list" | "grid";
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

const checkboxOuter = css({
  width: "18px",
  height: "18px",
  minWidth: "18px",
  border: "1px solid",
  borderColor: "border.default",
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

function Checkbox({ checked, onChange, ariaLabel }: { checked: boolean; onChange: () => void; ariaLabel?: string }) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      className={cx(checkboxOuter, checked && checkboxChecked)}
      onClick={(e) => { e.stopPropagation(); onChange(); }}
    >
      {checked && <Icon name="check" size={14} />}
    </div>
  );
}

function defaultIcon(item: FileItem) {
  if (item.icon) return item.icon;
  return item.type === "folder" ? "folder" : "description";
}

/* ------------------------------------------------------------------ */
/* List layout                                                         */
/* ------------------------------------------------------------------ */

const listContainer = css({
  display: "flex",
  flexDirection: "column",
});

const listHeader = css({
  display: "grid",
  gridTemplateColumns: "32px 24px 1fr 100px 140px",
  gap: "8px",
  alignItems: "center",
  padding: "8px 12px",
  fontSize: "11px",
  fontWeight: "button",
  color: "text.muted",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  borderBottom: "1px solid",
  borderColor: "border.default",
});

const listRow = css({
  display: "grid",
  gridTemplateColumns: "32px 24px 1fr 100px 140px",
  gap: "8px",
  alignItems: "center",
  padding: "8px 12px",
  cursor: "pointer",
  transition: "background 0.1s ease",
  _hover: { backgroundColor: "bg.card" },
  borderBottom: "1px solid",
  borderColor: "border.subtle",
});

const listRowSelected = css({
  backgroundColor: "rgba(250, 82, 15, 0.06)",
});

const fileName = css({
  fontSize: "14px",
  color: "text.primary",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const fileMeta = css({
  fontSize: "12px",
  color: "text.muted",
});

const fileIcon = css({
  color: "text.secondary",
});

const folderIcon = css({
  color: "sunbeam.orange",
});

function ListView({
  items,
  selected,
  onSelect,
  onOpen,
}: Omit<FileListProps, "layout" | "className">) {
  const allSelected = items.length > 0 && items.every((i) => selected.has(i.id));

  const toggleAll = () => {
    if (allSelected) {
      onSelect(new Set());
    } else {
      onSelect(new Set(items.map((i) => i.id)));
    }
  };

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelect(next);
  };

  return (
    <div className={listContainer} role="grid">
      <div className={listHeader}>
        <Checkbox checked={allSelected} onChange={toggleAll} ariaLabel="Select all files" />
        <span />
        <span>Name</span>
        <span>Size</span>
        <span>Modified</span>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className={cx(listRow, selected.has(item.id) && listRowSelected)}
          onDoubleClick={() => onOpen?.(item)}
        >
          <Checkbox checked={selected.has(item.id)} onChange={() => toggle(item.id)} ariaLabel={`Select ${item.name}`} />
          <Icon
            name={defaultIcon(item)}
            size={18}
            className={item.type === "folder" ? folderIcon : fileIcon}
          />
          <span className={fileName}>{item.name}</span>
          <span className={fileMeta}>{item.size ?? "—"}</span>
          <span className={fileMeta}>{item.modified ?? "—"}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Grid layout                                                         */
/* ------------------------------------------------------------------ */

const gridContainer = css({
  display: "grid",
  gridTemplateColumns: {
    base: "repeat(auto-fill, minmax(120px, 1fr))",
    md: "repeat(auto-fill, minmax(140px, 1fr))",
  },
  gap: "12px",
});

const gridCell = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  padding: "16px 8px",
  cursor: "pointer",
  position: "relative",
  transition: "background 0.1s ease",
  border: "1px solid transparent",
  _hover: { backgroundColor: "bg.card" },
});

const gridCellSelected = css({
  backgroundColor: "rgba(250, 82, 15, 0.06)",
  borderColor: "sunbeam.orange",
});

const gridCheckbox = css({
  position: "absolute",
  top: "8px",
  left: "8px",
});

const gridName = css({
  fontSize: "12px",
  color: "text.primary",
  textAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",
});

function GridView({
  items,
  selected,
  onSelect,
  onOpen,
}: Omit<FileListProps, "layout" | "className">) {
  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelect(next);
  };

  return (
    <div className={gridContainer} role="listbox" aria-label="Files">
      {items.map((item) => (
        <div
          key={item.id}
          className={cx(gridCell, selected.has(item.id) && gridCellSelected)}
          onClick={() => toggle(item.id)}
          onDoubleClick={() => onOpen?.(item)}
        >
          <div className={gridCheckbox}>
            <Checkbox checked={selected.has(item.id)} onChange={() => toggle(item.id)} ariaLabel={`Select ${item.name}`} />
          </div>
          <Icon
            name={defaultIcon(item)}
            size={40}
            className={item.type === "folder" ? folderIcon : fileIcon}
          />
          <span className={gridName}>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FileList                                                            */
/* ------------------------------------------------------------------ */

export function FileList({
  items,
  selected,
  onSelect,
  onOpen,
  layout = "list",
  className,
}: FileListProps) {
  const inner =
    layout === "grid" ? (
      <GridView items={items} selected={selected} onSelect={onSelect} onOpen={onOpen} />
    ) : (
      <ListView items={items} selected={selected} onSelect={onSelect} onOpen={onOpen} />
    );

  return <div className={className}>{inner}</div>;
}
