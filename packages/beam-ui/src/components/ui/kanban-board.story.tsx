// @storyName KanbanBoard
import { useState } from "react";
import { KanbanBoard, type KanbanColumn } from "./kanban-board.tsx";

const initialColumns: KanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    cards: [
      {
        id: "c1",
        title: "Research competitor pricing",
        labels: [{ name: "research", color: "#6366f1" }],
        assignees: [{ name: "Alice" }],
      },
      {
        id: "c2",
        title: "Update onboarding flow",
        labels: [{ name: "design", color: "#f59e0b" }],
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      {
        id: "c3",
        title: "Implement dark mode toggle",
        labels: [{ name: "feature", color: "#10b981" }],
        assignees: [{ name: "Bob" }, { name: "Carol" }],
        milestone: "v2.0",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      {
        id: "c4",
        title: "Fix login redirect bug",
        labels: [{ name: "bug", color: "#ef4444" }],
        assignees: [{ name: "Dave" }],
      },
    ],
  },
];

export default function KanbanBoardStory() {
  const [columns, setColumns] = useState(initialColumns);

  return <KanbanBoard columns={columns} onChange={setColumns} />;
}

export function EmptyBoard() {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    { id: "todo", title: "To Do", cards: [] },
    { id: "doing", title: "In Progress", cards: [] },
    { id: "done", title: "Done", cards: [] },
  ]);
  return (
    <KanbanBoard
      columns={columns}
      onChange={setColumns}
      onAddCard={(colId) => console.log("Add card to", colId)}
    />
  );
}

export function SingleColumn() {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    { id: "all", title: "All Tasks", cards: initialColumns.flatMap((c) => c.cards) },
  ]);
  return <KanbanBoard columns={columns} onChange={setColumns} />;
}
