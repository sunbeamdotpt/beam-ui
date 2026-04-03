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
      { label: "Avatar", href: "/components/avatar" },
      { label: "Badge", href: "/components/badge" },
      { label: "Button", href: "/components/button" },
      { label: "Callout", href: "/components/callout" },
      { label: "Card", href: "/components/card" },
      { label: "Checkbox", href: "/components/checkbox" },
      { label: "Clipboard", href: "/components/clipboard" },
      { label: "CodeBlock", href: "/components/code-block" },
      { label: "Combobox", href: "/components/combobox" },
      { label: "ContextMenu", href: "/components/context-menu" },
      { label: "Dialog", href: "/components/dialog" },
      { label: "DropdownMenu", href: "/components/dropdown-menu" },
      { label: "Editable", href: "/components/editable" },
      { label: "EmptyState", href: "/components/empty-state" },
      { label: "FileList", href: "/components/file-list" },
      { label: "FileUpload", href: "/components/file-upload" },
      { label: "HoverCard", href: "/components/hover-card" },
      { label: "Icon", href: "/components/icon" },
      { label: "Kbd", href: "/components/kbd" },
      { label: "List", href: "/components/list" },
      { label: "NumberInput", href: "/components/number-input" },
      { label: "Pagination", href: "/components/pagination" },
      { label: "PinInput", href: "/components/pin-input" },
      { label: "Popover", href: "/components/popover" },
      { label: "ProgressBar", href: "/components/progress-bar" },
      { label: "RadioGroup", href: "/components/radio-group" },
      { label: "ScrollArea", href: "/components/scroll-area" },
      { label: "SearchInput", href: "/components/search-input" },
      { label: "Select", href: "/components/select" },
      { label: "Skeleton", href: "/components/skeleton" },
      { label: "Slider", href: "/components/slider" },
      { label: "Splitter", href: "/components/splitter" },
      { label: "Steps", href: "/components/steps" },
      { label: "Switch", href: "/components/switch" },
      { label: "Table", href: "/components/table" },
      { label: "Tabs", href: "/components/tabs" },
      { label: "TagsInput", href: "/components/tags-input" },
      { label: "TextInput", href: "/components/text-input" },
      { label: "Toast", href: "/components/toast" },
      { label: "Toggle", href: "/components/toggle" },
      { label: "ToggleGroup", href: "/components/toggle-group" },
      { label: "Tooltip", href: "/components/tooltip" },
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
