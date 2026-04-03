import { css } from "styled-system/css";
import { Popover } from "@sunbeam/beam-ui/components/ui/popover";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "trigger", type: "ReactNode", required: true, description: "The element that opens the popover on click." },
  { name: "children", type: "ReactNode", required: true, description: "Content displayed inside the popover body." },
  { name: "title", type: "string", required: false, description: "Optional title shown in the popover header." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function PopoverPage() {
  return (
    <ComponentPage
      name="Popover"
      description="A floating panel anchored to a trigger element. Built on Ark UI Popover."
      importPath='import { Popover } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <Popover
          trigger={<Button variant="dark">Open Popover</Button>}
          title="Settings"
        >
          <p>Adjust your preferences here. This panel closes when you click the X or click outside.</p>
        </Popover>
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}Popover{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Popover</span>{"\n"}
              {"  "}<span className={syn.prop}>trigger</span>={"{"}{"<"}button{">"}Click{"</"}button{">"}{"}"}{"\n"}
              {"  "}<span className={syn.prop}>title</span>=<span className={syn.string}>"Details"</span>{"\n"}
              {">"}{"\n"}
              {"  "}{"<"}p{">"}Popover content{"</"}p{">"}{"\n"}
              {"</"}<span className={syn.fn}>Popover</span>{">"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Without title</h3>
        <Popover trigger={<Button variant="ghost">Info</Button>}>
          <p>A simple popover without a title header.</p>
        </Popover>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
