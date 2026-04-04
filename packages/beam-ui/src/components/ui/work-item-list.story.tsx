// @storyName WorkItemList
import { useState } from "react";
import { WorkItemList, type WorkItemRow } from "./work-item-list";
import { Icon } from "./icon";

const items: WorkItemRow[] = [
  {
    id: "101",
    icon: <Icon name="radio_button_unchecked" size={18} />,
    title: "Add dark mode support to dashboard",
    labels: [
      { name: "enhancement", color: "#7c3aed" },
      { name: "ui", color: "#2563eb" },
    ],
    meta: "#101 opened 2 days ago by alice",
    branches: { base: "main", head: "feat/dark-mode" },
    commentCount: 4,
  },
  {
    id: "98",
    icon: <Icon name="check_circle" size={18} />,
    title: "Fix pagination off-by-one error",
    labels: [{ name: "bug", color: "#dc2626" }],
    meta: "#98 opened 5 days ago by bob",
    commentCount: 1,
  },
  {
    id: "95",
    icon: <Icon name="radio_button_unchecked" size={18} />,
    title: "Migrate build pipeline to Vite",
    meta: "#95 opened 1 week ago by carol",
    branches: { base: "main", head: "chore/vite-migration" },
    commentCount: 7,
  },
];

export default function WorkItemListStory() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  return (
    <WorkItemList
      items={items}
      selectable
      selected={selected}
      onSelect={setSelected}
    />
  );
}

export function WithoutSelection() {
  return <WorkItemList items={items} />;
}

export function EmptyList() {
  return <WorkItemList items={[]} />;
}

export function SingleItem() {
  return <WorkItemList items={[items[0]]} />;
}

export function Selectable() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  return <WorkItemList items={items} selectable selected={selected} onSelect={setSelected} />;
}

export function WithLoadMore() {
  return <WorkItemList items={items} onLoadMore={() => console.log("Load more")} />;
}
