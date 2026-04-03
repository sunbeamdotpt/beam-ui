import { Routes, Route, Outlet } from "react-router-dom";
import { css } from "styled-system/css";
import { Header } from "@sunbeam/beam-ui/components/shell/header";
import { Footer } from "@sunbeam/beam-ui/components/shell/footer";
import { DocsLayout } from "@sunbeam/beam-ui/components/layouts/docs-layout";
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
import { DocsLayoutPage } from "./pages/layouts/docs-layout-page";
import { ApiLayoutPage } from "./pages/layouts/api-layout-page";
import { FullwidthLayoutPage } from "./pages/layouts/fullwidth-layout-page";
import { CreatorsLayoutPage } from "./pages/layouts/creators-layout-page";
import { ButtonPage } from "./pages/components/button-page";
import { BadgePage } from "./pages/components/badge-page";
import { CardPage } from "./pages/components/card-page";
import { CodeBlockPage } from "./pages/components/code-block-page";
import { CalloutPage } from "./pages/components/callout-page";
import { TabsPage } from "./pages/components/tabs-page";
import { IconPage } from "./pages/components/icon-page";
import { SearchInputPage } from "./pages/components/search-input-page";
import { TablePage } from "./pages/components/table-page";
import { ListPage } from "./pages/components/list-page";
import { TreeViewPage } from "./pages/components/tree-view-page";
import { PaginationPage } from "./pages/components/pagination-page";
import { CheckboxPage } from "./pages/components/checkbox-page";
import { SelectPage } from "./pages/components/select-page";
import { TextInputPage } from "./pages/components/text-input-page";
import { DialogPage } from "./pages/components/dialog-page";
import { DropdownMenuPage } from "./pages/components/dropdown-menu-page";
import { ToastPage } from "./pages/components/toast-page";
import { FileListPage } from "./pages/components/file-list-page";
import { FileUploadPage } from "./pages/components/file-upload-page";
import { TooltipPage } from "./pages/components/tooltip-page";
import { ContextMenuPage } from "./pages/components/context-menu-page";
import { AvatarPage } from "./pages/components/avatar-page";
import { ProgressBarPage } from "./pages/components/progress-bar-page";
import { EmptyStatePage } from "./pages/components/empty-state-page";
import { SkeletonPage } from "./pages/components/skeleton-page";
import { KbdPage } from "./pages/components/kbd-page";
import { AccordionPage } from "./pages/components/accordion-page";
import { ClipboardPage } from "./pages/components/clipboard-page";
import { ComboboxPage } from "./pages/components/combobox-page";
import { EditablePage } from "./pages/components/editable-page";
import { HoverCardPage } from "./pages/components/hover-card-page";
import { NumberInputPage } from "./pages/components/number-input-page";
import { PinInputPage } from "./pages/components/pin-input-page";
import { PopoverPage } from "./pages/components/popover-page";
import { RadioGroupPage } from "./pages/components/radio-group-page";
import { ScrollAreaPage } from "./pages/components/scroll-area-page";
import { SliderPage } from "./pages/components/slider-page";
import { SplitterPage } from "./pages/components/splitter-page";
import { StepsPage } from "./pages/components/steps-page";
import { SwitchPage } from "./pages/components/switch-page";
import { TagsInputPage } from "./pages/components/tags-input-page";
import { TogglePage } from "./pages/components/toggle-page";
import { ToggleGroupPage } from "./pages/components/toggle-group-page";
import { HeaderPage } from "./pages/shell/header-page";
import { FooterPage } from "./pages/shell/footer-page";
import { SidebarPage } from "./pages/shell/sidebar-page";
import { RightRailPage } from "./pages/shell/right-rail-page";
import { BreadcrumbsPage } from "./pages/shell/breadcrumbs-page";

