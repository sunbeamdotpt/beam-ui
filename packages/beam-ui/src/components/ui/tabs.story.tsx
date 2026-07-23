import { useState } from "react";
import { Tabs } from "./tabs.tsx";

export default function TabsStory() {
  const [active, setActive] = useState("overview");

  return (
    <Tabs
      activeValue={active}
      onChange={setActive}
      items={[
        { value: "overview", label: "Overview" },
        { value: "usage", label: "Usage" },
        { value: "api", label: "API Reference" },
      ]}
    />
  );
}

export function DefaultVariant() {
  const [active, setActive] = useState("a");
  return (
    <Tabs
      activeValue={active}
      onChange={setActive}
      variant="default"
      items={[{ value: "a", label: "Tab A" }, { value: "b", label: "Tab B" }]}
    />
  );
}

export function DarkVariant() {
  const [active, setActive] = useState("a");
  return (
    <div style={{ background: "#1f1f1f", padding: 24 }}>
      <Tabs
        activeValue={active}
        onChange={setActive}
        variant="dark"
        items={[{ value: "a", label: "Tab A" }, { value: "b", label: "Tab B" }]}
      />
    </div>
  );
}
