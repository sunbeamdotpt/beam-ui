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
  const [pageLarge, setPageLarge] = useState(1);
  const [pageHuge, setPageHuge] = useState(1);

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

      <div className={variantBlock}>
        <h3 className={variantLabel}>Adaptive button sizing</h3>
        <p className={css({ fontSize: "14px", color: "text.secondary", marginBottom: "16px", lineHeight: 1.6 })}>
          Button width automatically adapts to the digit count of <code className={css({ fontFamily: "mono", fontSize: "13px" })}>totalPages</code>.
          This ensures consistent total width regardless of which page is active — no layout shifts.
        </p>
        <div className={css({ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "16px" })}>
          <div>
            <p className={css({ fontSize: "12px", fontFamily: "mono", color: "text.muted", marginBottom: "8px" })}>totalPages=20 (2 digits)</p>
            <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />
          </div>
          <div>
            <p className={css({ fontSize: "12px", fontFamily: "mono", color: "text.muted", marginBottom: "8px" })}>totalPages=500 (3 digits)</p>
            <Pagination currentPage={pageLarge} totalPages={500} onPageChange={setPageLarge} />
          </div>
          <div>
            <p className={css({ fontSize: "12px", fontFamily: "mono", color: "text.muted", marginBottom: "8px" })}>totalPages=2500 (4 digits)</p>
            <Pagination currentPage={pageHuge} totalPages={2500} onPageChange={setPageHuge} />
          </div>
        </div>
        <CodeBlock
          tabs={[{
            label: "TSX",
            content: (
              <pre><code>
                <span className={syn.comment}>{"// Buttons auto-size based on totalPages digit count"}</span>{"\n"}
                <span className={syn.comment}>{"// 2 digits (≤99):  36px buttons"}</span>{"\n"}
                <span className={syn.comment}>{"// 3 digits (≤999): 48px buttons"}</span>{"\n"}
                <span className={syn.comment}>{"// 4 digits (≤9999): 58px buttons"}</span>{"\n"}
                {"\n"}
                {"<"}<span className={syn.fn}>Pagination</span>{"\n"}
                {"  "}<span className={syn.prop}>totalPages</span>={"{"}2500{"}"}{"\n"}
                {"  "}<span className={syn.prop}>currentPage</span>={"{"}page{"}"}{"\n"}
                {"  "}<span className={syn.prop}>onPageChange</span>={"{"}setPage{"}"}{"\n"}
                {"/>"}
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
