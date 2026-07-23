import { MarkdownRenderer } from "./markdown-renderer.tsx";

const sample = `# Beam Design System

A **warm**, structured design language built for developer tools.

## Features

- Sharp geometry with zero border-radius
- Amber-toned accent palette
- Monospace code blocks with \`Monaspace Argon\`

> Design is not just what it looks like. Design is how it works.

| Component   | Status   |
| ----------- | -------- |
| Button      | Stable   |
| HoverCard   | Stable   |
| KanbanBoard | Beta     |

\`\`\`ts
export function greet(name: string) {
  return \`Hello, \${name}!\`;
}
\`\`\`

---

Inline math: $E = mc^2$

Block math:

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$
`;

export default function MarkdownRendererStory() {
  return (
    <div style={{ maxWidth: 640 }}>
      <MarkdownRenderer content={sample} />
    </div>
  );
}

export function SimpleText() {
  return <MarkdownRenderer content="Just a **bold** word and some `inline code`." />;
}

export function CodeOnly() {
  return (
    <div style={{ maxWidth: 640 }}>
      <MarkdownRenderer content="```ts
const x = 42;
console.log(x);
```" />
    </div>
  );
}

export function TableContent() {
  return (
    <div style={{ maxWidth: 640 }}>
      <MarkdownRenderer content="| Name | Role |
|------|------|
| Alice | Engineer |
| Bob | Designer |" />
    </div>
  );
}
