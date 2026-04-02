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
      { label: "Colors", href: "/foundations/colors" },
      { label: "Typography", href: "/foundations/typography" },
      { label: "Spacing", href: "/foundations/spacing" },
      { label: "Elevation", href: "/foundations/elevation" },
    ],
  },
  {
    title: "COMPONENTS",
    items: [
      { label: "Button", href: "/components/button" },
      { label: "Badge", href: "/components/badge" },
      { label: "Card", href: "/components/card" },
      { label: "CodeBlock", href: "/components/code-block" },
      { label: "Callout", href: "/components/callout" },
      { label: "Tabs", href: "/components/tabs" },
      { label: "Icon", href: "/components/icon" },
      { label: "SearchInput", href: "/components/search-input" },
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
      { label: "Guide", href: "/guides/procedural-terrain" },
      { label: "API Reference", href: "/api" },
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
