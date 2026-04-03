import { css } from "styled-system/css";
import { Clipboard } from "@sunbeam/beam-ui/components/ui/clipboard";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "value", type: "string", required: true, description: "The text to copy to clipboard." },
  { name: "children", type: "ReactNode", required: false, description: "Custom trigger element. If omitted, renders a default copy button." },
  { name: "timeout", type: "number", required: false, description: "Duration in ms to show the copied state. Defaults to 2000." },
];

export function ClipboardPage() {
  return (
    <ComponentPage
      name="Clipboard"
      description="A copy-to-clipboard utility with visual feedback. Built on Ark UI Clipboard."
      importPath='import { Clipboard } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <div className={css({ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" })}>
          <Clipboard value="npm install @sunbeam/beam-ui" />
          <Clipboard value="https://sunbeam.dev/components">
            <Button variant="ghost">Copy link</Button>
          </Clipboard>
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
              <span className={syn.keyword}>import</span> {"{ "}Clipboard{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Default button"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Clipboard</span> <span className={syn.prop}>value</span>=<span className={syn.string}>"npm install @sunbeam/beam-ui"</span> {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Custom trigger"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Clipboard</span> <span className={syn.prop}>value</span>=<span className={syn.string}>"hello"</span>{">"}{"\n"}
              {"  "}{"<"}button{">"}Copy{"</"}button{">"}{"\n"}
              {"</"}<span className={syn.fn}>Clipboard</span>{">"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Custom timeout</h3>
        <Clipboard value="Copied for 5 seconds!" timeout={5000} />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
