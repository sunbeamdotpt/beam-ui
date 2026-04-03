import { css } from "styled-system/css";
import { Splitter } from "@sunbeam/beam-ui/components/ui/splitter";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "children", type: "[ReactNode, ReactNode]", required: true, description: "Exactly two panel children." },
  { name: "direction", type: '"horizontal" | "vertical"', required: false, description: 'Split direction. Defaults to "horizontal".' },
  { name: "defaultSize", type: "number", required: false, description: "Initial size of the first panel as a percentage. Defaults to 50." },
];

export function SplitterPage() {
  return (
    <ComponentPage
      name="Splitter"
      description="A resizable split panel layout. Drag the handle to resize. Built on Ark UI Splitter."
      importPath='import { Splitter } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <div className={css({ height: "200px", border: "1px solid", borderColor: "border.default" })}>
          <Splitter>
            <div className={panelContent}>Panel A</div>
            <div className={panelContent}>Panel B</div>
          </Splitter>
        </div>
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}Splitter{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Splitter</span> <span className={syn.prop}>direction</span>=<span className={syn.string}>"horizontal"</span> <span className={syn.prop}>defaultSize</span>={"{"}60{"}"}{">"}{"\n"}
              {"  "}{"<"}div{">"}Left panel{"</"}div{">"}{"\n"}
              {"  "}{"<"}div{">"}Right panel{"</"}div{">"}{"\n"}
              {"</"}<span className={syn.fn}>Splitter</span>{">"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Vertical split</h3>
        <div className={css({ height: "300px", border: "1px solid", borderColor: "border.default" })}>
          <Splitter direction="vertical" defaultSize={40}>
            <div className={panelContent}>Top panel</div>
            <div className={panelContent}>Bottom panel</div>
          </Splitter>
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Custom default size (70/30)</h3>
        <div className={css({ height: "200px", border: "1px solid", borderColor: "border.default" })}>
          <Splitter defaultSize={70}>
            <div className={panelContent}>Larger panel</div>
            <div className={panelContent}>Smaller panel</div>
          </Splitter>
        </div>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
const panelContent = css({ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "14px", color: "text.secondary", backgroundColor: "bg.page", padding: "16px" });
