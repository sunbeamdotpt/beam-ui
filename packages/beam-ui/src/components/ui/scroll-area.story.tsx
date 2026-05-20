import { ScrollArea } from "./scroll-area.tsx";

export default function ScrollAreaStory() {
  return (
    <ScrollArea maxHeight="200px">
      <div style={{ padding: 16 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ margin: "8px 0" }}>
            Scrollable item {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  );
}

export function HoverScrollbar() {
  return (
    <ScrollArea maxHeight="200px" scrollbar="hover">
      <div style={{ padding: 16 }}>
        {Array.from({ length: 20 }, (_, i) => <p key={i} style={{ margin: "8px 0" }}>Hover scrollbar item {i + 1}</p>)}
      </div>
    </ScrollArea>
  );
}

export function Horizontal() {
  return (
    <ScrollArea direction="horizontal">
      <div style={{ display: "flex", gap: 16, padding: 16, width: "1200px" }}>
        {Array.from({ length: 20 }, (_, i) => <div key={i} style={{ minWidth: 100, padding: 16, border: "1px solid #ccc" }}>Item {i + 1}</div>)}
      </div>
    </ScrollArea>
  );
}

export function AutoScrollbar() {
  return (
    <ScrollArea maxHeight="200px" scrollbar="auto">
      <div style={{ padding: 16 }}>
        {Array.from({ length: 20 }, (_, i) => <p key={i} style={{ margin: "8px 0" }}>Auto scrollbar item {i + 1}</p>)}
      </div>
    </ScrollArea>
  );
}

export function VisibleScrollbar() {
  return (
    <ScrollArea maxHeight="200px" scrollbar="visible">
      <div style={{ padding: 16 }}>
        {Array.from({ length: 20 }, (_, i) => <p key={i} style={{ margin: "8px 0" }}>Visible scrollbar item {i + 1}</p>)}
      </div>
    </ScrollArea>
  );
}

export function VerticalDirection() {
  return (
    <ScrollArea maxHeight="200px" direction="vertical">
      <div style={{ padding: 16 }}>
        {Array.from({ length: 20 }, (_, i) => <p key={i} style={{ margin: "8px 0" }}>Vertical item {i + 1}</p>)}
      </div>
    </ScrollArea>
  );
}

export function BothDirections() {
  return (
    <ScrollArea maxHeight="200px" direction="both">
      <div style={{ padding: 16, width: "1200px" }}>
        {Array.from({ length: 20 }, (_, i) => <p key={i} style={{ margin: "8px 0", whiteSpace: "nowrap" }}>Both directions item {i + 1} — extra content to force horizontal scroll on this line</p>)}
      </div>
    </ScrollArea>
  );
}
