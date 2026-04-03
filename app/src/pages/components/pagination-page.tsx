import { useState } from "react";
import { css } from "styled-system/css";
import { Pagination } from "@sunbeam/beam-ui/components/ui/pagination";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "currentPage", type: "number", required: true, description: "The currently active page (1-indexed)." },
  { name: "totalPages", type: "number", required: true, description: "Total number of pages." },
  { name: "onPageChange", type: "(page: number) => void", required: true, description: "Called when the user navigates to a different page." },
  { name: "pageSize", type: "number", required: false, description: "Current page size. When provided alongside onPageSizeChange, renders a page-size selector." },
  { name: "onPageSizeChange", type: "(size: number) => void", required: false, description: "Called when the user changes the number of rows per page." },
];

export function PaginationPage() {
  const [page, setPage] = useState(1);
  const [pageWithSize, setPageWithSize] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  return (
    <ComponentPage
      name="Pagination"
      description="A navigation component for paging through large data sets. Supports page buttons, previous/next navigation, ellipsis truncation, and an optional page-size selector."
      importPath='import { Pagination } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <Pagination
          currentPage={page}
          totalPages={20}
          onPageChange={setPage}
        />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}useState{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"react"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}Pagination{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [page, setPage] = <span className={syn.fn}>useState</span>(1){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Pagination</span>{"\n"}
              {"  "}<span className={syn.prop}>currentPage</span>={"{"}page{"}"}{"\n"}
              {"  "}<span className={syn.prop}>totalPages</span>={"{"}20{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onPageChange</span>={"{"}setPage{"}"}{"\n"}
              {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// With page-size selector"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Pagination</span>{"\n"}
              {"  "}<span className={syn.prop}>currentPage</span>={"{"}page{"}"}{"\n"}
              {"  "}<span className={syn.prop}>totalPages</span>={"{"}20{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onPageChange</span>={"{"}setPage{"}"}{"\n"}
              {"  "}<span className={syn.prop}>pageSize</span>={"{"}25{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onPageSizeChange</span>={"{"}setPageSize{"}"}{"\n"}
              {"/>"}{"\n"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Basic</h3>
        <div className={css({ marginBottom: "16px" })}>
          <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />
        </div>
        <CodeBlock
          tabs={[{
            label: "TSX",
            content: (
              <pre><code>
                {"<"}<span className={syn.fn}>Pagination</span> <span className={syn.prop}>currentPage</span>={"{"}page{"}"} <span className={syn.prop}>totalPages</span>={"{"}20{"}"} <span className={syn.prop}>onPageChange</span>={"{"}setPage{"}"} {"/>"}{"\n"}
              </code></pre>
            ),
          }]}
        />
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>With page-size selector</h3>
        <div className={css({ marginBottom: "16px" })}>
          <Pagination
            currentPage={pageWithSize}
            totalPages={20}
            onPageChange={setPageWithSize}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </div>
        <CodeBlock
          tabs={[{
            label: "TSX",
            content: (
              <pre><code>
                {"<"}<span className={syn.fn}>Pagination</span>{"\n"}
                {"  "}<span className={syn.prop}>currentPage</span>={"{"}page{"}"}{"\n"}
                {"  "}<span className={syn.prop}>totalPages</span>={"{"}20{"}"}{"\n"}
                {"  "}<span className={syn.prop}>onPageChange</span>={"{"}setPage{"}"}{"\n"}
                {"  "}<span className={syn.prop}>pageSize</span>={"{"}25{"}"}{"\n"}
                {"  "}<span className={syn.prop}>onPageSizeChange</span>={"{"}setPageSize{"}"}{"\n"}
                {"/>"}{"\n"}
              </code></pre>
            ),
          }]}
        />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "32px",
  border: "1px solid",
  borderColor: "border.default",
});

const variantBlock = css({
  marginBottom: "40px",
});

const variantLabel = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  textTransform: "capitalize",
  marginBottom: "12px",
});
