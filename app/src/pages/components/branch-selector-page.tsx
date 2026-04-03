import { useState } from "react";
import { css } from "styled-system/css";
import { BranchSelector } from "@sunbeam/beam-ui/components/ui/branch-selector";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "branches", type: "string[]", required: true, description: "Array of branch names." },
  { name: "tags", type: "string[]", required: true, description: "Array of tag names." },
  { name: "current", type: "string", required: true, description: "The currently selected branch or tag." },
  { name: "defaultBranch", type: "string", required: false, description: 'The default branch name. Shows a "default" badge.' },
  { name: "onChange", type: "(ref: string) => void", required: true, description: "Callback fired when a branch or tag is selected." },
  { name: "onCreateBranch", type: "(name: string) => void", required: false, description: 'If provided, shows a "Create branch" option when search text does not match any branch.' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const SAMPLE_BRANCHES = [
  "main",
  "develop",
  "feature/label-picker",
  "feature/assignee-picker",
  "fix/popover-z-index",
  "chore/deps-update",
];

const SAMPLE_TAGS = [
  "v1.0.0",
  "v0.9.0",
  "v0.8.2",
  "v0.8.1",
  "v0.8.0",
];

export function BranchSelectorPage() {
  const [current, setCurrent] = useState("main");

  return (
    <ComponentPage
      name="BranchSelector"
      description="A tabbed dropdown for switching between branches and tags. Supports search filtering, default branch indicators, and optional branch creation."
      importPath='import { BranchSelector } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <BranchSelector
          branches={SAMPLE_BRANCHES}
          tags={SAMPLE_TAGS}
          current={current}
          defaultBranch="main"
          onChange={setCurrent}
          onCreateBranch={(name) => {
            setCurrent(name);
          }}
        />
      </div>
      <p className={selectionText}>
        Current: {current}
      </p>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}useState{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"react"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}BranchSelector{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [current, setCurrent] = <span className={syn.fn}>useState</span>(<span className={syn.string}>"main"</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>BranchSelector</span>{"\n"}
              {"  "}<span className={syn.prop}>branches</span>={"{"}[<span className={syn.string}>"main"</span>, <span className={syn.string}>"develop"</span>, <span className={syn.string}>"feature/foo"</span>]{"}"}{"\n"}
              {"  "}<span className={syn.prop}>tags</span>={"{"}[<span className={syn.string}>"v1.0.0"</span>, <span className={syn.string}>"v0.9.0"</span>]{"}"}{"\n"}
              {"  "}<span className={syn.prop}>current</span>={"{"}current{"}"}{"\n"}
              {"  "}<span className={syn.prop}>defaultBranch</span>=<span className={syn.string}>"main"</span>{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setCurrent{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Without create branch</h3>
        <div className={css({ marginBottom: "16px" })}>
          <BranchSelector
            branches={SAMPLE_BRANCHES}
            tags={SAMPLE_TAGS}
            current="develop"
            defaultBranch="main"
            onChange={() => {}}
          />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Tag selected</h3>
        <div className={css({ marginBottom: "16px" })}>
          <BranchSelector
            branches={SAMPLE_BRANCHES}
            tags={SAMPLE_TAGS}
            current="v1.0.0"
            defaultBranch="main"
            onChange={() => {}}
          />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewRow = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  gap: "24px",
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "16px",
});

const selectionText = css({
  fontSize: "13px",
  fontFamily: "mono",
  color: "text.muted",
  marginBottom: "32px",
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
