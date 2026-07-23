import { css, cx } from "../../system.ts";

import { type ReactNode, useState } from "react";
import { Avatar } from "./avatar.tsx";
import { Icon } from "./icon.tsx";
import { MarkdownRenderer } from "./markdown-renderer.tsx";
import { MarkdownEditor } from "./markdown-editor.tsx";
import { ReactionPicker } from "./reaction-picker.tsx";
import { Button } from "./button.tsx";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

/** Single comment in a {@link CommentThread}. */
interface Comment {
  /** Unique identifier for this comment. */
  id: string;
  /** Author metadata including username, display name, and optional avatar URL. */
  author: {
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  /** Markdown body of the comment. */
  body: string;
  /** ISO 8601 timestamp when the comment was created. */
  createdAt: string;
  /** ISO 8601 timestamp when the comment was last updated (if different from created). */
  updatedAt?: string;
  /** Array of emoji reactions with counts and user's reaction status. */
  reactions?: { emoji: string; count: number; reacted: boolean }[];
}

/** Timeline event (label, assignee, merge, etc.) in a {@link CommentThread}. */
interface TimelineEvent {
  /** Unique identifier for this event. */
  id: string;
  /** Event type (e.g., "merge", "close", "label"). */
  type: "label" | "assignee" | "milestone" | "merge" | "close" | "reopen" | "reference";
  /** Username of the actor who triggered the event. */
  actor: string;
  /** Human-readable detail of the event (e.g., "closed this" or "added label bug"). */
  detail: string;
  /** ISO 8601 timestamp when the event occurred. */
  createdAt: string;
}

/** Props for {@link CommentThread}. */
export interface CommentThreadProps {
  /** Array of comments and timeline events, rendered in chronological order. */
  items: (Comment | TimelineEvent)[];
  /** Callback fired when the user submits a reply; receives the markdown body. */
  onReply?: (body: string) => void;
  /** Callback fired when the user edits a comment; receives the comment ID and new body. */
  onEdit?: (id: string, body: string) => void;
  /** Callback fired when the user adds or toggles a reaction; receives the comment ID and emoji. */
  onReaction?: (commentId: string, emoji: string) => void;
  /** Extra CSS class names to apply to the root container. */
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function isComment(item: Comment | TimelineEvent): item is Comment {
  return "body" in item;
}

const EVENT_ICONS: Record<TimelineEvent["type"], string> = {
  label: "label",
  assignee: "person_add",
  milestone: "flag",
  merge: "merge",
  close: "close",
  reopen: "restart_alt",
  reference: "link",
};

function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function CommentCard({
  comment,
  onEdit,
  onReaction,
}: {
  comment: Comment;
  onEdit?: (id: string, body: string) => void;
  onReaction?: (commentId: string, emoji: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);

  const handleSaveEdit = () => {
    onEdit?.(comment.id, editBody);
    setEditing(false);
  };

  return (
    <article
      className={commentCard}
      aria-label={`Comment by ${comment.author.displayName}`}
    >
      <div className={commentHeader}>
        <span className={authorName}>{comment.author.displayName}</span>
        <span className={timestamp}>{formatRelativeTime(comment.createdAt)}</span>
        {comment.updatedAt && <span className={editedBadge}>(edited)</span>}
      </div>

      {editing
        ? (
          <div className={editArea}>
            <MarkdownEditor value={editBody} onChange={setEditBody} minHeight="100px" />
            <div className={editActions}>
              <Button variant="primary" onClick={handleSaveEdit}>Save</Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setEditing(false);
                  setEditBody(comment.body);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )
        : (
          <div className={commentBody}>
            <MarkdownRenderer content={comment.body} />
          </div>
        )}

      {/* Footer: reactions + edit */}
      {(!editing) && (
        <div className={commentFooter}>
          {comment.reactions && onReaction && (
            <ReactionPicker
              reactions={comment.reactions}
              onToggle={(emoji) => onReaction(comment.id, emoji)}
              onAdd={(emoji) => onReaction(comment.id, emoji)}
            />
          )}
          {onEdit && !editing && (
            <button
              type="button"
              className={editButton}
              onClick={() => setEditing(true)}
            >
              <Icon name="edit" size={14} />
              <span>Edit</span>
            </button>
          )}
        </div>
      )}
    </article>
  );
}

const EVENT_COLORS: Record<TimelineEvent["type"], string> = {
  label: "#ffb83e",
  assignee: "#4a9eff",
  milestone: "#5bb8a6",
  merge: "#a855f7",
  close: "#ef4444",
  reopen: "#22c55e",
  reference: "#8896a6",
};

function TimelineEventItem({ event }: { event: TimelineEvent }) {
  return (
    <div className={eventRow} role="listitem">
      <div className={eventIconWrapper} style={{ color: EVENT_COLORS[event.type] }}>
        <Icon name={EVENT_ICONS[event.type]} size={16} />
      </div>
      <div className={eventContent}>
        <span className={eventActorText}>{event.actor}</span>{" "}
        <span className={eventDetailText}>{event.detail}</span>
        <span className={eventTimestamp}>{formatRelativeTime(event.createdAt)}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

/**
 * GitHub-style comment thread with editable comments, timeline events, and reactions.
 *
 * Renders comments with author avatars, timestamps, and inline edit capability.
 * Interleaves timeline events (merges, label changes, etc.) with human visual distinction.
 * Includes an optional reply box for adding new comments.
 *
 * @example
 * ```tsx
 * <CommentThread
 *   items={comments}
 *   onReply={(body) => addComment(body)}
 *   onEdit={(id, body) => updateComment(id, body)}
 *   onReaction={(id, emoji) => toggleReaction(id, emoji)}
 * />
 * ```
 */
export function CommentThread({
  items,
  onReply,
  onEdit,
  onReaction,
  className,
}: CommentThreadProps): ReactNode {
  const [replyBody, setReplyBody] = useState("");

  const handleSubmitReply = () => {
    if (!replyBody.trim()) return;
    onReply?.(replyBody);
    setReplyBody("");
  };

  return (
    <div className={cx(threadWrapper, className)} role="list">
      {items.map((item) => {
        if (isComment(item)) {
          return (
            <div key={item.id} className={commentRow} role="listitem">
              <div className={avatarCol}>
                <Avatar
                  name={item.author.displayName}
                  src={item.author.avatarUrl}
                  size="sm"
                />
                <div className={timelineLine} />
              </div>
              <div className={contentCol}>
                <CommentCard
                  comment={item}
                  onEdit={onEdit}
                  onReaction={onReaction}
                />
              </div>
            </div>
          );
        }
        return (
          <div key={item.id} className={eventItemRow}>
            <div className={avatarCol}>
              <div
                className={eventDot}
                style={{ borderColor: EVENT_COLORS[item.type] }}
              />
              <div className={timelineLine} />
            </div>
            <div className={contentCol}>
              <TimelineEventItem event={item} />
            </div>
          </div>
        );
      })}

      {/* Reply box */}
      {onReply && (
        <div className={replySection}>
          <div className={avatarCol}>
            <div className={replyDot} />
          </div>
          <div className={contentCol}>
            <h3 className={replyHeading}>Reply</h3>
            <MarkdownEditor
              value={replyBody}
              onChange={setReplyBody}
              placeholder="Leave a comment..."
              minHeight="120px"
            />
            <div className={replyActions}>
              <Button variant="primary" onClick={handleSubmitReply}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const threadWrapper = css({
  display: "flex",
  flexDirection: "column",
  gap: "0",
});

const commentRow = css({
  display: "flex",
  gap: "12px",
});

const eventItemRow = css({
  display: "flex",
  gap: "12px",
});

const avatarCol = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "48px",
  flexShrink: 0,
});

const timelineLine = css({
  width: "2px",
  flex: 1,
  backgroundColor: { base: "rgba(250, 82, 15, 0.15)", _dark: "rgba(250, 82, 15, 0.2)" },
  minHeight: "16px",
});

const contentCol = css({
  flex: 1,
  minWidth: 0,
  paddingBottom: "16px",
});

const commentCard = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  borderTop: "3px solid",
  borderTopColor: "sunbeam.orange",
  overflow: "hidden",
  shadow: "golden",
});

const commentHeader = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 16px",
  borderBottom: "2px solid",
  borderColor: "sunbeam.orange",
  backgroundColor: { base: "rgba(250, 82, 15, 0.06)", _dark: "rgba(250, 82, 15, 0.1)" },
});

const authorName = css({
  fontSize: "14px",
  fontWeight: "heading",
  color: "sunbeam.orange",
});

const timestamp = css({
  fontSize: "12px",
  color: "text.muted",
});

const editedBadge = css({
  fontSize: "11px",
  color: "text.muted",
  fontStyle: "italic",
});

const commentBody = css({
  padding: "16px 20px",
  backgroundColor: "bg.page",
});

const commentFooter = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "10px 16px",
  borderTop: "1px solid",
  borderColor: "border.default",
  backgroundColor: { base: "rgba(127, 99, 21, 0.04)", _dark: "rgba(255, 255, 255, 0.03)" },
});

const editButton = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "12px",
  color: "text.muted",
  fontFamily: "body",
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
});

const editArea = css({
  padding: "12px 16px",
});

const editActions = css({
  display: "flex",
  gap: "8px",
  marginTop: "8px",
});

/* Timeline events */

const eventDot = css({
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "full",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  flexShrink: 0,
});

const eventRow = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "4px 0",
});

const eventIconWrapper = css({
  color: "text.muted",
  display: "inline-flex",
  alignItems: "center",
});

const eventContent = css({
  fontSize: "13px",
  color: "text.secondary",
  lineHeight: 1.4,
});

const eventActorText = css({
  fontWeight: "heading",
  color: "text.primary",
});

const eventDetailText = css({
  color: "text.secondary",
});

const eventTimestamp = css({
  fontSize: "12px",
  color: "text.muted",
  marginLeft: "8px",
});

/* Reply section */

const replySection = css({
  display: "flex",
  gap: "12px",
  marginTop: "8px",
});

const replyDot = css({
  width: "8px",
  height: "8px",
  borderRadius: "full",
  backgroundColor: "sunbeam.orange",
  marginTop: "8px",
});

const replyHeading = css({
  fontSize: "16px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "12px",
});

const replyActions = css({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "12px",
});
