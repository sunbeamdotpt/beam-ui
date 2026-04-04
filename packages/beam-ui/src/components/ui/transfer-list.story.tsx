import { useState } from "react";
import { TransferList, type TransferItem } from "./transfer-list";

const initialAvailable: TransferItem[] = [
  { id: "1", label: "TypeScript", icon: "code" },
  { id: "2", label: "Rust", icon: "memory" },
  { id: "3", label: "Go", icon: "terminal" },
  { id: "4", label: "Python", icon: "data_object" },
];

const initialSelected: TransferItem[] = [
  { id: "5", label: "JavaScript", icon: "code" },
];

export default function TransferListStory() {
  const [available, setAvailable] = useState(initialAvailable);
  const [selected, setSelected] = useState(initialSelected);

  return (
    <TransferList
      available={available}
      selected={selected}
      onChange={(a, s) => { setAvailable(a); setSelected(s); }}
      availableTitle="Languages"
      selectedTitle="Selected"
    />
  );
}

export function EmptySelected() {
  const [available, setAvailable] = useState(initialAvailable);
  const [selected, setSelected] = useState<TransferItem[]>([]);
  return (
    <TransferList
      available={available}
      selected={selected}
      onChange={(a, s) => { setAvailable(a); setSelected(s); }}
    />
  );
}

export function AllSelected() {
  const [available, setAvailable] = useState<TransferItem[]>([]);
  const [selected, setSelected] = useState([...initialAvailable, ...initialSelected]);
  return (
    <TransferList
      available={available}
      selected={selected}
      onChange={(a, s) => { setAvailable(a); setSelected(s); }}
    />
  );
}
