import { Avatar } from "./avatar.tsx";

export default function AvatarStory() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Avatar name="Sienna Park" size="sm" />
      <Avatar name="Jordan Chen" size="md" />
      <Avatar name="Amira Kapoor" size="lg" />
      <Avatar name="Luca Rossi" size="md" src="https://i.pravatar.cc/80?u=luca" />
    </div>
  );
}

export function Small() {
  return <Avatar name="Sienna Park" size="sm" />;
}
export function Medium() {
  return <Avatar name="Jordan Chen" size="md" />;
}
export function Large() {
  return <Avatar name="Amira Kapoor" size="lg" />;
}
export function WithImage() {
  return <Avatar name="Luca Rossi" size="md" src="https://i.pravatar.cc/80?u=luca" />;
}
export function SmallWithImage() {
  return <Avatar name="Luca Rossi" size="sm" src="https://i.pravatar.cc/64?u=luca" />;
}
export function LargeWithImage() {
  return <Avatar name="Luca Rossi" size="lg" src="https://i.pravatar.cc/112?u=luca" />;
}
export function SingleName() {
  return <Avatar name="Sienna" size="md" />;
}
