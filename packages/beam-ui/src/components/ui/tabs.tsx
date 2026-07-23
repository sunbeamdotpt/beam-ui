import { css } from "../../system.ts";

import type { ReactNode } from "react";
import { TabContent, TabIndicator, TabList, TabsRoot, TabTrigger } from "@ark-ui/react/tabs";

/** Tab definition for {@link Tabs}. */
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
  gap: "32px",
  borderBottom: "1px solid",
  borderColor: "border.subtle",
  marginBottom: "32px",
});

const tabListDark = css({
  display: "flex",
  gap: "24px",
  borderBottom: "1px solid",
  borderColor: "rgba(255,255,255,0.1)",
  marginBottom: "24px",
});

const tabTrigger = css({
  paddingBottom: "16px",
  fontSize: "12px",
  fontWeight: "button",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  bg: "transparent",
  border: "none",
  cursor: "pointer",
  color: "text.muted",
  borderBottom: "2px solid transparent",
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
  paddingBottom: "12px",
  fontSize: "11px",
  fontWeight: "button",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  bg: "transparent",
  border: "none",
  cursor: "pointer",
  color: "rgba(255,255,255,0.4)",
  borderBottom: "2px solid transparent",
  transition: "all 0.15s ease",
  _hover: {
    color: "rgba(255,255,255,0.6)",
  },
  _selected: {
    color: "sunbeam.orange",
    borderBottomColor: "sunbeam.orange",
  },
});

/**
 * Accessible tab component using Ark UI primitives with customizable visual variants.
 * Manages tab selection state and triggers content display via controlled value.
 *
 * @example
 * ```tsx
 * const [active, setActive] = useState("overview");
 * <Tabs
 *   items={[
 *     { value: "overview", label: "Overview" },
 *     { value: "details", label: "Details" },
 *   ]}
 *   activeValue={active}
 *   onChange={setActive}
 *   variant="default"
 * />
 * ```
 */
export function Tabs({ items, activeValue, onChange, variant = "default" }: TabsProps): ReactNode {
  const isDark = variant === "dark";

  return (
    <TabsRoot
      value={activeValue}
      onValueChange={(details) => onChange(details.value)}
    >
      <TabList className={isDark ? tabListDark : tabList}>
        {items.map((item) => (
          <TabTrigger
            key={item.value}
            value={item.value}
            className={isDark ? tabTriggerDark : tabTrigger}
          >
            {item.label}
          </TabTrigger>
        ))}
        <TabIndicator />
      </TabList>

      {items.map((item) => <TabContent key={item.value} value={item.value} />)}
    </TabsRoot>
  );
}
