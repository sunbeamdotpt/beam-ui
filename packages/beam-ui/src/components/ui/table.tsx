import { useState } from "react";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

interface TableProps {
  columns: Column[];
  rows: Array<Record<string, any>>;
  onSort?: (key: string, dir: "asc" | "desc") => void;
  selectable?: boolean;
  onSelect?: (selectedKeys: string[]) => void;
  rowKey?: string;
  className?: string;
}

export function Table({
  columns,
  rows,
  onSort,
  selectable,
  onSelect,
  rowKey = "id",
  className,
}: TableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleSort = (key: string) => {
    const nextDir = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDir(nextDir);
    onSort?.(key, nextDir);
  };

  const toggleRow = (key: string) => {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSelected(next);
    onSelect?.(Array.from(next));
  };

  const toggleAll = () => {
    if (selected.size === rows.length) {
      setSelected(new Set());
      onSelect?.([]);
    } else {
      const all = new Set(rows.map((r) => String(r[rowKey])));
      setSelected(all);
      onSelect?.(Array.from(all));
    }
  };

  return (
    <div className={cx(wrapper, className)}>
      <table className={table}>
        <thead>
          <tr className={headerRow}>
            {selectable && (
              <th className={cx(headerCell, css({ width: "40px" }))}>
                <input
                  type="checkbox"
                  checked={rows.length > 0 && selected.size === rows.length}
                  onChange={toggleAll}
                  className={checkbox}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={headerCell}
                style={col.width ? { width: col.width } : undefined}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className={headerLabel}>
                  {col.label}
                  {col.sortable && (
                    <Icon
                      name={sortKey === col.key && sortDir === "desc" ? "arrow_downward" : "arrow_upward"}
                      size={14}
                      className={css({
                        opacity: sortKey === col.key ? 1 : 0.3,
                        transition: "opacity 0.15s ease",
                      })}
                    />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const key = String(row[rowKey] ?? i);
            return (
              <tr
                key={key}
                className={cx(
                  dataRow,
                  i % 2 === 0 ? evenRow : oddRow,
                )}
              >
                {selectable && (
                  <td className={dataCell}>
                    <input
                      type="checkbox"
                      checked={selected.has(key)}
                      onChange={() => toggleRow(key)}
                      className={checkbox}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className={dataCell}>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const wrapper = css({
  overflowX: "auto",
  border: "1px solid",
  borderColor: "border.default",
});

const table = css({
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: "body",
});

const headerRow = css({
  backgroundColor: "bg.card",
});

const headerCell = css({
  padding: "10px 16px",
  textAlign: "left",
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "text.muted",
  borderBottom: "1px solid",
  borderColor: "border.default",
  cursor: "default",
  whiteSpace: "nowrap",
  userSelect: "none",
  "&[onClick]": { cursor: "pointer" },
});

const headerLabel = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
});

const dataRow = css({
  transition: "background-color 0.15s ease",
  _hover: { backgroundColor: "bg.card" },
});

const evenRow = css({ backgroundColor: "bg.page" });
const oddRow = css({ backgroundColor: "bg.card" });

const dataCell = css({
  padding: "10px 16px",
  fontSize: "14px",
  fontFamily: "mono",
  color: "text.primary",
  borderBottom: "1px solid",
  borderColor: "border.subtle",
});

const checkbox = css({
  accentColor: "sunbeam.orange",
  cursor: "pointer",
});
