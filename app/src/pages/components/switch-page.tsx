import { useState } from "react";
import { css } from "styled-system/css";
import { Switch } from "@sunbeam/beam-ui/components/ui/switch";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "checked", type: "boolean", required: true, description: "Whether the switch is on." },
  { name: "onChange", type: "(checked: boolean) => void", required: true, description: "Callback when toggled." },
  { name: "label", type: "string", required: false, description: "Text label next to the switch." },
  { name: "disabled", type: "boolean", required: false, description: "Disables the switch." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function SwitchPage() {
  const [on, setOn] = useState(false);
  const [notifs, setNotifs] = useState(true);

  return (
    <ComponentPage
      name="Switch"
      description="A toggle switch for boolean settings. Built on Ark UI Switch."
      importPath='import { Switch } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <Switch checked={on} onChange={setOn} label="Dark mode" />
        <Switch checked={notifs} onChange={setNotifs} label="Notifications" />
        <Switch checked={false} onChange={() => {}} label="Disabled" disabled />
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
              <span className={syn.keyword}>import</span> {"{ "}Switch{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [on, setOn] = <span className={syn.fn}>useState</span>(false){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Switch</span> <span className={syn.prop}>checked</span>={"{"}on{"}"} <span className={syn.prop}>onChange</span>={"{"}setOn{"}"} <span className={syn.prop}>label</span>=<span className={syn.string}>"Dark mode"</span> {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Without label</h3>
        <Switch checked={on} onChange={setOn} />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ display: "flex", flexDirection: "column", gap: "16px", padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
