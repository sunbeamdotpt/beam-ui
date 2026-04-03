import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  className,
}: PaginationProps) {
  const pages = buildPageList(currentPage, totalPages);

  return (
    <nav className={cx(wrapper, className)} aria-label="Pagination">
      <div className={pageButtons}>
        <button
          className={navBtn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          type="button"
          aria-label="Previous page"
        >
          <Icon name="chevron_left" size={18} />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className={ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={cx(pageBtn, p === currentPage && activePage)}
              onClick={() => onPageChange(p as number)}
              {...(p === currentPage ? { "aria-current": "page" as const } : {})}
            >
              {p}
            </button>
          )
        )}

        <button
          className={navBtn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          type="button"
          aria-label="Next page"
        >
          <Icon name="chevron_right" size={18} />
        </button>
      </div>

      {pageSize !== undefined && onPageSizeChange && (
        <div className={sizeSelector}>
          <label className={sizeLabel}>Rows</label>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className={sizeSelect}
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Page range logic                                                    */
/* ------------------------------------------------------------------ */

function buildPageList(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const wrapper = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  fontFamily: "body",
  flexWrap: "wrap",
});

const pageButtons = css({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const navBtn = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  border: "1px solid",
  borderColor: "border.default",
  backgroundColor: "bg.card",
  color: "text.primary",
  cursor: "pointer",
  transition: "all 0.15s ease",
  _hover: { borderColor: "sunbeam.orange", color: "sunbeam.orange" },
  _disabled: { opacity: 0.35, cursor: "default", _hover: { borderColor: "border.default", color: "text.primary" } },
});

const pageBtn = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "32px",
  height: "32px",
  padding: "0 8px",
  fontSize: "13px",
  fontWeight: "button",
  border: "1px solid",
  borderColor: "border.default",
  backgroundColor: "bg.card",
  color: "text.primary",
  cursor: "pointer",
  transition: "all 0.15s ease",
  _hover: { borderColor: "sunbeam.orange", color: "sunbeam.orange" },
  // Compact on mobile
  sm: { minWidth: "36px", height: "36px", fontSize: "14px" },
});

const activePage = css({
  backgroundColor: "sunbeam.orange",
  color: "white",
  borderColor: "sunbeam.orange",
  _hover: { backgroundColor: "sunbeam.flame", borderColor: "sunbeam.flame", color: "white" },
});

const ellipsis = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  fontSize: "14px",
  color: "text.muted",
  userSelect: "none",
});

const sizeSelector = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const sizeLabel = css({
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "text.muted",
});

const sizeSelect = css({
  padding: "4px 8px",
  fontSize: "13px",
  fontFamily: "body",
  fontWeight: "body",
  border: "1px solid",
  borderColor: "border.default",
  backgroundColor: "bg.card",
  color: "text.primary",
  cursor: "pointer",
  _hover: { borderColor: "sunbeam.orange" },
});
