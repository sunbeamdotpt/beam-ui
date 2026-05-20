import { useState } from "react";
import { Pagination } from "./pagination.tsx";

export default function PaginationStory() {
  const [page, setPage] = useState(5);
  const [pageSize, setPageSize] = useState(25);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />
      <Pagination
        currentPage={page}
        totalPages={20}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}

export function FirstPage() {
  const [page, setPage] = useState(1);
  return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
}

export function LastPage() {
  const [page, setPage] = useState(10);
  return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
}

export function WithPageSize() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  return <Pagination currentPage={page} totalPages={50} onPageChange={setPage} pageSize={size} onPageSizeChange={setSize} />;
}
