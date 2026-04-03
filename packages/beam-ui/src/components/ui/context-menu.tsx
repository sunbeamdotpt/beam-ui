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

interface ContextMenuItem {
  label: string;
  icon?: string;
  onClick: () => void;
  danger?: boolean;
  divider?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  children: ReactNode;
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

export function ContextMenu({ items, children }: ContextMenuProps) {
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
