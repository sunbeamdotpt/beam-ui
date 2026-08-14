/**
 * Plasmic component-registry overrides — hand-curated, merged over the
 * generated skeleton (components.generated.tsx) at registration time.
 *
 * - skipComponents: never registered in Studio (see scope doc §4 triage).
 * - overrides: per-component meta patches; `props` are merged per-key over
 *   the generated prop metadata (set a prop to null to hide it). Slot props
 *   take Plasmic's `defaultValue` (any ReactNode, so JSX works here).
 *
 * This module is imported BOTH by the build-time generator
 * (scripts/generate-plasmic-registry.ts, for skipComponents) and by the
 * generated runtime module — keep it free of side effects.
 */

import type { CSSProperties } from "react";

/** Description of an event-handler argument for Plasmic Studio interactions. */
export interface EventHandlerArg {
  name: string;
  type: string;
}

export interface PropOverride {
  type?: string;
  options?: (string | number)[];
  displayName?: string;
  description?: string;
  defaultValue?: unknown;
  hidden?: boolean;
  advanced?: boolean;
  allowedComponents?: string[];
  required?: boolean;
  editOnly?: boolean;
  uncontrolledProp?: string;
  argTypes?: EventHandlerArg[];
}

export interface ComponentOverride {
  displayName?: string;
  description?: string;
  props?: Record<string, PropOverride | null>;
  states?: Record<string, Record<string, unknown>>;
  defaultStyles?: CSSProperties;
}

/** Components that must not appear in Studio. */
export const skipComponents: string[] = [
  // DnD kit drag interactions fight the Studio canvas; needs a staticMode
  // prop in the library + a usePlasmicCanvasContext() wrapper (scope doc §4).
  "KanbanBoard",
  // Keyboard-driven modal — no meaningful canvas representation.
  "CommandPalette",
  // Page-level layouts are composed in code, not dragged onto artboards.
  "ApiLayout",
  "DocsLayout",
  "FullwidthLayout",
  // Full-application shell is a page wrapper, not a canvas building block.
  "Shell",
  // Shell sub-components are composed inside Shell; not standalone artboard blocks.
  "Header",
  "Footer",
  "Sidebar",
];

// Shared sample data sets reused across data-driven components.
const SAMPLE_BRANCHES = ["main", "develop", "feature/auth"];
const SAMPLE_TAGS = ["v1.0.0", "v1.1.0"];
const SAMPLE_OPTIONS = [
  { value: "option-1", label: "Option 1" },
  { value: "option-2", label: "Option 2" },
];
const SAMPLE_TABS = [
  { value: "tab-1", label: "Overview" },
  { value: "tab-2", label: "Details" },
];
const SAMPLE_STEPS = [
  { title: "Personal", description: "Your info" },
  { title: "Payment" },
  { title: "Review" },
];
const SAMPLE_WIZARD_STEPS = [
  { title: "Profile", content: "Configure your profile." },
  { title: "Preferences", content: "Set your preferences." },
];

// ------------------------------------------------------------------
// Sample data for advanced object/array props so every dragged
// component renders on the Studio canvas without manual data entry.
// ------------------------------------------------------------------
const SAMPLE_ACCORDION_ITEMS = [
  {
    value: "overview",
    title: "Overview",
    content: "High-level summary of the feature and its goals.",
  },
  {
    value: "details",
    title: "Details",
    content: "Implementation notes, edge cases, and dependencies.",
  },
];

const SAMPLE_ACTIVITY_HEATMAP = Array.from({ length: 60 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (59 - i));
  return {
    date: d.toISOString().split("T")[0],
    count: [0, 0, 1, 2, 3, 5, 8, 4, 2, 1][Math.floor(Math.random() * 10)],
  };
});

const SAMPLE_ASSIGNEES = [
  { id: "user-1", username: "ada", displayName: "Ada Lovelace" },
  { id: "user-2", username: "grace", displayName: "Grace Hopper" },
  { id: "user-3", username: "alan", displayName: "Alan Turing" },
];

const SAMPLE_CHART_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const SAMPLE_CHART_DATA = SAMPLE_CHART_LABELS.map((label) => ({
  label,
  revenue: Math.floor(Math.random() * 5000) + 2000,
  costs: Math.floor(Math.random() * 3000) + 1000,
}));

