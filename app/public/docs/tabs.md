# Tabs

> Tab definition for {@link Tabs}. */
interface TabItem {
  /** Unique identifier for the tab. */
  value: string;
  /** Display label for the tab trigger. */
  label: string;
}

/** Props for {@link Tabs}. */
export interface TabsProps {
  /** Array of tab items with value and label. */
  items: TabItem[];
  /** Currently active tab value. */
  activeValue: string;
  /** Called when a tab is clicked with its value. */
  onChange: (value: string) => void;
  /** Visual style. Defaults to `"default"`. */
  variant?: "default" | "dark";
}

const tabList = css({
  display: "flex",
  gap: "8",
  borderBottomWidth: "0.25",
  borderBottomStyle: "solid",
  borderColor: "border.subtle",
  marginBottom: "8",
});

const tabListDark = css({
  display: "flex",
  gap: "6",
  borderBottomWidth: "0.25",
  borderBottomStyle: "solid",
  borderColor: "chrome.10",
  marginBottom: "6",
});

const tabTrigger = css({
  paddingBottom: "4",
  fontSize: "xs",
  fontWeight: "button",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  bg: "transparent",
  border: "none",
  cursor: "pointer",
  color: "text.muted",
  borderBottomWidth: "0.5",
  borderBottomStyle: "solid",
  borderBottomColor: "transparent",
  transition: "all 0.15s ease",
  _hover: {
    color: "text.primary",
  },
  _selected: {
    color: "sunbeam.orange",
    borderBottomColor: "sunbeam.orange",
  },
});

const tabTriggerDark = css({
  paddingBottom: "3",
  fontSize: "11",
  fontWeight: "button",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  bg: "transparent",
  border: "none",
  cursor: "pointer",
  color: "chrome.40",
  borderBottomWidth: "0.5",
  borderBottomStyle: "solid",
  borderBottomColor: "transparent",
  transition: "all 0.15s ease",
  _hover: {
    color: "chrome.60",
  },
  _selected: {
    color: "sunbeam.orange",
    borderBottomColor: "sunbeam.orange",
  },
});

/** Accessible tab component using Ark UI primitives with customizable visual variants. Manages tab selection state and triggers content display via controlled value. * @example ```tsx const [active, setActive] = useState("overview"); <Tabs items={[ { value: "overview", label: "Overview" }, { value: "details", label: "Details" }, ]} activeValue={active} onChange={setActive} variant="default" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/tabs?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Tabs } from "@sunbeam/beam-ui/components/ui/tabs"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `TabItem[]` | Yes | Array of tab items with value and label. |
| activeValue | `string` | Yes | Currently active tab value. |
| onChange | `(value: string) => void` | Yes | Called when a tab is clicked with its value. |
| variant | `"default" | "dark"` | No | Visual style. Defaults to `"default"`. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
