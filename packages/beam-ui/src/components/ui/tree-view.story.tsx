import { type TreeNode, TreeView } from "./tree-view.tsx";

const nodes: TreeNode[] = [
  {
    id: "src",
    label: "src",
    icon: "folder",
    children: [
      {
        id: "components",
        label: "components",
        icon: "folder",
        children: [
          { id: "button", label: "button.tsx", icon: "description" },
          { id: "input", label: "input.tsx", icon: "description" },
        ],
      },
      { id: "index", label: "index.ts", icon: "description" },
    ],
  },
  { id: "readme", label: "README.md", icon: "description" },
];

export default function TreeViewStory() {
  return <TreeView nodes={nodes} activeId="button" />;
}

export function FlatNodes() {
  const flat: TreeNode[] = [
    { id: "a", label: "README.md", icon: "description" },
    { id: "b", label: "package.json", icon: "description" },
    { id: "c", label: "tsconfig.json", icon: "description" },
  ];
  return <TreeView nodes={flat} />;
}

export function DeepNesting() {
  const deep: TreeNode[] = [
    {
      id: "a",
      label: "Level 1",
      icon: "folder",
      children: [
        {
          id: "b",
          label: "Level 2",
          icon: "folder",
          children: [
            {
              id: "c",
              label: "Level 3",
              icon: "folder",
              children: [{
                id: "d",
                label: "deep-file.ts",
                icon: "description",
              }],
            },
          ],
        },
      ],
    },
  ];
  return <TreeView nodes={deep} activeId="d" />;
}