const SAMPLE_LINE_LINES = [
  { key: "revenue", label: "Revenue" },
  { key: "costs", label: "Costs" },
];

const SAMPLE_BAR_BARS = [
  { key: "revenue", label: "Revenue" },
  { key: "costs", label: "Costs" },
];

const SAMPLE_AREA_AREAS = [
  { key: "revenue", label: "Revenue" },
  { key: "costs", label: "Costs" },
];

const SAMPLE_PIE_DATA = [
  { name: "Completed", value: 65 },
  { name: "In Progress", value: 25 },
  { name: "Blocked", value: 10 },
];

const SAMPLE_CODE_TABS = [
  {
    label: "JavaScript",
    content: "console.log('Hello, Beam!');",
  },
  {
    label: "Python",
    content: "print('Hello, Beam!')",
  },
];

const SAMPLE_COMMENTS = [
  {
    id: "comment-1",
    author: { username: "ada", displayName: "Ada Lovelace" },
    body:
      "This looks great! One small question about the edge case on line 42.",
    createdAt: "2026-08-10T09:30:00Z",
    reactions: [{ emoji: "👍", count: 3, reacted: true }],
  },
  {
    id: "event-1",
    type: "label",
    actor: "grace",
    detail: "added label ready-for-review",
    createdAt: "2026-08-10T10:00:00Z",
  },
];

const SAMPLE_COMMITS = [
  {
    hash: "a1b2c3d4e5f6789012345678901234567890abcd",
    shortHash: "a1b2c3d",
    message: "Initial scaffold",
    author: "Ada Lovelace",
    date: "2 days ago",
    parents: [],
    branch: "main",
    tags: ["v0.1.0"],
  },
  {
    hash: "b2c3d4e5f6a7890123456789012345678901bcde",
    shortHash: "b2c3d4e",
    message: "Add dark mode tokens",
    author: "Grace Hopper",
    date: "1 day ago",
    parents: ["a1b2c3d4e5f6789012345678901234567890abcd"],
    branch: "main",
  },
  {
    hash: "c3d4e5f6a7b8901234567890123456789012cdef",
    shortHash: "c3d4e5f",
    message: "Wire Plasmic host",
    author: "Alan Turing",
    date: "4 hours ago",
    parents: ["b2c3d4e5f6a7890123456789012345678901bcde"],
    branch: "feature/plasmic",
  },
];

const SAMPLE_CONTEXT_MENU_ITEMS = [
  { label: "Edit", icon: "edit" },
  { label: "Duplicate", icon: "content_copy" },
  { label: "Delete", icon: "delete", danger: true },
];

const SAMPLE_DIFF_HUNKS = [
  {
    header: "@@ -1,5 +1,5 @@",
    lines: [
      {
        type: "context",
        content: "import { Button } from '@sunbeam/beam-ui';",
        oldLineNumber: 1,
        newLineNumber: 1,
      },
      { type: "remove", content: "const theme = 'light';", oldLineNumber: 2 },
      { type: "add", content: "const theme = 'dark';", newLineNumber: 2 },
      {
        type: "context",
        content: "export function Hero() {",
        oldLineNumber: 3,
        newLineNumber: 3,
      },
    ],
  },
];

const SAMPLE_FILES = [
  {
    id: "f1",
    name: "README.md",
    type: "file",
    size: "12 KB",
    modified: "2 hours ago",
  },
  {
    id: "f2",
    name: "package.json",
    type: "file",
    size: "3 KB",
    modified: "1 day ago",
  },
  { id: "f3", name: "src", type: "folder", modified: "3 days ago" },
];

const SAMPLE_KANBAN_CARD = {
  id: "card-1",
  title: "Default dark mode in Plasmic canvas",
  labels: [{ name: "ui", color: "orange" }, { name: "plasmic", color: "gold" }],
  assignees: [{ name: "Ada Lovelace" }],
  milestone: "v0.15.0",
  dueDate: "Aug 21",
  status: "In Progress",
  priority: "high",
  checklist: [
    { id: "chk-1", title: "Scope components", done: true },
    { id: "chk-2", title: "Wire tokens", done: true },
    { id: "chk-3", title: "Test interactive mode", done: false },
  ],
  commentCount: 4,
  attachmentCount: 1,
  shortId: "BEAM-204",
};

