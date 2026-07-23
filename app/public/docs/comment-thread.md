# CommentThread

> Single comment in a {@link CommentThread}. */
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

/** GitHub-style comment thread with editable comments, timeline events, and reactions. * Renders comments with author avatars, timestamps, and inline edit capability. Interleaves timeline events (merges, label changes, etc.) with human visual distinction. Includes an optional reply box for adding new comments. * @example ```tsx <CommentThread items={comments} onReply={(body) => addComment(body)} onEdit={(id, body) => updateComment(id, body)} onReaction={(id, emoji) => toggleReaction(id, emoji)} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/comment-thread?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { CommentThread } from "@sunbeam/beam-ui/components/ui/comment-thread"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `(Comment | TimelineEvent)[]` | Yes | Array of comments and timeline events, rendered in chronological order. |
| onReply | `(body: string) => void` | No | Callback fired when the user submits a reply; receives the markdown body. |
| onEdit | `(id: string, body: string) => void` | No | Callback fired when the user edits a comment; receives the comment ID and new body. |
| onReaction | `(commentId: string, emoji: string) => void` | No | Callback fired when the user adds or toggles a reaction; receives the comment ID and emoji. |
| className | `string` | No | Extra CSS class names to apply to the root container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
