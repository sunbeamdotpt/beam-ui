import { CommitGraph } from "./commit-graph.tsx";
import type { CommitNode } from "./commit-graph.tsx";

const commits: CommitNode[] = [
  {
    hash: "a1b2c3d4e5f6",
    shortHash: "a1b2c3d",
    message: "Merge branch 'feature/auth-flow' into main",
    author: "sienna",
    date: "2026-04-03",
    parents: ["b2c3d4e5f6a7", "f1e2d3c4b5a6"],
    branch: "main",
    tags: ["v2.1.0"],
  },
  {
    hash: "f1e2d3c4b5a6",
    shortHash: "f1e2d3c",
    message: "Add OAuth callback handler",
    author: "jchen",
    date: "2026-04-02",
    parents: ["c3d4e5f6a7b8"],
    branch: "feature/auth-flow",
  },
  {
    hash: "b2c3d4e5f6a7",
    shortHash: "b2c3d4e",
    message: "Update CI pipeline configuration",
    author: "sienna",
    date: "2026-04-02",
    parents: ["c3d4e5f6a7b8"],
    branch: "main",
  },
  {
    hash: "c3d4e5f6a7b8",
    shortHash: "c3d4e5f",
    message: "Refactor session middleware",
    author: "amira",
    date: "2026-04-01",
    parents: ["d4e5f6a7b8c9"],
    branch: "main",
  },
  {
    hash: "d4e5f6a7b8c9",
    shortHash: "d4e5f6a",
    message: "Initial auth module scaffolding",
    author: "jchen",
    date: "2026-03-31",
    parents: [],
    branch: "main",
  },
];

export default function CommitGraphStory() {
  return (
    <div style={{ maxWidth: 900 }}>
      <CommitGraph commits={commits} />
    </div>
  );
}

export function LinearHistory() {
  const linear: CommitNode[] = [
    { hash: "aaa", shortHash: "aaa", message: "Third commit", author: "alice", date: "2026-04-03", parents: ["bbb"], branch: "main" },
    { hash: "bbb", shortHash: "bbb", message: "Second commit", author: "bob", date: "2026-04-02", parents: ["ccc"], branch: "main" },
    { hash: "ccc", shortHash: "ccc", message: "Initial commit", author: "alice", date: "2026-04-01", parents: [], branch: "main" },
  ];
  return <div style={{ maxWidth: 900 }}><CommitGraph commits={linear} /></div>;
}

export function WithTags() {
  const tagged: CommitNode[] = [
    { hash: "aaa", shortHash: "aaa", message: "Release v1.0", author: "alice", date: "2026-04-03", parents: ["bbb"], branch: "main", tags: ["v1.0.0", "latest"] },
    { hash: "bbb", shortHash: "bbb", message: "Initial", author: "alice", date: "2026-04-01", parents: [], branch: "main" },
  ];
  return <div style={{ maxWidth: 900 }}><CommitGraph commits={tagged} /></div>;
}
