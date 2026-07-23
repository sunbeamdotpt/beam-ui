import { Table } from "./table.tsx";

export default function TableStory() {
  return (
    <Table
      caption="Team members"
      columns={[
        { key: "name", label: "Name", sortable: true },
        { key: "role", label: "Role" },
        { key: "status", label: "Status", sortable: true },
      ]}
      rows={[
        { id: "1", name: "Alice Chen", role: "Engineer", status: "Active" },
        { id: "2", name: "Bob Rivera", role: "Designer", status: "Active" },
        { id: "3", name: "Carol Liu", role: "PM", status: "Away" },
      ]}
      selectable
    />
  );
}

export function WithoutSelection() {
  return (
    <Table
      caption="Projects"
      columns={[
        { key: "name", label: "Name", sortable: true },
        { key: "language", label: "Language" },
        { key: "stars", label: "Stars", sortable: true },
      ]}
      rows={[
        { id: "1", name: "beam-ui", language: "TypeScript", stars: 1200 },
        { id: "2", name: "sunbeam-cli", language: "Rust", stars: 850 },
      ]}
    />
  );
}

export function Sortable() {
  return (
    <Table
      columns={[
        { key: "name", label: "Name", sortable: true },
        { key: "size", label: "Size", sortable: true },
      ]}
      rows={[
        { id: "1", name: "index.ts", size: "2.4 KB" },
        { id: "2", name: "button.tsx", size: "4.1 KB" },
        { id: "3", name: "styles.css", size: "1.2 KB" },
      ]}
      onSort={(key, dir) => console.log("Sort:", key, dir)}
    />
  );
}

export function Selectable() {
  return (
    <Table
      caption="Selectable rows"
      selectable
      columns={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
      ]}
      rows={[
        { id: "1", name: "Alice", role: "Engineer" },
        { id: "2", name: "Bob", role: "Designer" },
      ]}
    />
  );
}

export function WithCaption() {
  return (
    <Table
      caption="Accessible table with caption"
      columns={[
        { key: "name", label: "Name" },
        { key: "value", label: "Value" },
      ]}
      rows={[
        { id: "1", name: "CPU", value: "95%" },
        { id: "2", name: "Memory", value: "4.2 GB" },
      ]}
    />
  );
}
