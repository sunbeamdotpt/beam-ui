import { Clipboard } from "./clipboard";

export default function ClipboardStory() {
  return <Clipboard value="git clone https://sunbeam.dev/org/repo.git" />;
}

export function CustomTrigger() {
  return (
    <Clipboard value="npm install beam-ui">
      <button>Copy install command</button>
    </Clipboard>
  );
}

export function LongValue() {
  return <Clipboard value="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAID+PkT3YkMaYgWGbkfXr1z0l7QrEFcHFr1Z0B5gZ sienna@sunbeam.dev" />;
}
