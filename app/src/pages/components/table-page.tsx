import { useState } from "react";
import { css } from "styled-system/css";
import { Table } from "@sunbeam/beam-ui/components/ui/table";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "columns", type: "Column[]", required: true, description: "Array of column definitions with key, label, sortable, and optional width." },
  { name: "rows", type: "Record<string, any>[]", required: true, description: "Array of row data objects keyed by column key." },
  { name: "onSort", type: "(key: string, dir: \"asc\" | \"desc\") => void", required: false, description: "Called when a sortable column header is clicked." },
  { name: "selectable", type: "boolean", required: false, description: "Enables row selection checkboxes." },
  { name: "onSelect", type: "(selectedKeys: string[]) => void", required: false, description: "Called with selected row keys when selection changes." },
  { name: "rowKey", type: "string", required: false, description: "Property name used as a unique identifier for each row. Defaults to \"id\"." },
];

const COLUMNS = [
  { key: "name", label: "Name", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "size", label: "Size", sortable: true },
  { key: "modified", label: "Modified", sortable: true },
  { key: "status", label: "Status" },
];

const ROWS = [
  { id: "1", name: "images/hero-banner.png", type: "image/png", size: "2.4 MB", modified: "2026-03-28", status: "Active" },
  { id: "2", name: "documents/annual-report.pdf", type: "application/pdf", size: "14.1 MB", modified: "2026-03-25", status: "Active" },
  { id: "3", name: "backups/db-snapshot-0401.sql", type: "application/sql", size: "892 KB", modified: "2026-04-01", status: "Archived" },
  { id: "4", name: "logs/access-2026-03.log", type: "text/plain", size: "3.7 MB", modified: "2026-03-31", status: "Active" },
  { id: "5", name: "config/environment.json", type: "application/json", size: "1.2 KB", modified: "2026-02-14", status: "Locked" },
];

const BASIC_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  { key: "size", label: "Size" },
  { key: "modified", label: "Modified" },
  { key: "status", label: "Status" },
];

export function TablePage() {
  const [sortedRows, setSortedRows] = useState(ROWS);

  const handleSort = (key: string, dir: "asc" | "desc") => {
    const sorted = [...ROWS].sort((a, b) => {
      const aVal = (a as Record<string, string>)[key] ?? "";
      const bVal = (b as Record<string, string>)[key] ?? "";
      return dir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
    setSortedRows(sorted);
  };

  return (
    <ComponentPage
      name="Table"
      description="A data table with sortable columns and optional row selection. Designed for structured data like file listings and configuration views."
      importPath='import { Table } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <Table
          columns={COLUMNS}
          rows={sortedRows}
          onSort={handleSort}
          selectable
          onSelect={() => {}}
          rowKey="id"
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
              <span className={syn.keyword}>import</span> {"{ "}Table{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> columns = [{"\n"}
              {"  "}{"{ "}<span className={syn.prop}>key</span>: <span className={syn.string}>"name"</span>, <span className={syn.prop}>label</span>: <span className={syn.string}>"Name"</span>, <span className={syn.prop}>sortable</span>: <span className={syn.keyword}>true</span> {"},"}{"\n"}
              {"  "}{"{ "}<span className={syn.prop}>key</span>: <span className={syn.string}>"size"</span>, <span className={syn.prop}>label</span>: <span className={syn.string}>"Size"</span> {"},"}{"\n"}
              {"]"}{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Table</span>{"\n"}
              {"  "}<span className={syn.prop}>columns</span>={"{"}columns{"}"}{"\n"}
              {"  "}<span className={syn.prop}>rows</span>={"{"}rows{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onSort</span>={"{"}handleSort{"}"}{"\n"}
              {"  "}<span className={syn.prop}>selectable</span>{"\n"}
              {"  "}<span className={syn.prop}>rowKey</span>=<span className={syn.string}>"id"</span>{"\n"}
              {"/>"}{"\n"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Default</h3>
        <Table columns={BASIC_COLUMNS} rows={ROWS} rowKey="id" />
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Sortable</h3>
        <Table columns={COLUMNS} rows={sortedRows} onSort={handleSort} rowKey="id" />
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Selectable</h3>
        <Table columns={BASIC_COLUMNS} rows={ROWS} selectable onSelect={() => {}} rowKey="id" />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({
  marginBottom: "32px",
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
