import { useState } from "react";
import { css } from "styled-system/css";
import { TagsInput } from "@sunbeam/beam-ui/components/ui/tags-input";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "value", type: "string[]", required: true, description: "Array of current tag strings." },
  { name: "onChange", type: "(value: string[]) => void", required: true, description: "Callback when tags change." },
  { name: "placeholder", type: "string", required: false, description: 'Input placeholder. Defaults to "Add tag...".' },
  { name: "max", type: "number", required: false, description: "Maximum number of tags allowed." },
  { name: "label", type: "string", required: false, description: "Label text above the input." },
];

export function TagsInputPage() {
  const [tags, setTags] = useState(["React", "TypeScript", "Panda CSS"]);

  return (
    <ComponentPage
      name="TagsInput"
      description="An input for adding and removing tags. Type and press Enter to add. Built on Ark UI TagsInput."
      importPath='import { TagsInput } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <div className={css({ maxWidth: "400px" })}>
          <TagsInput value={tags} onChange={setTags} label="Technologies" />
        </div>
        <p className={css({ marginTop: "12px", fontSize: "13px", color: "text.muted" })}>Tags: {tags.join(", ")}</p>
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
              <span className={syn.keyword}>import</span> {"{ "}TagsInput{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [tags, setTags] = <span className={syn.fn}>useState</span>([<span className={syn.string}>"React"</span>]){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>TagsInput</span> <span className={syn.prop}>value</span>={"{"}tags{"}"} <span className={syn.prop}>onChange</span>={"{"}setTags{"}"} <span className={syn.prop}>label</span>=<span className={syn.string}>"Skills"</span> {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Max 3 tags</h3>
        <div className={css({ maxWidth: "400px" })}>
          <TagsInput value={["One", "Two"]} onChange={() => {}} max={3} placeholder="Max 3 tags..." />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
