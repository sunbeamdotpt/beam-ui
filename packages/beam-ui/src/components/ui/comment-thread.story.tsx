import { CommentThread } from "./comment-thread";

const now = new Date();
const hourAgo = new Date(now.getTime() - 3600000).toISOString();
const twoHoursAgo = new Date(now.getTime() - 7200000).toISOString();
const threeHoursAgo = new Date(now.getTime() - 10800000).toISOString();

export default function CommentThreadStory() {
  return (
    <div style={{ maxWidth: 700 }}>
      <CommentThread
        items={[
          {
            id: "c1",
            author: { username: "sienna", displayName: "Sienna Park" },
            body: "This pull request adds **branch protection rules** to the settings page. Please review the validation logic in particular.",
            createdAt: threeHoursAgo,
            reactions: [
              { emoji: "thumbsup", count: 2, reacted: false },
              { emoji: "rocket", count: 1, reacted: true },
            ],
          },
          {
            id: "e1",
            type: "label" as const,
            actor: "Jordan Chen",
            detail: 'added the "enhancement" label',
            createdAt: twoHoursAgo,
          },
          {
            id: "c2",
            author: { username: "jchen", displayName: "Jordan Chen" },
            body: "Looks great overall. One suggestion: could we add a confirmation dialog before disabling force-push protection?",
            createdAt: hourAgo,
          },
        ]}
        onReply={(body) => console.log("Reply:", body)}
      />
    </div>
  );
}

export function SingleComment() {
  return (
    <div style={{ maxWidth: 700 }}>
      <CommentThread
        items={[
          {
            id: "c1",
            author: { username: "sienna", displayName: "Sienna Park" },
            body: "A single comment without timeline events.",
            createdAt: hourAgo,
          },
        ]}
      />
    </div>
  );
}

export function TimelineOnly() {
  return (
    <div style={{ maxWidth: 700 }}>
      <CommentThread
        items={[
          { id: "e1", type: "merge" as const, actor: "Alice", detail: "merged branch feature/auth into main", createdAt: hourAgo },
          { id: "e2", type: "close" as const, actor: "Bob", detail: "closed this issue", createdAt: twoHoursAgo },
        ]}
      />
    </div>
  );
}
