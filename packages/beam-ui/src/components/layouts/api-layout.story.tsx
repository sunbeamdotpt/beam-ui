import { ApiLayout, apiLeftPanel, apiRightPanel } from "./api-layout.tsx";

export default function ApiLayoutStory() {
  return (
    <ApiLayout currentPath="/api/chat">
      <div className={apiLeftPanel}>
        <h1>API Reference</h1>
        <p>Prose content goes here.</p>
      </div>
      <div className={apiRightPanel}>
        <pre>Code examples go here.</pre>
      </div>
    </ApiLayout>
  );
}

export function Standalone() {
  return (
    <ApiLayout currentPath="/api/chat">
      <div className={apiLeftPanel}>
        <h1>API Reference</h1>
        <p>Prose content goes here.</p>
      </div>
      <div className={apiRightPanel}>
        <pre>Code examples go here.</pre>
      </div>
    </ApiLayout>
  );
}
