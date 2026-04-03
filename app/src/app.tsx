import { Routes, Route } from "react-router-dom";
import { Shell } from "@sunbeam/beam-ui/components/shell/shell";
import { DocsLayout } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { pageDates } from "./generated/page-dates";
import { ApiLayout } from "@sunbeam/beam-ui/components/layouts/api-layout";
import { FullwidthLayout } from "@sunbeam/beam-ui/components/layouts/fullwidth-layout";
import { TokensPage } from "./pages/tokens";
import { DocsHomePage } from "./pages/docs-home";
import { DocsInteriorPage } from "./pages/docs-interior";
import { ModelsIndexPage } from "./pages/models-index";
import { ModelDetailPage } from "./pages/model-detail";
import { ApiReferencePage } from "./pages/api-reference";
import { CookbooksPage } from "./pages/cookbooks";
import { CreatorsPage } from "./pages/creators";
import { GuidePage } from "./pages/guide";
import { AccessibilityPage } from "./pages/foundations/accessibility";
import { ColorsPage } from "./pages/foundations/colors";
import { TypographyPage } from "./pages/foundations/typography";
import { SpacingPage } from "./pages/foundations/spacing";
import { ElevationPage } from "./pages/foundations/elevation";

import { LlmIntegrationPage } from "./pages/foundations/llm-integration";
import { InstallationPage } from "./pages/foundations/installation";
import { DocsLayoutPage } from "./pages/layouts/docs-layout-page";
import { ApiLayoutPage } from "./pages/layouts/api-layout-page";
import { FullwidthLayoutPage } from "./pages/layouts/fullwidth-layout-page";
import { CreatorsLayoutPage } from "./pages/layouts/creators-layout-page";
import { ButtonPage } from "./pages/components/button-page";
import { BadgePage } from "./pages/components/badge-page";
import { CardPage } from "./pages/components/card-page";
import { CodeBlockPage } from "./pages/components/code-block-page";
import { CodeEditorPage } from "./pages/components/code-editor-page";
import { ColorPickerPage } from "./pages/components/color-picker-page";
import { CalloutPage } from "./pages/components/callout-page";
import { ChartsPage } from "./pages/components/charts-page";
import { TabsPage } from "./pages/components/tabs-page";
import { IconPage } from "./pages/components/icon-page";
import { SearchInputPage } from "./pages/components/search-input-page";
import { TablePage } from "./pages/components/table-page";
import { LineChartPage } from "./pages/components/line-chart-page";
import { ListPage } from "./pages/components/list-page";
import { LoginFormPage } from "./pages/components/login-form-page";
import { TreeViewPage } from "./pages/components/tree-view-page";
import { PaginationPage } from "./pages/components/pagination-page";
import { CheckboxPage } from "./pages/components/checkbox-page";
import { SelectPage } from "./pages/components/select-page";
import { TextInputPage } from "./pages/components/text-input-page";
import { ThemeTogglePage } from "./pages/components/theme-toggle-page";
import { DialogPage } from "./pages/components/dialog-page";
import { DropdownMenuPage } from "./pages/components/dropdown-menu-page";
import { ToastPage } from "./pages/components/toast-page";
import { ForgotPasswordFormPage } from "./pages/components/forgot-password-form-page";
import { FileListPage } from "./pages/components/file-list-page";
import { FileUploadPage } from "./pages/components/file-upload-page";
import { TooltipPage } from "./pages/components/tooltip-page";
import { ContextMenuPage } from "./pages/components/context-menu-page";
import { DatePickerPage } from "./pages/components/date-picker-page";
import { DiagramRendererPage } from "./pages/components/diagram-renderer-page";
import { DiffViewerPage } from "./pages/components/diff-viewer-page";
import { AvatarPage } from "./pages/components/avatar-page";
import { ProgressBarPage } from "./pages/components/progress-bar-page";
import { EmptyStatePage } from "./pages/components/empty-state-page";
import { SkeletonPage } from "./pages/components/skeleton-page";
import { KanbanBoardPage } from "./pages/components/kanban-board-page";
import { KanbanCardPage } from "./pages/components/kanban-card-page";
import { KbdPage } from "./pages/components/kbd-page";
import { LabelPickerPage } from "./pages/components/label-picker-page";
import { AccordionPage } from "./pages/components/accordion-page";
import { ActivityHeatmapPage } from "./pages/components/activity-heatmap-page";
import { AssigneePickerPage } from "./pages/components/assignee-picker-page";
import { AuthFormPage } from "./pages/components/auth-form-page";
import { AreaChartPage } from "./pages/components/area-chart-page";
import { BarChartPage } from "./pages/components/bar-chart-page";
import { BranchSelectorPage } from "./pages/components/branch-selector-page";
import { ClipboardPage } from "./pages/components/clipboard-page";
import { ComboboxPage } from "./pages/components/combobox-page";
import { CommentThreadPage } from "./pages/components/comment-thread-page";
import { CommitGraphPage } from "./pages/components/commit-graph-page";
import { EditablePage } from "./pages/components/editable-page";
import { HoverCardPage } from "./pages/components/hover-card-page";
import { MarkdownEditorPage } from "./pages/components/markdown-editor-page";
import { MarkdownRendererPage } from "./pages/components/markdown-renderer-page";
import { MathRendererPage } from "./pages/components/math-renderer-page";
import { MilestonePickerPage } from "./pages/components/milestone-picker-page";
import { NotificationCenterPage } from "./pages/components/notification-center-page";
import { NumberInputPage } from "./pages/components/number-input-page";
import { PieChartPage } from "./pages/components/pie-chart-page";
import { PinInputPage } from "./pages/components/pin-input-page";
import { PopoverPage } from "./pages/components/popover-page";
import { RadioGroupPage } from "./pages/components/radio-group-page";
import { ReactionPickerPage } from "./pages/components/reaction-picker-page";
import { ScrollAreaPage } from "./pages/components/scroll-area-page";
import { SignUpFormPage } from "./pages/components/signup-form-page";
import { SliderPage } from "./pages/components/slider-page";
import { SpinnerPage } from "./pages/components/spinner-page";
import { SplitterPage } from "./pages/components/splitter-page";
import { StepsPage } from "./pages/components/steps-page";
import { SwitchPage } from "./pages/components/switch-page";
import { SyntaxHighlighterPage } from "./pages/components/syntax-highlighter-page";
import { TagsInputPage } from "./pages/components/tags-input-page";
import { TogglePage } from "./pages/components/toggle-page";
import { ToggleGroupPage } from "./pages/components/toggle-group-page";
import { TransferListPage } from "./pages/components/transfer-list-page";
import { TwoFactorFormPage } from "./pages/components/two-factor-form-page";
import { WizardPage } from "./pages/components/wizard-page";
import { WorkItemListPage } from "./pages/components/work-item-list-page";
import { ShellPage } from "./pages/shell/shell-page";
import { HeaderPage } from "./pages/shell/header-page";
import { FooterPage } from "./pages/shell/footer-page";
import { SidebarPage } from "./pages/shell/sidebar-page";
import { RightRailPage } from "./pages/shell/right-rail-page";
import { BreadcrumbsPage } from "./pages/shell/breadcrumbs-page";

