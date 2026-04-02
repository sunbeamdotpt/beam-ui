// UI components
export { Badge } from "./components/ui/badge";
export { BentoItem } from "./components/ui/bento-item";
export { Button } from "./components/ui/button";
export { Callout } from "./components/ui/callout";
export { CapabilityCard } from "./components/ui/capability-card";
export { Card } from "./components/ui/card";
export { CodeBlock, syn } from "./components/ui/code-block";
export { FeatureTile } from "./components/ui/feature-tile";
export { Icon } from "./components/ui/icon";
export { ModelRow } from "./components/ui/model-row";
export { SearchInput } from "./components/ui/search-input";
export { StatBar } from "./components/ui/stat-bar";
export type { ModelStats } from "./components/ui/stat-bar";
export { Tabs } from "./components/ui/tabs";
export { TopicCard } from "./components/ui/topic-card";

// Shell components
export { Breadcrumbs } from "./components/shell/breadcrumbs";
export { Footer } from "./components/shell/footer";
export { Header } from "./components/shell/header";
export { RightRail } from "./components/shell/right-rail";
export { Sidebar } from "./components/shell/sidebar";

// Layouts
export { ApiLayout, apiLeftPanel, apiRightPanel } from "./components/layouts/api-layout";
export { DocsLayout, useDocsContext } from "./components/layouts/docs-layout";
export type { DocsTocItem } from "./components/layouts/docs-layout";
export { FullwidthLayout } from "./components/layouts/fullwidth-layout";

// Hooks
export { useTheme } from "./hooks/use-theme";

// Data
export {
  headerLinks,
  docsSidebar,
  apiSidebar,
  footerSections,
} from "./data/navigation";
export type { NavItem, NavSection } from "./data/navigation";
