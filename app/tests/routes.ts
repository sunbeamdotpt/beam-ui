/**
 * Single source of truth for routes covered by the visual suite.
 *
 * Keep this in sync with `app/src/app.tsx`. A drift test in
 * `tests/visual.spec.ts` guards against silent skips by asserting every
 * `<a href>` in the rendered sidebar resolves to a route listed here.
 */

export type RouteBucket =
  | "top"
  | "foundations"
  | "components"
  | "layouts"
  | "shell"
  | "external";

export interface Route {
  /** Path segment after the baseURL, no leading slash. Empty string = "/". */
  path: string;
  /** Logical grouping; controls the screenshot subdirectory. */
  bucket: RouteBucket;
  /** Filename slug (without .png). */
  slug: string;
  /**
   * Storybook and Beam Sync are served as separate static SPAs, so they
   * don't share the main app Shell. The test uses a looser wait for these.
   */
  external?: boolean;
}

const top: Route[] = [
  { path: "", bucket: "top", slug: "home-tokens" },
  { path: "community", bucket: "top", slug: "community" },
  { path: "guides", bucket: "top", slug: "guides" },
  { path: "guides/procedural-terrain", bucket: "top", slug: "guides-procedural-terrain" },
  { path: "docs", bucket: "top", slug: "docs" },
  { path: "models", bucket: "top", slug: "models" },
  { path: "models/solstice-4-vision", bucket: "top", slug: "models-solstice-4-vision" },
  { path: "api", bucket: "top", slug: "api" },
];

/**
 * Route prefixes whose children are served by a catch-all (`path/*`) route.
 * The drift test ignores sidebar links under these — they're rendered by a
 * single page component and don't need individual manifest entries.
 */
export const catchAllPrefixes: readonly string[] = ["/docs/", "/guides/", "/api/"];

const foundations: Route[] = [
  "accessibility", "colors", "typography", "spacing", "elevation",
  "llm-integration", "installation",
].map((slug) => ({ path: `foundations/${slug}`, bucket: "foundations", slug }));

const components: Route[] = [
  "accordion", "activity-heatmap", "area-chart", "assignee-picker", "auth-form",
  "avatar", "badge", "bar-chart", "branch-selector", "button", "callout", "card",
  "charts", "checkbox", "clipboard", "code-block", "code-editor", "color-picker",
  "combobox", "comment-thread", "commit-graph", "context-menu", "date-picker",
  "diagram-renderer", "diff-viewer", "dialog", "dropdown-menu", "editable",
  "empty-state", "file-list", "file-upload", "forgot-password-form", "hover-card",
  "icon", "kanban-board", "kanban-card", "kbd", "label-picker", "line-chart",
  "list", "login-form", "markdown-editor", "markdown-renderer", "math-renderer",
  "milestone-picker", "notification-center", "number-input", "pagination",
  "pie-chart", "pin-input", "popover", "progress-bar", "radio-group",
  "reaction-picker", "scroll-area", "search-input", "select", "signup-form",
  "skeleton", "slider", "spinner", "splitter", "steps", "switch",
  "syntax-highlighter", "table", "tabs", "tags-input", "text-input",
  "theme-toggle", "toast", "toggle", "toggle-group", "tooltip", "transfer-list",
  "tree-view", "two-factor-form", "wizard", "work-item-list",
].map((slug) => ({ path: `components/${slug}`, bucket: "components", slug }));

const layouts: Route[] = ["docs", "api", "fullwidth", "creators"]
  .map((slug) => ({ path: `layouts/${slug}`, bucket: "layouts", slug }));

const shell: Route[] = ["shell", "header", "footer", "sidebar", "right-rail", "breadcrumbs"]
  .map((slug) => ({ path: `shell/${slug}`, bucket: "shell", slug }));

const external: Route[] = [
  { path: "storybook/", bucket: "external", slug: "storybook", external: true },
  { path: "beam-sync/", bucket: "external", slug: "beam-sync", external: true },
];

export const routes: Route[] = [
  ...top,
  ...foundations,
  ...components,
  ...layouts,
  ...shell,
  ...external,
];
