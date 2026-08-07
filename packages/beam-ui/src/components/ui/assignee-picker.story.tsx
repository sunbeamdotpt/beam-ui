import { useState } from "react";
import { AssigneePicker } from "./assignee-picker.tsx";
import type { UserOption } from "./assignee-picker.tsx";

const users: UserOption[] = [
  { id: "1", username: "sienna", displayName: "Sienna Park" },
  { id: "2", username: "jchen", displayName: "Jordan Chen" },
  { id: "3", username: "amira.k", displayName: "Amira Kapoor" },
  { id: "4", username: "luca", displayName: "Luca Rossi" },
  { id: "5", username: "emilyw", displayName: "Emily Watson" },
];

export default function AssigneePickerStory() {
  const [selected, setSelected] = useState<string[]>(["1"]);

  return (
    <AssigneePicker
      options={users}
      selected={selected}
      onChange={setSelected}
      placeholder="Assign reviewers"
    />
  );
}

export function NoSelection() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <AssigneePicker
      options={users}
      selected={selected}
      onChange={setSelected}
    />
  );
}

export function MultipleSelected() {
  const [selected, setSelected] = useState<string[]>(["1", "2", "3"]);
  return (
    <AssigneePicker
      options={users}
      selected={selected}
      onChange={setSelected}
    />
  );
}
