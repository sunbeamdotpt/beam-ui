import { useMemo } from "react";
import { css, cx } from "styled-system/css";

export interface CommitNode {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  date: string;
  parents: string[];
  branch?: string;
  tags?: string[];
}

interface CommitGraphProps {
  commits: CommitNode[];
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

/**
 * Simple lane-assignment algorithm.
 * Assigns each branch to a lane. Main (first commit's branch or parentless
 * commits) get lane 0. Feature branches get subsequent lanes.
 */
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
        lane = branchLanes.get("main") ?? branchLanes.get("master") ?? nextLane++;
      } else {
        lane = nextLane++;
      }
      branchLanes.set(commit.branch, lane);
    } else {
      // No branch name - try to inherit from parent
      const parentNode = commit.parents.length > 0
        ? hashToNode.get(commit.parents[0])
        : undefined;
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

export function CommitGraph({ commits, className }: CommitGraphProps) {
  const { nodes, hashToNode, maxLane } = useMemo(
    () => layoutCommits(commits),
    [commits],
  );

  const graphWidth = GRAPH_PADDING_LEFT + maxLane * LANE_SPACING + 16;
  const totalHeight = ROW_HEIGHT * commits.length + GRAPH_PADDING_TOP;

  // Build edges
  const edges: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];
  for (const node of nodes) {
    for (const parentHash of node.commit.parents) {
      const parent = hashToNode.get(parentHash);
      if (parent) {
        edges.push({
          x1: node.x,
          y1: node.y,
          x2: parent.x,
          y2: parent.y,
          color: node.color,
        });
      }
    }
  }

  return (
    <div className={cx(wrapperStyle, className)}>
      <svg
        width={graphWidth}
        height={totalHeight}
        className={svgStyle}
        aria-hidden="true"
      >
        {/* Edges */}
        {edges.map((e, i) => {
          if (e.x1 === e.x2) {
            // Straight line
            return (
              <line
                key={i}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke={e.color}
                strokeWidth={2}
              />
            );
          }
          // Curved line for cross-lane connections
          const midY = (e.y1 + e.y2) / 2;
          return (
            <path
              key={i}
              d={`M ${e.x1} ${e.y1} C ${e.x1} ${midY}, ${e.x2} ${midY}, ${e.x2} ${e.y2}`}
              stroke={e.color}
              strokeWidth={2}
              fill="none"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <circle
            key={node.commit.hash}
            cx={node.x}
            cy={node.y}
            r={node.commit.parents.length > 1 ? NODE_RADIUS + 1 : NODE_RADIUS}
            fill={node.color}
          />
        ))}
      </svg>

      {/* Commit details */}
      <div className={detailsColumn}>
        {nodes.map((node) => (
          <div
            key={node.commit.hash}
            className={commitRow}
            style={{ height: ROW_HEIGHT }}
          >
            <div className={commitMeta}>
              {node.commit.branch && (
                <span className={branchBadge} style={{ borderColor: node.color }}>
                  {node.commit.branch}
                </span>
              )}
              {node.commit.tags?.map((tag) => (
                <span key={tag} className={tagBadge}>
                  {tag}
                </span>
              ))}
            </div>

            <span className={hashStyle}>{node.commit.shortHash}</span>
            <span className={messageStyle}>{node.commit.message}</span>
            <span className={authorStyle}>{node.commit.author}</span>
            <span className={dateStyle}>{node.commit.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */
const wrapperStyle = css({
  display: "flex",
  overflow: "auto",
  border: "1px solid",
  borderColor: "border.default",
  backgroundColor: "bg.card",
});

const svgStyle = css({
  flexShrink: 0,
});

const detailsColumn = css({
  flex: 1,
  minWidth: 0,
});

const commitRow = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  paddingRight: "16px",
  borderBottom: "1px solid",
  borderColor: "border.subtle",
});

const commitMeta = css({
  display: "flex",
  gap: "4px",
  flexShrink: 0,
});

const branchBadge = css({
  fontSize: "10px",
  fontFamily: "mono",
  padding: "1px 6px",
  border: "1px solid",
  color: "text.primary",
  backgroundColor: "bg.page",
  whiteSpace: "nowrap",
});

const tagBadge = css({
  fontSize: "10px",
  fontFamily: "mono",
  padding: "1px 6px",
  backgroundColor: "rgba(250, 82, 15, 0.1)",
  color: "sunbeam.orange",
  whiteSpace: "nowrap",
});

const hashStyle = css({
  fontSize: "12px",
  fontFamily: "mono",
  color: "sunbeam.orange",
  flexShrink: 0,
  width: "64px",
});

const messageStyle = css({
  fontSize: "13px",
  color: "text.primary",
  flex: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const authorStyle = css({
  fontSize: "12px",
  color: "text.muted",
  flexShrink: 0,
  width: "80px",
  textAlign: "right",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const dateStyle = css({
  fontSize: "11px",
  color: "text.muted",
  flexShrink: 0,
  minWidth: "100px",
  textAlign: "right",
  fontFamily: "mono",
  whiteSpace: "nowrap",
});
