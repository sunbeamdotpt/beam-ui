import { useState } from "react";
import { css } from "styled-system/css";
import { ToggleGroup } from "@sunbeam/beam-ui/components/ui/toggle-group";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "items", type: "Array<{value: string; label: string}>", required: true, description: "Toggle options to render." },
  { name: "value", type: "string", required: true, description: "Currently selected value." },
  { name: "onChange", type: "(value: string) => void", required: true, description: "Callback when selection changes." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const ALIGN_ITEMS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

const VIEW_ITEMS = [
  { value: "grid", label: "Grid" },
  { value: "list", label: "List" },
  { value: "table", label: "Table" },
];

export function ToggleGroupPage() {
  const [align, setAlign] = useState("center");
  const [view, setView] = useState("grid");

  return (
    <ComponentPage
      name="ToggleGroup"
      description="A group of mutually exclusive toggle buttons. Only one can be active at a time. Built on Ark UI ToggleGroup."
      importPath='import { ToggleGroup } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <div className={css({ display: "flex", flexDirection: "column", gap: "16px" })}>
          <div>
            <p className={css({ fontSize: "13px", color: "text.muted", marginBottom: "8px" })}>Alignment</p>
            <ToggleGroup items={ALIGN_ITEMS} value={align} onChange={setAlign} />
          </div>
          <div>
            <p className={css({ fontSize: "13px", color: "text.muted", marginBottom: "8px" })}>View mode</p>
            <ToggleGroup items={VIEW_ITEMS} value={view} onChange={setView} />
          </div>
        </div>
        <p className={css({ marginTop: "16px", fontSize: "13px", color: "text.muted" })}>Align: {align}, View: {view}</p>
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}useState{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"react"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}ToggleGroup{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [value, setValue] = <span className={syn.fn}>useState</span>(<span className={syn.string}>"center"</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>ToggleGroup</span>{"\n"}
              {"  "}<span className={syn.prop}>items</span>={"{"}[{"\n"}
              {"    "}{"{ "}<span className={syn.prop}>value</span>: <span className={syn.string}>"left"</span>, <span className={syn.prop}>label</span>: <span className={syn.string}>"Left"</span>{" }"},{"\n"}
              {"    "}{"{ "}<span className={syn.prop}>value</span>: <span className={syn.string}>"center"</span>, <span className={syn.prop}>label</span>: <span className={syn.string}>"Center"</span>{" }"},{"\n"}
              {"  "}]{"}"}{"\n"}
              {"  "}<span className={syn.prop}>value</span>={"{"}value{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setValue{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Two options</h3>
        <ToggleGroup
          items={[{ value: "on", label: "On" }, { value: "off", label: "Off" }]}
          value="on"
          onChange={() => {}}
        />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
