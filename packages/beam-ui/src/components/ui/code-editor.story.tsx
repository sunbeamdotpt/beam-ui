import { useState } from "react";
import { CodeEditor } from "./code-editor.tsx";

const initialCode = `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
`;

export default function CodeEditorStory() {
  const [value, setValue] = useState(initialCode);

  return (
    <div style={{ maxWidth: 700 }}>
      <CodeEditor
        value={value}
        onChange={setValue}
        language="typescript"
        height="240px"
        placeholder="Write some code..."
      />
    </div>
  );
}

export function ReadOnly() {
  return (
    <div style={{ maxWidth: 700 }}>
      <CodeEditor
        value={initialCode}
        onChange={() => {}}
        language="typescript"
        readOnly
        height="200px"
      />
    </div>
  );
}

export function NoLineNumbers() {
  return (
    <div style={{ maxWidth: 700 }}>
      <CodeEditor
        value={initialCode}
        onChange={() => {}}
        language="typescript"
        showLineNumbers={false}
        height="200px"
      />
    </div>
  );
}

export function PythonLanguage() {
  const [value, setValue] = useState("def hello():\n    print('Hello, Beam!')\n");
  return (
    <div style={{ maxWidth: 700 }}>
      <CodeEditor value={value} onChange={setValue} language="python" height="160px" />
    </div>
  );
}

export function WithPlaceholder() {
  const [value, setValue] = useState("");
  return (
    <div style={{ maxWidth: 700 }}>
      <CodeEditor
        value={value}
        onChange={setValue}
        placeholder="Start typing your code..."
        height="160px"
      />
    </div>
  );
}
