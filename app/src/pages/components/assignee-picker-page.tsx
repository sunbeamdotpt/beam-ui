import { useState } from "react";
import { css } from "styled-system/css";
import { AssigneePicker } from "@sunbeam/beam-ui/components/ui/assignee-picker";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "options", type: "UserOption[]", required: true, description: "Array of user options with id, username, displayName, and optional avatarUrl." },
  { name: "selected", type: "string[]", required: true, description: "Array of selected user IDs." },
  { name: "onChange", type: "(selected: string[]) => void", required: true, description: "Callback fired when selection changes." },
  { name: "placeholder", type: "string", required: false, description: 'Placeholder text. Defaults to "Assignees".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const SAMPLE_USERS = [
  { id: "1", username: "sienna", displayName: "Sienna Park" },
  { id: "2", username: "ravi", displayName: "Ravi Krishnan" },
  { id: "3", username: "elena", displayName: "Elena Vasquez" },
  { id: "4", username: "tomasz", displayName: "Tomasz Nowak" },
  { id: "5", username: "jun", displayName: "Jun Watanabe" },
  { id: "6", username: "amara", displayName: "Amara Obi" },
];

export function AssigneePickerPage() {
  const [selected, setSelected] = useState<string[]>(["1", "3"]);

  return (
    <ComponentPage
      name="AssigneePicker"
      description="A multi-select dropdown for assigning users with avatars. Supports search filtering by username and display name."
      importPath='import { AssigneePicker } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <div className={pickerWrapper}>
          <AssigneePicker
            options={SAMPLE_USERS}
            selected={selected}
            onChange={setSelected}
            placeholder="Assign users..."
          />
        </div>
      </div>
      <p className={selectionText}>
        Selected: {selected.length === 0 ? "none" : selected.join(", ")}
      </p>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}useState{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"react"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}AssigneePicker{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> users = [{"\n"}
              {"  "}{"{ "}<span className={syn.prop}>id</span>: <span className={syn.string}>"1"</span>, <span className={syn.prop}>username</span>: <span className={syn.string}>"sienna"</span>, <span className={syn.prop}>displayName</span>: <span className={syn.string}>"Sienna Park"</span>{" },"}{"\n"}
              {"  "}{"{ "}<span className={syn.prop}>id</span>: <span className={syn.string}>"2"</span>, <span className={syn.prop}>username</span>: <span className={syn.string}>"ravi"</span>, <span className={syn.prop}>displayName</span>: <span className={syn.string}>"Ravi Krishnan"</span>{" },"}{"\n"}
              ]{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [selected, setSelected] = <span className={syn.fn}>useState</span>(<span className={syn.string}>[]</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>AssigneePicker</span>{"\n"}
              {"  "}<span className={syn.prop}>options</span>={"{"}users{"}"}{"\n"}
              {"  "}<span className={syn.prop}>selected</span>={"{"}selected{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setSelected{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Empty state</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "280px" })}>
          <AssigneePicker
            options={SAMPLE_USERS}
            selected={[]}
            onChange={() => {}}
            placeholder="Assign users..."
          />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Multiple selected</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "280px" })}>
          <AssigneePicker
            options={SAMPLE_USERS}
            selected={["1", "2", "3", "4"]}
            onChange={() => {}}
          />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewRow = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  gap: "24px",
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "16px",
});

const pickerWrapper = css({
  width: "300px",
});

const selectionText = css({
  fontSize: "13px",
  fontFamily: "mono",
  color: "text.muted",
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
