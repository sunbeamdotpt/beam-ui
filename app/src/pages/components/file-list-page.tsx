import { useState } from "react";
import { css } from "styled-system/css";
import { FileList, type FileItem } from "@sunbeam/beam-ui/components/ui/file-list";
import { Tabs } from "@sunbeam/beam-ui/components/ui/tabs";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "items", type: "FileItem[]", required: true, description: "Array of file/folder objects to display." },
  { name: "selected", type: "Set<string>", required: true, description: "Set of selected item IDs." },
  { name: "onSelect", type: "(selected: Set<string>) => void", required: true, description: "Callback when selection changes." },
  { name: "onOpen", type: "(item: FileItem) => void", required: false, description: "Callback on double-click (e.g., navigate into folder)." },
  { name: "layout", type: '"list" | "grid"', required: false, description: 'Display layout. Defaults to "list".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const ITEM_PROPS = [
  { name: "id", type: "string", required: true, description: "Unique identifier for selection tracking." },
  { name: "name", type: "string", required: true, description: "File or folder name." },
  { name: "icon", type: "string", required: false, description: "Override the default icon (defaults to folder/description based on type)." },
  { name: "type", type: '"file" | "folder"', required: false, description: "Whether this is a file or folder. Affects default icon and styling." },
  { name: "size", type: "string", required: false, description: "Human-readable file size (list view only)." },
  { name: "modified", type: "string", required: false, description: "Last modified timestamp (list view only)." },
];

const sampleItems: FileItem[] = [
  { id: "1", name: "assets", type: "folder", modified: "Mar 28, 2026" },
  { id: "2", name: "backups", type: "folder", modified: "Mar 15, 2026" },
  { id: "3", name: "config.yaml", type: "file", size: "2.4 KB", modified: "Apr 1, 2026" },
  { id: "4", name: "index.html", type: "file", size: "8.1 KB", modified: "Apr 2, 2026" },
  { id: "5", name: "logo.svg", type: "file", icon: "image", size: "14 KB", modified: "Mar 20, 2026" },
  { id: "6", name: "README.md", type: "file", size: "1.2 KB", modified: "Mar 30, 2026" },
  { id: "7", name: "styles.css", type: "file", size: "24 KB", modified: "Apr 2, 2026" },
  { id: "8", name: "data.json", type: "file", size: "156 KB", modified: "Apr 3, 2026" },
];

export function FileListPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [gridSelected, setGridSelected] = useState<Set<string>>(new Set());
  const [layout, setLayout] = useState<"list" | "grid">("list");

  return (
    <ComponentPage
      name="FileList"
      description="A multi-select file browser component with list and grid layouts. Supports folders, files with icons, sizes, and dates. Ideal for S3 storage browsers and file managers."
      importPath='import { FileList } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={css({ marginBottom: "12px" })}>
        <Tabs
          items={[
            { value: "list", label: "List" },
            { value: "grid", label: "Grid" },
          ]}
          activeValue={layout}
          onChange={(v) => setLayout(v as "list" | "grid")}
        />
      </div>
      <div className={previewBox}>
        <FileList
          items={sampleItems}
          selected={selected}
          onSelect={setSelected}
          onOpen={(item) => alert(`Opening ${item.name}`)}
          layout={layout}
        />
      </div>
      <p className={selectionLabel}>
        {selected.size} of {sampleItems.length} selected
      </p>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />
      <h3 className={subHeading}>FileItem</h3>
      <PropsTable props={ITEM_PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}useState{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"react"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}FileList{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [selected, setSelected] = <span className={syn.fn}>useState</span>(new Set()){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>FileList</span>{"\n"}
              {"  "}<span className={syn.prop}>items</span>={"{files}"}{"\n"}
              {"  "}<span className={syn.prop}>selected</span>={"{selected}"}{"\n"}
              {"  "}<span className={syn.prop}>onSelect</span>={"{setSelected}"}{"\n"}
              {"  "}<span className={syn.prop}>onOpen</span>={"{(item) => navigate(item.name)}"}{"\n"}
              {"  "}<span className={syn.prop}>layout</span>=<span className={syn.string}>"list"</span>{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Grid layout</h3>
        <FileList
          items={sampleItems.slice(0, 6)}
          selected={gridSelected}
          onSelect={setGridSelected}
          layout="grid"
        />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "0", backgroundColor: "bg.card", marginBottom: "12px" });
const selectionLabel = css({ fontSize: "13px", color: "text.muted", marginBottom: "32px" });
const subHeading = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", marginBottom: "16px", marginTop: "24px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
