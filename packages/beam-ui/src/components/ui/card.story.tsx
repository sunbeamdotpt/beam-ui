import { css } from "../../system.ts";

import { Card } from "./card.tsx";

export default function CardStory() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 24,
        maxWidth: 800,
      }}
    >
      <Card
        icon="code"
        title="With CTA"
        description="Structured content card with an internal call-to-action link."
        action={{ label: "Explore", href: "/" }}
      />
      <Card
        icon="palette"
        title="Outlined link"
        description="Whole-card link using the outlined surface variant."
        href="/"
        variant="outlined"
      />
    </div>
  );
}

export function GenericContainer() {
  return (
    <Card>
      <h3
        className={css({
          fontSize: "20px",
          fontWeight: "heading",
          marginBottom: "8px",
        })}
      >
        Generic container
      </h3>
      <p className={css({ color: "text.secondary" })}>
        Compose any content inside the Card surface.
      </p>
    </Card>
  );
}

export function StaticOutlined() {
  return (
    <Card
      icon="shield"
      title="Static outlined"
      description="A static content card with the bordered surface style."
      variant="outlined"
    />
  );
}
