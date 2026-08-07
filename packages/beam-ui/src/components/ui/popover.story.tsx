import { Popover } from "./popover.tsx";

export default function PopoverStory() {
  return (
    <div style={{ padding: 40 }}>
      <Popover
        trigger={<button type="button">Open Popover</button>}
        title="Popover Title"
      >
        <p style={{ margin: 0 }}>
          This is popover content. It can contain any elements you need.
        </p>
      </Popover>
    </div>
  );
}

export function WithoutTitle() {
  return (
    <div style={{ padding: 40 }}>
      <Popover trigger={<button type="button">No Title</button>}>
        <p style={{ margin: 0 }}>This popover has no title bar.</p>
      </Popover>
    </div>
  );
}

export function RichContent() {
  return (
    <div style={{ padding: 40 }}>
      <Popover
        trigger={<button type="button">Details</button>}
        title="Repository Info"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ margin: 0, fontWeight: 600 }}>sunbeam/beam-ui</p>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>
            A design system built on warm amber tones.
          </p>
        </div>
      </Popover>
    </div>
  );
}
