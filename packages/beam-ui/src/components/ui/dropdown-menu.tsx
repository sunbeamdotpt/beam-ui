import { type ReactNode } from "react";
import {
  MenuRoot,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuItemGroup,
  MenuItemGroupLabel,
} from "@ark-ui/react/menu";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

export interface DropdownMenuItem {
  label: string;
  icon?: string;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export interface DropdownMenuGroup {
  label?: string;
  items: DropdownMenuItem[];
}

interface DropdownMenuProps {
  /** Flat list of items, or grouped items */
  items?: DropdownMenuItem[];
  groups?: DropdownMenuGroup[];
  children: ReactNode;
  positioning?: { placement?: string };
}

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
  height: "1px",
  backgroundColor: "border.default",
  margin: "4px 0",
});

const groupLabelStyle = css({
  fontSize: "11px",
  fontWeight: "button",
  color: "text.muted",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  padding: "6px 12px 4px",
});

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
}: DropdownMenuProps) {
  return (
    <MenuRoot positioning={positioning as any}>
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
