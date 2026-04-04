import { Shell } from "./shell";

export default function ShellStory() {
  return (
    <Shell>
      <div style={{ padding: 48, textAlign: "center" }}>
        <h1>Page Content</h1>
        <p>This is rendered inside the Shell component.</p>
      </div>
    </Shell>
  );
}

export function WithoutThemeToggle() {
  return (
    <Shell showThemeToggle={false}>
      <div style={{ padding: 48, textAlign: "center" }}>
        <p>Shell without theme toggle.</p>
      </div>
    </Shell>
  );
}

export function WithHeaderActions() {
  return (
    <Shell headerActions={<button>Sign In</button>}>
      <div style={{ padding: 48, textAlign: "center" }}>
        <p>Shell with custom header actions.</p>
      </div>
    </Shell>
  );
}
