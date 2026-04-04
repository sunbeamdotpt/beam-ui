import { useState } from "react";
import { TagsInput } from "./tags-input";

export default function TagsInputStory() {
  const [tags, setTags] = useState(["react", "typescript"]);

  return (
    <div style={{ maxWidth: 400 }}>
      <TagsInput value={tags} onChange={setTags} label="Tags" max={5} />
    </div>
  );
}

export function Empty() {
  const [tags, setTags] = useState<string[]>([]);
  return <div style={{ maxWidth: 400 }}><TagsInput value={tags} onChange={setTags} placeholder="Add tags..." /></div>;
}

export function WithMax() {
  const [tags, setTags] = useState(["a", "b", "c"]);
  return <div style={{ maxWidth: 400 }}><TagsInput value={tags} onChange={setTags} label="Max 3" max={3} /></div>;
}

export function WithoutLabel() {
  const [tags, setTags] = useState(["react"]);
  return <div style={{ maxWidth: 400 }}><TagsInput value={tags} onChange={setTags} /></div>;
}
