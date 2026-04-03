export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const headerLinks = [
  { label: "FOUNDATIONS", href: "/foundations/colors" },
  { label: "COMPONENTS", href: "/components/button" },
  { label: "API", href: "/api" },
] as const;

export const docsSidebar: NavSection[] = [
  {
    title: "FOUNDATIONS",
    items: [
      { label: "Accessibility", href: "/foundations/accessibility" },
      { label: "Colors", href: "/foundations/colors" },
      { label: "Typography", href: "/foundations/typography" },
      { label: "Spacing", href: "/foundations/spacing" },
      { label: "Elevation", href: "/foundations/elevation" },
    ],
  },
  {
    title: "COMPONENTS",
    items: [
      { label: "Accordion", href: "/components/accordion" },
      { label: "ActivityHeatmap", href: "/components/activity-heatmap" },
      { label: "AssigneePicker", href: "/components/assignee-picker" },
      {
        label: "AuthForms",
        href: "/components/auth-form",
        children: [
          { label: "LoginForm", href: "/components/login-form" },
          { label: "SignUpForm", href: "/components/signup-form" },
          { label: "ForgotPasswordForm", href: "/components/forgot-password-form" },
          { label: "TwoFactorForm", href: "/components/two-factor-form" },
        ],
      },
      { label: "Avatar", href: "/components/avatar" },
      { label: "Badge", href: "/components/badge" },
      { label: "BranchSelector", href: "/components/branch-selector" },
      { label: "Button", href: "/components/button" },
      { label: "Callout", href: "/components/callout" },
      { label: "Card", href: "/components/card" },
      {
        label: "Charts",
        href: "/components/charts",
        children: [
          { label: "LineChart", href: "/components/line-chart" },
          { label: "BarChart", href: "/components/bar-chart" },
          { label: "PieChart", href: "/components/pie-chart" },
          { label: "AreaChart", href: "/components/area-chart" },
        ],
      },
      { label: "Checkbox", href: "/components/checkbox" },
      { label: "Clipboard", href: "/components/clipboard" },
      { label: "CodeBlock", href: "/components/code-block" },
      { label: "CodeEditor", href: "/components/code-editor" },
      { label: "ColorPicker", href: "/components/color-picker" },
      { label: "Combobox", href: "/components/combobox" },
      { label: "CommentThread", href: "/components/comment-thread" },
      { label: "CommitGraph", href: "/components/commit-graph" },
      { label: "ContextMenu", href: "/components/context-menu" },
      { label: "DatePicker", href: "/components/date-picker" },
      { label: "DiagramRenderer", href: "/components/diagram-renderer" },
      { label: "Dialog", href: "/components/dialog" },
      { label: "DiffViewer", href: "/components/diff-viewer" },
      { label: "DropdownMenu", href: "/components/dropdown-menu" },
      { label: "Editable", href: "/components/editable" },
      { label: "EmptyState", href: "/components/empty-state" },
      { label: "FileList", href: "/components/file-list" },
      { label: "FileUpload", href: "/components/file-upload" },
      { label: "HoverCard", href: "/components/hover-card" },
      { label: "Icon", href: "/components/icon" },
      {
        label: "Kanban",
        href: "/components/kanban-board",
        children: [
          { label: "KanbanBoard", href: "/components/kanban-board" },
          { label: "KanbanCard", href: "/components/kanban-card" },
        ],
      },
      { label: "Kbd", href: "/components/kbd" },
      { label: "LabelPicker", href: "/components/label-picker" },
      { label: "List", href: "/components/list" },
      {
        label: "Markdown",
        href: "/components/markdown-renderer",
        children: [
          { label: "MarkdownRenderer", href: "/components/markdown-renderer" },
          { label: "MarkdownEditor", href: "/components/markdown-editor" },
        ],
      },
      { label: "MathRenderer", href: "/components/math-renderer" },
      { label: "MilestonePicker", href: "/components/milestone-picker" },
      { label: "NotificationCenter", href: "/components/notification-center" },
      { label: "NumberInput", href: "/components/number-input" },
      { label: "Pagination", href: "/components/pagination" },
      { label: "PinInput", href: "/components/pin-input" },
      { label: "Popover", href: "/components/popover" },
      { label: "ProgressBar", href: "/components/progress-bar" },
      { label: "RadioGroup", href: "/components/radio-group" },
      { label: "ReactionPicker", href: "/components/reaction-picker" },
      { label: "ScrollArea", href: "/components/scroll-area" },
      { label: "SearchInput", href: "/components/search-input" },
      { label: "Select", href: "/components/select" },
      { label: "Skeleton", href: "/components/skeleton" },
      { label: "Slider", href: "/components/slider" },
      { label: "Splitter", href: "/components/splitter" },
      { label: "Steps", href: "/components/steps" },
      { label: "Switch", href: "/components/switch" },
      { label: "SyntaxHighlighter", href: "/components/syntax-highlighter" },
      { label: "Table", href: "/components/table" },
      { label: "Tabs", href: "/components/tabs" },
      { label: "TagsInput", href: "/components/tags-input" },
      { label: "TextInput", href: "/components/text-input" },
      { label: "Toast", href: "/components/toast" },
      { label: "Toggle", href: "/components/toggle" },
      { label: "ToggleGroup", href: "/components/toggle-group" },
      { label: "Tooltip", href: "/components/tooltip" },
      { label: "TransferList", href: "/components/transfer-list" },
      { label: "TreeView", href: "/components/tree-view" },
    ],
  },
  {
    title: "LAYOUTS",
    items: [
      { label: "Docs Layout", href: "/layouts/docs" },
      { label: "API Layout", href: "/layouts/api" },
      { label: "Fullwidth Layout", href: "/layouts/fullwidth" },
      { label: "Creators Layout", href: "/layouts/creators" },
    ],
  },
  {
    title: "SHELL",
    items: [
      { label: "Header", href: "/shell/header" },
      { label: "Footer", href: "/shell/footer" },
      { label: "Sidebar", href: "/shell/sidebar" },
      { label: "RightRail", href: "/shell/right-rail" },
      { label: "Breadcrumbs", href: "/shell/breadcrumbs" },
    ],
  },
  {
    title: "EXAMPLES",
    items: [
      { label: "Docs Home", href: "/docs" },
      { label: "Interior Docs", href: "/docs/chat-completions/usage" },
      {
        label: "Models",
        href: "/models",
        children: [
          { label: "Model Gallery", href: "/models" },
          { label: "Model Detail", href: "/models/solstice-4-vision" },
        ],
      },
      { label: "Guide", href: "/guides/procedural-terrain" },
      { label: "API Reference", href: "/api" },
      { label: "Cookbooks", href: "/guides" },
      { label: "Creators", href: "/community" },
    ],
  },
];

