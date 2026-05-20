import { CapabilityCard } from "./capability-card.tsx";

export default function CapabilityCardStory() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 900 }}>
      <CapabilityCard
        icon="code"
        title="Code Review"
        description="Inline comments, threaded discussions, and approval workflows for every pull request."
      />
      <CapabilityCard
        icon="lock"
        title="Access Control"
        description="Fine-grained permissions at the repository, branch, and tag level with RBAC support."
      />
      <CapabilityCard
        icon="speed"
        title="CI/CD Pipelines"
        description="Built-in continuous integration with parallel runners, caching, and artifact storage."
      />
    </div>
  );
}

export function SingleCard() {
  return <CapabilityCard icon="security" title="Security" description="End-to-end encryption, vulnerability scanning, and audit logs." />;
}
