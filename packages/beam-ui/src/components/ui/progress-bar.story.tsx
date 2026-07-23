import { ProgressBar } from "./progress-bar.tsx";

export default function ProgressBarStory() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
      <ProgressBar value={65} showLabel />
      <ProgressBar value={100} variant="success" showLabel />
      <ProgressBar value={30} variant="error" showLabel />
      <ProgressBar value={45} size="sm" />
    </div>
  );
}

export function Default() {
  return <ProgressBar value={50} showLabel />;
}
export function Success() {
  return <ProgressBar value={100} variant="success" showLabel />;
}
export function Error() {
  return <ProgressBar value={25} variant="error" showLabel />;
}
export function SmallSize() {
  return <ProgressBar value={60} size="sm" />;
}
export function MediumSize() {
  return <ProgressBar value={60} size="md" showLabel />;
}
export function SmallDefault() {
  return <ProgressBar value={50} size="sm" variant="default" />;
}
export function SmallSuccess() {
  return <ProgressBar value={100} size="sm" variant="success" />;
}
export function SmallError() {
  return <ProgressBar value={25} size="sm" variant="error" />;
}
export function MediumDefault() {
  return <ProgressBar value={50} size="md" variant="default" showLabel />;
}
export function MediumSuccess() {
  return <ProgressBar value={100} size="md" variant="success" showLabel />;
}
export function MediumError() {
  return <ProgressBar value={25} size="md" variant="error" showLabel />;
}
export function WithoutLabel() {
  return <ProgressBar value={75} />;
}
export function Empty() {
  return <ProgressBar value={0} showLabel />;
}
export function Full() {
  return <ProgressBar value={100} showLabel />;
}
