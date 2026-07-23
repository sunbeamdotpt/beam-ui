import { useState } from "react";
import { css } from "styled-system/css";
import { KanbanCardView, KanbanCardDetail } from "@sunbeam/beam-ui/kanban";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "card", type: "KanbanCard", required: true, description: "The card data object to display." },
  { name: "ghost", type: "boolean", required: false, description: "Renders with a golden shadow for drag overlay state." },
];

const CARD_FIELDS = [
  { name: "id", type: "string", required: true, description: "Unique identifier for the card." },
  { name: "title", type: "string", required: true, description: "The card title text." },
  { name: "labels", type: "{ name: string; color: string }[]", required: false, description: "Colored label pills displayed on the card." },
  { name: "assignees", type: "{ name: string; avatarUrl?: string }[]", required: false, description: "Assignee avatars shown in an overlapping stack." },
  { name: "milestone", type: "string", required: false, description: "Milestone text displayed in the card footer." },
];

const sampleCard = {
  id: "1",
  title: "Implement file upload validation",
  labels: [
    { name: "feature", color: "#4a9eff" },
    { name: "frontend", color: "#5bb8a6" },
  ],
  assignees: [
    { name: "Elena Rivera" },
    { name: "Marcus Chen" },
  ],
  milestone: "v0.6.0",
};

const minimalCard = {
  id: "2",
  title: "Fix login redirect loop",
};

const fullCard = {
  id: "3",
  title: "Redesign settings page with new navigation",
  labels: [
    { name: "design", color: "#a855f7" },
    { name: "ux", color: "#ec4899" },
    { name: "priority", color: "#ef4444" },
  ],
  assignees: [
    { name: "Elena Rivera" },
    { name: "Marcus Chen" },
    { name: "Ava Lindström" },
  ],
  milestone: "Q2 2026",
};

const DETAIL_PROPS = [
  { name: "card", type: "KanbanCardData", required: true, description: "The full card data including description, priority, dates." },
  { name: "open", type: "boolean", required: true, description: "Whether the detail modal is open." },
  { name: "onClose", type: "() => void", required: true, description: "Called when the modal is closed." },
  { name: "onSave", type: "(card: KanbanCardData) => void", required: false, description: "Called when edits are saved. Receives the updated card." },
  { name: "onDelete", type: "(id: string) => void", required: false, description: "Called when the delete button is clicked." },
  { name: "readOnly", type: "boolean", required: false, description: "Hides edit/delete actions." },
];

const DETAIL_FIELDS = [
  { name: "id", type: "string", required: true, description: "Unique identifier." },
  { name: "title", type: "string", required: true, description: "Card title." },
  { name: "description", type: "string", required: false, description: "Markdown description body." },
  { name: "labels", type: "{ name: string; color: string }[]", required: false, description: "Label pills." },
  { name: "assignees", type: "{ name: string; avatarUrl?: string }[]", required: false, description: "Assigned users." },
  { name: "milestone", type: "string", required: false, description: "Milestone name." },
  { name: "dueDate", type: "string", required: false, description: "Due date string." },
  { name: "status", type: "string", required: false, description: "Status badge text (e.g., 'In Progress')." },
  { name: "priority", type: '"low" | "medium" | "high" | "critical"', required: false, description: "Priority level with color-coded badge." },
  { name: "createdAt", type: "string", required: false, description: "Creation date." },
  { name: "updatedAt", type: "string", required: false, description: "Last update date." },
];

const detailSampleCard = {
  id: "1",
  title: "Implement file upload validation",
  description: "We need to validate file uploads to ensure:\n\n- Max file size of 10MB\n- Allowed extensions: `.png`, `.jpg`, `.pdf`\n- Sanitize filenames\n\nSee [RFC-2024-UPLOAD](/docs) for details.",
  labels: [
    { name: "feature", color: "#4a9eff" },
    { name: "frontend", color: "#5bb8a6" },
  ],
  assignees: [
    { name: "Elena Rivera" },
    { name: "Marcus Chen" },
  ],
  milestone: "v0.6.0",
  dueDate: "Apr 15, 2026",
  status: "In Progress",
  priority: "high" as const,
  createdAt: "Mar 28, 2026",
  updatedAt: "Apr 2, 2026",
};

