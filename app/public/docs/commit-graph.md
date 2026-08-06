# CommitGraph

> Single commit in a {@link CommitGraph}. */
export interface CommitNode {
  /** Full commit hash (SHA-1 or equivalent). */
  hash: string;
  /** Abbreviated commit hash (first 7 characters, typically). */
  shortHash: string;
  /** Commit message (subject line). */
  message: string;
  /** Commit author name or email. */
  author: string;
  /** Human-readable date string (e.g., "2 days ago"). */
  date: string;
  /** Array of parent commit hashes; empty for root commits. */
  parents: string[];
  /** Optional branch name (e.g., "main", "feature/foo"). */
  branch?: string;
  /** Optional array of tag names attached to this commit. */
  tags?: string[];
}

/** Props for {@link CommitGraph}. */
export interface CommitGraphProps {
  /** Array of commits to display, in chronological order. */
  commits: CommitNode[];
  /** Extra CSS class names to apply to the root container. */
  className?: string;
}

const LANE_COLORS = [
  "#fa520f",
  "#ffb83e",
  "#ffd06a",
  "#ff8a00",
  "#ffa110",
  "#4a9eff",
];

const NODE_RADIUS = 4;
const LANE_SPACING = 20;
const ROW_HEIGHT = 36;
const GRAPH_PADDING_LEFT = 16;
const GRAPH_PADDING_TOP = 18;

interface LayoutNode {
  commit: CommitNode;
  lane: number;
  row: number;
  x: number;
  y: number;
  color: string;
}

/** Simple lane-assignment algorithm. Assigns each branch to a lane. Main (first commit's branch or parentless commits) get lane 0. Feature branches get subsequent lanes. /
function layoutCommits(commits: CommitNode[]) {
  const nodes: LayoutNode[] = [];
  const hashToNode = new Map<string, LayoutNode>();
  const branchLanes = new Map<string, number>();
  let nextLane = 0;

  // First pass: assign lanes
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    let lane: number;

    if (commit.branch && branchLanes.has(commit.branch)) {
      lane = branchLanes.get(commit.branch)!;
    } else if (commit.branch) {
      // Check if this is the main branch (lane 0 candidate)
      if (i === 0 || commit.branch === "main" || commit.branch === "master") {
        lane = branchLanes.get("main") ?? branchLanes.get("master") ??
          nextLane++;
      } else {
        lane = nextLane++;
      }
      branchLanes.set(commit.branch, lane);
    } else {
      // No branch name - try to inherit from parent
      const parentNode = commit.parents.length > 0 ? hashToNode.get(commit.parents[0]) : undefined;
      lane = parentNode ? parentNode.lane : 0;
    }

    const node: LayoutNode = {
      commit,
      lane,
      row: i,
      x: GRAPH_PADDING_LEFT + lane * LANE_SPACING,
      y: GRAPH_PADDING_TOP + i * ROW_HEIGHT,
      color: LANE_COLORS[lane % LANE_COLORS.length],
    };
    nodes.push(node);
    hashToNode.set(commit.hash, node);
  }

  return { nodes, hashToNode, maxLane: nextLane };
}

/** Git commit history visualizer with lane-based graph and metadata columns. * Renders commits as a scrollable SVG graph with colored lanes for branches. Each commit row displays the hash (abbreviated), message, author, and date. Handles merge commits with curved lines; branch and tag badges shown inline. * @example ```tsx <CommitGraph commits={[ { hash: "abc123...", shortHash: "abc123", message: "Initial commit", author: "Alice", date: "2 days ago", parents: [], branch: "main" } ]} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/commit-graph?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { CommitGraph } from "@sunbeam/beam-ui/components/ui/commit-graph"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| commits | `CommitNode[]` | Yes | Array of commits to display, in chronological order. |
| className | `string` | No | Extra CSS class names to apply to the root container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
