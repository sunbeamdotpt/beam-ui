import { useState } from "react";
import { css } from "styled-system/css";
import { TreeView } from "@sunbeam/beam-ui/components/ui/tree-view";
import type { TreeNode } from "@sunbeam/beam-ui/components/ui/tree-view";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "nodes", type: "TreeNode[]", required: true, description: "Hierarchical array of tree nodes. Each node has id, label, optional icon, and optional children." },
  { name: "activeId", type: "string", required: false, description: "The id of the currently active (highlighted) node." },
  { name: "onNodeClick", type: "() => void", required: false, description: "Set via onClick on individual TreeNode objects to handle click events." },
];

function buildNodes(onNodeClick: (id: string) => void): TreeNode[] {
  return [
    {
      id: "bucket",
      label: "sunbeam-assets",
      icon: "cloud",
      children: [
        {
          id: "images",
          label: "images",
          icon: "folder",
          children: [
            {
              id: "thumbnails",
              label: "thumbnails",
              icon: "folder",
              children: [
                { id: "thumb-001.jpg", label: "thumb-001.jpg", icon: "image", onClick: () => onNodeClick("thumb-001.jpg") },
                { id: "thumb-002.jpg", label: "thumb-002.jpg", icon: "image", onClick: () => onNodeClick("thumb-002.jpg") },
              ],
            },
            { id: "hero-banner.png", label: "hero-banner.png", icon: "image", onClick: () => onNodeClick("hero-banner.png") },
            { id: "logo.svg", label: "logo.svg", icon: "image", onClick: () => onNodeClick("logo.svg") },
          ],
        },
        {
          id: "documents",
          label: "documents",
          icon: "folder",
          children: [
            {
              id: "reports",
              label: "reports",
              icon: "folder",
              children: [
                { id: "q1-2026.pdf", label: "q1-2026.pdf", icon: "description", onClick: () => onNodeClick("q1-2026.pdf") },
                { id: "q2-2026.pdf", label: "q2-2026.pdf", icon: "description", onClick: () => onNodeClick("q2-2026.pdf") },
              ],
            },
            { id: "readme.md", label: "readme.md", icon: "description", onClick: () => onNodeClick("readme.md") },
          ],
        },
        { id: "config.json", label: "config.json", icon: "settings", onClick: () => onNodeClick("config.json") },
      ],
    },
  ];
}

export function TreeViewPage() {
  const [activeId, setActiveId] = useState<string>("q1-2026.pdf");
  const nodes = buildNodes(setActiveId);

  return (
    <ComponentPage
      name="TreeView"
      description="A collapsible tree component for displaying hierarchical data such as file systems and bucket structures. Folders expand and collapse; leaf nodes are clickable."
      importPath='import { TreeView } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <TreeView nodes={nodes} activeId={activeId} />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}TreeView{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              <span className={syn.keyword}>import</span> <span className={syn.keyword}>type</span> {"{ "}TreeNode{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> nodes: TreeNode[] = [{"\n"}
              {"  "}{"{"}{"\n"}
              {"    "}<span className={syn.prop}>id</span>: <span className={syn.string}>"bucket"</span>,{"\n"}
              {"    "}<span className={syn.prop}>label</span>: <span className={syn.string}>"my-bucket"</span>,{"\n"}
              {"    "}<span className={syn.prop}>icon</span>: <span className={syn.string}>"cloud"</span>,{"\n"}
              {"    "}<span className={syn.prop}>children</span>: [{"\n"}
              {"      "}{"{ "}<span className={syn.prop}>id</span>: <span className={syn.string}>"file-1"</span>, <span className={syn.prop}>label</span>: <span className={syn.string}>"readme.md"</span>, <span className={syn.prop}>onClick</span>: () {"=> "}setActive(<span className={syn.string}>"file-1"</span>) {"},"}{"\n"}
              {"    "}],{"\n"}
              {"  "}{"}"},{"\n"}
              {"]"}{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>TreeView</span> <span className={syn.prop}>nodes</span>={"{"}nodes{"}"} <span className={syn.prop}>activeId</span>={"{"}activeId{"}"} {"/>"}{"\n"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      <p className={noteText}>
        The TreeView component uses a single visual style. Customize the tree structure through the nodes prop, using different icon names for folders, files, and other item types.
      </p>
    </ComponentPage>
  );
}

const previewBox = css({
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "32px",
  border: "1px solid",
  borderColor: "border.default",
});

const noteText = css({
  fontSize: "14px",
  color: "text.secondary",
  lineHeight: 1.6,
});
