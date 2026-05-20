import { useState, useEffect, type ReactNode } from "react";
import { css, cx } from "styled-system/css";
import {
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogCloseTrigger,
  DialogTitle,
} from "@ark-ui/react/dialog";
import { Icon } from "./icon";
import { Button } from "./button";
import { TextInput } from "./text-input";
import { MarkdownEditor } from "./markdown-editor";
import { MarkdownRenderer } from "./markdown-renderer";
import { Avatar } from "./avatar";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

/** Extended card data for detail view with timestamps, status, and priority. */
export interface KanbanCardData {
  /** Unique identifier for the card. */
  id: string;
  /** Card title / heading. */
  title: string;
  /** Markdown-formatted description. */
  description?: string;
  /** Optional labels (tags) with custom colors. */
  labels?: { name: string; color: string }[];
  /** Optional assignees with optional avatar URLs. */
  assignees?: { name: string; avatarUrl?: string }[];
  /** Optional milestone reference. */
  milestone?: string;
  /** ISO date string for due date. */
  dueDate?: string;
  /** Status badge (e.g., "open", "in-progress", "done"). */
  status?: string;
  /** Priority level. */
  priority?: "low" | "medium" | "high" | "critical";
  /** ISO timestamp when the card was created. */
  createdAt?: string;
  /** ISO timestamp of last update. */
  updatedAt?: string;
}

