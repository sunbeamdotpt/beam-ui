import { Splitter } from "./splitter.tsx";

export default function SplitterStory() {
  return (
    <div style={{ height: 300, border: "1px solid #ccc" }}>
      <Splitter defaultSize={40}>
        <div style={{ padding: 16 }}>Left panel content</div>
        <div style={{ padding: 16 }}>Right panel content</div>
      </Splitter>
    </div>
  );
}

export function Horizontal() {
  return (
    <div style={{ height: 300, border: "1px solid #ccc" }}>
      <Splitter direction="horizontal" defaultSize={30}>
        <div style={{ padding: 16 }}>Sidebar</div>
        <div style={{ padding: 16 }}>Main content</div>
      </Splitter>
    </div>
  );
}

export function Vertical() {
  return (
    <div style={{ height: 400, border: "1px solid #ccc" }}>
      <Splitter direction="vertical" defaultSize={60}>
        <div style={{ padding: 16 }}>Top panel</div>
        <div style={{ padding: 16 }}>Bottom panel</div>
      </Splitter>
    </div>
  );
}
