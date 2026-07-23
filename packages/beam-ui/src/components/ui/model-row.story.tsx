import { ModelRow } from "./model-row.tsx";

export default function ModelRowStory() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <ModelRow
        name="Sunbeam Pro"
        icon="auto_awesome"
        tier="pro"
        version="v4.2.0"
        description="High-performance model for complex reasoning tasks"
      />
      <ModelRow
        name="Sunbeam Lite"
        icon="bolt"
        tier="free"
        version="v3.1.0"
        description="Fast, lightweight model for everyday use"
      />
      <ModelRow
        name="Sunbeam Vision"
        icon="visibility"
        tier="enterprise"
        version="v1.0.0"
        description="Multimodal model with image understanding"
      />
    </div>
  );
}

export function SingleRow() {
  return (
    <ModelRow
      name="Sunbeam Pro"
      icon="auto_awesome"
      tier="pro"
      version="v4.2.0"
      description="High-performance model for complex reasoning tasks"
    />
  );
}