const shell = css({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const main = css({
  flex: 1,
  paddingTop: "64px",
});

/** Single stable header + footer, inner layouts handle body only */
function Shell() {
  return (
    <div className={shell}>
      <Header />
      <div className={main}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        {/* Full-width pages (no sidebar) */}
        <Route index element={<TokensPage />} />
        <Route path="community" element={<CreatorsPage />} />
        <Route path="guides" element={<CookbooksPage />} />

        {/* Docs pages (sidebar + content + right-rail) */}
        <Route element={<DocsLayout />}>
          {/* Foundations */}
          <Route path="foundations/accessibility" element={<AccessibilityPage />} />
          <Route path="foundations/colors" element={<ColorsPage />} />
          <Route path="foundations/typography" element={<TypographyPage />} />
          <Route path="foundations/spacing" element={<SpacingPage />} />
          <Route path="foundations/elevation" element={<ElevationPage />} />

          {/* Components */}
          <Route path="components/accordion" element={<AccordionPage />} />
          <Route path="components/avatar" element={<AvatarPage />} />
          <Route path="components/badge" element={<BadgePage />} />
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/callout" element={<CalloutPage />} />
          <Route path="components/card" element={<CardPage />} />
          <Route path="components/checkbox" element={<CheckboxPage />} />
          <Route path="components/clipboard" element={<ClipboardPage />} />
          <Route path="components/code-block" element={<CodeBlockPage />} />
          <Route path="components/combobox" element={<ComboboxPage />} />
          <Route path="components/context-menu" element={<ContextMenuPage />} />
          <Route path="components/dialog" element={<DialogPage />} />
          <Route path="components/dropdown-menu" element={<DropdownMenuPage />} />
          <Route path="components/editable" element={<EditablePage />} />
          <Route path="components/empty-state" element={<EmptyStatePage />} />
          <Route path="components/file-list" element={<FileListPage />} />
          <Route path="components/file-upload" element={<FileUploadPage />} />
          <Route path="components/hover-card" element={<HoverCardPage />} />
          <Route path="components/icon" element={<IconPage />} />
          <Route path="components/kbd" element={<KbdPage />} />
          <Route path="components/list" element={<ListPage />} />
          <Route path="components/number-input" element={<NumberInputPage />} />
          <Route path="components/pagination" element={<PaginationPage />} />
          <Route path="components/pin-input" element={<PinInputPage />} />
          <Route path="components/popover" element={<PopoverPage />} />
          <Route path="components/progress-bar" element={<ProgressBarPage />} />
          <Route path="components/radio-group" element={<RadioGroupPage />} />
          <Route path="components/scroll-area" element={<ScrollAreaPage />} />
          <Route path="components/search-input" element={<SearchInputPage />} />
          <Route path="components/select" element={<SelectPage />} />
          <Route path="components/skeleton" element={<SkeletonPage />} />
          <Route path="components/slider" element={<SliderPage />} />
          <Route path="components/splitter" element={<SplitterPage />} />
          <Route path="components/steps" element={<StepsPage />} />
          <Route path="components/switch" element={<SwitchPage />} />
          <Route path="components/table" element={<TablePage />} />
          <Route path="components/tabs" element={<TabsPage />} />
          <Route path="components/tags-input" element={<TagsInputPage />} />
          <Route path="components/text-input" element={<TextInputPage />} />
          <Route path="components/toast" element={<ToastPage />} />
          <Route path="components/toggle" element={<TogglePage />} />
          <Route path="components/toggle-group" element={<ToggleGroupPage />} />
          <Route path="components/tooltip" element={<TooltipPage />} />
          <Route path="components/tree-view" element={<TreeViewPage />} />

          {/* Layout showcase (docs) */}
          <Route path="layouts/docs" element={<DocsLayoutPage />} />
          <Route path="layouts/api" element={<ApiLayoutPage />} />
          <Route path="layouts/fullwidth" element={<FullwidthLayoutPage />} />
          <Route path="layouts/creators" element={<CreatorsLayoutPage />} />

          {/* Shell */}
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
