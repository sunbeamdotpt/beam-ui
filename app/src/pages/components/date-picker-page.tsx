import { useState } from "react";
import { css } from "styled-system/css";
import { DatePicker } from "@sunbeam/beam-ui/components/ui/date-picker";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "value", type: "string", required: false, description: "ISO date string (YYYY-MM-DD)." },
  { name: "onChange", type: "(value: string) => void", required: false, description: "Callback when date changes." },
  { name: "label", type: "string", required: false, description: "Label text above the input." },
  { name: "placeholder", type: "string", required: false, description: 'Placeholder text. Defaults to "Select date".' },
  { name: "disabled", type: "boolean", required: false, description: "Disables the date picker." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function DatePickerPage() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  return (
    <ComponentPage
      name="DatePicker"
      description="A calendar date picker built on Ark UI. Supports day, month, and year views with keyboard navigation."
      importPath='import { DatePicker } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <div className={css({ maxWidth: "300px", width: "100%" })}>
          <DatePicker value={date1} onChange={setDate1} />
        </div>
        {date1 && (
          <p className={css({ marginTop: "12px", fontSize: "13px", color: "text.muted" })}>
            Selected: {date1}
          </p>
        )}
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
              <span className={syn.keyword}>import</span> {"{ "}DatePicker{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [date, setDate] = <span className={syn.fn}>useState</span>(<span className={syn.string}>""</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>DatePicker</span> <span className={syn.prop}>value</span>={"{"}date{"}"} <span className={syn.prop}>onChange</span>={"{"}setDate{"}"} {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>With label</h3>
        <div className={css({ maxWidth: "300px" })}>
          <DatePicker value={date2} onChange={setDate2} label="Start date" />
        </div>
        {date2 && (
          <p className={css({ marginTop: "8px", fontSize: "13px", color: "text.muted" })}>
            Selected: {date2}
          </p>
        )}
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Disabled</h3>
        <div className={css({ maxWidth: "300px" })}>
          <DatePicker disabled placeholder="Not available" />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