export function KanbanCardPage() {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <ComponentPage
      name="KanbanCard"
      description="A standalone card component for displaying task information with labels, assignees, and milestones. Used within KanbanBoard but also usable independently in lists or detail panels."
      importPath='import { KanbanCardView } from "@sunbeam/beam-ui/kanban"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewGrid}>
        <div>
          <h4 className={previewLabel}>Standard</h4>
          <KanbanCardView card={sampleCard} />
        </div>
        <div>
          <h4 className={previewLabel}>Minimal</h4>
          <KanbanCardView card={minimalCard} />
        </div>
        <div>
          <h4 className={previewLabel}>Ghost (drag overlay)</h4>
          <KanbanCardView card={sampleCard} ghost />
        </div>
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <h3 className={subHeading}>KanbanCardView</h3>
      <PropsTable props={PROPS} />
      <h3 className={subHeading}>KanbanCard interface</h3>
      <PropsTable props={CARD_FIELDS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}KanbanCardView{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui/kanban"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> card = {"{"}{"\n"}
              {"  "}id: <span className={syn.string}>"1"</span>,{"\n"}
              {"  "}title: <span className={syn.string}>"Implement file upload"</span>,{"\n"}
              {"  "}labels: [{"{ "}name: <span className={syn.string}>"feature"</span>, color: <span className={syn.string}>"#4a9eff"</span>{" }"}],{"\n"}
              {"  "}assignees: [{"{ "}name: <span className={syn.string}>"Elena"</span>{" }"}],{"\n"}
              {"  "}milestone: <span className={syn.string}>"v0.6.0"</span>,{"\n"}
              {"}"}{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>KanbanCardView</span> <span className={syn.prop}>card</span>={"{card}"} {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Full card with many labels</h3>
        <div className={css({ maxWidth: "300px" })}>
          <KanbanCardView card={fullCard} />
        </div>
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Title only</h3>
        <div className={css({ maxWidth: "300px" })}>
          <KanbanCardView card={{ id: "4", title: "Quick bug fix" }} />
        </div>
      </div>

      {/* Card Detail Modal */}
      <SectionHeading id="detail">Card Detail</SectionHeading>
      <p className={css({ fontSize: "14px", color: "text.secondary", marginBottom: "16px", lineHeight: 1.6 })}>
        The <code className={css({ fontFamily: "mono", fontSize: "13px" })}>KanbanCardDetail</code> component
        renders a modal dialog for viewing and editing a card's full data — description (Markdown),
        assignees, labels, milestone, priority, dates, and status.
      </p>
      <div className={css({ marginBottom: "24px" })}>
        <Button variant="primary" onClick={() => setDetailOpen(true)}>
          Open Card Detail
        </Button>
        <KanbanCardDetail
          card={detailSampleCard}
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          onSave={(c) => { alert(`Saved: ${c.title}`); setDetailOpen(false); }}
          onDelete={(id) => { alert(`Deleted: ${id}`); setDetailOpen(false); }}
        />
      </div>

      <h3 className={subHeading}>KanbanCardDetail</h3>
      <PropsTable props={DETAIL_PROPS} />
      <h3 className={subHeading}>KanbanCardData interface</h3>
      <PropsTable props={DETAIL_FIELDS} />
    </ComponentPage>
  );
}

const previewGrid = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", md: "repeat(3, 1fr)" },
  gap: "24px",
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "32px",
});
const previewLabel = css({ fontSize: "12px", fontWeight: "button", textTransform: "uppercase", letterSpacing: "0.1em", color: "text.muted", marginBottom: "12px" });
const subHeading = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", marginBottom: "16px", marginTop: "24px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
