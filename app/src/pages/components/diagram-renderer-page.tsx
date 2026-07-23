import { css } from "styled-system/css";
import { DiagramRenderer } from "@sunbeam/beam-ui/diagram";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "code", type: "string", required: true, description: "Mermaid diagram code to render." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const FLOWCHART = `graph TD
    A[Start] -->|Request| B{Auth Check}
    B -->|Authenticated| C[Load Data]
    B -->|Unauthorized| D[Redirect to Login]
    C --> E[Render Page]
    D --> F[Login Form]
    F -->|Success| B`;

const SEQUENCE = `sequenceDiagram
    participant Client
    participant API
    participant DB
    Client->>API: POST /chat/completions
    API->>DB: Fetch model config
    DB-->>API: Config response
    API->>API: Process request
    API-->>Client: Stream response`;

const CLASS_DIAGRAM = `classDiagram
    class Component {
        +string name
        +Props props
        +render() ReactNode
    }
    class Button {
        +string variant
        +string size
        +onClick() void
    }
    class Card {
        +string title
        +ReactNode children
    }
    Component <|-- Button
    Component <|-- Card`;

export function DiagramRendererPage() {
  return (
    <ComponentPage
      name="DiagramRenderer"
      description="Client-side Mermaid diagram renderer with dark/light theme support. Renders flowcharts, sequence diagrams, class diagrams, and more."
      importPath='import { DiagramRenderer } from "@sunbeam/beam-ui/diagram"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>

      <h3 className={variantLabel}>Flowchart</h3>
      <div className={previewArea}>
        <DiagramRenderer code={FLOWCHART} />
      </div>

      <h3 className={variantLabel}>Sequence Diagram</h3>
      <div className={previewArea}>
        <DiagramRenderer code={SEQUENCE} />
      </div>

      <h3 className={variantLabel}>Class Diagram</h3>
      <div className={previewArea}>
        <DiagramRenderer code={CLASS_DIAGRAM} />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <p className={bodyText}>
        Pass any valid Mermaid syntax string to the <code className={inlineCode}>code</code> prop. The diagram will re-render automatically when the code or theme changes. If the code is invalid, the raw source is displayed with a warning border.
      </p>

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <h3 className={variantLabel}>Error State</h3>
      <div className={previewArea}>
        <DiagramRenderer code={"invalid mermaid code %%% {{{"} />
      </div>
      <p className={bodyText}>
        When Mermaid fails to parse, the raw code is shown in a monospace pre with an orange left border indicating the error state.
      </p>
    </ComponentPage>
  );
}

const previewArea = css({
  marginBottom: "32px",
});

const bodyText = css({
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
});

const inlineCode = css({
  backgroundColor: "bg.card",
  padding: "2px 8px",
  fontFamily: "mono",
  fontSize: "13px",
  color: "text.primary",
  fontWeight: "heading",
  border: "1px solid",
  borderColor: "border.default",
});

const variantLabel = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "12px",
  marginTop: "32px",
});