export const apiSidebar: NavSection[] = [
  {
    title: "GETTING STARTED",
    items: [
      {
        label: "Chat",
        href: "/api/chat",
        children: [{ label: "POST Chat Completion", href: "/api" }],
      },
      { label: "Fim", href: "/api/fim" },
      { label: "Embeddings", href: "/api/embeddings" },
      { label: "Classifiers", href: "/api/classifiers" },
      { label: "Files", href: "/api/files" },
      { label: "Models", href: "/api/models" },
      { label: "Batch", href: "/api/batch" },
      { label: "Ocr", href: "/api/ocr" },
      { label: "Audio Speech", href: "/api/audio-speech" },
      { label: "Audio Transcriptions", href: "/api/audio-transcriptions" },
    ],
  },
  {
    title: "BETA",
    items: [
      { label: "Beta Agents", href: "/api/beta-agents" },
      { label: "Beta Conversations", href: "/api/beta-conversations" },
      { label: "Beta Libraries", href: "/api/beta-libraries" },
    ],
  },
];

export const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Documentation", href: "/foundations/colors" },
      { label: "API Reference", href: "/api" },
      { label: "Components", href: "/components/button" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "/guides/procedural-terrain" },
      { label: "Foundations", href: "/foundations/colors" },
      { label: "Layouts", href: "/layouts/docs" },
      { label: "Source Control", href: "https://src.sunbeam.pt/studio/beam-ui" },
    ],
  },
];
