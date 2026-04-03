import { useState } from "react";
import { css } from "styled-system/css";
import { Dialog } from "@sunbeam/beam-ui/components/ui/dialog";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "open", type: "boolean", required: true, description: "Controls whether the dialog is visible." },
  { name: "onClose", type: "() => void", required: true, description: "Callback fired when the dialog is dismissed." },
  { name: "title", type: "string", required: true, description: "Heading text displayed at the top of the dialog." },
  { name: "children", type: "ReactNode", required: true, description: "Body content of the dialog." },
  { name: "actions", type: "ReactNode", required: false, description: "Footer actions (buttons) rendered at the bottom right." },
];

export function DialogPage() {
  const [open, setOpen] = useState(false);

  return (
    <ComponentPage
      name="Dialog"
      description="A modal dialog component built on Ark UI. Includes a title bar, close button, body content area, and optional action buttons."
      importPath='import { Dialog } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open Confirm Delete Dialog
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Delete"
        actions={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        <p>Are you sure you want to delete this bucket? This action cannot be undone and all objects within the bucket will be permanently removed.</p>
      </Dialog>

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
              <span className={syn.keyword}>import</span> {"{ "}Dialog{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}Button{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [open, setOpen] = <span className={syn.fn}>useState</span>(false){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Button</span> <span className={syn.prop}>onClick</span>={"{() => "}setOpen(true){"}"}{">"}Delete{"</"}<span className={syn.fn}>Button</span>{">"}{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Dialog</span>{"\n"}
              {"  "}<span className={syn.prop}>open</span>={"{"}open{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onClose</span>={"{() => "}setOpen(false){"}"}{"\n"}
              {"  "}<span className={syn.prop}>title</span>=<span className={syn.string}>"Confirm Delete"</span>{"\n"}
              {"  "}<span className={syn.prop}>actions</span>={"{<>"}{"\n"}
              {"    "}{"<"}<span className={syn.fn}>Button</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"ghost"</span>{">"}Cancel{"</"}<span className={syn.fn}>Button</span>{">"}{"\n"}
              {"    "}{"<"}<span className={syn.fn}>Button</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"primary"</span>{">"}Delete{"</"}<span className={syn.fn}>Button</span>{">"}{"\n"}
              {"  "}{"</>}"}{"\n"}
              {">"}{"\n"}
              {"  "}{"<p>Are you sure?</p>"}{"\n"}
              {"</"}<span className={syn.fn}>Dialog</span>{">"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Confirmation dialog</h3>
        <p className={variantDesc}>The primary use case is a confirmation dialog with Cancel and action buttons. Click the preview button above to see it in action.</p>
      </div>
    </ComponentPage>
  );
}

const previewRow = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "16px",
  padding: "32px",
  backgroundColor: "bg.card",
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

const variantDesc = css({
  fontSize: "14px",
  color: "text.secondary",
  lineHeight: 1.6,
});
