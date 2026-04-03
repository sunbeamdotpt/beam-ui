import { useState } from "react";
import { css } from "styled-system/css";
import { WorkItemList } from "@sunbeam/beam-ui/components/ui/work-item-list";
import type { WorkItemRow as WorkItemRowType } from "@sunbeam/beam-ui/components/ui/work-item-list";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { issueStatuses, prStatuses, priorities } from "@sunbeam/beam-ui/data/statuses";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { Switch } from "@sunbeam/beam-ui/components/ui/switch";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

/* ------------------------------------------------------------------ */
/* Sample data                                                         */
/* ------------------------------------------------------------------ */

const sampleItems: WorkItemRowType[] = [
  {
    id: "18",
    icon: <span style={{ color: "#22c55e" }}><Icon name="circle" size={16} filled /></span>,
    title: "Add dark mode support for dashboard widgets",
    href: "#",
    labels: [
      { name: "feature", color: "#3b82f6" },
      { name: "urgent", color: "#f97316" },
    ],
    meta: <>#18 &middot; opened 2 hours ago by <strong>marin</strong></>,
    commentCount: 3,
  },
  {
    id: "42",
    icon: <span style={{ color: "#7e22ce" }}><Icon name="merge" size={16} /></span>,
    title: "Refactor authentication middleware to support OAuth2",
    href: "#",
    labels: [{ name: "bug", color: "#ef4444" }],
    meta: <>#42 &middot; merged 5 hours ago by <strong>elena</strong></>,
    branches: { base: "main", head: "fix/oauth2-middleware" },
    status: <Badge variant="approved">Approved</Badge>,
    commentCount: 7,
  },
  {
    id: "56",
    icon: <span style={{ color: "#22c55e" }}><Icon name="circle" size={16} filled /></span>,
    title: "Update contributing guidelines with new branch naming convention",
    href: "#",
    labels: [{ name: "docs", color: "#22c55e" }],
    meta: <>#56 &middot; opened yesterday by <strong>kai</strong></>,
    commentCount: 1,
  },
  {
    id: "73",
    icon: <span style={{ color: "#ef4444" }}><Icon name="cancel" size={16} /></span>,
    title: "Fix overflow issue in notification dropdown on mobile",
    href: "#",
    labels: [{ name: "bug", color: "#ef4444" }],
    meta: <>#73 &middot; closed 3 days ago by <strong>priya</strong></>,
  },
  {
    id: "89",
    icon: <span style={{ color: "#22c55e" }}><Icon name="merge" size={16} /></span>,
    title: "Implement rate limiting for public API endpoints",
    href: "#",
    labels: [
      { name: "feature", color: "#3b82f6" },
    ],
    meta: <>#89 &middot; open by <strong>alex</strong></>,
    branches: { base: "main", head: "feat/rate-limit" },
    status: <Badge variant="revision">Revision</Badge>,
    commentCount: 12,
  },
  {
    id: "91",
    icon: <span style={{ color: "#22c55e" }}><Icon name="circle" size={16} filled /></span>,
    title: "Add aria-labels to all interactive elements in sidebar",
    href: "#",
    labels: [
      { name: "feature", color: "#3b82f6" },
      { name: "docs", color: "#22c55e" },
    ],
    meta: <>#91 &middot; opened just now by <strong>sam</strong></>,
    commentCount: 0,
  },
];

/* ------------------------------------------------------------------ */
/* Props tables                                                        */
/* ------------------------------------------------------------------ */

