import { useState } from "react";
import { BranchSelector } from "./branch-selector.tsx";

const branches = [
  "main",
  "develop",
  "feature/auth-flow",
  "fix/header-layout",
  "release/v2.1",
];
const tags = ["v2.0.0", "v1.9.3", "v1.9.2", "v1.0.0"];

export default function BranchSelectorStory() {
  const [current, setCurrent] = useState("main");

  return (
    <BranchSelector
      branches={branches}
      tags={tags}
      current={current}
      defaultBranch="main"
      onChange={setCurrent}
      onCreateBranch={(name) => console.log("Create branch:", name)}
    />
  );
}

export function OnTag() {
  const [current, setCurrent] = useState("v2.0.0");
  return (
    <BranchSelector
      branches={branches}
      tags={tags}
      current={current}
      defaultBranch="main"
      onChange={setCurrent}
    />
  );
}

export function WithoutCreateBranch() {
  const [current, setCurrent] = useState("main");
  return (
    <BranchSelector
      branches={branches}
      tags={tags}
      current={current}
      defaultBranch="main"
      onChange={setCurrent}
    />
  );
}
