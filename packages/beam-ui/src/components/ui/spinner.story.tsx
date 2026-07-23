import { Spinner } from "./spinner.tsx";

export default function SpinnerStory() {
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
      <Spinner size="sm" label="Small" />
      <Spinner size="md" label="Medium" accent />
      <Spinner size="lg" label="Large" accent />
    </div>
  );
}

export function Small() {
  return <Spinner size="sm" />;
}
export function Medium() {
  return <Spinner size="md" />;
}
export function Large() {
  return <Spinner size="lg" />;
}
export function Accent() {
  return <Spinner size="md" accent />;
}
export function WithLabel() {
  return <Spinner size="md" label="Loading..." accent />;
}
export function CustomColor() {
  return <Spinner size="md" color="#6366f1" label="Custom" />;
}
