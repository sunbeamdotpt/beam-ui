import { useState } from "react";
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from "@ark-ui/react/collapsible";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
  onClick?: () => void;
}

interface TreeViewProps {
  nodes: TreeNode[];
  activeId?: string;
  className?: string;
}

export function TreeView({ nodes, activeId, className }: TreeViewProps) {
  return (
    <div className={cx(root, className)} role="tree">
      {nodes.map((node) => (
        <TreeItem key={node.id} node={node} activeId={activeId} level={0} />
      ))}
    </div>
  );
}

function TreeItem({
  node,
  activeId,
  level,
}: {
  node: TreeNode;
  activeId?: string;
  level: number;
}) {
  const isFolder = node.children && node.children.length > 0;
  const isActive = activeId === node.id;
  const [open, setOpen] = useState(true);

  if (isFolder) {
    return (
      <CollapsibleRoot defaultOpen open={open} onOpenChange={(d) => setOpen(d.open)}>
        <CollapsibleTrigger
          className={cx(itemRow, isActive && activeRow)}
          role="treeitem"
          aria-expanded={open}
        >
          <span style={{ paddingLeft: `${level * 16}px` }} className={itemInner}>
            <Icon name="expand_more" size={16} className={chevron} />
            <Icon name={node.icon ?? "folder"} size={18} className={folderIcon} />
            <span className={labelStyle}>{node.label}</span>
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent role="group">
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} activeId={activeId} level={level + 1} />
          ))}
        </CollapsibleContent>
      </CollapsibleRoot>
    );
  }

  return (
    <button
      className={cx(itemRow, isActive && activeRow)}
      onClick={node.onClick}
      type="button"
      role="treeitem"
    >
      <span style={{ paddingLeft: `${level * 16}px` }} className={itemInner}>
        <span className={css({ width: "16px", flexShrink: 0 })} />
        <Icon name={node.icon ?? "description"} size={18} className={fileIcon} />
        <span className={labelStyle}>{node.label}</span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const root = css({
  fontFamily: "body",
  fontSize: "14px",
});

const itemRow = css({
  display: "flex",
  width: "100%",
  alignItems: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "md",
  transition: "background-color 0.15s ease",
  textAlign: "left",
  color: "text.primary",
  _hover: { backgroundColor: "bg.card" },
});

const activeRow = css({
  backgroundColor: "bg.card",
  fontWeight: "button",
});

const itemInner = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
});

const chevron = css({
  color: "text.muted",
  transition: "transform 0.15s ease",
  "[data-state=closed] &": { transform: "rotate(-90deg)" },
});

const folderIcon = css({ color: "sunbeam.orange" });
const fileIcon = css({ color: "text.secondary" });

const labelStyle = css({
  lineHeight: 1,
  whiteSpace: "nowrap",
});
