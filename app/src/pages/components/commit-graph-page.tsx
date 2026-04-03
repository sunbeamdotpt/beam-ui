import { css } from "styled-system/css";
import { CommitGraph } from "@sunbeam/beam-ui/components/ui/commit-graph";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "commits", type: "CommitNode[]", required: true, description: "Array of commit objects in reverse-chronological order. Each has hash, shortHash, message, author, date, parents[], and optional branch/tags." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const SAMPLE_COMMITS = [
  {
    hash: "a1b2c3d4e5f6",
    shortHash: "a1b2c3d",
    message: "Merge branch 'feat/kanban' into main",
    author: "Alice",
    date: "2 hours ago",
    parents: ["b2c3d4e5f6a1", "f1e2d3c4b5a6"],
    branch: "main",
  },
  {
    hash: "b2c3d4e5f6a1",
    shortHash: "b2c3d4e",
    message: "Update CI pipeline config",
    author: "Bob",
    date: "5 hours ago",
    parents: ["c3d4e5f6a1b2"],
    branch: "main",
  },
  {
    hash: "f1e2d3c4b5a6",
    shortHash: "f1e2d3c",
    message: "Add drag overlay ghost style",
    author: "Alice",
    date: "6 hours ago",
    parents: ["e1d2c3b4a5f6"],
    branch: "feat/kanban",
  },
  {
    hash: "e1d2c3b4a5f6",
    shortHash: "e1d2c3b",
    message: "Implement card reordering within columns",
    author: "Alice",
    date: "8 hours ago",
    parents: ["d1c2b3a4f5e6"],
    branch: "feat/kanban",
  },
  {
    hash: "d1c2b3a4f5e6",
    shortHash: "d1c2b3a",
    message: "Scaffold KanbanBoard component",
    author: "Alice",
    date: "1 day ago",
    parents: ["c3d4e5f6a1b2"],
    branch: "feat/kanban",
  },
  {
    hash: "c3d4e5f6a1b2",
    shortHash: "c3d4e5f",
    message: "Release v1.5.0",
    author: "Bob",
    date: "1 day ago",
    parents: ["d4e5f6a1b2c3"],
    branch: "main",
    tags: ["v1.5.0"],
  },
  {
    hash: "d4e5f6a1b2c3",
    shortHash: "d4e5f6a",
    message: "Fix badge contrast in light mode",
    author: "Carol",
    date: "2 days ago",
    parents: ["e5f6a1b2c3d4"],
    branch: "main",
  },
  {
    hash: "e5f6a1b2c3d4",
    shortHash: "e5f6a1b",
    message: "Add stat-bar component",
    author: "Dave",
    date: "2 days ago",
    parents: ["f6a1b2c3d4e5"],
    branch: "main",
  },
  {
    hash: "f6a1b2c3d4e5",
    shortHash: "f6a1b2c",
    message: "Refactor token pipeline for Panda v1.9",
    author: "Bob",
    date: "3 days ago",
    parents: ["a7b8c9d0e1f2"],
    branch: "main",
  },
  {
    hash: "a7b8c9d0e1f2",
    shortHash: "a7b8c9d",
    message: "Add tree-view keyboard navigation",
    author: "Eve",
    date: "4 days ago",
    parents: ["b8c9d0e1f2a7"],
    branch: "main",
  },
  {
    hash: "b8c9d0e1f2a7",
    shortHash: "b8c9d0e",
    message: "Initial commit",
    author: "Alice",
    date: "5 days ago",
    parents: [],
    branch: "main",
  },
];

export function CommitGraphPage() {
  return (
    <ComponentPage
      name="CommitGraph"
      description="An SVG-based visualization of repository commit history as a directed acyclic graph. Shows branches, merges, tags, and commit metadata."
      importPath='import { CommitGraph } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <CommitGraph commits={SAMPLE_COMMITS} />
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}CommitGraph{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> commits = [{"\n"}
              {"  "}{"{"}{"\n"}
              {"    "}hash: <span className={syn.string}>"a1b2c3d4e5f6"</span>,{"\n"}
              {"    "}shortHash: <span className={syn.string}>"a1b2c3d"</span>,{"\n"}
              {"    "}message: <span className={syn.string}>"Merge feat/kanban into main"</span>,{"\n"}
              {"    "}author: <span className={syn.string}>"Alice"</span>,{"\n"}
              {"    "}date: <span className={syn.string}>"2 hours ago"</span>,{"\n"}
              {"    "}parents: [<span className={syn.string}>"b2c3..."</span>, <span className={syn.string}>"f1e2..."</span>],{"\n"}
              {"    "}branch: <span className={syn.string}>"main"</span>,{"\n"}
              {"  "}{"}"},{"\n"}
              {"  "}...{"\n"}
              ]{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>CommitGraph</span> <span className={syn.prop}>commits</span>={"{"}commits{"}"} {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Lane colors</h3>
        <div className={colorRow}>
          {["#fa520f", "#ffb83e", "#ffd06a", "#ff8a00", "#ffa110", "#4a9eff"].map((c) => (
            <div key={c} className={colorSwatch} style={{ backgroundColor: c }} />
          ))}
        </div>
        <p className={variantDesc}>
          Each branch is assigned a lane with a distinct color from the sunbeam palette.
          Merge commits show converging curves between lanes.
        </p>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({
  padding: "16px",
  backgroundColor: "bg.card",
  marginBottom: "32px",
  overflowX: "auto",
});

const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
const variantDesc = css({ fontSize: "14px", color: "text.secondary", lineHeight: 1.7, marginTop: "12px" });

const colorRow = css({
  display: "flex",
  gap: "8px",
});

const colorSwatch = css({
  width: "24px",
  height: "24px",
  border: "1px solid",
  borderColor: "border.default",
});
