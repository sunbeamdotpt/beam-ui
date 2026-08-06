# MarkdownEditor

> Props for {@link MarkdownEditor}. */
export interface MarkdownEditorProps {
  /** Current markdown content. */
  value: string;
  /** Called when user edits the markdown text. Receives new content string. */
  onChange: (value: string) => void;
  /** Placeholder text in the textarea. Defaults to `"Write your markdown here..."`. */
  placeholder?: string;
  /** Minimum height of the editor area. Defaults to `"200px"`. */
  minHeight?: string;
  /** Optional CSS class for the container. */
  className?: string;
}

type ActiveTab = "write" | "preview";

interface ToolbarAction {
  icon: string;
  label: string;
  action: (
    textarea: HTMLTextAreaElement,
    value: string,
  ) => { newValue: string; cursorPos: number };
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
      const table =
        "| Header | Header |\n| ------ | ------ |\n| Cell   | Cell   |\n| Cell   | Cell   |";
      return {
        newValue: v.slice(0, start) + table + v.slice(ta.selectionEnd),
        cursorPos: start + table.length,
      };
    },
  },
];

/** Split-pane markdown editor with Write and Preview tabs. Write tab provides formatting toolbar (bold, italic, headings, code, links, lists, tables, quotes). Preview tab renders markdown with syntax highlighting and live LaTeX math support. * @example ```tsx <MarkdownEditor value={markdown} onChange={setMarkdown} minHeight="400px" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/markdown-editor?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { MarkdownEditor } from "@sunbeam/beam-ui/components/ui/markdown-editor"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Current markdown content. |
| onChange | `(value: string) => void` | Yes | Called when user edits the markdown text. Receives new content string. |
| placeholder | `string` | No | Placeholder text in the textarea. Defaults to `"Write your markdown here..."`. |
| minHeight | `string` | No | Minimum height of the editor area. Defaults to `"200px"`. |
| className | `string` | No | Optional CSS class for the container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
