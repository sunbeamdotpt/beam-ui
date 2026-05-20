import { Card } from "./card.tsx";

export default function CardStory() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 800 }}>
      <Card
        icon="deployed_code"
        title="Repositories"
        description="Host unlimited public and private Git repositories with built-in code search and syntax highlighting."
        ctaLabel="Browse Repos"
        ctaHref="/repos"
      />
      <Card
        icon="groups"
        title="Organizations"
        description="Create teams, manage members, and set granular permissions across all your projects."
        ctaLabel="Manage Orgs"
        ctaHref="/orgs"
      />
    </div>
  );
}

export function SingleCard() {
  return (
    <Card
      icon="insights"
      title="Analytics"
      description="Track contributions, review velocity, and deployment frequency across your organization."
      ctaLabel="View Dashboard"
      ctaHref="/analytics"
    />
  );
}
