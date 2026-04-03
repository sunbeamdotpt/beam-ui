import { css } from "styled-system/css";
import { List } from "@sunbeam/beam-ui/components/ui/list";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "items", type: "ListItem[]", required: true, description: "Array of items with label, optional description, icon, and href." },
  { name: "ordered", type: "boolean", required: false, description: "Renders as an ordered (numbered) list when true." },
  { name: "variant", type: '"default" | "compact" | "bordered"', required: false, description: "Visual density variant. Defaults to \"default\"." },
];

const DEFAULT_ITEMS = [
  { label: "Object storage", description: "Scalable storage for unstructured data", icon: "cloud" },
  { label: "Compute instances", description: "On-demand virtual machines", icon: "memory" },
  { label: "Managed databases", description: "Fully managed relational and NoSQL databases", icon: "storage" },
  { label: "Networking", description: "VPCs, load balancers, and DNS management", icon: "lan" },
];

const COMPACT_ITEMS = [
  { label: "us-east-1", icon: "location_on" },
  { label: "us-west-2", icon: "location_on" },
  { label: "eu-central-1", icon: "location_on" },
  { label: "ap-southeast-1", icon: "location_on" },
];

const BORDERED_ITEMS = [
  { label: "API keys", description: "Manage authentication tokens for your services", icon: "key" },
  { label: "Webhooks", description: "Configure event notifications to external URLs", icon: "webhook" },
  { label: "Audit log", description: "View account activity and access history", icon: "history" },
  { label: "Team members", description: "Invite and manage collaborators", icon: "group" },
];

export function ListPage() {
  return (
    <ComponentPage
      name="List"
      description="A flexible list component supporting unordered, ordered, and three visual variants. Items can include icons, descriptions, and links."
      importPath='import { List } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>

      <div className={previewBox}>
        <h3 className={variantLabel}>Default</h3>
        <List items={DEFAULT_ITEMS} variant="default" />
      </div>

      <div className={previewBox}>
        <h3 className={variantLabel}>Compact</h3>
        <List items={COMPACT_ITEMS} variant="compact" />
      </div>

      <div className={previewBox}>
        <h3 className={variantLabel}>Bordered</h3>
        <List items={BORDERED_ITEMS} variant="bordered" />
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
              <span className={syn.keyword}>import</span> {"{ "}List{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> items = [{"\n"}
              {"  "}{"{ "}<span className={syn.prop}>label</span>: <span className={syn.string}>"Object storage"</span>, <span className={syn.prop}>icon</span>: <span className={syn.string}>"cloud"</span> {"},"}{"\n"}
              {"  "}{"{ "}<span className={syn.prop}>label</span>: <span className={syn.string}>"Compute instances"</span>, <span className={syn.prop}>icon</span>: <span className={syn.string}>"memory"</span> {"},"}{"\n"}
              {"]"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Unordered (default)"}</span>{"\n"}
              {"<"}<span className={syn.fn}>List</span> <span className={syn.prop}>items</span>={"{"}items{"}"} {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Ordered"}</span>{"\n"}
              {"<"}<span className={syn.fn}>List</span> <span className={syn.prop}>items</span>={"{"}items{"}"} <span className={syn.prop}>ordered</span> {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Bordered variant"}</span>{"\n"}
              {"<"}<span className={syn.fn}>List</span> <span className={syn.prop}>items</span>={"{"}items{"}"} <span className={syn.prop}>variant</span>=<span className={syn.string}>"bordered"</span> {"/>"}{"\n"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Unordered (default)</h3>
        <div className={css({ marginBottom: "16px" })}>
          <List items={DEFAULT_ITEMS} />
        </div>
        <CodeBlock
          tabs={[{
            label: "TSX",
            content: (
              <pre><code>
                {"<"}<span className={syn.fn}>List</span> <span className={syn.prop}>items</span>={"{"}items{"}"} {"/>"}{"\n"}
              </code></pre>
            ),
          }]}
        />
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Ordered</h3>
        <div className={css({ marginBottom: "16px" })}>
          <List items={DEFAULT_ITEMS} ordered />
        </div>
        <CodeBlock
          tabs={[{
            label: "TSX",
            content: (
              <pre><code>
                {"<"}<span className={syn.fn}>List</span> <span className={syn.prop}>items</span>={"{"}items{"}"} <span className={syn.prop}>ordered</span> {"/>"}{"\n"}
              </code></pre>
            ),
          }]}
        />
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Compact</h3>
        <div className={css({ marginBottom: "16px" })}>
          <List items={COMPACT_ITEMS} variant="compact" />
        </div>
        <CodeBlock
          tabs={[{
            label: "TSX",
            content: (
              <pre><code>
                {"<"}<span className={syn.fn}>List</span> <span className={syn.prop}>items</span>={"{"}items{"}"} <span className={syn.prop}>variant</span>=<span className={syn.string}>"compact"</span> {"/>"}{"\n"}
              </code></pre>
            ),
          }]}
        />
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Bordered</h3>
        <div className={css({ marginBottom: "16px" })}>
          <List items={BORDERED_ITEMS} variant="bordered" />
        </div>
        <CodeBlock
          tabs={[{
            label: "TSX",
            content: (
              <pre><code>
                {"<"}<span className={syn.fn}>List</span> <span className={syn.prop}>items</span>={"{"}items{"}"} <span className={syn.prop}>variant</span>=<span className={syn.string}>"bordered"</span> {"/>"}{"\n"}
              </code></pre>
            ),
          }]}
        />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({
  padding: "32px",
  backgroundColor: "bg.card",
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
