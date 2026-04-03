import { useState } from "react";
import { css } from "styled-system/css";
import { CommentThread } from "@sunbeam/beam-ui/components/ui/comment-thread";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "items", type: "(Comment | TimelineEvent)[]", required: true, description: "Array of comments and timeline events in chronological order." },
  { name: "onReply", type: "(body: string) => void", required: false, description: "Callback when user submits a reply. Shows the reply box when provided." },
  { name: "onEdit", type: "(id: string, body: string) => void", required: false, description: "Callback when user edits a comment. Shows the edit button when provided." },
  { name: "onReaction", type: "(commentId: string, emoji: string) => void", required: false, description: "Callback when user reacts to a comment." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const COMMENT_INTERFACE = [
  { name: "id", type: "string", required: true, description: "Unique identifier for the comment." },
  { name: "author", type: "{ username: string; displayName: string; avatarUrl?: string }", required: true, description: "Comment author with display info and optional avatar." },
  { name: "body", type: "string", required: true, description: "Markdown body of the comment." },
  { name: "createdAt", type: "string", required: true, description: "ISO 8601 date string for when the comment was created." },
  { name: "updatedAt", type: "string", required: false, description: "ISO 8601 date string for the last edit. Shows an \"edited\" badge when present." },
  { name: "reactions", type: "{ emoji: string; count: number; reacted: boolean }[]", required: false, description: "Array of reaction counts. `reacted` indicates if the current user reacted." },
];

const TIMELINE_EVENT_INTERFACE = [
  { name: "id", type: "string", required: true, description: "Unique identifier for the event." },
  { name: "type", type: '"label" | "assignee" | "milestone" | "merge" | "close" | "reopen" | "reference"', required: true, description: "Event type. Determines the icon and rendering style." },
  { name: "actor", type: "string", required: true, description: "Username of the person who triggered the event." },
  { name: "detail", type: "string", required: true, description: "Description text (e.g. \"added label bug\", \"merged branch fix/email-validation\")." },
  { name: "createdAt", type: "string", required: true, description: "ISO 8601 date string for when the event occurred." },
];

const now = Date.now();

function hoursAgo(h: number) {
  return new Date(now - h * 3600_000).toISOString();
}

function daysAgo(d: number) {
  return new Date(now - d * 86400_000).toISOString();
}

const INITIAL_ITEMS: any[] = [
  {
    id: "c1",
    author: { username: "elena", displayName: "Elena Rivera", avatarUrl: undefined },
    body: "## Issue Summary\n\nThe login form fails to validate email addresses that contain a `+` symbol (e.g. `user+tag@example.com`).\n\nSteps to reproduce:\n1. Navigate to `/login`\n2. Enter an email with `+` in the local part\n3. Click **Sign In**\n\nExpected: validation passes.\nActual: shows \"Invalid email\" error.",
    createdAt: daysAgo(3),
    reactions: [
      { emoji: "\u{1F44D}", count: 4, reacted: false },
      { emoji: "\u{1F680}", count: 1, reacted: true },
    ],
  },
  {
    id: "e1",
    type: "label" as const,
    actor: "elena",
    detail: "added label bug",
    createdAt: daysAgo(3),
  },
  {
    id: "e2",
    type: "assignee" as const,
    actor: "elena",
    detail: "assigned marcus",
    createdAt: daysAgo(2),
  },
  {
    id: "c2",
    author: { username: "marcus", displayName: "Marcus Chen", avatarUrl: undefined },
    body: "I can reproduce this. The regex we use for email validation doesn't account for `+`. Here's the fix:\n\n```ts\nconst EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/;\n```\n\nI'll push a PR shortly.",
    createdAt: daysAgo(2),
    updatedAt: daysAgo(1),
    reactions: [
      { emoji: "\u{1F389}", count: 2, reacted: false },
      { emoji: "\u{2764}\u{FE0F}", count: 1, reacted: true },
    ],
  },
  {
    id: "e3",
    type: "reference" as const,
    actor: "marcus",
    detail: "referenced this in PR #142",
    createdAt: hoursAgo(18),
  },
  {
    id: "c3",
    author: { username: "sophia", displayName: "Sophia Nakamura", avatarUrl: undefined },
    body: "Confirmed fixed on staging. The `+` alias emails pass validation now. Nice catch @elena, nice fix @marcus!",
    createdAt: hoursAgo(6),
    reactions: [
      { emoji: "\u{1F44D}", count: 3, reacted: true },
    ],
  },
  {
    id: "e4",
    type: "merge" as const,
    actor: "marcus",
    detail: "merged branch fix/email-validation",
    createdAt: hoursAgo(4),
  },
  {
    id: "e5",
    type: "close" as const,
    actor: "marcus",
    detail: "closed this issue",
    createdAt: hoursAgo(4),
  },
];

export function CommentThreadPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleReply = (body: string) => {
    const newComment = {
      id: `c${Date.now()}`,
      author: { username: "you", displayName: "You", avatarUrl: undefined },
      body,
      createdAt: new Date().toISOString(),
      reactions: [],
    };
    setItems((prev) => [...prev, newComment]);
  };

  const handleEdit = (id: string, body: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, body, updatedAt: new Date().toISOString() } : item
      )
    );
  };

  const handleReaction = (commentId: string, emoji: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== commentId || !("reactions" in item)) return item;
        const reactions = item.reactions ?? [];
        const existing = reactions.find((r: any) => r.emoji === emoji);
        if (existing) {
          return {
            ...item,
            reactions: reactions.map((r: any) =>
              r.emoji === emoji
                ? { ...r, reacted: !r.reacted, count: r.reacted ? r.count - 1 : r.count + 1 }
                : r
            ),
          };
        }
        return {
          ...item,
          reactions: [...reactions, { emoji, count: 1, reacted: true }],
        };
      })
    );
  };

  return (
    <ComponentPage
      name="CommentThread"
      description="A threaded discussion timeline for issues and pull requests, featuring comments, timeline events, reactions, and a reply box."
      importPath='import { CommentThread } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <CommentThread
          items={items}
          onReply={handleReply}
          onEdit={handleEdit}
          onReaction={handleReaction}
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
              <span className={syn.keyword}>import</span> {"{ "}CommentThread{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> items = [{"\n"}
              {"  { "}<span className={syn.prop}>id</span>: <span className={syn.string}>"1"</span>, <span className={syn.prop}>author</span>: {"{ ... }"}, <span className={syn.prop}>body</span>: <span className={syn.string}>"Comment text"</span>, ... {"},"}{"\n"}
              {"  { "}<span className={syn.prop}>id</span>: <span className={syn.string}>"2"</span>, <span className={syn.prop}>type</span>: <span className={syn.string}>"label"</span>, <span className={syn.prop}>actor</span>: <span className={syn.string}>"elena"</span>, ... {"},"}{"\n"}
              ]{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>CommentThread</span>{"\n"}
              {"  "}<span className={syn.prop}>items</span>={"{"}items{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onReply</span>={"{"}handleReply{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onEdit</span>={"{"}handleEdit{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onReaction</span>={"{"}handleReaction{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="interfaces">Data Interfaces</SectionHeading>

      <h3 className={subHeading}>Comment Interface</h3>
      <PropsTable props={COMMENT_INTERFACE} />

      <h3 className={subHeading}>TimelineEvent Interface</h3>
      <PropsTable props={TIMELINE_EVENT_INTERFACE} />

      <h3 className={subHeading}>formatRelativeTime</h3>
      <p className={helperDesc}>
        Internal helper that converts an ISO date string into a human-readable relative timestamp.
        Returns "just now" for {"<"}60s, then "N minutes ago", "N hours ago", "N days ago",
        "N months ago", or "N years ago". Used automatically for comment and event timestamps.
      </p>

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Read-only (no reply box)</h3>
        <CommentThread items={items.slice(0, 3)} />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
const subHeading = css({ fontSize: "16px", fontWeight: "heading", color: "text.primary", marginBottom: "8px", marginTop: "24px", fontFamily: "mono" });
const helperDesc = css({ fontSize: "14px", color: "text.secondary", lineHeight: 1.7, marginBottom: "24px" });