export function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        {/* Full-width pages (no sidebar) */}
        <Route index element={<TokensPage />} />
        <Route path="community" element={<CreatorsPage />} />
        <Route path="guides" element={<CookbooksPage />} />

        {/* Docs pages (sidebar + content + right-rail) */}
        <Route element={<DocsLayout pageDates={pageDates} />}>
          {/* Foundations */}
          <Route path="foundations/accessibility" element={<AccessibilityPage />} />
          <Route path="foundations/colors" element={<ColorsPage />} />
          <Route path="foundations/typography" element={<TypographyPage />} />
          <Route path="foundations/spacing" element={<SpacingPage />} />
          <Route path="foundations/elevation" element={<ElevationPage />} />

          <Route path="foundations/llm-integration" element={<LlmIntegrationPage />} />
          <Route path="foundations/installation" element={<InstallationPage />} />

          {/* Components */}
          <Route path="components/accordion" element={<AccordionPage />} />
          <Route path="components/activity-heatmap" element={<ActivityHeatmapPage />} />
          <Route path="components/area-chart" element={<AreaChartPage />} />
          <Route path="components/assignee-picker" element={<AssigneePickerPage />} />
          <Route path="components/auth-form" element={<AuthFormPage />} />
          <Route path="components/avatar" element={<AvatarPage />} />
          <Route path="components/badge" element={<BadgePage />} />
          <Route path="components/bar-chart" element={<BarChartPage />} />
          <Route path="components/branch-selector" element={<BranchSelectorPage />} />
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/callout" element={<CalloutPage />} />
          <Route path="components/card" element={<CardPage />} />
          <Route path="components/charts" element={<ChartsPage />} />
          <Route path="components/checkbox" element={<CheckboxPage />} />
          <Route path="components/clipboard" element={<ClipboardPage />} />
          <Route path="components/code-block" element={<CodeBlockPage />} />
          <Route path="components/code-editor" element={<CodeEditorPage />} />
          <Route path="components/color-picker" element={<ColorPickerPage />} />
          <Route path="components/combobox" element={<ComboboxPage />} />
          <Route path="components/comment-thread" element={<CommentThreadPage />} />
          <Route path="components/commit-graph" element={<CommitGraphPage />} />
          <Route path="components/context-menu" element={<ContextMenuPage />} />
          <Route path="components/date-picker" element={<DatePickerPage />} />
          <Route path="components/diagram-renderer" element={<DiagramRendererPage />} />
          <Route path="components/diff-viewer" element={<DiffViewerPage />} />
          <Route path="components/dialog" element={<DialogPage />} />
          <Route path="components/dropdown-menu" element={<DropdownMenuPage />} />
          <Route path="components/editable" element={<EditablePage />} />
          <Route path="components/empty-state" element={<EmptyStatePage />} />
          <Route path="components/forgot-password-form" element={<ForgotPasswordFormPage />} />
          <Route path="components/file-list" element={<FileListPage />} />
          <Route path="components/file-upload" element={<FileUploadPage />} />
          <Route path="components/hover-card" element={<HoverCardPage />} />
          <Route path="components/icon" element={<IconPage />} />
          <Route path="components/kanban-board" element={<KanbanBoardPage />} />
          <Route path="components/kanban-card" element={<KanbanCardPage />} />
          <Route path="components/kbd" element={<KbdPage />} />
          <Route path="components/label-picker" element={<LabelPickerPage />} />
          <Route path="components/line-chart" element={<LineChartPage />} />
          <Route path="components/list" element={<ListPage />} />
          <Route path="components/login-form" element={<LoginFormPage />} />
          <Route path="components/markdown-editor" element={<MarkdownEditorPage />} />
          <Route path="components/markdown-renderer" element={<MarkdownRendererPage />} />
          <Route path="components/math-renderer" element={<MathRendererPage />} />
          <Route path="components/milestone-picker" element={<MilestonePickerPage />} />
          <Route path="components/notification-center" element={<NotificationCenterPage />} />
          <Route path="components/number-input" element={<NumberInputPage />} />
          <Route path="components/pagination" element={<PaginationPage />} />
          <Route path="components/pie-chart" element={<PieChartPage />} />
          <Route path="components/pin-input" element={<PinInputPage />} />
          <Route path="components/popover" element={<PopoverPage />} />
          <Route path="components/progress-bar" element={<ProgressBarPage />} />
          <Route path="components/radio-group" element={<RadioGroupPage />} />
          <Route path="components/reaction-picker" element={<ReactionPickerPage />} />
          <Route path="components/scroll-area" element={<ScrollAreaPage />} />
          <Route path="components/search-input" element={<SearchInputPage />} />
          <Route path="components/select" element={<SelectPage />} />
          <Route path="components/signup-form" element={<SignUpFormPage />} />
          <Route path="components/skeleton" element={<SkeletonPage />} />
          <Route path="components/slider" element={<SliderPage />} />
          <Route path="components/spinner" element={<SpinnerPage />} />
          <Route path="components/splitter" element={<SplitterPage />} />
          <Route path="components/steps" element={<StepsPage />} />
          <Route path="components/switch" element={<SwitchPage />} />
          <Route path="components/syntax-highlighter" element={<SyntaxHighlighterPage />} />
          <Route path="components/table" element={<TablePage />} />
          <Route path="components/tabs" element={<TabsPage />} />
          <Route path="components/tags-input" element={<TagsInputPage />} />
          <Route path="components/text-input" element={<TextInputPage />} />
          <Route path="components/theme-toggle" element={<ThemeTogglePage />} />
          <Route path="components/toast" element={<ToastPage />} />
          <Route path="components/toggle" element={<TogglePage />} />
          <Route path="components/toggle-group" element={<ToggleGroupPage />} />
          <Route path="components/transfer-list" element={<TransferListPage />} />
          <Route path="components/tooltip" element={<TooltipPage />} />
          <Route path="components/tree-view" element={<TreeViewPage />} />
          <Route path="components/two-factor-form" element={<TwoFactorFormPage />} />
          <Route path="components/wizard" element={<WizardPage />} />
          <Route path="components/work-item-list" element={<WorkItemListPage />} />

          {/* Layout showcase (docs) */}
          <Route path="layouts/docs" element={<DocsLayoutPage />} />
          <Route path="layouts/api" element={<ApiLayoutPage />} />
          <Route path="layouts/fullwidth" element={<FullwidthLayoutPage />} />
          <Route path="layouts/creators" element={<CreatorsLayoutPage />} />

          {/* Shell */}
          <Route path="shell/shell" element={<ShellPage />} />
          <Route path="shell/header" element={<HeaderPage />} />
          <Route path="shell/footer" element={<FooterPage />} />
          <Route path="shell/sidebar" element={<SidebarPage />} />
          <Route path="shell/right-rail" element={<RightRailPage />} />
          <Route path="shell/breadcrumbs" element={<BreadcrumbsPage />} />

          {/* Docs home & interior catch-all */}
          <Route path="docs" element={<DocsHomePage />} />
          <Route path="docs/*" element={<DocsInteriorPage />} />

          {/* Guides rendered inside docs layout */}
          <Route path="guides/procedural-terrain" element={<GuidePage />} />
          <Route path="guides/*" element={<GuidePage />} />
        </Route>

        {/* Fullwidth pages (sidebar + wider content) */}
        <Route element={<FullwidthLayout />}>
          <Route path="models" element={<ModelsIndexPage />} />
          <Route path="models/solstice-4-vision" element={<ModelDetailPage />} />
        </Route>

        {/* API pages (sidebar + split panels) */}
        <Route element={<ApiLayout />}>
          <Route path="api" element={<ApiReferencePage />} />
          <Route path="api/*" element={<ApiReferencePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
