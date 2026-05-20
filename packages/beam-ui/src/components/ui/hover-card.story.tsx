import { HoverCard } from "./hover-card.tsx";

export default function HoverCardStory() {
  return (
    <div style={{ padding: 80 }}>
      <HoverCard
        trigger={
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            Hover over me
          </span>
        }
      >
        <div>
          <strong>Beam UI</strong>
          <p style={{ margin: "8px 0 0" }}>
            A design system built on warm amber tones and sharp geometry.
          </p>
        </div>
      </HoverCard>
    </div>
  );
}

export function UserProfile() {
  return (
    <div style={{ padding: 80 }}>
      <HoverCard trigger={<span style={{ textDecoration: "underline", cursor: "pointer" }}>@sienna</span>}>
        <div>
          <strong>Sienna Park</strong>
          <p style={{ margin: "4px 0 0", fontSize: 13, opacity: 0.7 }}>Full-stack engineer working on Beam UI</p>
        </div>
      </HoverCard>
    </div>
  );
}
