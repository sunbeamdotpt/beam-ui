import { useState } from "react";
import { css } from "styled-system/css";
import { Toggle } from "@sunbeam/beam-ui/components/ui/toggle";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "pressed", type: "boolean", required: true, description: "Whether the toggle is pressed." },
  { name: "onChange", type: "(pressed: boolean) => void", required: true, description: "Callback when pressed state changes." },
  { name: "children", type: "ReactNode", required: true, description: "Toggle button content." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function TogglePage() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [fav, setFav] = useState(true);

  return (
    <ComponentPage
      name="Toggle"
      description="A single toggle button that switches between pressed and unpressed states. Built on Ark UI Toggle."
      importPath='import { Toggle } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <Toggle pressed={bold} onChange={setBold}>
          <Icon name="format_bold" size={18} /> Bold
        </Toggle>
        <Toggle pressed={italic} onChange={setItalic}>
          <Icon name="format_italic" size={18} /> Italic
        </Toggle>
        <Toggle pressed={fav} onChange={setFav}>
          <Icon name="favorite" size={18} /> Favorite
        </Toggle>
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
              <span className={syn.keyword}>import</span> {"{ "}Toggle{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [pressed, setPressed] = <span className={syn.fn}>useState</span>(false){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Toggle</span> <span className={syn.prop}>pressed</span>={"{"}pressed{"}"} <span className={syn.prop}>onChange</span>={"{"}setPressed{"}"}{">"}{"\n"}
              {"  "}Bold{"\n"}
              {"</"}<span className={syn.fn}>Toggle</span>{">"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Unpressed</h3>
        <Toggle pressed={false} onChange={() => {}}>Unpressed</Toggle>
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Pressed</h3>
        <Toggle pressed={true} onChange={() => {}}>Pressed</Toggle>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ display: "flex", flexWrap: "wrap", gap: "12px", padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