const LIST_PROPS = [
  { name: "items", type: "WorkItemRow[]", required: true, description: "Array of work item objects to display." },
  { name: "selected", type: "Set<string>", required: false, description: "Set of selected item IDs." },
  { name: "onSelect", type: "(selected: Set<string>) => void", required: false, description: "Callback when selection changes." },
  { name: "selectable", type: "boolean", required: false, description: "Whether to show selection checkboxes. Defaults to false." },
  { name: "onLoadMore", type: "() => void", required: false, description: 'If provided, renders a "Load more" button at the bottom.' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const ROW_PROPS = [
  { name: "id", type: "string", required: true, description: "Unique identifier for the work item." },
  { name: "icon", type: "ReactNode", required: true, description: "Status icon (consumer controls color, e.g. green open, red closed, purple merged)." },
  { name: "title", type: "string", required: true, description: "Work item title text." },
  { name: "href", type: "string", required: false, description: "Link target for the title. If omitted, title renders as plain text." },
  { name: "labels", type: "WorkItemLabel[]", required: false, description: "Array of labels with name and color." },
  { name: "meta", type: "ReactNode", required: true, description: 'Secondary info line, e.g. "#18 · opened 2 hours ago by marin".' },
  { name: "branches", type: "WorkItemBranch", required: false, description: "For PRs: shows head → base branch pills." },
  { name: "status", type: "ReactNode", required: false, description: "Right-side status element (e.g. review badge)." },
  { name: "commentCount", type: "number", required: false, description: "Number of comments. Shown with chat icon if > 0." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function WorkItemListPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectable, setSelectable] = useState(false);

  return (
    <ComponentPage
      name="WorkItemList"
      description="A table-backed list for displaying issues and pull requests. Each row shows a status icon, title with label pills, metadata, optional branch references, review status, and comment counts."
      importPath='import { WorkItemList } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>

      <div className={css({ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" })}>
        <Switch checked={selectable} onChange={setSelectable} />
        <span className={css({ fontSize: "13px", color: "text.muted" })}>Selectable</span>
      </div>

      <div className={previewBox}>
        <WorkItemList
          items={sampleItems}
          selectable={selectable}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      {selectable && (
        <p className={selectionLabel}>
          {selected.size} of {sampleItems.length} selected
        </p>
      )}

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={LIST_PROPS} />
      <h3 className={subHeading}>WorkItemRow</h3>
      <PropsTable props={ROW_PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}WorkItemList, Icon{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> items = [{"\n"}
              {"  "}{"{"}{"\n"}
              {"    "}id: <span className={syn.string}>"18"</span>,{"\n"}
              {"    "}icon: {"<"}span style={"{"}{"{ "}color: <span className={syn.string}>"#22c55e"</span>{" }"}{"}"}{">"}{"<"}<span className={syn.fn}>Icon</span> <span className={syn.prop}>name</span>=<span className={syn.string}>"circle"</span> <span className={syn.prop}>size</span>={"{16}"} <span className={syn.prop}>filled</span> /{">"}{"<"}/span{">"},{"\n"}
              {"    "}title: <span className={syn.string}>"Add dark mode support"</span>,{"\n"}
              {"    "}href: <span className={syn.string}>"/issues/18"</span>,{"\n"}
              {"    "}labels: [{"{ "}name: <span className={syn.string}>"feature"</span>, color: <span className={syn.string}>"#3b82f6"</span>{" }"}],{"\n"}
              {"    "}meta: {"<>#18 · opened 2h ago by marin</>"},{"\n"}
              {"    "}commentCount: <span className={syn.number}>3</span>,{"\n"}
              {"  "}{"}"},{"\n"}
              ]{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>WorkItemList</span> <span className={syn.prop}>items</span>={"{items}"} {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={subHeading}>Single row (isolated)</h3>
        <div className={previewBox}>
          <WorkItemList
            items={[{
              id: "18",
              icon: <span style={{ color: "#fa520f" }}><Icon name="arrow_upward" size={16} /></span>,
              title: "feat: add webhook delivery retry with exponential backoff",
              href: "#",
              labels: [{ name: "enhancement", color: "#f59e0b" }],
              meta: <>#18 · opened 2 hours ago by marin</>,
              branches: { base: "main", head: "feat/webhook-retry" },
              status: <Badge variant="approved">Approved</Badge>,
              commentCount: 4,
            }]}
          />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={subHeading}>With load more</h3>
        <div className={previewBox}>
          <WorkItemList
            items={sampleItems.slice(0, 3)}
            onLoadMore={() => alert("Load more clicked")}
          />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={subHeading}>Selectable with bulk actions</h3>
        <div className={previewBox}>
          <WorkItemList
            items={sampleItems.slice(0, 4)}
            selectable
            selected={selected}
            onSelect={setSelected}
          />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={subHeading}>Without icons</h3>
        <div className={previewBox}>
          <WorkItemList
            items={sampleItems.slice(0, 3).map(({ icon, ...rest }) => rest)}
          />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={subHeading}>Selectable without icons</h3>
        <div className={previewBox}>
          <WorkItemList
            items={sampleItems.slice(0, 3).map(({ icon, ...rest }) => rest)}
            selectable
            selected={selected}
            onSelect={setSelected}
          />
        </div>
      </div>

      <SectionHeading id="statuses">Recommended Statuses</SectionHeading>
      <p className={css({ fontSize: "sm", color: "text.secondary", marginBottom: "24px", lineHeight: 1.6 })}>
        The design language defines standardized status labels for consistent vocabulary
        across all work items. Import them from <code className={css({ fontFamily: "mono", fontSize: "xs" })}>@sunbeam/beam-ui</code>.
      </p>

      {[
        { title: "Issue Statuses", items: issueStatuses },
        { title: "Pull Request Statuses", items: prStatuses },
        { title: "Priority Levels", items: priorities },
      ].map((group) => (
        <div key={group.title}>
          <h3 className={subHeading}>{group.title}</h3>
          <div className={css({ overflowX: "auto", marginBottom: "24px" })}>
            <table className={statusTable}>
              <thead>
                <tr>
                  <th className={stTh}>Icon</th>
                  <th className={stTh}>Label</th>
                  <th className={stTh}>Badge</th>
                  <th className={stTh}>Description</th>
                </tr>
              </thead>
              <tbody>
                {group.items.map((s) => (
                  <tr key={s.label}>
                    <td className={stTd}><span style={{ color: s.color }}><Icon name={s.icon!} size={16} /></span></td>
                    <td className={stTdMono}>{s.label}</td>
                    <td className={stTd}><Badge variant={s.variant as any}>{s.label}</Badge></td>
                    <td className={stTd}>{s.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}issueStatuses, prStatuses, priorities{" }"}{"\n"}
              {"  "}<span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Each status has: label, variant, icon, color, description"}</span>{"\n"}
              prStatuses.map(s ={">"} {"<"}<span className={syn.fn}>Badge</span> <span className={syn.prop}>variant</span>={"{"}s.variant{"}"}{">"}{"{"} s.label {"}"}{"</"}<span className={syn.fn}>Badge</span>{">"}){"\n"}
            </code></pre>
          ),
        }]}
      />
    </ComponentPage>
  );
}

const previewBox = css({ padding: "0", backgroundColor: "bg.card", marginBottom: "12px" });
const selectionLabel = css({ fontSize: "13px", color: "text.muted", marginBottom: "32px" });
const subHeading = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", marginBottom: "12px" });
const variantBlock = css({ marginBottom: "40px" });
const statusTable = css({ width: "100%", fontSize: "sm", borderCollapse: "collapse" });
const stTh = css({ textAlign: "left", padding: "8px 12px", fontWeight: "button", fontSize: "2xs", color: "text.muted", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid", borderColor: "border.default" });
const stTd = css({ padding: "10px 12px", borderBottom: "1px solid", borderColor: "border.subtle", color: "text.secondary", verticalAlign: "middle" });
const stTdMono = css({ padding: "10px 12px", borderBottom: "1px solid", borderColor: "border.subtle", color: "text.primary", fontFamily: "mono", fontWeight: "button", verticalAlign: "middle" });
