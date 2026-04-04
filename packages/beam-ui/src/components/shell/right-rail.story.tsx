import { RightRail } from "./right-rail";

export default function RightRailStory() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <RightRail
        items={[
          { label: "Overview", id: "overview" },
          { label: "Installation", id: "installation" },
          { label: "Usage", id: "usage" },
          { label: "API Reference", id: "api" },
        ]}
        lastUpdated="March 28, 2026"
      />
    </div>
  );
}

export function FewItems() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <RightRail items={[{ label: "Overview", id: "overview" }]} lastUpdated="April 1, 2026" />
    </div>
  );
}

export function ManyItems() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <RightRail
        items={Array.from({ length: 10 }, (_, i) => ({ label: `Section ${i + 1}`, id: `s${i}` }))}
        lastUpdated="April 3, 2026"
      />
    </div>
  );
}
