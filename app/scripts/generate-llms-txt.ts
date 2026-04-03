/**
 * generate-llms-txt.ts
 *
 * Generates LLM-readable documentation for the Beam Design Language:
 *   - app/public/llms.txt       (concise overview)
 *   - app/public/llms-full.txt  (comprehensive API reference)
 *   - app/public/docs/{name}.md (per-component markdown)
 *
 * Run: npx tsx app/scripts/generate-llms-txt.ts
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";

/* ------------------------------------------------------------------ */
/*  Paths                                                              */
/* ------------------------------------------------------------------ */

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const PUBLIC = resolve(ROOT, "public");
const DOCS_DIR = resolve(PUBLIC, "docs");

/* ------------------------------------------------------------------ */
/*  Component catalog                                                  */
/* ------------------------------------------------------------------ */

interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ComponentDef {
  name: string;
  slug: string;
  importPath: string;
  description: string;
  props: ComponentProp[];
  usage: string;
  variants?: string[];
  features?: string[];
}

const COMPONENTS: ComponentDef[] = [
  // ── Core UI ──────────────────────────────────────────────────────
  {
    name: "Button",
    slug: "button",
    importPath: '@sunbeam/beam-ui/components/ui/button',
    description: "Primary action element with multiple visual variants.",
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Button label content" },
      { name: "variant", type: '"dark" | "cream" | "ghost" | "text" | "primary"', required: false, description: "Visual style variant" },
      { name: "href", type: "string", required: false, description: "Renders as a Link when provided" },
      { name: "onClick", type: "() => void", required: false, description: "Click handler" },
      { name: "type", type: '"button" | "submit" | "reset"', required: false, description: "HTML button type" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Button variant="dark" onClick={handleClick}>Submit</Button>`,
    variants: ["dark: Black background, white text", "cream: Gold background with border", "ghost: Transparent with border", "text: Text-only link style", "primary: Brand orange background"],
  },
  {
    name: "Badge",
    slug: "badge",
    importPath: '@sunbeam/beam-ui/components/ui/badge',
    description: "Status indicator label for tagging content with semantic meaning.",
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Badge label" },
      { name: "variant", type: '"premier" | "open" | "beta" | "experimental" | "deprecated" | "new" | "stable" | "preview" | "community" | "partner" | "verified" | "featured" | "section"', required: false, description: "Visual variant" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Badge variant="beta">Beta</Badge>`,
    variants: ["premier: Orange background", "open: Gold background", "beta: Yellow background", "deprecated: Muted style", "section: Section header label"],
  },
  {
    name: "Card",
    slug: "card",
    importPath: '@sunbeam/beam-ui/components/ui/card',
    description: "Content container with icon, title, description, and call-to-action link.",
    props: [
      { name: "icon", type: "string", required: true, description: "Material Symbols icon name" },
      { name: "title", type: "string", required: true, description: "Card heading" },
      { name: "description", type: "string", required: true, description: "Card body text" },
      { name: "ctaLabel", type: "string", required: true, description: "Call-to-action button text" },
      { name: "ctaHref", type: "string", required: true, description: "CTA link destination" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Card icon="rocket" title="Get Started" description="Build your first app" ctaLabel="Read docs" ctaHref="/docs" />`,
  },
  {
    name: "Icon",
    slug: "icon",
    importPath: '@sunbeam/beam-ui/components/ui/icon',
    description: "Material Symbols icon wrapper with accessibility support.",
    props: [
      { name: "name", type: "string", required: true, description: "Material Symbols icon name" },
      { name: "size", type: "number | string", required: false, description: "Icon size in px" },
      { name: "filled", type: "boolean", required: false, description: "Use filled icon variant" },
      { name: "label", type: "string", required: false, description: "Accessible label (sets role=img)" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Icon name="settings" size={24} filled />`,
    features: ["Uses Material Symbols Outlined", "Auto aria-hidden when no label provided", "Supports filled/outlined toggle via font variation settings"],
  },
  {
    name: "Avatar",
    slug: "avatar",
    importPath: '@sunbeam/beam-ui/components/ui/avatar',
    description: "User avatar with image support and initial fallback.",
    props: [
      { name: "name", type: "string", required: true, description: "User display name (used for initials)" },
      { name: "src", type: "string", required: false, description: "Image URL" },
      { name: "size", type: '"sm" | "md" | "lg"', required: false, description: "Size: sm (32px), md (40px), lg (56px)" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Avatar name="Sienna Cruz" src="/avatar.jpg" size="md" />`,
    variants: ["sm: 32px", "md: 40px (default)", "lg: 56px"],
  },
  {
    name: "Callout",
    slug: "callout",
    importPath: '@sunbeam/beam-ui/components/ui/callout',
    description: "Highlighted information block for tips, warnings, and info notices.",
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Callout content" },
      { name: "variant", type: '"tip" | "warning" | "info"', required: false, description: "Visual variant with icon and border color" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Callout variant="tip">Use keyboard shortcuts for faster navigation.</Callout>`,
    variants: ["tip: Orange border with lightbulb icon", "warning: Gold border with warning icon", "info: Sunshine border with info icon"],
  },
  {
    name: "CodeBlock",
    slug: "code-block",
    importPath: '@sunbeam/beam-ui/components/ui/code-block',
    description: "Tabbed code display with optional toggle groups for streaming, version, and mode variants.",
    props: [
      { name: "tabs", type: "CodeTab[]", required: true, description: "Array of code tabs with label and content/variants" },
      { name: "streamToggle", type: "ToggleGroup", required: false, description: "Toggle for streaming vs non-streaming" },
      { name: "versionToggle", type: "ToggleGroup", required: false, description: "Toggle for API version" },
      { name: "modeToggle", type: "ToggleGroup", required: false, description: "Toggle for sync/async mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<CodeBlock tabs={[{ label: "Python", content: <pre>print("hello")</pre> }]} />`,
    features: ["Multiple language tabs", "Pill toggle groups for variants", "Copy-to-clipboard support"],
  },
  {
    name: "Tabs",
    slug: "tabs",
    importPath: '@sunbeam/beam-ui/components/ui/tabs',
    description: "Navigation tabs built on Ark UI with default and dark variants.",
    props: [
      { name: "items", type: "TabItem[]", required: true, description: "Tab items with value and label" },
      { name: "activeValue", type: "string", required: true, description: "Currently active tab value" },
      { name: "onChange", type: "(value: string) => void", required: true, description: "Tab change handler" },
      { name: "variant", type: '"default" | "dark"', required: false, description: "Visual style" },
    ],
    usage: `<Tabs items={[{ value: "a", label: "Tab A" }]} activeValue="a" onChange={setTab} />`,
    variants: ["default: Light underline style", "dark: Dark background style"],
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    importPath: '@sunbeam/beam-ui/components/ui/tooltip',
    description: "Hoverable tooltip overlay built on Ark UI.",
    props: [
      { name: "content", type: "string", required: true, description: "Tooltip text" },
      { name: "children", type: "ReactNode", required: true, description: "Trigger element" },
      { name: "position", type: '"top" | "bottom" | "left" | "right"', required: false, description: "Tooltip placement" },
    ],
    usage: `<Tooltip content="Settings"><Icon name="settings" /></Tooltip>`,
  },
  {
    name: "Dialog",
    slug: "dialog",
    importPath: '@sunbeam/beam-ui/components/ui/dialog',
    description: "Modal dialog with title, content area, and optional action buttons. Built on Ark UI.",
    props: [
      { name: "open", type: "boolean", required: true, description: "Controlled open state" },
      { name: "onClose", type: "() => void", required: true, description: "Close handler" },
      { name: "title", type: "string", required: true, description: "Dialog heading" },
      { name: "children", type: "ReactNode", required: true, description: "Dialog body content" },
      { name: "actions", type: "ReactNode", required: false, description: "Footer action buttons" },
    ],
    usage: `<Dialog open={isOpen} onClose={() => setOpen(false)} title="Confirm">\n  <p>Are you sure?</p>\n</Dialog>`,
  },
  {
    name: "Select",
    slug: "select",
    importPath: '@sunbeam/beam-ui/components/ui/select',
    description: "Dropdown select input built on Ark UI with search and custom styling.",
    props: [
      { name: "options", type: "SelectOption[]", required: true, description: "Array of { value, label } options" },
      { name: "value", type: "string", required: true, description: "Selected value" },
      { name: "onChange", type: "(value: string) => void", required: true, description: "Change handler" },
      { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
      { name: "disabled", type: "boolean", required: false, description: "Disable the select" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Select options={[{ value: "a", label: "Option A" }]} value={val} onChange={setVal} />`,
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    importPath: '@sunbeam/beam-ui/components/ui/checkbox',
    description: "Checkbox input with label, indeterminate state, and Beam styling.",
    props: [
      { name: "checked", type: "boolean", required: true, description: "Checked state" },
      { name: "onChange", type: "(checked: boolean) => void", required: true, description: "Change handler" },
      { name: "label", type: "string", required: false, description: "Label text" },
      { name: "disabled", type: "boolean", required: false, description: "Disable the checkbox" },
      { name: "indeterminate", type: "boolean", required: false, description: "Show indeterminate state" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Checkbox checked={isChecked} onChange={setChecked} label="Accept terms" />`,
  },
  {
    name: "TextInput",
    slug: "text-input",
    importPath: '@sunbeam/beam-ui/components/ui/text-input',
    description: "Text input field with label, error state, and multiple input types.",
    props: [
      { name: "value", type: "string", required: true, description: "Input value" },
      { name: "onChange", type: "(value: string) => void", required: true, description: "Change handler" },
      { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
      { name: "label", type: "string", required: false, description: "Label text" },
      { name: "error", type: "string", required: false, description: "Error message" },
      { name: "disabled", type: "boolean", required: false, description: "Disable the input" },
      { name: "type", type: '"text" | "password" | "email" | "number"', required: false, description: "HTML input type" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<TextInput value={name} onChange={setName} label="Name" placeholder="Enter name" />`,
  },
  {
    name: "SearchInput",
    slug: "search-input",
    importPath: '@sunbeam/beam-ui/components/ui/search-input',
    description: "Search input with icon and keyboard shortcut hint.",
    props: [
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<SearchInput />`,
    features: ["Built-in search icon", "Keyboard shortcut badge (Cmd+K)", "Read-only trigger for search dialog"],
  },
  {
    name: "Table",
    slug: "table",
    importPath: '@sunbeam/beam-ui/components/ui/table',
    description: "Data table with sortable columns, row selection, and accessible caption.",
    props: [
      { name: "columns", type: "Column[]", required: true, description: "Column definitions with key, label, sortable, width" },
      { name: "rows", type: "Record<string, any>[]", required: true, description: "Row data array" },
      { name: "onSort", type: '(key: string, dir: "asc" | "desc") => void', required: false, description: "Sort handler" },
      { name: "selectable", type: "boolean", required: false, description: "Enable row selection checkboxes" },
      { name: "onSelect", type: "(selectedKeys: string[]) => void", required: false, description: "Selection change handler" },
      { name: "rowKey", type: "string", required: false, description: 'Key field for row identity (default: "id")' },
      { name: "caption", type: "string", required: false, description: "Accessible table caption" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Table\n  columns={[{ key: "name", label: "Name", sortable: true }]}\n  rows={[{ id: "1", name: "Item" }]}\n/>`,
    features: ["Sortable columns with direction indicators", "Select-all and per-row checkboxes", "Visually hidden accessible caption"],
  },
  {
    name: "List",
    slug: "list",
    importPath: '@sunbeam/beam-ui/components/ui/list',
    description: "Flexible list component with icon support and multiple layout variants.",
    props: [
      { name: "items", type: "ListItem[]", required: true, description: "Array of { label, description?, icon?, href? }" },
      { name: "ordered", type: "boolean", required: false, description: "Render as ordered list" },
      { name: "variant", type: '"default" | "compact" | "bordered"', required: false, description: "Layout variant" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<List items={[{ label: "Item 1", icon: "star" }]} variant="bordered" />`,
    variants: ["default: Standard spacing", "compact: Tight spacing", "bordered: Items with border separators"],
  },
  {
    name: "Pagination",
    slug: "pagination",
    importPath: '@sunbeam/beam-ui/components/ui/pagination',
    description: "Page navigation with page size selector and ellipsis collapse.",
    props: [
      { name: "currentPage", type: "number", required: true, description: "Active page number" },
      { name: "totalPages", type: "number", required: true, description: "Total number of pages" },
      { name: "onPageChange", type: "(page: number) => void", required: true, description: "Page change handler" },
      { name: "pageSize", type: "number", required: false, description: "Current page size" },
      { name: "onPageSizeChange", type: "(size: number) => void", required: false, description: "Page size change handler" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Pagination currentPage={1} totalPages={10} onPageChange={setPage} />`,
  },
  {
    name: "Accordion",
    slug: "accordion",
    importPath: '@sunbeam/beam-ui/components/ui/accordion',
    description: "Collapsible content sections built on Ark UI with single or multiple expand modes.",
    props: [
      { name: "items", type: "AccordionEntry[]", required: true, description: "Array of { value, title, content }" },
      { name: "multiple", type: "boolean", required: false, description: "Allow multiple items open" },
      { name: "defaultValue", type: "string[]", required: false, description: "Initially expanded items" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Accordion items={[{ value: "faq1", title: "Question?", content: <p>Answer.</p> }]} />`,
  },
  {
    name: "Toast",
    slug: "toast",
    importPath: '@sunbeam/beam-ui/components/ui/toast',
    description: "Temporary notification message with auto-dismiss after 3 seconds.",
    props: [
      { name: "message", type: "string", required: true, description: "Toast message text" },
      { name: "variant", type: '"success" | "error" | "info"', required: false, description: "Visual variant" },
      { name: "visible", type: "boolean", required: true, description: "Visibility state" },
      { name: "onDismiss", type: "() => void", required: false, description: "Dismiss callback" },
    ],
    usage: `<Toast message="Saved!" variant="success" visible={show} onDismiss={() => setShow(false)} />`,
    variants: ["success: Green border", "error: Red border", "info: Blue border"],
  },
  {
    name: "Switch",
    slug: "switch",
    importPath: '@sunbeam/beam-ui/components/ui/switch',
    description: "Toggle switch built on Ark UI for boolean settings.",
    props: [
      { name: "checked", type: "boolean", required: true, description: "Checked state" },
      { name: "onChange", type: "(checked: boolean) => void", required: true, description: "Change handler" },
      { name: "label", type: "string", required: false, description: "Label text" },
      { name: "disabled", type: "boolean", required: false, description: "Disable the switch" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Switch checked={isDark} onChange={setIsDark} label="Dark mode" />`,
  },
  {
    name: "ProgressBar",
    slug: "progress-bar",
    importPath: '@sunbeam/beam-ui/components/ui/progress-bar',
    description: "Determinate progress indicator built on Ark UI with size and color variants.",
    props: [
      { name: "value", type: "number", required: true, description: "Progress value (0-100)" },
      { name: "variant", type: '"default" | "success" | "error"', required: false, description: "Color variant" },
      { name: "showLabel", type: "boolean", required: false, description: "Show percentage label" },
      { name: "size", type: '"sm" | "md"', required: false, description: "Track height" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<ProgressBar value={75} variant="success" showLabel />`,
    variants: ["default: Orange fill", "success: Gold fill", "error: Flame fill"],
  },
  {
    name: "EmptyState",
    slug: "empty-state",
    importPath: '@sunbeam/beam-ui/components/ui/empty-state',
    description: "Placeholder for empty content areas with icon, message, and optional action.",
    props: [
      { name: "icon", type: "string", required: false, description: "Material Symbols icon name" },
      { name: "title", type: "string", required: true, description: "Empty state heading" },
      { name: "description", type: "string", required: false, description: "Explanatory text" },
      { name: "action", type: "ReactNode", required: false, description: "Action button or link" },
    ],
    usage: `<EmptyState icon="inbox" title="No items" description="Create your first item" action={<Button>Create</Button>} />`,
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    importPath: '@sunbeam/beam-ui/components/ui/skeleton',
    description: "Loading placeholder with shimmer animation.",
    props: [
      { name: "width", type: "string", required: false, description: "Element width" },
      { name: "height", type: "string", required: false, description: "Element height" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<Skeleton width="200px" height="20px" />`,
  },

  // ── Pickers ──────────────────────────────────────────────────────
  {
    name: "DatePicker",
    slug: "date-picker",
    importPath: '@sunbeam/beam-ui/components/ui/date-picker',
    description: "Calendar date picker built on Ark UI with day/month/year navigation.",
    props: [
      { name: "value", type: "string", required: false, description: "Selected date value (ISO string)" },
      { name: "onChange", type: "(value: string) => void", required: false, description: "Date change handler" },
      { name: "label", type: "string", required: false, description: "Input label" },
      { name: "placeholder", type: "string", required: false, description: "Input placeholder" },
    ],
    usage: `<DatePicker value={date} onChange={setDate} label="Due date" />`,
    features: ["Full calendar grid navigation", "Month and year view switching", "Keyboard accessible"],
  },
  {
    name: "ColorPicker",
    slug: "color-picker",
    importPath: '@sunbeam/beam-ui/components/ui/color-picker',
    description: "Color selection popover with preset palette and hex input.",
    props: [
      { name: "value", type: "string", required: true, description: "Current color hex value" },
      { name: "onChange", type: "(value: string) => void", required: true, description: "Color change handler" },
      { name: "presets", type: "string[]", required: false, description: "Custom color presets (defaults to 20 colors)" },
      { name: "label", type: "string", required: false, description: "Input label" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<ColorPicker value={color} onChange={setColor} label="Label color" />`,
  },
  {
    name: "LabelPicker",
    slug: "label-picker",
    importPath: '@sunbeam/beam-ui/components/ui/label-picker',
    description: "Multi-select popover for issue/PR labels with color indicators and search.",
    props: [
      { name: "options", type: "LabelOption[]", required: true, description: "Available labels with id, name, color, description" },
      { name: "selected", type: "string[]", required: true, description: "Selected label IDs" },
      { name: "onChange", type: "(selected: string[]) => void", required: true, description: "Selection change handler" },
      { name: "placeholder", type: "string", required: false, description: "Trigger placeholder text" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<LabelPicker options={labels} selected={selectedIds} onChange={setSelectedIds} />`,
  },
  {
    name: "AssigneePicker",
    slug: "assignee-picker",
    importPath: '@sunbeam/beam-ui/components/ui/assignee-picker',
    description: "Multi-select popover for assigning users with avatar display and search.",
    props: [
      { name: "options", type: "UserOption[]", required: true, description: "Available users with id, username, displayName, avatarUrl" },
      { name: "selected", type: "string[]", required: true, description: "Selected user IDs" },
      { name: "onChange", type: "(selected: string[]) => void", required: true, description: "Selection change handler" },
      { name: "placeholder", type: "string", required: false, description: "Trigger placeholder text" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<AssigneePicker options={users} selected={assigneeIds} onChange={setAssigneeIds} />`,
  },
  {
    name: "MilestonePicker",
    slug: "milestone-picker",
    importPath: '@sunbeam/beam-ui/components/ui/milestone-picker',
    description: "Single-select popover for milestones with progress indicators.",
    props: [
      { name: "options", type: "MilestoneOption[]", required: true, description: "Available milestones with id, title, dueDate, progress, open, closed" },
      { name: "selected", type: "string | null", required: true, description: "Selected milestone ID" },
      { name: "onChange", type: "(selected: string | null) => void", required: true, description: "Selection change handler" },
      { name: "placeholder", type: "string", required: false, description: "Trigger placeholder text" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<MilestonePicker options={milestones} selected={milestoneId} onChange={setMilestoneId} />`,
  },
  {
    name: "BranchSelector",
    slug: "branch-selector",
    importPath: '@sunbeam/beam-ui/components/ui/branch-selector',
    description: "Branch/tag selector popover with tabs, search, and create-branch support.",
    props: [
      { name: "branches", type: "string[]", required: true, description: "Available branch names" },
      { name: "tags", type: "string[]", required: true, description: "Available tag names" },
      { name: "current", type: "string", required: true, description: "Currently selected ref" },
      { name: "defaultBranch", type: "string", required: false, description: "Default branch name" },
      { name: "onChange", type: "(ref: string) => void", required: true, description: "Ref change handler" },
      { name: "onCreateBranch", type: "(name: string) => void", required: false, description: "Create branch callback" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<BranchSelector branches={["main", "dev"]} tags={["v1.0"]} current="main" onChange={setRef} />`,
    features: ["Tabbed Branches/Tags view", "Fuzzy search filtering", "Create new branch inline"],
  },

  // ── Complex ──────────────────────────────────────────────────────
  {
    name: "SyntaxHighlighter",
    slug: "syntax-highlighter",
    importPath: '@sunbeam/beam-ui/components/ui/syntax-highlighter',
    description: "Code syntax highlighting powered by Shiki with custom Beam light/dark themes.",
    props: [
      { name: "code", type: "string", required: true, description: "Source code to highlight" },
      { name: "language", type: "string", required: true, description: "Language identifier (e.g. 'typescript')" },
      { name: "theme", type: '"light" | "dark"', required: false, description: "Color theme override" },
      { name: "showLineNumbers", type: "boolean", required: false, description: "Display line numbers" },
      { name: "highlightLines", type: "number[]", required: false, description: "Lines to highlight" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<SyntaxHighlighter code="const x = 1;" language="typescript" showLineNumbers />`,
    features: ["Shiki-powered highlighting", "Custom Beam dark/light themes", "Line number gutter", "Line highlighting"],
  },
  {
    name: "CodeEditor",
    slug: "code-editor",
    importPath: '@sunbeam/beam-ui/components/ui/code-editor',
    description: "Full code editor powered by CodeMirror 6 with Beam syntax themes and language support.",
    props: [
      { name: "value", type: "string", required: true, description: "Editor content" },
      { name: "onChange", type: "(value: string) => void", required: false, description: "Content change handler" },
      { name: "language", type: "string", required: false, description: "Language mode" },
      { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
      { name: "readOnly", type: "boolean", required: false, description: "Read-only mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<CodeEditor value={code} onChange={setCode} language="javascript" />`,
    features: ["CodeMirror 6 engine", "Beam syntax themes (light/dark)", "Line numbers, active line highlight", "Search, history, key bindings"],
  },
  {
    name: "MarkdownRenderer",
    slug: "markdown-renderer",
    importPath: '@sunbeam/beam-ui/components/ui/markdown-renderer',
    description: "Renders GitHub Flavored Markdown to styled HTML using unified/remark/rehype pipeline.",
    props: [
      { name: "content", type: "string", required: true, description: "Markdown string to render" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<MarkdownRenderer content="# Hello\\n\\nWorld" />`,
    features: ["GFM support (tables, task lists, strikethrough)", "HTML sanitization", "Theme-aware styling"],
  },
  {
    name: "MarkdownEditor",
    slug: "markdown-editor",
    importPath: '@sunbeam/beam-ui/components/ui/markdown-editor',
    description: "Write/preview markdown editor with formatting toolbar.",
    props: [
      { name: "value", type: "string", required: true, description: "Markdown content" },
      { name: "onChange", type: "(value: string) => void", required: true, description: "Content change handler" },
      { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
      { name: "minHeight", type: "string", required: false, description: "Minimum editor height" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<MarkdownEditor value={md} onChange={setMd} placeholder="Write something..." />`,
    features: ["Write/Preview tabs", "Formatting toolbar (bold, italic, link, code, etc.)", "Live markdown preview"],
  },
  {
    name: "DiffViewer",
    slug: "diff-viewer",
    importPath: '@sunbeam/beam-ui/components/ui/diff-viewer',
    description: "Side-by-side or unified diff viewer for code review.",
    props: [
      { name: "hunks", type: "DiffHunk[]", required: true, description: "Diff hunks with header and lines" },
      { name: "oldFileName", type: "string", required: false, description: "Original file name" },
      { name: "newFileName", type: "string", required: false, description: "New file name" },
      { name: "mode", type: '"unified" | "split"', required: false, description: "View mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<DiffViewer hunks={diffHunks} oldFileName="old.ts" newFileName="new.ts" mode="split" />`,
    features: ["Unified and split view modes", "Line number gutters", "Add/remove/context line coloring"],
  },
  {
    name: "CommentThread",
    slug: "comment-thread",
    importPath: '@sunbeam/beam-ui/components/ui/comment-thread',
    description: "Threaded comment display with markdown rendering, reactions, and timeline events.",
    props: [
      { name: "comments", type: "Comment[]", required: true, description: "Comment objects with author, body, reactions" },
      { name: "events", type: "TimelineEvent[]", required: false, description: "Timeline events (labels, merges, etc.)" },
      { name: "onAddComment", type: "(body: string) => void", required: false, description: "New comment handler" },
      { name: "onReact", type: "(commentId: string, emoji: string) => void", required: false, description: "Reaction handler" },
      { name: "currentUser", type: "object", required: false, description: "Current user for reply form" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<CommentThread comments={comments} onAddComment={handleAdd} />`,
    features: ["Markdown-rendered comment bodies", "Emoji reactions", "Timeline events (labels, merges, etc.)", "Reply editor"],
  },
  {
    name: "KanbanBoard",
    slug: "kanban-board",
    importPath: '@sunbeam/beam-ui/components/ui/kanban-board',
    description: "Drag-and-drop Kanban board built on dnd-kit with columns and cards.",
    props: [
      { name: "columns", type: "KanbanColumn[]", required: true, description: "Column definitions with id, title, cardIds" },
      { name: "cards", type: "Record<string, KanbanCard>", required: true, description: "Card data keyed by id" },
      { name: "onMove", type: "(cardId: string, fromCol: string, toCol: string, index: number) => void", required: false, description: "Card move handler" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<KanbanBoard columns={cols} cards={cardMap} onMove={handleMove} />`,
    features: ["Drag-and-drop via dnd-kit", "Sortable cards within columns", "Cross-column card movement", "Card labels and assignee avatars"],
  },
  {
    name: "CommitGraph",
    slug: "commit-graph",
    importPath: '@sunbeam/beam-ui/components/ui/commit-graph',
    description: "Git commit history visualization with branch lanes and merge paths.",
    props: [
      { name: "commits", type: "CommitNode[]", required: true, description: "Commit objects with hash, message, author, parents, branch, tags" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<CommitGraph commits={gitLog} />`,
    features: ["SVG branch lane rendering", "Merge path visualization", "Branch and tag labels", "Commit metadata display"],
  },
  {
    name: "Charts",
    slug: "charts",
    importPath: '@sunbeam/beam-ui/components/ui/charts',
    description: "Chart components (Line, Bar, Pie, Area) built on Recharts with Beam theming.",
    props: [
      { name: "data", type: "ChartDataPoint[]", required: true, description: "Data points with label and numeric values" },
      { name: "dataKeys", type: "string[]", required: true, description: "Keys to plot from data" },
      { name: "height", type: "number", required: false, description: "Chart height in pixels" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<LineChart data={[{ label: "Jan", value: 100 }]} dataKeys={["value"]} />`,
    features: ["LineChart, BarChart, PieChart, AreaChart", "Responsive containers", "Beam color palette", "Tooltips and legends"],
  },
  {
    name: "DiagramRenderer",
    slug: "diagram-renderer",
    importPath: '@sunbeam/beam-ui/components/ui/diagram-renderer',
    description: "Renders Mermaid diagram definitions to SVG with Beam theming.",
    props: [
      { name: "code", type: "string", required: true, description: "Mermaid diagram definition" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<DiagramRenderer code="graph TD; A-->B; B-->C;" />`,
    features: ["Mermaid.js rendering", "Beam-themed colors (light/dark)", "Error fallback display"],
  },
  {
    name: "MathRenderer",
    slug: "math-renderer",
    importPath: '@sunbeam/beam-ui/components/ui/math-renderer',
    description: "Renders LaTeX math expressions using KaTeX.",
    props: [
      { name: "math", type: "string", required: true, description: "LaTeX expression" },
      { name: "display", type: "boolean", required: false, description: "Display mode (block) vs inline" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<MathRenderer math="E = mc^2" display />`,
    features: ["KaTeX rendering engine", "Display and inline modes", "Error fallback"],
  },
  {
    name: "ActivityHeatmap",
    slug: "activity-heatmap",
    importPath: '@sunbeam/beam-ui/components/ui/activity-heatmap',
    description: "GitHub-style contribution activity heatmap for the past year.",
    props: [
      { name: "data", type: "ActivityDay[]", required: true, description: "Array of { date, count } entries" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<ActivityHeatmap data={[{ date: "2026-01-15", count: 5 }]} />`,
    features: ["365-day grid layout", "5-level color intensity", "Month labels", "Theme-aware colors"],
  },
  {
    name: "NotificationCenter",
    slug: "notification-center",
    importPath: '@sunbeam/beam-ui/components/ui/notification-center',
    description: "Popover notification list with type icons and mark-read functionality.",
    props: [
      { name: "notifications", type: "Notification[]", required: true, description: "Notification objects with id, type, title, repo, timestamp, read" },
      { name: "onMarkRead", type: "(id: string) => void", required: true, description: "Mark single notification read" },
      { name: "onMarkAllRead", type: "() => void", required: true, description: "Mark all notifications read" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<NotificationCenter notifications={notifs} onMarkRead={markRead} onMarkAllRead={markAllRead} />`,
    features: ["Type-specific icons (issue, PR, release, mention, review)", "Unread badge count", "Mark all read action"],
  },
  {
    name: "FileList",
    slug: "file-list",
    importPath: '@sunbeam/beam-ui/components/ui/file-list',
    description: "File browser with list/grid layouts, selection, and metadata display.",
    props: [
      { name: "items", type: "FileItem[]", required: true, description: "File items with id, name, type, size, modified" },
      { name: "selected", type: "Set<string>", required: true, description: "Selected file IDs" },
      { name: "onSelect", type: "(selected: Set<string>) => void", required: true, description: "Selection change handler" },
      { name: "onOpen", type: "(item: FileItem) => void", required: false, description: "File/folder open handler" },
      { name: "layout", type: '"list" | "grid"', required: false, description: "View layout mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<FileList items={files} selected={selectedIds} onSelect={setSelectedIds} />`,
    features: ["List and grid layouts", "File/folder type icons", "Multi-select with checkboxes", "Size and modified metadata"],
  },
  {
    name: "FileUpload",
    slug: "file-upload",
    importPath: '@sunbeam/beam-ui/components/ui/file-upload',
    description: "Drag-and-drop file upload zone with accept filter and keyboard support.",
    props: [
      { name: "onFiles", type: "(files: File[]) => void", required: true, description: "File selection handler" },
      { name: "accept", type: "string", required: false, description: "Accepted MIME types" },
      { name: "multiple", type: "boolean", required: false, description: "Allow multiple files" },
      { name: "disabled", type: "boolean", required: false, description: "Disable uploads" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `<FileUpload onFiles={handleFiles} accept="image/*" multiple />`,
    features: ["Drag-and-drop zone", "Click to browse", "Keyboard accessible", "File count display"],
  },

  // ── Infrastructure ───────────────────────────────────────────────
  {
    name: "Form",
    slug: "form",
    importPath: '@sunbeam/beam-ui/form',
    description: "Type-safe form wrapper integrating Zod schema validation with React Hook Form.",
    props: [
      { name: "schema", type: "z.ZodSchema<T>", required: true, description: "Zod validation schema" },
      { name: "defaultValues", type: "DefaultValues<T>", required: false, description: "Initial form values" },
      { name: "onSubmit", type: "(data: T) => void | Promise<void>", required: true, description: "Validated submit handler" },
      { name: "children", type: "(methods: UseFormReturn<T>) => ReactNode", required: true, description: "Render function receiving form methods" },
      { name: "className", type: "string", required: false, description: "Additional CSS class" },
    ],
    usage: `import { Form, z } from "@sunbeam/beam-ui/form";\n\n<Form schema={z.object({ name: z.string().min(1) })} onSubmit={handleSubmit}>\n  {({ register, formState }) => (\n    <>\n      <input {...register("name")} />\n      <button type="submit">Submit</button>\n    </>\n  )}\n</Form>`,
    features: ["Zod schema validation", "React Hook Form integration", "Type-safe form methods", "Re-exports z, useForm, zodResolver"],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function propsTable(props: ComponentProp[]): string {
  const rows = props.map(
    (p) =>
      `| ${p.name} | \`${p.type}\` | ${p.required ? "Yes" : "No"} | ${p.description} |`
  );
  return [
    "| Prop | Type | Required | Description |",
    "|------|------|----------|-------------|",
    ...rows,
  ].join("\n");
}

function componentOneLiner(c: ComponentDef): string {
  return `- **${c.name}** - ${c.description}  \n  \`import { ${c.name} } from "${c.importPath}"\``;
}

/* ------------------------------------------------------------------ */
/*  Generate llms.txt                                                  */
/* ------------------------------------------------------------------ */

function generateLlmsTxt(): string {
  const componentList = COMPONENTS.map(componentOneLiner).join("\n");

  return `# Beam Design Language

> A comprehensive React component library by Sunbeam Studios for building design system interfaces.

## Overview
- Package: @sunbeam/beam-ui
- Registry: https://src.sunbeam.pt/api/packages/studio/npm/
- Source: https://src.sunbeam.pt/studio/beam-ui
- Docs: https://design.sunbeam.pt

## Install
\`\`\`bash
npm install @sunbeam/beam-ui --registry=https://src.sunbeam.pt/api/packages/studio/npm/
\`\`\`

## Stack
React 19, Panda CSS, Ark UI v4, TypeScript

## Components
${componentList}

## Foundations
- **Colors**: Warm sunbeam palette with semantic tokens for light/dark mode (sunbeam.orange #fa520f, sunshine scale, ivory/cream surfaces)
- **Typography**: Ysabeau Infant (body/heading), Monaspace Argon (mono)
- **Spacing**: 4px base unit scale
- **Elevation**: Golden shadow system
- **Accessibility**: Section 508 + WCAG 2.1 AA compliant

## Full Documentation
For complete props, usage examples, and API details: [/llms-full.txt](https://design.sunbeam.pt/llms-full.txt)

## Per-Component Docs
Each component has a dedicated markdown file at: \`/docs/{component-slug}.md\`

## Rendered Pages
To view the fully rendered HTML page with live DOM structure, append \`?render=html\` to any page URL:
\`https://design.sunbeam.pt/components/button?render=html\`
`;
}

/* ------------------------------------------------------------------ */
/*  Generate llms-full.txt                                             */
/* ------------------------------------------------------------------ */

function generateLlmsFullTxt(): string {
  const sections = COMPONENTS.map((c) => {
    let section = `### ${c.name}

> ${c.description}

**Import:**
\`\`\`tsx
import { ${c.name} } from "${c.importPath}"
\`\`\`

**Props:**
${propsTable(c.props)}

**Usage:**
\`\`\`tsx
${c.usage}
\`\`\``;

    if (c.variants) {
      section += `\n\n**Variants:**\n${c.variants.map((v) => `- ${v}`).join("\n")}`;
    }

    if (c.features) {
      section += `\n\n**Features:**\n${c.features.map((f) => `- ${f}`).join("\n")}`;
    }

    return section;
  }).join("\n\n---\n\n");

  return `# Beam Design Language — Full API Reference

> A comprehensive React component library by Sunbeam Studios for building design system interfaces.

## Overview
- **Package:** \`@sunbeam/beam-ui\`
- **Registry:** https://src.sunbeam.pt/api/packages/studio/npm/
- **Source:** https://src.sunbeam.pt/studio/beam-ui
- **Docs:** https://design.sunbeam.pt
- **Stack:** React 19, Panda CSS, Ark UI v4, TypeScript

## Install
\`\`\`bash
npm install @sunbeam/beam-ui --registry=https://src.sunbeam.pt/api/packages/studio/npm/
\`\`\`

## Foundations
- **Colors:** Warm sunbeam palette — primary orange (#fa520f), sunshine scale (#ff8a00 to #ffe295), semantic tokens for light/dark mode
- **Typography:** Ysabeau Infant (body/heading), Monaspace Argon (monospace)
- **Spacing:** 4px base unit scale
- **Elevation:** Golden shadow system with hover lift effects
- **Accessibility:** Section 508 + WCAG 2.1 AA compliant, keyboard navigable, screen reader tested

## Components

${sections}
`;
}

/* ------------------------------------------------------------------ */
/*  Generate per-component markdown                                    */
/* ------------------------------------------------------------------ */

function generateComponentDoc(c: ComponentDef): string {
  const pagePath = `/components/${c.slug}`;
  let doc = `# ${c.name}

> ${c.description}

> **[View rendered page](https://design.sunbeam.pt${pagePath}?render=html)** — see the live component with full DOM structure and styling.

## Import
\`\`\`tsx
import { ${c.name} } from "${c.importPath}"
\`\`\`

## Props
${propsTable(c.props)}

## Usage
\`\`\`tsx
${c.usage}
\`\`\``;

  if (c.variants) {
    doc += `\n\n## Variants\n${c.variants.map((v) => `- ${v}`).join("\n")}`;
  }

  if (c.features) {
    doc += `\n\n## Features\n${c.features.map((f) => `- ${f}`).join("\n")}`;
  }

  doc += `\n\n---\n*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*\n`;

  return doc;
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

function main() {
  ensureDir(PUBLIC);
  ensureDir(DOCS_DIR);

  // llms.txt
  const llmsTxt = generateLlmsTxt();
  writeFileSync(resolve(PUBLIC, "llms.txt"), llmsTxt, "utf-8");
  console.log(`  wrote llms.txt (${llmsTxt.length} bytes)`);

  // llms-full.txt
  const llmsFullTxt = generateLlmsFullTxt();
  writeFileSync(resolve(PUBLIC, "llms-full.txt"), llmsFullTxt, "utf-8");
  console.log(`  wrote llms-full.txt (${llmsFullTxt.length} bytes)`);

  // Per-component docs
  for (const c of COMPONENTS) {
    const doc = generateComponentDoc(c);
    const filePath = resolve(DOCS_DIR, `${c.slug}.md`);
    writeFileSync(filePath, doc, "utf-8");
    console.log(`  wrote docs/${c.slug}.md`);
  }

  console.log(`\nGenerated ${COMPONENTS.length} component docs + llms.txt + llms-full.txt`);
}

main();
