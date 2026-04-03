import { useState } from "react";
import { css } from "styled-system/css";
import { ColorPicker } from "@sunbeam/beam-ui/components/ui/color-picker";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "value", type: "string", required: true, description: "Current hex color value." },
  { name: "onChange", type: "(value: string) => void", required: true, description: "Callback when color changes." },
  { name: "presets", type: "string[]", required: false, description: "Array of hex color presets. Defaults to 20 common colors." },
  { name: "label", type: "string", required: false, description: "Label text above the picker." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const BRAND_PRESETS = [
  "#FF6B00", "#FFB800", "#1A1A1A", "#FFFFFF",
  "#0066FF", "#00CC88", "#FF3366", "#9933FF",
];

export function ColorPickerPage() {
  const [color1, setColor1] = useState("#3B82F6");
  const [color2, setColor2] = useState("#FF6B00");

  return (
    <ComponentPage
      name="ColorPicker"
      description="A compact color picker with preset swatches and hex input. Uses Ark UI Popover for the dropdown."
      importPath='import { ColorPicker } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <ColorPicker value={color1} onChange={setColor1} />
        <p className={css({ marginTop: "12px", fontSize: "13px", color: "text.muted" })}>
          Selected: {color1}
        </p>
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
              <span className={syn.keyword}>import</span> {"{ "}ColorPicker{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [color, setColor] = <span className={syn.fn}>useState</span>(<span className={syn.string}>"#3B82F6"</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>ColorPicker</span> <span className={syn.prop}>value</span>={"{"}color{"}"} <span className={syn.prop}>onChange</span>={"{"}setColor{"}"} {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>With label and custom presets</h3>
        <ColorPicker
          value={color2}
          onChange={setColor2}
          label="Brand color"
          presets={BRAND_PRESETS}
        />
        <p className={css({ marginTop: "8px", fontSize: "13px", color: "text.muted" })}>
          Selected: {color2}
        </p>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
