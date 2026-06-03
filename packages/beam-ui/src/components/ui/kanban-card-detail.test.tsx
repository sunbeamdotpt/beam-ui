import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { KanbanCardDetail, type KanbanCardData } from "./kanban-card-detail.tsx";

const baseCard: KanbanCardData = {
  id: "beam-204",
  shortId: "BEAM-204",
  breadcrumb: "Beam UI / Components",
  columnTitle: "Backlog",
  title: "Implement live-reload toggle for the showcase",
  description: "Some description text.",
  labels: [
    { name: "feature", color: "orange" },
    { name: "design", color: "gold" },
  ],
  assignees: [{ name: "Sofia Pereira" }, { name: "Miguel Costa" }],
  milestone: "v2.0 Release",
  priority: "medium",
  dueDate: "2026-06-01",
  checklist: [
    { id: "c1", title: "Subtask 1", done: false },
    { id: "c2", title: "Subtask 2", done: true },
    { id: "c3", title: "Subtask 3", done: false },
  ],
  comments: [
    {
      id: "cmt1",
      author: "Sofia Pereira",
      text: "Started a draft of the spec.",
      createdAt: "2 days ago",
    },
    {
      id: "cmt2",
      author: "Miguel Costa",
      text: "Looks great, one concern.",
      createdAt: "1 day ago",
    },
  ],
  attachments: [
    { id: "att1", name: "design.png", sizeBytes: 12000 },
  ],
};

/* ------------------------------------------------------------------ */
/* Head: title, breadcrumb, shortId                                   */
/* ------------------------------------------------------------------ */
describe("KanbanCardDetail — head", () => {
  it("renders_title", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("Implement live-reload toggle for the showcase")).toBeInTheDocument();
  });

  it("renders_shortId", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("BEAM-204")).toBeInTheDocument();
  });

  it("renders_breadcrumb", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("Beam UI / Components")).toBeInTheDocument();
  });

  it("renders_columnTitle", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("Backlog")).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/* Checklist                                                           */
/* ------------------------------------------------------------------ */
describe("KanbanCardDetail — checklist", () => {
  it("renders_all_checklist_items", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("Subtask 1")).toBeInTheDocument();
    expect(screen.getByText("Subtask 2")).toBeInTheDocument();
    expect(screen.getByText("Subtask 3")).toBeInTheDocument();
  });

  it("renders_correct_checklist_count", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    // "Checklist · 1/3" — 1 done out of 3
    expect(screen.getByText(/Checklist\s*·\s*1\/3/)).toBeInTheDocument();
  });

  it("renders_checkboxes_for_each_item", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);
  });
});

/* ------------------------------------------------------------------ */
/* Comments                                                            */
/* ------------------------------------------------------------------ */
describe("KanbanCardDetail — comments", () => {
  it("renders_all_comment_authors", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("Sofia Pereira")).toBeInTheDocument();
    expect(screen.getByText("Miguel Costa")).toBeInTheDocument();
  });

  it("renders_comment_body_text", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("Started a draft of the spec.")).toBeInTheDocument();
    expect(screen.getByText("Looks great, one concern.")).toBeInTheDocument();
  });

  it("renders_activity_count_in_section_label", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText(/Activity\s*·\s*2/)).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/* Side fields — all six present, including empty-state placeholders  */
/* ------------------------------------------------------------------ */
describe("KanbanCardDetail — side fields", () => {
  it("renders_assignees_field_label", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("Assignees")).toBeInTheDocument();
  });

  it("renders_labels_field_label", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("Labels")).toBeInTheDocument();
  });

  it("renders_label_chips", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("feature")).toBeInTheDocument();
    expect(screen.getByText("design")).toBeInTheDocument();
  });

  it("renders_priority_field_label", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("Priority")).toBeInTheDocument();
  });

  it("renders_priority_value", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("medium")).toBeInTheDocument();
  });

  it("renders_due_date_field_label", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("Due date")).toBeInTheDocument();
  });

  it("renders_due_date_value", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("2026-06-01")).toBeInTheDocument();
  });

  it("renders_no_date_placeholder_when_dueDate_absent", () => {
    const card = { ...baseCard, dueDate: undefined };
    render(<KanbanCardDetail card={card} open onClose={() => {}} readOnly />);
    expect(screen.getByText("No date")).toBeInTheDocument();
  });

  it("renders_milestone_field_label", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("Milestone")).toBeInTheDocument();
  });

  it("renders_milestone_value", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("v2.0 Release")).toBeInTheDocument();
  });

  it("renders_none_placeholder_when_milestone_absent", () => {
    const card = { ...baseCard, milestone: undefined };
    render(<KanbanCardDetail card={card} open onClose={() => {}} readOnly />);
    // "None" placeholder appears for milestone (and possibly others — get all)
    const nones = screen.getAllByText("None");
    expect(nones.length).toBeGreaterThan(0);
  });

  it("renders_attachments_field_label", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("Attachments")).toBeInTheDocument();
  });

  it("renders_attachments_count", () => {
    render(<KanbanCardDetail card={baseCard} open onClose={() => {}} readOnly />);
    expect(screen.getByText("1 file")).toBeInTheDocument();
  });

  it("renders_none_placeholder_when_attachments_absent", () => {
    const card = { ...baseCard, attachments: [] };
    render(<KanbanCardDetail card={card} open onClose={() => {}} readOnly />);
    const nones = screen.getAllByText("None");
    expect(nones.length).toBeGreaterThan(0);
  });
});

/* ------------------------------------------------------------------ */
/* onClose                                                             */
/* ------------------------------------------------------------------ */
describe("KanbanCardDetail — onClose", () => {
  it("calls_onClose_when_close_button_clicked", async () => {
    const onClose = vi.fn();
    render(<KanbanCardDetail card={baseCard} open onClose={onClose} />);
    const closeBtn = screen.getByTitle("Close");
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

/* ------------------------------------------------------------------ */
/* onSave — title + description                                        */
/* ------------------------------------------------------------------ */
describe("KanbanCardDetail — onSave", () => {
  it("calls_onSave_with_updated_title_after_edit", async () => {
    const onSave = vi.fn();
    render(
      <KanbanCardDetail card={baseCard} open onClose={() => {}} onSave={onSave} />
    );
    // Click title to enter edit mode
    const titleEl = screen.getByText("Implement live-reload toggle for the showcase");
    await userEvent.click(titleEl);
    const textarea = screen.getByDisplayValue("Implement live-reload toggle for the showcase");
    await userEvent.clear(textarea);
    await userEvent.type(textarea, "New title");
    // Blur triggers save
    await userEvent.tab();
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ title: "New title" })
    );
  });
});
