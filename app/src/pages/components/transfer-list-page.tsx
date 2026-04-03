import { useState } from "react";
import { css } from "styled-system/css";
import { TransferList } from "@sunbeam/beam-ui/components/ui/transfer-list";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

import type { TransferItem } from "@sunbeam/beam-ui/components/ui/transfer-list";

const PROPS = [
  { name: "available", type: "TransferItem[]", required: true, description: "Items in the available (left) panel." },
  { name: "selected", type: "TransferItem[]", required: true, description: "Items in the selected (right) panel." },
  { name: "onChange", type: "(available, selected) => void", required: true, description: "Callback when items are moved between panels." },
  { name: "availableTitle", type: "string", required: false, description: 'Title for the available panel. Defaults to "Available".' },
  { name: "selectedTitle", type: "string", required: false, description: 'Title for the selected panel. Defaults to "Selected".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const INITIAL_AVAILABLE: TransferItem[] = [
  { id: "1", label: "Alice Chen", icon: "person" },
  { id: "2", label: "Bob Martinez", icon: "person" },
  { id: "3", label: "Carol Johnson", icon: "person" },
  { id: "4", label: "David Kim", icon: "person" },
  { id: "5", label: "Eva Singh", icon: "person" },
  { id: "6", label: "Frank Lee", icon: "person" },
];

const INITIAL_SELECTED: TransferItem[] = [
  { id: "7", label: "Grace Tanaka", icon: "person" },
  { id: "8", label: "Henry Okafor", icon: "person" },
];

export function TransferListPage() {
  const [available, setAvailable] = useState<TransferItem[]>(INITIAL_AVAILABLE);
  const [selected, setSelected] = useState<TransferItem[]>(INITIAL_SELECTED);

  return (
    <ComponentPage
      name="TransferList"
      description="Two-panel list for moving items between available and selected groups. Supports search filtering and multi-select with Ctrl/Cmd+click."
      importPath='import { TransferList } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <TransferList
          available={available}
          selected={selected}
          onChange={(a, s) => { setAvailable(a); setSelected(s); }}
          availableTitle="Team Members"
          selectedTitle="Project Team"
        />
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}TransferList{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [available, setAvailable] = <span className={syn.fn}>useState</span>(items){"\n"}
              <span className={syn.keyword}>const</span> [selected, setSelected] = <span className={syn.fn}>useState</span>([]){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>TransferList</span>{"\n"}
              {"  "}<span className={syn.prop}>available</span>={"{"}available{"}"}{"\n"}
              {"  "}<span className={syn.prop}>selected</span>={"{"}selected{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}(a, s) {"=> { "}setAvailable(a); setSelected(s); {"}"}{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Custom Titles</h3>
        <TransferList
          available={[
            { id: "a", label: "Read" },
            { id: "b", label: "Write" },
            { id: "c", label: "Execute" },
          ]}
          selected={[
            { id: "d", label: "Admin" },
          ]}
          onChange={() => {}}
          availableTitle="Permissions"
          selectedTitle="Granted"
        />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
