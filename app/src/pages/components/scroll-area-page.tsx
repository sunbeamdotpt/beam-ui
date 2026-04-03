import { css } from "styled-system/css";
import { ScrollArea } from "@sunbeam/beam-ui/components/ui/scroll-area";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "children", type: "ReactNode", required: true, description: "Scrollable content." },
  { name: "maxHeight", type: "string", required: false, description: 'Maximum height before scrolling. Defaults to "300px".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const LONG_CONTENT = Array.from({ length: 20 }, (_, i) =>
  `Item ${i + 1} -- Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
);

export function ScrollAreaPage() {
  return (
    <ComponentPage
      name="ScrollArea"
      description="A styled scrollable container with warm golden scrollbars matching the design system."
      importPath='import { ScrollArea } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <ScrollArea maxHeight="200px">
          <div className={css({ padding: "16px" })}>
            {LONG_CONTENT.map((text, i) => (
              <p key={i} className={css({ fontSize: "14px", color: "text.primary", marginBottom: "8px", lineHeight: 1.5 })}>
                {text}
              </p>
            ))}
          </div>
        </ScrollArea>
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}ScrollArea{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>ScrollArea</span> <span className={syn.prop}>maxHeight</span>=<span className={syn.string}>"200px"</span>{">"}{"\n"}
              {"  "}{"<"}div{">"}Long scrollable content...{"</"}div{">"}{"\n"}
              {"</"}<span className={syn.fn}>ScrollArea</span>{">"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Horizontal scroll</h3>
        <ScrollArea maxHeight="100px">
          <div className={css({ display: "flex", gap: "12px", padding: "16px", whiteSpace: "nowrap", width: "max-content" })}>
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className={card}>Card {i + 1}</div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "0", backgroundColor: "bg.card", marginBottom: "32px", border: "1px solid", borderColor: "border.default" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
const card = css({ padding: "16px 24px", backgroundColor: "bg.page", border: "1px solid", borderColor: "border.default", fontSize: "14px", flexShrink: 0 });
