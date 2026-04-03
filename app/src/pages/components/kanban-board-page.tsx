import { useState } from "react";
import { css } from "styled-system/css";
import { KanbanBoard, KanbanCardView, type KanbanColumn, type KanbanCard } from "@sunbeam/beam-ui/components/ui/kanban-board";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "columns", type: "KanbanColumn[]", required: true, description: "Array of columns, each containing an id, title, and array of cards." },
  { name: "onChange", type: "(columns: KanbanColumn[]) => void", required: true, description: "Called when cards are reordered or moved between columns." },
  { name: "onAddCard", type: "(columnId: string) => void", required: false, description: "If provided, shows an \"Add card\" button at the bottom of each column." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const CARD_VIEW_PROPS = [
  { name: "card", type: "KanbanCard", required: true, description: "The card data to display." },
  { name: "ghost", type: "boolean", required: false, description: "When true, renders a translucent ghost variant (used during drag overlay)." },
];

const KANBAN_CARD_INTERFACE = [
  { name: "id", type: "string", required: true, description: "Unique identifier for the card." },
  { name: "title", type: "string", required: true, description: "Card title text." },
  { name: "labels", type: "{ name: string; color: string }[]", required: false, description: "Colored label pills shown on the card." },
  { name: "assignees", type: "{ name: string; avatarUrl?: string }[]", required: false, description: "Overlapping assignee avatars." },
  { name: "milestone", type: "string", required: false, description: "Milestone text displayed on the card." },
];

const INITIAL_COLUMNS: KanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    cards: [
      {
        id: "c1",
        title: "Implement dark mode toggle",
        labels: [{ name: "feature", color: "#fa520f" }],
        assignees: [{ name: "Alice" }, { name: "Bob" }],
        milestone: "v2.0",
      },
      {
        id: "c2",
        title: "Audit accessibility across all components",
        labels: [{ name: "a11y", color: "#4a9eff" }],
        assignees: [{ name: "Carol" }],
      },
      {
        id: "c3",
        title: "Write migration guide for v2",
        labels: [{ name: "docs", color: "#ffb83e" }],
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      {
        id: "c4",
        title: "Refactor token pipeline",
        labels: [
          { name: "refactor", color: "#ff8a00" },
          { name: "core", color: "#fa520f" },
        ],
        assignees: [{ name: "Dave" }],
        milestone: "v2.0",
      },
      {
        id: "c5",
        title: "Fix z-index stacking in dialog overlay",
        labels: [{ name: "bug", color: "#e53e3e" }],
        assignees: [{ name: "Eve" }, { name: "Frank" }, { name: "Grace" }],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      {
        id: "c6",
        title: "Set up CI pipeline",
        labels: [{ name: "infra", color: "#38a169" }],
        assignees: [{ name: "Hank" }],
        milestone: "v1.5",
      },
      {
        id: "c7",
        title: "Design badge component variants",
        labels: [{ name: "design", color: "#9f7aea" }],
      },
    ],
  },
];

export function KanbanBoardPage() {
  const [columns, setColumns] = useState<KanbanColumn[]>(INITIAL_COLUMNS);

  return (
    <ComponentPage
      name="KanbanBoard"
      description="A drag-and-drop project board with columns and cards. Cards can be reordered within a column and moved between columns using @dnd-kit."
      importPath='import { KanbanBoard } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <KanbanBoard
          columns={columns}
          onChange={setColumns}
          onAddCard={(colId) => {
            setColumns((prev) =>
              prev.map((col) =>
                col.id === colId
                  ? {
                      ...col,
                      cards: [
                        ...col.cards,
                        {
                          id: `new-${Date.now()}`,
                          title: "New card",
                        },
                      ],
                    }
                  : col,
              ),
            );
          }}
        />
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}KanbanBoard{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [columns, setColumns] = useState(initialColumns){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>KanbanBoard</span>{"\n"}
              {"  "}<span className={syn.prop}>columns</span>={"{"}columns{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setColumns{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onAddCard</span>={"{"}(colId) {"=> { /* add card logic */ }"}{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Card features</h3>
        <p className={variantDesc}>
          Cards support colored label pills, overlapping assignee avatars, and milestone text.
          Drag a card to reorder it or move it to another column.
        </p>
      </div>

      <SectionHeading id="sub-components">Sub-components</SectionHeading>

      <h3 className={variantLabel}>KanbanCardView</h3>
      <p className={variantDesc}>
        Standalone card display — usable outside the board (e.g., in lists, detail panels).
      </p>

      <h4 className={subHeading}>KanbanCardView Props</h4>
      <PropsTable props={CARD_VIEW_PROPS} />

      <h4 className={subHeading}>KanbanCard Interface</h4>
      <PropsTable props={KANBAN_CARD_INTERFACE} />

      <h4 className={subHeading}>Standalone Preview</h4>
      <div className={previewBox}>
        <div style={{ maxWidth: 320 }}>
          <KanbanCardView
            card={{
              id: "standalone-1",
              title: "Implement dark mode toggle",
              labels: [
                { name: "feature", color: "#fa520f" },
                { name: "core", color: "#4a9eff" },
              ],
              assignees: [{ name: "Alice" }, { name: "Bob" }],
              milestone: "v2.0",
            }}
          />
        </div>
      </div>

      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}KanbanCardView{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>KanbanCardView</span>{"\n"}
              {"  "}<span className={syn.prop}>card</span>={"{"}{"{ "}id: <span className={syn.string}>"1"</span>, title: <span className={syn.string}>"My card"</span>, labels: [...]{" }"}{"}"}{"\n"}
              {"  "}<span className={syn.prop}>ghost</span>={"{"}false{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />
    </ComponentPage>
  );
}

const previewBox = css({
  padding: "24px",
  backgroundColor: "bg.page",
  marginBottom: "32px",
  overflowX: "auto",
  border: "1px solid",
  borderColor: "border.default",
});

const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "8px" });
const variantDesc = css({ fontSize: "14px", color: "text.secondary", lineHeight: 1.7 });
const subHeading = css({ fontSize: "16px", fontWeight: "heading", color: "text.primary", marginBottom: "8px", marginTop: "24px", fontFamily: "mono" });
