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
export { Accordion } from "./components/ui/accordion";
export { ActivityHeatmap } from "./components/ui/activity-heatmap";
export type { ActivityDay } from "./components/ui/activity-heatmap";
export { AssigneePicker } from "./components/ui/assignee-picker";
export type { UserOption } from "./components/ui/assignee-picker";
export { LoginForm, SignUpForm, ForgotPasswordForm, TwoFactorForm } from "./components/ui/auth-form";
export { Avatar } from "./components/ui/avatar";
export { Badge } from "./components/ui/badge";
export { BentoItem } from "./components/ui/bento-item";
export { BranchSelector } from "./components/ui/branch-selector";
export { Button } from "./components/ui/button";
export { Callout } from "./components/ui/callout";
export { CapabilityCard } from "./components/ui/capability-card";
export { Card } from "./components/ui/card";
export { Checkbox } from "./components/ui/checkbox";
export { Clipboard } from "./components/ui/clipboard";
export { CodeBlock, syn } from "./components/ui/code-block";
export { ColorPicker } from "./components/ui/color-picker";
export { Combobox } from "./components/ui/combobox";
export { ContextMenu } from "./components/ui/context-menu";
export { DatePicker } from "./components/ui/date-picker";
export { Dialog } from "./components/ui/dialog";
export { DropdownMenu } from "./components/ui/dropdown-menu";
export type { DropdownMenuItem, DropdownMenuGroup } from "./components/ui/dropdown-menu";
export { Editable } from "./components/ui/editable";
export { EmptyState } from "./components/ui/empty-state";
export { FeatureTile } from "./components/ui/feature-tile";
export { FileList } from "./components/ui/file-list";
export type { FileItem } from "./components/ui/file-list";
export { FileUpload } from "./components/ui/file-upload";
export { HoverCard } from "./components/ui/hover-card";
export { Icon } from "./components/ui/icon";
export { Kbd } from "./components/ui/kbd";
export { LabelPicker } from "./components/ui/label-picker";
export type { LabelOption } from "./components/ui/label-picker";
export { List } from "./components/ui/list";
export { MilestonePicker } from "./components/ui/milestone-picker";
export type { MilestoneOption } from "./components/ui/milestone-picker";
export { ModelRow } from "./components/ui/model-row";
export { NotificationCenter, NotificationItem, notificationIcons } from "./components/ui/notification-center";
export type { Notification } from "./components/ui/notification-center";
export { NumberInput } from "./components/ui/number-input";
export { Pagination } from "./components/ui/pagination";
export { PinInput } from "./components/ui/pin-input";
export { Popover } from "./components/ui/popover";
export { ProgressBar } from "./components/ui/progress-bar";
export { RadioGroup } from "./components/ui/radio-group";
export { ReactionPicker } from "./components/ui/reaction-picker";
export type { Reaction } from "./components/ui/reaction-picker";
export { ScrollArea } from "./components/ui/scroll-area";
export { SearchInput } from "./components/ui/search-input";
export { Select } from "./components/ui/select";
export { Skeleton } from "./components/ui/skeleton";
export { Slider } from "./components/ui/slider";
export { Spinner } from "./components/ui/spinner";
export { Splitter } from "./components/ui/splitter";
export { StatBar } from "./components/ui/stat-bar";
export type { ModelStats } from "./components/ui/stat-bar";
export { Steps } from "./components/ui/steps";
export { Switch } from "./components/ui/switch";
export { Table } from "./components/ui/table";
export { Tabs } from "./components/ui/tabs";
export { TagsInput } from "./components/ui/tags-input";
export { TextInput } from "./components/ui/text-input";
export { Toast } from "./components/ui/toast";
export { ThemeToggle } from "./components/ui/theme-toggle";
export { Toggle } from "./components/ui/toggle";
export { ToggleGroup } from "./components/ui/toggle-group";
export { TransferList } from "./components/ui/transfer-list";
export type { TransferItem } from "./components/ui/transfer-list";
export { Tooltip } from "./components/ui/tooltip";
export { TopicCard } from "./components/ui/topic-card";
export { TreeView } from "./components/ui/tree-view";
export type { TreeNode } from "./components/ui/tree-view";
export { Wizard, WizardModal } from "./components/ui/wizard";
export type { WizardStep, WizardProps, WizardModalProps } from "./components/ui/wizard";
export { WorkItemList } from "./components/ui/work-item-list";
export type { WorkItemRow, WorkItemLabel, WorkItemBranch, WorkItemListProps } from "./components/ui/work-item-list";

// Hooks
export { useTheme } from "./hooks/use-theme";
