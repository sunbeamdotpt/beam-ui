import { useState } from "react";
import { type FileItem, FileList } from "./file-list.tsx";

const items: FileItem[] = [
  { id: "1", name: "src", type: "folder", modified: "Apr 1, 2026" },
  {
    id: "2",
    name: "package.json",
    type: "file",
    size: "1.2 KB",
    modified: "Mar 28, 2026",
  },
  {
    id: "3",
    name: "tsconfig.json",
    type: "file",
    size: "420 B",
    modified: "Mar 15, 2026",
  },
  {
    id: "4",
    name: "README.md",
    type: "file",
    size: "3.4 KB",
    modified: "Feb 20, 2026",
  },
  { id: "5", name: "assets", type: "folder", modified: "Jan 10, 2026" },
];

export default function FileListStory() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  return (
    <div style={{ maxWidth: 700 }}>
      <FileList
        items={items}
        selected={selected}
        onSelect={setSelected}
        onOpen={(item) => alert(`Opened ${item.name}`)}
        font="mono"
      />
    </div>
  );
}

export function GridLayout() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  return (
    <div style={{ maxWidth: 700 }}>
      <FileList
        items={items}
        selected={selected}
        onSelect={setSelected}
        layout="grid"
      />
    </div>
  );
}

export function BodyFont() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  return (
    <div style={{ maxWidth: 700 }}>
      <FileList
        items={items}
        selected={selected}
        onSelect={setSelected}
        font="body"
      />
    </div>
  );
}

export function ListLayout() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  return (
    <div style={{ maxWidth: 700 }}>
      <FileList
        items={items}
        selected={selected}
        onSelect={setSelected}
        layout="list"
      />
    </div>
  );
}

export function MonoFont() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  return (
    <div style={{ maxWidth: 700 }}>
      <FileList
        items={items}
        selected={selected}
        onSelect={setSelected}
        font="mono"
      />
    </div>
  );
}

export function GridMonoFont() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  return (
    <div style={{ maxWidth: 700 }}>
      <FileList
        items={items}
        selected={selected}
        onSelect={setSelected}
        layout="grid"
        font="mono"
      />
    </div>
  );
}

export function EmptyList() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  return (
    <div style={{ maxWidth: 700 }}>
      <FileList items={[]} selected={selected} onSelect={setSelected} />
    </div>
  );
}
