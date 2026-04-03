import { useState, useRef, useCallback } from "react";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";
import { MarkdownRenderer } from "./markdown-renderer";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

type ActiveTab = "write" | "preview";

interface ToolbarAction {
  icon: string;
  label: string;
  action: (textarea: HTMLTextAreaElement, value: string) => { newValue: string; cursorPos: number };
}

function wrapSelection(
  textarea: HTMLTextAreaElement,
  value: string,
  before: string,
  after: string,
): { newValue: string; cursorPos: number } {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = value.slice(start, end);
  const replacement = `${before}${selected || "text"}${after}`;
  const newValue = value.slice(0, start) + replacement + value.slice(end);
  const cursorPos = selected ? start + replacement.length : start + before.length + 4;
  return { newValue, cursorPos };
}

function prependToLine(
  textarea: HTMLTextAreaElement,
  value: string,
  prefix: string,
): { newValue: string; cursorPos: number } {
  const start = textarea.selectionStart;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const newValue = value.slice(0, lineStart) + prefix + value.slice(lineStart);
  return { newValue, cursorPos: start + prefix.length };
}

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  {
    icon: "format_bold",
    label: "Bold",
    action: (ta, v) => wrapSelection(ta, v, "**", "**"),
  },
  {
    icon: "format_italic",
    label: "Italic",
    action: (ta, v) => wrapSelection(ta, v, "*", "*"),
  },
  {
    icon: "title",
    label: "Heading",
    action: (ta, v) => prependToLine(ta, v, "## "),
  },
  {
    icon: "code",
    label: "Code",
    action: (ta, v) => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = v.slice(start, end);
      if (selected.includes("\n")) {
        const replacement = "```\n" + (selected || "code") + "\n```";
        return {
          newValue: v.slice(0, start) + replacement + v.slice(end),
          cursorPos: start + replacement.length,
        };
      }
      return wrapSelection(ta, v, "`", "`");
    },
  },
  {
    icon: "link",
    label: "Link",
    action: (ta, v) => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = v.slice(start, end) || "text";
      const replacement = `[${selected}](url)`;
      return {
        newValue: v.slice(0, start) + replacement + v.slice(end),
        cursorPos: start + selected.length + 3,
      };
    },
  },
  {
    icon: "image",
    label: "Image",
    action: (ta, v) => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = v.slice(start, end) || "alt";
      const replacement = `![${selected}](url)`;
      return {
        newValue: v.slice(0, start) + replacement + v.slice(end),
        cursorPos: start + selected.length + 4,
      };
    },
  },
  {
    icon: "format_list_bulleted",
    label: "Bulleted list",
    action: (ta, v) => prependToLine(ta, v, "- "),
  },
  {
    icon: "format_list_numbered",
    label: "Numbered list",
    action: (ta, v) => prependToLine(ta, v, "1. "),
  },
  {
    icon: "check_box",
    label: "Task list",
    action: (ta, v) => prependToLine(ta, v, "- [ ] "),
  },
  {
    icon: "format_quote",
    label: "Quote",
    action: (ta, v) => prependToLine(ta, v, "> "),
  },
  {
    icon: "table_chart",
    label: "Table",
    action: (ta, v) => {
      const start = ta.selectionStart;
      const table = "| Header | Header |\n| ------ | ------ |\n| Cell   | Cell   |\n| Cell   | Cell   |";
      return {
        newValue: v.slice(0, start) + table + v.slice(ta.selectionEnd),
        cursorPos: start + table.length,
      };
    },
  },
];

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your markdown here...",
  minHeight = "200px",
  className,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleToolbarAction = useCallback(
    (action: ToolbarAction["action"]) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const { newValue, cursorPos } = action(textarea, value);
      onChange(newValue);
      requestAnimationFrame(() => {
        textarea.focus();
        textarea.setSelectionRange(cursorPos, cursorPos);
      });
    },
    [value, onChange],
  );

  return (
    <div className={cx(container, className)}>
      {/* Tab bar */}
      <div className={tabBar}>
        <button
          type="button"
          className={cx(tabButton, activeTab === "write" ? tabActive : undefined)}
          onClick={() => setActiveTab("write")}
        >
          Write
        </button>
        <button
          type="button"
          className={cx(tabButton, activeTab === "preview" ? tabActive : undefined)}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
      </div>

      {/* Toolbar (only in write mode) */}
      {activeTab === "write" && (
        <div className={toolbar}>
          {TOOLBAR_ACTIONS.map((item) => (
            <button
              key={item.icon}
              type="button"
              className={toolbarButton}
              aria-label={item.label}
              onClick={() => handleToolbarAction(item.action)}
            >
              <Icon name={item.icon} size={18} />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {activeTab === "write" ? (
        <textarea
          ref={textareaRef}
          className={textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          aria-label="Markdown editor"
        />
      ) : (
        <div className={previewPane} style={{ minHeight }}>
          {value ? (
            <MarkdownRenderer content={value} />
          ) : (
            <p className={emptyPreview}>Nothing to preview</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const container = css({
  border: "1px solid",
  borderColor: "border.default",
  overflow: "hidden",
});

const tabBar = css({
  display: "flex",
  gap: "0",
  borderBottom: "1px solid",
  borderColor: "border.default",
  backgroundColor: "bg.card",
});

const tabButton = css({
  padding: "8px 16px",
  fontSize: "13px",
  fontWeight: "button",
  fontFamily: "body",
  color: "text.secondary",
  background: "none",
  border: "none",
  borderBottom: "2px solid transparent",
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  transition: "all 0.15s ease",
  _hover: {
    color: "text.primary",
  },
});

const tabActive = css({
  color: "sunbeam.orange",
  borderBottomColor: "sunbeam.orange",
  _hover: {
    color: "sunbeam.orange",
  },
});

const toolbar = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "2px",
  padding: "6px 8px",
  backgroundColor: "bg.card",
  borderBottom: "1px solid",
  borderColor: "border.default",
});

const toolbarButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  background: "none",
  border: "1px solid transparent",
  cursor: "pointer",
  color: "text.secondary",
  transition: "all 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
    backgroundColor: "bg.page",
  },
});

const textarea = css({
  display: "block",
  width: "100%",
  padding: "16px",
  fontFamily: "mono",
  fontSize: "14px",
  lineHeight: 1.6,
  color: "text.primary",
  backgroundColor: "bg.page",
  border: "none",
  outline: "none",
  resize: "vertical",
  _placeholder: {
    color: "text.muted",
  },
});

const previewPane = css({
  padding: "16px",
  backgroundColor: "bg.page",
  overflowY: "auto",
});

const emptyPreview = css({
  color: "text.muted",
  fontStyle: "italic",
  fontSize: "14px",
});
