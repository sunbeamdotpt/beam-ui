import { Skeleton } from "./skeleton.tsx";

export default function SkeletonStory() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Skeleton variant="text" count={3} />
      <Skeleton variant="circle" width="48px" />
      <Skeleton variant="rect" width="200px" height="120px" />
    </div>
  );
}

export function TextVariant() {
  return <Skeleton variant="text" count={3} />;
}
export function CircleVariant() {
  return <Skeleton variant="circle" width="48px" />;
}
export function RectVariant() {
  return <Skeleton variant="rect" width="200px" height="120px" />;
}
export function SingleLine() {
  return <Skeleton variant="text" />;
}
export function LargeCircle() {
  return <Skeleton variant="circle" width="96px" />;
}
