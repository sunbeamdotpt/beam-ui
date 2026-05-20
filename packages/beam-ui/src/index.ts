/**
 * Sunbeam Studios design system — main entry point.
 *
 * Re-exports lightweight UI primitives, hooks, and layout helpers.
 * Components are unstyled at import time and pick up styling from a
 * consumer's Panda CSS pipeline; wire {@link beamPreset}
 * (from `@sunbeam/beam-ui/preset`) into your `panda.config.ts` to get the
 * full design language.
 *
 * Heavy components (code-editor, charts, markdown, etc.) are available via
 * dedicated subpath exports so consumers only pay for what they use.
 *
 * @example
 * ```tsx
 * import { Button, Card } from "@sunbeam/beam-ui";
 *
 * export function Hero() {
 *   return (
 *     <Card>
 *       <Button variant="primary">Get started</Button>
 *     </Card>
 *   );
 * }
 * ```
 *
 * @module
 */

// UI primitives
export { Accordion } from "./components/ui/accordion.tsx";
export { ActivityHeatmap } from "./components/ui/activity-heatmap.tsx";
export type { ActivityDay } from "./components/ui/activity-heatmap.tsx";
export { AssigneePicker } from "./components/ui/assignee-picker.tsx";
export type { UserOption } from "./components/ui/assignee-picker.tsx";
export { LoginForm, SignUpForm, ForgotPasswordForm, TwoFactorForm } from "./components/ui/auth-form.tsx";
export { Avatar } from "./components/ui/avatar.tsx";
export { Badge } from "./components/ui/badge.tsx";
export { BentoItem } from "./components/ui/bento-item.tsx";
export { BranchSelector } from "./components/ui/branch-selector.tsx";
export { Button } from "./components/ui/button.tsx";
export { Callout } from "./components/ui/callout.tsx";
export { CapabilityCard } from "./components/ui/capability-card.tsx";
export { Card } from "./components/ui/card.tsx";
export { Checkbox } from "./components/ui/checkbox.tsx";
export { Clipboard } from "./components/ui/clipboard.tsx";
export { CodeBlock, syn } from "./components/ui/code-block.tsx";
export { ColorPicker } from "./components/ui/color-picker.tsx";
export { Combobox } from "./components/ui/combobox.tsx";
export { CommentThread } from "./components/ui/comment-thread.tsx";
export { CommitGraph } from "./components/ui/commit-graph.tsx";
export type { CommitNode } from "./components/ui/commit-graph.tsx";
export { ContextMenu } from "./components/ui/context-menu.tsx";
export { DatePicker } from "./components/ui/date-picker.tsx";
export { DiffViewer, parseDiff } from "./components/ui/diff-viewer.tsx";
export type { DiffLine, DiffHunk } from "./components/ui/diff-viewer.tsx";
export { Dialog } from "./components/ui/dialog.tsx";
export { DropdownMenu } from "./components/ui/dropdown-menu.tsx";
export type { DropdownMenuItem, DropdownMenuGroup } from "./components/ui/dropdown-menu.tsx";
export { Editable } from "./components/ui/editable.tsx";
export { EmptyState } from "./components/ui/empty-state.tsx";
export { FeatureTile } from "./components/ui/feature-tile.tsx";
export { FileList } from "./components/ui/file-list.tsx";
export type { FileItem } from "./components/ui/file-list.tsx";
export { FileUpload } from "./components/ui/file-upload.tsx";
export { HoverCard } from "./components/ui/hover-card.tsx";
export { Icon } from "./components/ui/icon.tsx";
export { Kbd } from "./components/ui/kbd.tsx";
export { LabelPicker } from "./components/ui/label-picker.tsx";
export type { LabelOption } from "./components/ui/label-picker.tsx";
export { List } from "./components/ui/list.tsx";
export { MilestonePicker } from "./components/ui/milestone-picker.tsx";
export type { MilestoneOption } from "./components/ui/milestone-picker.tsx";
export { ModelRow } from "./components/ui/model-row.tsx";
export { NotificationCenter, NotificationItem, notificationIcons } from "./components/ui/notification-center.tsx";
export type { Notification } from "./components/ui/notification-center.tsx";
export { NumberInput } from "./components/ui/number-input.tsx";
export { Pagination } from "./components/ui/pagination.tsx";
export { PinInput } from "./components/ui/pin-input.tsx";
export { Popover } from "./components/ui/popover.tsx";
export { ProgressBar } from "./components/ui/progress-bar.tsx";
export { RadioGroup } from "./components/ui/radio-group.tsx";
export { ReactionPicker } from "./components/ui/reaction-picker.tsx";
export type { Reaction } from "./components/ui/reaction-picker.tsx";
export { ScrollArea } from "./components/ui/scroll-area.tsx";
export { SearchInput } from "./components/ui/search-input.tsx";
export { Select } from "./components/ui/select.tsx";
export { Skeleton } from "./components/ui/skeleton.tsx";
export { Slider } from "./components/ui/slider.tsx";
export { Spinner } from "./components/ui/spinner.tsx";
export { Splitter } from "./components/ui/splitter.tsx";
export { StatBar } from "./components/ui/stat-bar.tsx";
export type { ModelStats } from "./components/ui/stat-bar.tsx";
export { Steps } from "./components/ui/steps.tsx";
export { Switch } from "./components/ui/switch.tsx";
export { Table } from "./components/ui/table.tsx";
export { Tabs } from "./components/ui/tabs.tsx";
export { TagsInput } from "./components/ui/tags-input.tsx";
export { TextInput } from "./components/ui/text-input.tsx";
export { Toast } from "./components/ui/toast.tsx";
export { ThemeToggle } from "./components/ui/theme-toggle.tsx";
export { Toggle } from "./components/ui/toggle.tsx";
export { ToggleGroup } from "./components/ui/toggle-group.tsx";
export { Tooltip } from "./components/ui/tooltip.tsx";
export { TopicCard } from "./components/ui/topic-card.tsx";
export { TransferList } from "./components/ui/transfer-list.tsx";
export type { TransferItem } from "./components/ui/transfer-list.tsx";
export { TreeView } from "./components/ui/tree-view.tsx";
export type { TreeNode } from "./components/ui/tree-view.tsx";
export { Wizard, WizardModal } from "./components/ui/wizard.tsx";
export type { WizardStep, WizardProps, WizardModalProps } from "./components/ui/wizard.tsx";
export { WorkItemList } from "./components/ui/work-item-list.tsx";
export type { WorkItemRow, WorkItemLabel, WorkItemBranch, WorkItemListProps } from "./components/ui/work-item-list.tsx";

// Shell
export { Breadcrumbs } from "./components/shell/breadcrumbs.tsx";
export { Footer } from "./components/shell/footer.tsx";
export { Header } from "./components/shell/header.tsx";
export { RightRail } from "./components/shell/right-rail.tsx";
export { Shell } from "./components/shell/shell.tsx";
export { Sidebar } from "./components/shell/sidebar.tsx";

// Layouts
export { ApiLayout, apiLeftPanel, apiRightPanel } from "./components/layouts/api-layout.tsx";
export { DocsLayout, useDocsContext } from "./components/layouts/docs-layout.tsx";
export type { DocsTocItem } from "./components/layouts/docs-layout.tsx";
export { FullwidthLayout } from "./components/layouts/fullwidth-layout.tsx";

// Data
export { headerLinks, docsSidebar, apiSidebar, footerSections } from "./data/navigation.ts";
export type { NavItem, NavSection } from "./data/navigation.ts";
export { issueStatuses, prStatuses, priorities, releaseStages, allStatuses } from "./data/statuses.ts";
export type { StatusDef } from "./data/statuses.ts";

// Hooks
export { useTheme } from "./hooks/use-theme.ts";
