import { useState } from "react";
import { MarkdownEditor } from "./markdown-editor.tsx";

const initial = `## Welcome

This is a **markdown editor** with a live preview tab.

- Bold, italic, and code formatting
- Links and images
- Tables and task lists

\`\`\`ts
const greeting = "Hello, Beam!";
\`\`\`
`;

export default function MarkdownEditorStory() {
  const [value, setValue] = useState(initial);

  return (
    <div style={{ maxWidth: 640 }}>
      <MarkdownEditor value={value} onChange={setValue} minHeight="260px" />
    </div>
  );
}

export function Empty() {
  const [value, setValue] = useState("");
  return <div style={{ maxWidth: 640 }}><MarkdownEditor value={value} onChange={setValue} placeholder="Write something..." /></div>;
}

export function TallEditor() {
  const [value, setValue] = useState(initial);
  return <div style={{ maxWidth: 640 }}><MarkdownEditor value={value} onChange={setValue} minHeight="400px" /></div>;
}
