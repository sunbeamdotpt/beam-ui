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
          <Route path="foundations/colors" element={<ColorsPage />} />
          <Route path="foundations/typography" element={<TypographyPage />} />
          <Route path="foundations/spacing" element={<SpacingPage />} />
          <Route path="foundations/elevation" element={<ElevationPage />} />

          {/* Components */}
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/badge" element={<BadgePage />} />
          <Route path="components/card" element={<CardPage />} />
          <Route path="components/code-block" element={<CodeBlockPage />} />
          <Route path="components/callout" element={<CalloutPage />} />
          <Route path="components/tabs" element={<TabsPage />} />
          <Route path="components/icon" element={<IconPage />} />
          <Route path="components/search-input" element={<SearchInputPage />} />

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
          <Route path="models/solar-medium-3-1" element={<ModelDetailPage />} />
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
