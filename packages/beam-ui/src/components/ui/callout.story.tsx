import { Callout } from "./callout.tsx";

export default function CalloutStory() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 600,
      }}
    >
      <Callout variant="tip">
        Use keyboard shortcuts to navigate the diff viewer. Press <strong>j</strong> and{" "}
        <strong>k</strong> to move between hunks.
      </Callout>
      <Callout variant="warning">
        Force-pushing to a shared branch will overwrite remote history. Coordinate with your team
        before proceeding.
      </Callout>
      <Callout variant="info">
        Repository mirroring runs every 15 minutes. Changes may take up to one cycle to appear on
        the mirror.
      </Callout>
    </div>
  );
}

export function Tip() {
  return <Callout variant="tip">This is a pro tip callout.</Callout>;
}
export function Warning() {
  return <Callout variant="warning">This is a warning callout.</Callout>;
}
export function Info() {
  return <Callout variant="info">This is an info callout.</Callout>;
}
