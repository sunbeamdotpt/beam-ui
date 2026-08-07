import { BentoItem } from "./bento-item.tsx";

export default function BentoItemStory() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 16,
        maxWidth: 800,
      }}
    >
      <BentoItem
        variant="large"
        title="Build a Git Server from Scratch"
        description="Learn how to implement the Git protocol, manage pack files, and serve repositories over HTTP."
        difficulty="Advanced"
        category="Infrastructure"
      />
      <BentoItem
        variant="small"
        title="SSH Key Management"
        description="Set up and manage SSH keys for secure repository access."
        difficulty="Beginner"
        category="Security"
      />
      <BentoItem
        variant="horizontal"
        title="CI/CD Pipeline Cookbook"
        description="End-to-end recipes for setting up continuous integration and deployment pipelines with webhooks."
        difficulty="Intermediate"
        category="DevOps"
      />
    </div>
  );
}

export function LargeVariant() {
  return (
    <BentoItem
      variant="large"
      title="Featured Guide"
      description="A large hero-style card for featured content."
      difficulty="Advanced"
      category="Featured"
    />
  );
}

export function HorizontalVariant() {
  return (
    <BentoItem
      variant="horizontal"
      title="Horizontal Card"
      description="A side-by-side layout for medium-priority content."
      difficulty="Intermediate"
      category="Tutorial"
    />
  );
}

export function SmallVariant() {
  return (
    <BentoItem
      variant="small"
      title="Quick Tip"
      description="A compact card for smaller items."
      difficulty="Beginner"
      category="Tip"
    />
  );
}
