// @storyName KanbanCardDetail
import { type KanbanCardData, KanbanCardDetail } from "./kanban-card-detail.tsx";

const sampleCard: KanbanCardData = {
  id: "card-1",
  title: "Implement notification preferences",
  description:
    "Allow users to configure which notifications they receive via email, push, and in-app channels.\n\n## Acceptance criteria\n\n- [ ] Per-channel toggle\n- [ ] Quiet hours setting\n- [ ] Digest frequency option",
  labels: [
    { name: "feature", color: "#10b981" },
    { name: "frontend", color: "#6366f1" },
  ],
  assignees: [{ name: "Alice" }, { name: "Bob" }],
  milestone: "v2.1",
  status: "In Progress",
  priority: "high",
  dueDate: "Apr 15, 2026",
  createdAt: "Mar 20, 2026",
  updatedAt: "Apr 2, 2026",
};

export default function KanbanCardDetailStory() {
  return (
    <div style={{ position: "relative", minHeight: "500px" }}>
      <KanbanCardDetail
        card={sampleCard}
        open
        onClose={() => {}}
        onSave={(card) => console.log("Saved:", card)}
        onDelete={(id) => console.log("Deleted:", id)}
      />
    </div>
  );
}

export function ReadOnly() {
  return (
    <div style={{ position: "relative", minHeight: "500px" }}>
      <KanbanCardDetail card={sampleCard} open onClose={() => {}} readOnly />
    </div>
  );
}

export function MinimalCard() {
  const minimal: KanbanCardData = { id: "card-2", title: "Simple task" };
  return (
    <div style={{ position: "relative", minHeight: "500px" }}>
      <KanbanCardDetail card={minimal} open onClose={() => {}} onSave={() => {}} />
    </div>
  );
}

export function CriticalPriority() {
  const critical: KanbanCardData = {
    ...sampleCard,
    priority: "critical",
    title: "Critical production bug",
  };
  return (
    <div style={{ position: "relative", minHeight: "500px" }}>
      <KanbanCardDetail card={critical} open onClose={() => {}} />
    </div>
  );
}
