import { css } from "styled-system/css";
import { Accordion } from "@sunbeam/beam-ui/components/ui/accordion";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "items", type: "AccordionEntry[]", required: true, description: "Array of { value, title, content } entries." },
  { name: "multiple", type: "boolean", required: false, description: "Allow multiple panels open at once. Defaults to false." },
  { name: "defaultValue", type: "string[]", required: false, description: "Initially expanded panel values." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const ITEMS = [
  { value: "item-1", title: "What is Sunbeam?", content: "Sunbeam is a design system built with warm, golden aesthetics and precision engineering." },
  { value: "item-2", title: "How do I get started?", content: "Install @sunbeam/beam-ui via your package manager and import the components you need." },
  { value: "item-3", title: "Can I customize the tokens?", content: "Yes, all design tokens are defined in your panda.config.ts and can be extended or overridden." },
];

export function AccordionPage() {
  return (
    <ComponentPage
      name="Accordion"
      description="A vertically stacked set of collapsible panels. Built on Ark UI Accordion."
      importPath='import { Accordion } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <Accordion items={ITEMS} />
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}Accordion{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Accordion</span>{"\n"}
              {"  "}<span className={syn.prop}>items</span>={"{"}[{"\n"}
              {"    "}{"{ "}<span className={syn.prop}>value</span>: <span className={syn.string}>"faq-1"</span>, <span className={syn.prop}>title</span>: <span className={syn.string}>"Question"</span>, <span className={syn.prop}>content</span>: <span className={syn.string}>"Answer"</span>{" }"},{"\n"}
              {"  "}]{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Multiple</h3>
        <div className={css({ marginBottom: "16px" })}>
          <Accordion items={ITEMS} multiple defaultValue={["item-1", "item-2"]} />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "32px",
});

const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
