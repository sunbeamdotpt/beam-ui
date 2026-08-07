import { Badge } from "./badge.tsx";

const categories = {
  "Tier / Recognition": [
    "featured",
    "premier",
    "verified",
    "partner",
    "community",
  ] as const,
  "Release Stage": [
    "stable",
    "new",
    "beta",
    "preview",
    "experimental",
    "deprecated",
  ] as const,
  "Work Status": [
    "open",
    "draft",
    "review",
    "approved",
    "merged",
    "closed",
    "revision",
  ] as const,
  Priority: ["critical", "high", "medium", "low"] as const,
  Utility: ["section"] as const,
};

export default function BadgeStory() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {Object.entries(categories).map(([category, variants]) => (
        <div key={category}>
          <p style={{ fontSize: 12, marginBottom: 8, color: "#888" }}>
            {category}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignItems: "center",
            }}
          >
            {variants.map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Tier / Recognition
export function Featured() {
  return <Badge variant="featured">Featured</Badge>;
}
export function Premier() {
  return <Badge variant="premier">Premier</Badge>;
}
export function Verified() {
  return <Badge variant="verified">Verified</Badge>;
}
export function Partner() {
  return <Badge variant="partner">Partner</Badge>;
}
export function Community() {
  return <Badge variant="community">Community</Badge>;
}

// Release Stage
export function Stable() {
  return <Badge variant="stable">Stable</Badge>;
}
export function New() {
  return <Badge variant="new">New</Badge>;
}
export function Beta() {
  return <Badge variant="beta">Beta</Badge>;
}
export function Preview() {
  return <Badge variant="preview">Preview</Badge>;
}
export function Experimental() {
  return <Badge variant="experimental">Experimental</Badge>;
}
export function Deprecated() {
  return <Badge variant="deprecated">Deprecated</Badge>;
}

// Work Status
export function Open() {
  return <Badge variant="open">Open</Badge>;
}
export function Draft() {
  return <Badge variant="draft">Draft</Badge>;
}
export function Review() {
  return <Badge variant="review">Review</Badge>;
}
export function Approved() {
  return <Badge variant="approved">Approved</Badge>;
}
export function Merged() {
  return <Badge variant="merged">Merged</Badge>;
}
export function Closed() {
  return <Badge variant="closed">Closed</Badge>;
}
export function Revision() {
  return <Badge variant="revision">Revision</Badge>;
}

// Priority
export function Critical() {
  return <Badge variant="critical">Critical</Badge>;
}
export function High() {
  return <Badge variant="high">High</Badge>;
}
export function Medium() {
  return <Badge variant="medium">Medium</Badge>;
}
export function Low() {
  return <Badge variant="low">Low</Badge>;
}

// Utility
export function Section() {
  return <Badge variant="section">Section Label</Badge>;
}

// Group exports
export function AllTier() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge variant="featured">Featured</Badge>
      <Badge variant="premier">Premier</Badge>
      <Badge variant="verified">Verified</Badge>
      <Badge variant="partner">Partner</Badge>
      <Badge variant="community">Community</Badge>
    </div>
  );
}

export function AllReleaseStage() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge variant="stable">Stable</Badge>
      <Badge variant="new">New</Badge>
      <Badge variant="beta">Beta</Badge>
      <Badge variant="preview">Preview</Badge>
      <Badge variant="experimental">Experimental</Badge>
      <Badge variant="deprecated">Deprecated</Badge>
    </div>
  );
}

export function AllWorkStatus() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge variant="open">Open</Badge>
      <Badge variant="draft">Draft</Badge>
      <Badge variant="review">Review</Badge>
      <Badge variant="approved">Approved</Badge>
      <Badge variant="merged">Merged</Badge>
      <Badge variant="closed">Closed</Badge>
      <Badge variant="revision">Revision</Badge>
    </div>
  );
}

export function AllPriority() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge variant="critical">Critical</Badge>
      <Badge variant="high">High</Badge>
      <Badge variant="medium">Medium</Badge>
      <Badge variant="low">Low</Badge>
    </div>
  );
}
