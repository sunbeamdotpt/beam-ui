import { SyntaxHighlighter } from "./syntax-highlighter.tsx";

const sampleCode = `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)} type="button">
      Count: {count}
    </button>
  );
}`;

export default function SyntaxHighlighterStory() {
  return (
    <div style={{ maxWidth: 600 }}>
      <SyntaxHighlighter
        code={sampleCode}
        language="tsx"
        showLineNumbers
        highlightLines={[3, 4]}
      />
    </div>
  );
}

export function WithoutLineNumbers() {
  return (
    <div style={{ maxWidth: 600 }}>
      <SyntaxHighlighter code={sampleCode} language="tsx" />
    </div>
  );
}

export function PythonCode() {
  const pyCode =
    `def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)`;
  return (
    <div style={{ maxWidth: 600 }}>
      <SyntaxHighlighter code={pyCode} language="python" showLineNumbers />
    </div>
  );
}

export function WithHighlightedLines() {
  return (
    <div style={{ maxWidth: 600 }}>
      <SyntaxHighlighter
        code={sampleCode}
        language="tsx"
        showLineNumbers
        highlightLines={[1, 2, 3]}
      />
    </div>
  );
}

export function LightTheme() {
  return (
    <div style={{ maxWidth: 600 }}>
      <SyntaxHighlighter code={sampleCode} language="tsx" theme="light" showLineNumbers />
    </div>
  );
}

export function DarkTheme() {
  return (
    <div style={{ maxWidth: 600 }}>
      <SyntaxHighlighter code={sampleCode} language="tsx" theme="dark" showLineNumbers />
    </div>
  );
}
