import { css, cx } from "../../system.ts";

import type { ComponentProps, ReactNode } from "react";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@ark-ui/react/menu";
import { Icon } from "./icon.tsx";

/** Single menu item in a {@link DropdownMenu}. */
export interface DropdownMenuItem {
  /** Display label for the menu item. */
  label: string;
  /** Optional Material Design icon name. */
  icon?: string;
  /** Callback fired when the user clicks this item. */
  onClick: () => void;
  /** If true, the item is styled as a destructive action (e.g., delete, remove). */
  danger?: boolean;
  /** If true, the item cannot be clicked and is visually disabled. */
  disabled?: boolean;
}

/** Group of menu items in a {@link DropdownMenu}}. */
export interface DropdownMenuGroup {
  /** Optional label displayed above the group. */
  label?: string;
  /** Array of items in this group. */
  items: DropdownMenuItem[];
}

/** Props for {@link DropdownMenu}. */
export interface DropdownMenuProps {
  /** Flat list of items (mutually exclusive with `groups`). */
  items?: DropdownMenuItem[];
  /** Grouped list of items (mutually exclusive with `items`). */
  groups?: DropdownMenuGroup[];
  /** Element or component that triggers the dropdown on click. */
  children: ReactNode;
  /** Positioning options for Ark UI's MenuRoot (e.g., `{ placement: "bottom-start" }`). */
  positioning?: ComponentProps<typeof MenuRoot>["positioning"];
}

/**
 * Dropdown menu with optional grouping, icons, and disabled/danger styling.
 *
 * Displays a trigger button that opens a dropdown menu below/above the button.
 * Supports flat or grouped items; provides visual distinction for disabled and danger items.
 * Integrates with Ark UI for accessibility and keyboard navigation.
 *
 * @example
 * ```tsx
 * <DropdownMenu
 *   items={[
 *     { label: "Edit", icon: "edit", onClick: () => edit() },
 *     { label: "Delete", icon: "delete", onClick: () => delete(), danger: true }
 *   ]}
 * >
 *   <Button>Menu</Button>
 * </DropdownMenu>
 * ```
 */

const contentStyle = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  shadow: "golden",
  padding: "1",
  minWidth: "45",
  zIndex: 1000,
});

const itemStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "2",
  fontSize: "sm",
  padding: "2 3",
  cursor: "pointer",
  color: "text.primary",
  transition: "background 0.15s ease",
  _hover: { backgroundColor: "bg.card" },
});

const itemDisabledStyle = css({
  opacity: 0.4,
  cursor: "not-allowed",
  _hover: { backgroundColor: "transparent" },
});

const itemDangerStyle = css({
  _hover: { color: "sunbeam.orange" },
});

const iconStyle = css({
  color: "text.secondary",
});

const separatorStyle = css({
  height: "0.25",
  backgroundColor: "border.default",
  margin: "1 0",
});

const groupLabelStyle = css({
  fontSize: "11",
  fontWeight: "button",
  color: "text.muted",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  padding: "1.5 3 1",
});

// Helper function for rendering individual menu items (not exported or documented separately)
function renderItem(item: DropdownMenuItem, i: number) {
  return (
    <MenuItem
      key={i}
      value={item.label}
      disabled={item.disabled}
      className={cx(
        itemStyle,
        item.danger && itemDangerStyle,
        item.disabled && itemDisabledStyle,
      )}
      onClick={item.onClick}
    >
      {item.icon && <Icon name={item.icon} size={16} className={iconStyle} />}
      {item.label}
    </MenuItem>
  );
}

export function DropdownMenu({
  items,
  groups,
  children,
  positioning,
}: DropdownMenuProps): ReactNode {
  return (
    <MenuRoot positioning={positioning}>
      <MenuTrigger asChild>{children}</MenuTrigger>
      <MenuPositioner>
        <MenuContent className={contentStyle}>
          {items &&
            items.map((item, i) => renderItem(item, i))}

          {groups &&
            groups.map((group, gi) => (
              <MenuItemGroup key={gi}>
                {gi > 0 && <MenuSeparator className={separatorStyle} />}
                {group.label && (
                  <MenuItemGroupLabel className={groupLabelStyle}>
                    {group.label}
                  </MenuItemGroupLabel>
                )}
                {group.items.map((item, i) => renderItem(item, i))}
              </MenuItemGroup>
            ))}
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  );
}
