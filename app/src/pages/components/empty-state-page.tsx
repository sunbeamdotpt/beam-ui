import { css } from "styled-system/css";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { EmptyState } from "@sunbeam/beam-ui/components/ui/empty-state";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "icon", type: "string", required: false, description: "Icon name displayed above the title." },
  { name: "title", type: "string", required: true, description: "Primary heading for the empty state." },
  { name: "description", type: "string", required: false, description: "Supporting text displayed below the title." },
  { name: "action", type: "ReactNode", required: false, description: "Action element (typically a button) displayed below the description." },
];

export function EmptyStatePage() {
  return (
    <ComponentPage
      name="EmptyState"
      description="A centered placeholder shown when a view has no content. Supports an icon, title, description, and an optional action element."
      importPath='import { EmptyState } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <EmptyState
          icon="inbox"
          title="No messages yet"
          description="When you receive messages they will appear here. Start a conversation to get going."
          action={<Button variant="primary">Compose message</Button>}
        />
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
              <span className={syn.keyword}>import</span> {"{ "}EmptyState{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>EmptyState</span>{"\n"}
              {"  "}<span className={syn.prop}>icon</span>=<span className={syn.string}>"inbox"</span>{"\n"}
              {"  "}<span className={syn.prop}>title</span>=<span className={syn.string}>"No messages yet"</span>{"\n"}
              {"  "}<span className={syn.prop}>description</span>=<span className={syn.string}>"When you receive messages they will appear here."</span>{"\n"}
              {"  "}<span className={syn.prop}>action</span>={"{<"}<span className={syn.fn}>Button</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"primary"</span>{">"}Compose{"</"}<span className={syn.fn}>Button</span>{">}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Minimal (title only)</h3>
        <div className={variantPreview}>
          <EmptyState title="Nothing here" />
        </div>
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabel}>With icon and description</h3>
        <div className={variantPreview}>
          <EmptyState
            icon="search"
            title="No results found"
            description="Try adjusting your search terms or filters to find what you're looking for."
          />
        </div>
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Full (icon, description, action)</h3>
        <div className={variantPreview}>
          <EmptyState
            icon="folder"
            title="No projects"
            description="Create your first project to get started with the platform."
            action={<Button variant="primary">Create project</Button>}
          />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({
  backgroundColor: "bg.card",
  marginBottom: "32px",
  border: "1px solid",
  borderColor: "border.default",
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

const variantPreview = css({
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  marginBottom: "16px",
});
