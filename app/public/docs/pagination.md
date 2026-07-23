# Pagination

> Props for {@link Pagination}. */
export interface PaginationProps {
  /** Currently active page (1-indexed). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called when user clicks a page number or navigation arrow. Receives new page number. */
  onPageChange: (page: number) => void;
  /** Current items-per-page count. If provided with onPageSizeChange, shows size selector. */
  pageSize?: number;
  /** Called when user changes page size. Receives new size. */
  onPageSizeChange?: (size: number) => void;
  /** Optional CSS class for the nav element. */
  className?: string;
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/** Pagination control with previous/next arrows, numbered buttons (with smart ellipsis), and optional page size selector. Always shows exactly 7 page slots. Disables prev/next buttons at boundaries. * @example ```tsx <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} pageSize={size} onPageSizeChange={setSize} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/pagination?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Pagination } from "@sunbeam/beam-ui/components/ui/pagination"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| currentPage | `number` | Yes | Currently active page (1-indexed). |
| totalPages | `number` | Yes | Total number of pages. |
| onPageChange | `(page: number) => void` | Yes | Called when user clicks a page number or navigation arrow. Receives new page number. |
| pageSize | `number` | No | Current items-per-page count. If provided with onPageSizeChange, shows size selector. |
| onPageSizeChange | `(size: number) => void` | No | Called when user changes page size. Receives new size. |
| className | `string` | No | Optional CSS class for the nav element. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
