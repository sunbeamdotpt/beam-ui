import { Tooltip } from "./tooltip.tsx";

export default function TooltipStory() {
  return (
    <div style={{ padding: 60, display: "flex", gap: 24 }}>
      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <button>Bottom</button>
      </Tooltip>
    </div>
  );
}

export function TopPosition() {
  return <div style={{ padding: 60 }}><Tooltip content="Top tooltip" position="top"><button>Top</button></Tooltip></div>;
}

export function BottomPosition() {
  return <div style={{ padding: 60 }}><Tooltip content="Bottom tooltip" position="bottom"><button>Bottom</button></Tooltip></div>;
}

export function LeftPosition() {
  return <div style={{ padding: 60 }}><Tooltip content="Left tooltip" position="left"><button>Left</button></Tooltip></div>;
}

export function RightPosition() {
  return <div style={{ padding: 60 }}><Tooltip content="Right tooltip" position="right"><button>Right</button></Tooltip></div>;
}
