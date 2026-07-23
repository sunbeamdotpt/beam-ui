import { ContextMenu } from "./context-menu.tsx";

export default function ContextMenuStory() {
  return (
    <ContextMenu
      items={[
        { label: "Open", icon: "open_in_new", onClick: () => {} },
        { label: "Edit", icon: "edit", onClick: () => {} },
        { label: "Copy link", icon: "link", onClick: () => {} },
        { label: "Delete", icon: "delete", onClick: () => {}, danger: true, divider: true },
      ]}
    >
      <div
        style={{
          padding: "40px 60px",
          border: "1px dashed #ccc",
          textAlign: "center",
          cursor: "context-menu",
          fontSize: 14,
          color: "#888",
        }}
      >
        Right-click this area
      </div>
    </ContextMenu>
  );
}

export function SimpleMenu() {
  return (
    <ContextMenu
      items={[{ label: "Copy", onClick: () => {} }, { label: "Paste", onClick: () => {} }]}
    >
      <div
        style={{
          padding: "40px 60px",
          border: "1px dashed #ccc",
          textAlign: "center",
          cursor: "context-menu",
          fontSize: 14,
          color: "#888",
        }}
      >
        Simple context menu
      </div>
    </ContextMenu>
  );
}

export function WithDangerItem() {
  return (
    <ContextMenu items={[{ label: "Remove", icon: "delete", onClick: () => {}, danger: true }]}>
      <div
        style={{
          padding: "40px 60px",
          border: "1px dashed #ccc",
          textAlign: "center",
          cursor: "context-menu",
          fontSize: 14,
          color: "#888",
        }}
      >
        Danger item only
      </div>
    </ContextMenu>
  );
}
