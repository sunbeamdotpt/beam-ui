import { type ReactNode } from "react";
import {
  MenuRoot,
  MenuContextTrigger,
  MenuPositioner,
  MenuContent,
  MenuItem,
  MenuSeparator,
} from "@ark-ui/react/menu";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

/** Single menu item in a {@link ContextMenu}. */
interface ContextMenuItem {
  /** Display label for the menu item. */
  label: string;
  /** Optional Material Design icon name. */
  icon?: string;
  /** Callback fired when the user clicks this item. */
  onClick: () => void;
  /** If true, the item is styled as a destructive action (e.g., delete, remove). */
  danger?: boolean;
  /** If true, a separator line is drawn above this item. */
  divider?: boolean;
}

/** Props for {@link ContextMenu}. */
interface ContextMenuProps {
  /** Array of menu items to display. */
  items: ContextMenuItem[];
  /** Element or component that triggers the context menu on right-click. */
  children: ReactNode;
}

/**
 * Right-click context menu with optional icons and danger styling.
 *
 * Wraps Ark UI's MenuRoot with contextual positioning. Provides danger item styling for
 * destructive actions. Renders below or above the pointer based on viewport space.
 *
 * @example
 * ```tsx
 * <ContextMenu
 *   items={[
 *     { label: "Edit", icon: "edit", onClick: () => edit() },
 *     { label: "Delete", icon: "delete", onClick: () => delete(), danger: true }
 *   ]}
 * >
 *   <span>Right-click me</span>
 * </ContextMenu>
 * ```
 */

const contentStyle = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  shadow: "golden",
  padding: "4px",
  minWidth: "180px",
  zIndex: 1000,
});

const itemStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  padding: "8px 12px",
  cursor: "pointer",
  color: "text.primary",
  transition: "background 0.15s ease",
  _hover: { backgroundColor: "bg.card" },
});

const itemDangerStyle = css({
  _hover: { color: "sunbeam.orange" },
});

const iconStyle = css({
  color: "text.secondary",
});

const separatorStyle = css({
  height: "1px",
  backgroundColor: "border.default",
  margin: "4px 0",
});

// ContextMenu function is documented above, before the const contentStyle declaration
export function ContextMenu({ items, children }: ContextMenuProps): ReactNode {
  return (
    <MenuRoot>
      <MenuContextTrigger asChild>{children}</MenuContextTrigger>
      <MenuPositioner>
        <MenuContent className={contentStyle}>
          {items.map((item, i) => (
            <div key={i}>
              {item.divider && <MenuSeparator className={separatorStyle} />}
              <MenuItem
                value={item.label}
                className={cx(itemStyle, item.danger && itemDangerStyle)}
                onClick={item.onClick}
              >
                {item.icon && (
                  <Icon name={item.icon} size={16} className={iconStyle} />
                )}
                {item.label}
              </MenuItem>
            </div>
          ))}
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  );
}
