import { Icon } from "./icon";

const icons = [
  "home", "search", "settings", "notifications", "favorite",
  "delete", "edit", "visibility", "cloud_upload", "folder",
  "description", "check_circle", "warning", "info", "star",
  "person", "group", "mail", "schedule", "lock",
  "download", "share", "code", "bug_report", "merge",
];

export default function IconStory() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 80px)",
        gap: 16,
        textAlign: "center",
      }}
    >
      {icons.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Icon name={name} size={28} />
          <span style={{ fontSize: 10, opacity: 0.6 }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

export function Filled() { return <Icon name="favorite" size={28} filled />; }
export function WithLabel() { return <Icon name="warning" size={28} label="Warning icon" />; }
export function Large() { return <Icon name="home" size={48} />; }
export function Small() { return <Icon name="settings" size={16} />; }
export function CustomSize() { return <Icon name="code" size="2rem" />; }