const SAMPLE_LABELS = [
  {
    id: "label-1",
    name: "bug",
    color: "#fa520f",
    description: "Something is broken",
  },
  {
    id: "label-2",
    name: "feature",
    color: "#4a9eff",
    description: "New capability",
  },
  {
    id: "label-3",
    name: "docs",
    color: "#5bb8a6",
    description: "Documentation",
  },
];

const SAMPLE_LIST_ITEMS = [
  {
    label: "Installation",
    icon: "download",
    href: "/foundations/installation",
  },
  { label: "Colors", icon: "palette", href: "/foundations/colors" },
  {
    label: "Typography",
    description: "Fonts, weights, and sizes",
    icon: "text_fields",
    href: "/foundations/typography",
  },
];

const SAMPLE_NOTIFICATION = {
  id: "notif-1",
  icon: "merge",
  title: "PR #42 merged",
  subtitle: "feat/dark-mode into main",
  group: "beam-ui",
  timestamp: "10 min ago",
  read: false,
};

const SAMPLE_NOTIFICATIONS = [
  SAMPLE_NOTIFICATION,
  {
    id: "notif-2",
    icon: "bug_report",
    title: "Issue assigned to you",
    subtitle: "Button sizing in Plasmic canvas",
    group: "beam-ui",
    timestamp: "1 hour ago",
    read: true,
  },
];

const SAMPLE_REACTIONS = [
  { emoji: "👍", count: 5, reacted: true },
  { emoji: "🎉", count: 2, reacted: false },
  { emoji: "❤️", count: 1, reacted: false },
];

const SAMPLE_RIGHT_RAIL_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "Usage", id: "usage" },
  { label: "Props", id: "props" },
];

const SAMPLE_STAT_BAR = {
  speed: 4,
  performance: 5,
  modalities: ["text", "image", "audio"],
  context: "200K",
  priceIn: "$0.50",
  priceOut: "$1.50",
};

const SAMPLE_TABLE_COLUMNS = [
  { key: "name", label: "Name", sortable: true },
  { key: "status", label: "Status" },
  { key: "role", label: "Role" },
];

const SAMPLE_TABLE_ROWS = [
  { id: "1", name: "Ada Lovelace", status: "Active", role: "Engineer" },
  { id: "2", name: "Grace Hopper", status: "Active", role: "Engineer" },
  { id: "3", name: "Alan Turing", status: "Away", role: "Researcher" },
];

const SAMPLE_TAG_STRINGS = ["typescript", "react", "design-system"];

const SAMPLE_TRANSFER_AVAILABLE = [
  { id: "perm-1", label: "Read users", icon: "person" },
  { id: "perm-2", label: "Write repos", icon: "repo" },
  { id: "perm-3", label: "Deploy", icon: "rocket" },
];

const SAMPLE_TRANSFER_SELECTED = [
  { id: "perm-4", label: "Read repos", icon: "repo" },
];

const SAMPLE_TREE_NODES = [
  {
    id: "src",
    label: "src",
    children: [
      { id: "src/index.ts", label: "index.ts" },
      {
        id: "src/components",
        label: "components",
        children: [
          { id: "src/components/ui", label: "ui" },
          { id: "src/components/shell", label: "shell" },
        ],
      },
    ],
  },
];

const SAMPLE_WORK_ITEMS = [
  {
    id: "wi-1",
    title: "Add Plasmic app-host to container",
    meta: "opened 2 hours ago by Ada",
    labels: [{ name: "plasmic", color: "#fa520f" }],
    status: "Open",
    commentCount: 3,
  },
  {
    id: "wi-2",
    title: "Curate default sample data for all components",
    meta: "opened 1 day ago by Grace",
    labels: [{ name: "data", color: "#4a9eff" }],
    branches: { base: "main", head: "feat/sample-data" },
    status: "Open",
    commentCount: 0,
  },
];

