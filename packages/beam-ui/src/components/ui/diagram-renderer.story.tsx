import { DiagramRenderer } from "./diagram-renderer.tsx";

const mermaidCode = `graph TD
    A[Push to main] --> B{CI Passes?}
    B -- Yes --> C[Deploy to staging]
    B -- No --> D[Notify author]
    C --> E{Tests pass?}
    E -- Yes --> F[Promote to prod]
    E -- No --> D`;

export default function DiagramRendererStory() {
  return (
    <div style={{ maxWidth: 700 }}>
      <DiagramRenderer code={mermaidCode} />
    </div>
  );
}

export function SequenceDiagram() {
  const code = `sequenceDiagram
    Client->>Server: POST /api/login
    Server->>DB: Validate credentials
    DB-->>Server: User record
    Server-->>Client: JWT token`;
  return (
    <div style={{ maxWidth: 700 }}>
      <DiagramRenderer code={code} />
    </div>
  );
}

export function PieChart() {
  const code = `pie title Language Usage
    "TypeScript" : 45
    "Rust" : 25
    "Go" : 20
    "Python" : 10`;
  return (
    <div style={{ maxWidth: 500 }}>
      <DiagramRenderer code={code} />
    </div>
  );
}
