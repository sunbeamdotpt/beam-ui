# Pagination

> Page navigation with page size selector and ellipsis collapse.

> **[View rendered page](https://design.sunbeam.pt/components/pagination?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Pagination } from "@sunbeam/beam-ui/components/ui/pagination"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| currentPage | `number` | Yes | Active page number |
| totalPages | `number` | Yes | Total number of pages |
| onPageChange | `(page: number) => void` | Yes | Page change handler |
| pageSize | `number` | No | Current page size |
| onPageSizeChange | `(size: number) => void` | No | Page size change handler |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<Pagination currentPage={1} totalPages={10} onPageChange={setPage} />
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