/** Props for {@link KanbanCardDetail}. */
interface KanbanCardDetailProps {
  /** The card data to display and edit. */
  card: KanbanCardData;
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when user closes the dialog (via Escape, close button, or backdrop). */
  onClose: () => void;
  /** Called when user saves title and description changes. Receives updated card. */
  onSave?: (card: KanbanCardData) => void;
  /** Called when user deletes the card. Receives card id. */
  onDelete?: (id: string) => void;
  /** If true, hides edit and delete buttons. Defaults to `false`. */
  readOnly?: boolean;
  /** Optional CSS class for the dialog content. */
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Priority badge                                                      */
/* ------------------------------------------------------------------ */

const PRIORITY_COLORS: Record<string, string> = {
  low: "#5bb8a6",
  medium: "#4a9eff",
  high: "#f59e0b",
  critical: "#ef4444",
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * Modal dialog for viewing and editing detailed Kanban card information.
 * Displays title, description (with markdown editor), assignees, labels, milestone, and priority.
 * Supports inline edit mode with Save/Cancel buttons.
 *
 * @example
 * ```tsx
 * <KanbanCardDetail
 *   card={selectedCard}
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onSave={(card) => updateCard(card)}
 * />
 * ```
 */
export function KanbanCardDetail({
  card,
  open,
  onClose,
  onSave,
  onDelete,
  readOnly = false,
  className,
}: KanbanCardDetailProps): ReactNode {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description ?? "");

  // Escape key closes the modal (safety net alongside Ark Dialog's built-in handler)
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleSave = () => {
    onSave?.({ ...card, title, description });
    setEditing(false);
  };

  const handleCancel = () => {
    setTitle(card.title);
    setDescription(card.description ?? "");
    setEditing(false);
  };

  return (
    <DialogRoot open={open} onOpenChange={(d) => { if (!d.open) onClose(); }}>
      <DialogBackdrop className={backdrop} />
      <DialogPositioner className={positioner}>
        <DialogContent className={cx(content, className)}>
          {/* Header */}
          <div className={header}>
            <div className={headerLeft}>
              {card.status && (
                <span className={statusBadge}>{card.status}</span>
              )}
              {card.priority && (
                <span
                  className={priorityBadge}
                  style={{ backgroundColor: PRIORITY_COLORS[card.priority] }}
                >
                  {card.priority}
                </span>
              )}
            </div>
            <DialogCloseTrigger className={closeBtn}>
              <Icon name="close" size={20} />
            </DialogCloseTrigger>
          </div>

          {/* Title */}
          {editing ? (
            <div className={titleEditArea}>
              <TextInput value={title} onChange={setTitle} label="Title" />
            </div>
          ) : (
            <DialogTitle className={titleStyle}>{card.title}</DialogTitle>
          )}

          {/* Meta row */}
          <div className={metaRow}>
            {card.createdAt && (
              <span className={metaItem}>
                <Icon name="schedule" size={14} />
                Created {card.createdAt}
              </span>
            )}
            {card.dueDate && (
              <span className={metaItem}>
                <Icon name="event" size={14} />
                Due {card.dueDate}
              </span>
            )}
            {card.updatedAt && (
              <span className={metaItem}>
                <Icon name="update" size={14} />
                Updated {card.updatedAt}
              </span>
            )}
          </div>

          {/* Body — two columns */}
          <div className={body}>
            {/* Left: Description */}
            <div className={descriptionCol}>
              <h3 className={sectionLabel}>Description</h3>
              {editing ? (
                <MarkdownEditor
                  value={description}
                  onChange={setDescription}
                  placeholder="Add a description..."
                  minHeight="200px"
                />
              ) : (
                <div className={descriptionBody}>
                  {card.description ? (
                    <MarkdownRenderer content={card.description} />
                  ) : (
                    <p className={emptyText}>No description provided.</p>
                  )}
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className={sidebar}>
              {/* Assignees */}
              <div className={sidebarSection}>
                <h4 className={sidebarLabel}>
                  <Icon name="group" size={16} />
                  Assignees
                </h4>
                {card.assignees && card.assignees.length > 0 ? (
                  <div className={assigneeList}>
                    {card.assignees.map((a) => (
                      <div key={a.name} className={assigneeRow}>
                        <Avatar name={a.name} src={a.avatarUrl} size="sm" />
                        <span className={assigneeName}>{a.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={emptyText}>No assignees</p>
                )}
              </div>

              {/* Labels */}
              <div className={sidebarSection}>
                <h4 className={sidebarLabel}>
                  <Icon name="label" size={16} />
                  Labels
                </h4>
                {card.labels && card.labels.length > 0 ? (
                  <div className={labelList}>
                    {card.labels.map((l) => (
                      <span
                        key={l.name}
                        className={labelPill}
                        style={{ backgroundColor: l.color }}
                      >
                        {l.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className={emptyText}>No labels</p>
                )}
              </div>

              {/* Milestone */}
              <div className={sidebarSection}>
                <h4 className={sidebarLabel}>
                  <Icon name="flag" size={16} />
                  Milestone
                </h4>
                <p className={card.milestone ? sidebarValue : emptyText}>
                  {card.milestone ?? "No milestone"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          {!readOnly && (
            <div className={actions}>
              {editing ? (
                <>
                  <Button variant="primary" onClick={handleSave}>Save</Button>
                  <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setEditing(true)}>
                    <Icon name="edit" size={16} /> Edit
                  </Button>
                  {onDelete && (
                    <Button variant="ghost" onClick={() => onDelete(card.id)}>
                      <Icon name="delete" size={16} /> Delete
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const backdrop = css({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 50,
});

const positioner = css({
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 51,
  padding: "24px",
});

const content = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  shadow: "golden",
  width: "100%",
  maxWidth: "720px",
  maxHeight: "85vh",
  overflowY: "auto",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const header = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const headerLeft = css({
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

const statusBadge = css({
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "text.muted",
  padding: "2px 8px",
  border: "1px solid",
  borderColor: "border.default",
});

const priorityBadge = css({
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "white",
  padding: "2px 8px",
  borderRadius: "sm",
});

const closeBtn = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "text.muted",
  padding: "4px",
  _hover: { color: "sunbeam.orange" },
});

const titleStyle = css({
  fontSize: "24px",
  fontWeight: "heading",
  fontFamily: "heading",
  color: "text.primary",
  margin: 0,
});

const titleEditArea = css({
  marginBottom: "8px",
});

const metaRow = css({
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
});

const metaItem = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "12px",
  color: "text.muted",
  fontFamily: "mono",
});

const body = css({
  display: "flex",
  gap: "24px",
  flexDirection: { base: "column", md: "row" },
});

const descriptionCol = css({
  flex: 1,
  minWidth: 0,
});

const sectionLabel = css({
  fontSize: "12px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "text.muted",
  marginBottom: "12px",
});

const descriptionBody = css({
  padding: "16px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.subtle",
  minHeight: "120px",
});

const emptyText = css({
  fontSize: "13px",
  color: "text.muted",
  fontStyle: "italic",
  margin: 0,
});

const sidebar = css({
  width: { base: "100%", md: "200px" },
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const sidebarSection = css({});

const sidebarLabel = css({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "12px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "text.muted",
  marginBottom: "8px",
});

const sidebarValue = css({
  fontSize: "13px",
  color: "text.primary",
  margin: 0,
});

const assigneeList = css({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

const assigneeRow = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const assigneeName = css({
  fontSize: "13px",
  color: "text.primary",
});

const labelList = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
});

const labelPill = css({
  fontSize: "11px",
  fontWeight: "button",
  color: "white",
  padding: "2px 8px",
  borderRadius: "sm",
});

const actions = css({
  display: "flex",
  gap: "8px",
  paddingTop: "8px",
  borderTop: "1px solid",
  borderColor: "border.subtle",
});