export const overrides: Record<string, ComponentOverride> = {
  // ------------------------------------------------------------------
  // Modals are closed unless `open` is set — without a default they render
  // as invisible 0×0 instances on the canvas.
  // ------------------------------------------------------------------
  Dialog: {
    props: {
      open: { defaultValue: true },
      title: { defaultValue: "Dialog title" },
      actions: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Save",
        },
      },
    },
  },
  WizardModal: {
    props: {
      open: { defaultValue: true },
      title: { defaultValue: "Wizard" },
      steps: { defaultValue: SAMPLE_WIZARD_STEPS },
    },
  },
  Wizard: {
    props: {
      steps: { defaultValue: SAMPLE_WIZARD_STEPS },
    },
  },

  // ------------------------------------------------------------------
  // Simple scalar defaults so components render with design-language
  // placeholder content instead of blank 0×0 instances.
  // ------------------------------------------------------------------
  Avatar: {
    props: {
      name: { defaultValue: "Ada Lovelace" },
    },
  },
  BentoItem: {
    props: {
      variant: { defaultValue: "small" },
      title: { defaultValue: "Bento item" },
      description: { defaultValue: "Short description of this bento item." },
      difficulty: { defaultValue: "Beginner" },
      category: { defaultValue: "Web Development" },
    },
  },
  BranchSelector: {
    props: {
      branches: { defaultValue: SAMPLE_BRANCHES },
      tags: { defaultValue: SAMPLE_TAGS },
      current: { defaultValue: "main" },
      defaultBranch: { defaultValue: "main" },
      open: { defaultValue: false },
      onOpenChange: {
        type: "eventHandler",
        argTypes: [{ name: "open", type: "boolean" }],
      },
    },
    states: {
      open: {
        type: "writable",
        variableType: "boolean",
        valueProp: "open",
        onChangeProp: "onOpenChange",
      },
    },
  },
  Breadcrumbs: {
    props: {
      items: {
        defaultValue: [
          { label: "Home", href: "/" },
          { label: "Components", href: "/components" },
          { label: "Breadcrumbs" },
        ],
      },
    },
  },
  Checkbox: {
    props: {
      checked: { defaultValue: false, required: false },
      label: { defaultValue: "Accept terms" },
    },
  },
  Clipboard: {
    props: {
      value: { defaultValue: "npm install @sunbeam/beam-ui" },
      // Hide the children slot so Studio uses the styled default "Copy" trigger
      // instead of an unstyled text placeholder.
      children: null,
    },
  },
  CodeEditor: {
    props: {
      value: { defaultValue: "// Start coding\n" },
    },
  },
  ColorPicker: {
    props: {
      value: { defaultValue: "#FF5733" },
    },
  },
  Combobox: {
    props: {
      options: { defaultValue: SAMPLE_OPTIONS },
      value: { defaultValue: "option-1" },
    },
  },
  DiagramRenderer: {
    props: {
      code: { defaultValue: "flowchart TD\n  A[Start] --> B[End]" },
    },
  },
  Editable: {
    props: {
      value: { defaultValue: "Editable text" },
    },
  },
  EmptyState: {
    props: {
      title: { defaultValue: "Nothing here" },
      description: { defaultValue: "Add your first item to get started." },
      action: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Create item",
        },
      },
    },
  },
  FeatureTile: {
    props: {
      name: { defaultValue: "Feature" },
      endpoint: { defaultValue: "/api/feature" },
      icon: { defaultValue: "star" },
    },
  },
  HoverCard: {
    props: {
      trigger: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Hover me",
        },
      },
    },
  },
  Icon: {
    props: {
      name: { defaultValue: "star" },
    },
  },
  LoginForm: {
    props: {
      oauthProviders: { defaultValue: [] },
      error: { defaultValue: "" },
      loading: { defaultValue: false },
    },
  },
  MarkdownEditor: {
    props: {
      value: { defaultValue: "# Hello\n\nStart writing…" },
      onChange: {
        type: "eventHandler",
        argTypes: [{ name: "value", type: "string" }],
      },
    },
    states: {
      value: {
        type: "writable",
        variableType: "text",
        valueProp: "value",
        onChangeProp: "onChange",
      },
    },
  },
  MarkdownRenderer: {
    props: {
      content: { defaultValue: "# Hello\n\nRendered markdown." },
    },
  },
  MathRenderer: {
    props: {
      math: { defaultValue: "E = mc^2" },
    },
  },
  MilestonePicker: {
    props: {
      options: {
        defaultValue: [
          { id: "v1-0", title: "v1.0", progress: 75, open: 3, closed: 9 },
          { id: "v1-1", title: "v1.1", progress: 40, open: 5, closed: 2 },
        ],
      },
      selected: { defaultValue: "v1-0" },
    },
  },
  ModelRow: {
    props: {
      name: { defaultValue: "Solstice 4 Vision" },
      icon: { defaultValue: "model_training" },
      tier: { defaultValue: "Pro" },
      version: { defaultValue: "v1.0" },
      description: { defaultValue: "General-purpose reasoning model." },
    },
  },
  NumberInput: {
    props: {
      value: { defaultValue: 42 },
      label: { defaultValue: "Quantity" },
    },
  },
  Pagination: {
    props: {
      currentPage: { defaultValue: 1 },
      totalPages: { defaultValue: 5 },
    },
  },
  PinInput: {
    props: {
      value: { defaultValue: "1234" },
      label: { defaultValue: "Verification code" },
    },
  },
  Popover: {
    props: {
      trigger: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Open",
        },
      },
    },
  },
  ProgressBar: {
    props: {
      value: { defaultValue: 65 },
    },
  },
  RadioGroup: {
    props: {
      options: { defaultValue: SAMPLE_OPTIONS },
      value: { defaultValue: "option-1" },
      label: { defaultValue: "Choose one" },
    },
  },
  Select: {
    props: {
      options: { defaultValue: SAMPLE_OPTIONS },
      value: { defaultValue: "option-1" },
    },
  },
  Slider: {
    props: {
      value: { defaultValue: 50 },
      label: { defaultValue: "Amount" },
    },
  },
  Steps: {
    props: {
      steps: { defaultValue: SAMPLE_STEPS },
      currentStep: { defaultValue: 1 },
    },
  },
  Switch: {
    props: {
      checked: { defaultValue: false },
      label: { defaultValue: "Enable notifications" },
    },
  },
  SyntaxHighlighter: {
    props: {
      code: { defaultValue: "console.log('hello');" },
      language: { defaultValue: "javascript" },
    },
  },
  Tabs: {
    props: {
      items: { defaultValue: SAMPLE_TABS },
      activeValue: { defaultValue: "tab-1" },
    },
  },
  TextInput: {
    props: {
      value: { defaultValue: "Hello world" },
      label: { defaultValue: "Label" },
    },
  },
  Toast: {
    props: {
      message: { defaultValue: "Operation completed successfully." },
      visible: { defaultValue: true },
    },
  },
  Toggle: {
    props: {
      pressed: { defaultValue: false },
    },
  },
  ToggleGroup: {
    props: {
      items: { defaultValue: SAMPLE_OPTIONS },
      value: { defaultValue: "option-1" },
    },
  },
  Tooltip: {
    props: {
      content: { defaultValue: "Tooltip text" },
    },
  },

  // ------------------------------------------------------------------
  // Data-driven components: every required object/array prop gets
  // sample data so the component renders when dragged onto the canvas.
  // ------------------------------------------------------------------
  Accordion: {
    props: {
      items: { defaultValue: SAMPLE_ACCORDION_ITEMS },
      defaultValue: { defaultValue: ["overview"], advanced: true },
      value: {
        type: "object",
        displayName: "Expanded items",
        description: "Currently expanded accordion item values (controlled).",
        defaultValue: ["overview"],
      },
      onValueChange: {
        type: "eventHandler",
        argTypes: [{ name: "value", type: "object" }],
      },
    },
    states: {
      value: {
        type: "writable",
        variableType: "array",
        valueProp: "value",
        onChangeProp: "onValueChange",
      },
    },
  },
  ActivityHeatmap: {
    props: {
      data: { defaultValue: SAMPLE_ACTIVITY_HEATMAP },
    },
  },
  AssigneePicker: {
    props: {
      options: { defaultValue: SAMPLE_ASSIGNEES },
      selected: { defaultValue: ["user-1"] },
      open: { defaultValue: false },
      onOpenChange: {
        type: "eventHandler",
        argTypes: [{ name: "open", type: "boolean" }],
      },
    },
    states: {
      open: {
        type: "writable",
        variableType: "boolean",
        valueProp: "open",
        onChangeProp: "onOpenChange",
      },
    },
  },
  AreaChart: {
    props: {
      data: { defaultValue: SAMPLE_CHART_DATA },
      areas: { defaultValue: SAMPLE_AREA_AREAS },
    },
    defaultStyles: { width: "100%", minWidth: "300px", height: "300px" },
  },
  BarChart: {
    props: {
      data: { defaultValue: SAMPLE_CHART_DATA },
      bars: { defaultValue: SAMPLE_BAR_BARS },
    },
    defaultStyles: { width: "100%", minWidth: "300px", height: "300px" },
  },
  CodeBlock: {
    props: {
      tabs: { defaultValue: SAMPLE_CODE_TABS },
      showLineNumbers: { defaultValue: true },
    },
  },
  CommentThread: {
    props: {
      items: { defaultValue: SAMPLE_COMMENTS },
    },
  },
  CommitGraph: {
    props: {
      commits: { defaultValue: SAMPLE_COMMITS },
    },
  },
  ContextMenu: {
    props: {
      items: { defaultValue: SAMPLE_CONTEXT_MENU_ITEMS },
      children: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Right-click me",
        },
      },
    },
  },
  DiffViewer: {
    props: {
      hunks: { defaultValue: SAMPLE_DIFF_HUNKS },
      oldFileName: { defaultValue: "theme.ts" },
      newFileName: { defaultValue: "theme.ts" },
    },
  },
  FileList: {
    props: {
      items: { defaultValue: SAMPLE_FILES },
      selected: { defaultValue: [] },
    },
  },
  KanbanCardView: {
    props: {
      card: { defaultValue: SAMPLE_KANBAN_CARD },
    },
  },
  KanbanCardDetail: {
    props: {
      card: { defaultValue: SAMPLE_KANBAN_CARD },
      open: { defaultValue: true },
      onOpenChange: {
        type: "eventHandler",
        argTypes: [{ name: "open", type: "boolean" }],
      },
    },
    states: {
      open: {
        type: "writable",
        variableType: "boolean",
        valueProp: "open",
        onChangeProp: "onOpenChange",
      },
    },
  },
  LabelPicker: {
    props: {
      options: { defaultValue: SAMPLE_LABELS },
      selected: { defaultValue: ["label-1"] },
    },
  },
  LineChart: {
    props: {
      data: { defaultValue: SAMPLE_CHART_DATA },
      lines: { defaultValue: SAMPLE_LINE_LINES },
    },
    defaultStyles: { width: "100%", minWidth: "300px", height: "300px" },
  },
  List: {
    props: {
      items: { defaultValue: SAMPLE_LIST_ITEMS },
    },
  },
  NotificationItem: {
    props: {
      notification: { defaultValue: SAMPLE_NOTIFICATION },
    },
  },
  NotificationCenter: {
    props: {
      notifications: { defaultValue: SAMPLE_NOTIFICATIONS },
    },
  },
  PieChart: {
    props: {
      data: { defaultValue: SAMPLE_PIE_DATA },
    },
    defaultStyles: { width: "100%", minWidth: "300px", height: "300px" },
  },
  ReactionPicker: {
    props: {
      reactions: { defaultValue: SAMPLE_REACTIONS },
    },
  },
  RightRail: {
    props: {
      items: { defaultValue: SAMPLE_RIGHT_RAIL_ITEMS },
      lastUpdated: { defaultValue: "Aug 14, 2026" },
    },
  },
  StatBar: {
    props: {
      stats: { defaultValue: SAMPLE_STAT_BAR },
    },
  },
  Table: {
    props: {
      columns: { defaultValue: SAMPLE_TABLE_COLUMNS },
      rows: { defaultValue: SAMPLE_TABLE_ROWS },
    },
  },
  TagsInput: {
    props: {
      value: { defaultValue: SAMPLE_TAG_STRINGS },
      label: { defaultValue: "Tags" },
    },
  },
  TransferList: {
    props: {
      available: { defaultValue: SAMPLE_TRANSFER_AVAILABLE },
      selected: { defaultValue: SAMPLE_TRANSFER_SELECTED },
    },
  },
  TreeView: {
    props: {
      nodes: { defaultValue: SAMPLE_TREE_NODES },
      activeId: { defaultValue: "src/index.ts" },
    },
  },
  WorkItemList: {
    props: {
      items: { defaultValue: SAMPLE_WORK_ITEMS },
      selected: { defaultValue: [] },
    },
  },
};
