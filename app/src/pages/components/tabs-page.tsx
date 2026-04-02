import { useState } from "react";
import { css } from "styled-system/css";
import { Tabs } from "@sunbeam/beam-ui/components/ui/tabs";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "items", type: "TabItem[]", required: true, description: 'Array of { value, label } objects defining each tab.' },
  { name: "activeValue", type: "string", required: true, description: "Currently selected tab value (controlled)." },
  { name: "onChange", type: "(value: string) => void", required: true, description: "Callback when the active tab changes." },
  { name: "variant", type: '"default" | "dark"', required: false, description: 'Visual style. Defaults to "default".' },
];

const DEMO_ITEMS = [
  { value: "overview", label: "Overview" },
  { value: "usage", label: "Usage" },
  { value: "api", label: "API" },
];

export function TabsPage() {
  const [active, setActive] = useState("overview");
  const [activeDark, setActiveDark] = useState("overview");

  return (
    <ComponentPage
      name="Tabs"
      description="A controlled tab navigation component with default and dark variants. Built on Ark UI primitives."
      importPath='import { Tabs } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewArea}>
        <Tabs items={DEMO_ITEMS} activeValue={active} onChange={setActive} />
        <p className={bodyText}>
          Active tab: <strong>{active}</strong>
        </p>
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
              <span className={syn.keyword}>import</span> {"{ "}Tabs{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> items = [{"\n"}
              {"  "}{"{"} <span className={syn.prop}>value</span>: <span className={syn.string}>"overview"</span>, <span className={syn.prop}>label</span>: <span className={syn.string}>"Overview"</span> {"}"},  {"\n"}
              {"  "}{"{"} <span className={syn.prop}>value</span>: <span className={syn.string}>"usage"</span>, <span className={syn.prop}>label</span>: <span className={syn.string}>"Usage"</span> {"}"},  {"\n"}
              ]{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [active, setActive] = <span className={syn.fn}>useState</span>(<span className={syn.string}>"overview"</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Tabs</span>{"\n"}
              {"  "}<span className={syn.prop}>items</span>={"{"}items{"}"}{"\n"}
              {"  "}<span className={syn.prop}>activeValue</span>={"{"}active{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setActive{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>default</h3>
        <Tabs items={DEMO_ITEMS} activeValue={active} onChange={setActive} />
      </div>

      <div className={css({ padding: "32px", backgroundColor: "sunbeam.black", marginBottom: "40px" })}>
        <h3 className={css({ fontSize: "18px", fontWeight: "heading", color: "white", marginBottom: "12px" })}>dark</h3>
        <Tabs items={DEMO_ITEMS} activeValue={activeDark} onChange={setActiveDark} variant="dark" />
      </div>
    </ComponentPage>
  );
}

const previewArea = css({
  marginBottom: "32px",
});

const bodyText = css({
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
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
