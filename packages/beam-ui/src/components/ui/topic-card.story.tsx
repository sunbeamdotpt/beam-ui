import { TopicCard } from "./topic-card";

export default function TopicCardStory() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
      <TopicCard
        title="Getting Started"
        icon="rocket_launch"
        description="Learn how to set up your project and install Beam UI."
        href="/guides"
      />
      <TopicCard
        title="Components"
        icon="widgets"
        description="Browse the full library of UI components available in Beam."
        href="/components"
      />
    </div>
  );
}

export function SingleCard() {
  return <TopicCard title="API Reference" icon="api" description="Explore the full API documentation for all endpoints." href="/api" />;
}

export function WithoutHref() {
  return <TopicCard title="Coming Soon" icon="schedule" description="This section is under construction." />;
}
