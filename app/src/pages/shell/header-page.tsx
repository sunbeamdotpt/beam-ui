import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { PropsTable } from "../components/_template";

const TOC_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "Props", id: "props" },
  { label: "Features", id: "features" },
  { label: "Search", id: "search" },
  { label: "Mobile Drawer", id: "mobile-drawer" },
  { label: "Navigation Data", id: "navigation-data" },
  { label: "Usage", id: "usage" },
];

const PROPS = [
  { name: "showThemeToggle", type: "boolean", required: false, description: "Show the theme toggle button in the right group. Defaults to true." },
  { name: "actions", type: "ReactNode", required: false, description: "Extra elements rendered in the right group before the theme toggle." },
  { name: "brand", type: "ReactNode", required: false, description: "Replace the default brand link with a custom element." },
  { name: "navLinks", type: "HeaderNavLink[]", required: false, description: "Navigation links for the desktop header bar. Defaults to beam-ui docs links. Ignored when breadcrumbs is set." },
  { name: "breadcrumbs", type: "HeaderBreadcrumbItem[]", required: false, description: "Breadcrumb items shown in place of nav links. When set, nav links are hidden." },
  { name: "drawerSections", type: "NavSection[]", required: false, description: "Sections for the mobile drawer sidebar. Defaults to beam-ui docs sidebar." },
  { name: "searchItems", type: "HeaderSearchItem[]", required: false, description: "Searchable items for the Cmd+K search. Defaults to items derived from drawerSections." },
  { name: "showSearch", type: "boolean", required: false, description: "Show the search input and Cmd+K shortcut. Defaults to true." },
  { name: "fullWidth", type: "boolean", required: false, description: "Remove the max-width constraint so the header spans the full viewport. Defaults to false." },
  { name: "currentPath", type: "string", required: false, description: "Current path used to compute active states and close the mobile drawer on navigation." },
  { name: "linkAs", type: "LinkComponent", required: false, description: "Component used to render links (e.g. your router's Link). Defaults to a plain <a>." },
  { name: "onNavigate", type: "(href: string) => void", required: false, description: "Called when the user selects a search result or a nav link should trigger client-side navigation." },
  { name: "isActive", type: "(label, href, currentPath) => boolean", required: false, description: "Override the default active-state matcher." },
];

export function HeaderPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shell" },
          { label: "Header" },
        ]}
      />

      <h1 className={pageTitle}>Header</h1>
      <p className={descText}>
        Fixed top navigation bar with backdrop blur, responsive mobile drawer,
        built-in search with keyboard shortcut, theme toggle, and active link
        highlighting. Rendered once by the Shell component.
      </p>
      <div className={importBlock}>
        <code className={importCode}>import {"{ Header }"} from "@sunbeam/beam-ui"</code>
      </div>

      {/* Overview */}
      <h2 id="overview" className={sectionTitle}>Overview</h2>
      <p className={bodyText}>
        The Header is a fixed-position bar that sticks to the top of the viewport at 64px
        height. It contains the brand link, primary navigation links, a search input with
        dropdown results, and a theme toggle. On mobile, the nav links collapse into a
        hamburger-triggered slide-over drawer containing the full Sidebar navigation.
      </p>
      <p className={bodyText}>
        The live Header is visible at the top of this page.
      </p>

      {/* Props */}
      <h2 id="props" className={sectionTitle}>Props</h2>
      <PropsTable props={PROPS} />

      {/* Features */}
      <h2 id="features" className={sectionTitle}>Features</h2>
      <ul className={featureList}>
        <li><strong>Fixed positioning</strong> — pinned to the top of the viewport with <code className={mono}>z-index: 50</code> and 64px height</li>
        <li><strong>Backdrop blur</strong> — semi-transparent background with <code className={mono}>backdrop-filter: blur(12px)</code> and warm border</li>
        <li><strong>Responsive mobile drawer</strong> — hamburger button on small screens opens a slide-over Ark UI Dialog containing the full Sidebar</li>
        <li><strong>Search with <code className={mono}>&#x2318;K</code></strong> — inline search input with keyboard shortcut, dropdown results grouped by section</li>
        <li><strong>Theme toggle</strong> — renders the ThemeToggle component (can be hidden via <code className={mono}>showThemeToggle</code> prop)</li>
        <li><strong>Active link highlighting</strong> — current section link uses accent color with underline and <code className={mono}>aria-current="page"</code></li>
        <li><strong>Landing page link hiding</strong> — nav links are hidden when <code className={mono}>pathname === "/"</code> to keep the landing page clean</li>
      </ul>

      {/* Search */}
      <h2 id="search" className={sectionTitle}>Search</h2>
      <p className={bodyText}>
        The Header includes a built-in search input visible on medium screens and above.
        On mobile, a search icon button focuses the input. Key behaviors:
      </p>
      <ul className={featureList}>
        <li><strong>Keyboard shortcut</strong> — <code className={mono}>&#x2318;K</code> (or <code className={mono}>Ctrl+K</code>) focuses the search input from anywhere on the page; <code className={mono}>Escape</code> clears and blurs</li>
        <li><strong>Live filtering</strong> — searches all items from the <code className={mono}>docsSidebar</code> navigation data (including nested children)</li>
        <li><strong>Section grouping</strong> — results are grouped under section headers matching the sidebar structure</li>
        <li><strong>Navigation on select</strong> — clicking a result navigates to that page and closes the dropdown</li>
        <li><strong>Outside click</strong> — dropdown closes when clicking outside the search wrapper</li>
      </ul>

      {/* Mobile Drawer */}
      <h2 id="mobile-drawer" className={sectionTitle}>Mobile Drawer</h2>
      <p className={bodyText}>
        On screens below the <code className={mono}>lg</code> breakpoint, the desktop nav links are hidden
        and a hamburger button appears. Tapping it opens a slide-over drawer (Ark UI Dialog)
        anchored to the left edge of the screen. The drawer contains the full
        Sidebar component with all <code className={mono}>docsSidebar</code> navigation sections. It
        automatically closes on route change.
      </p>

      {/* Navigation Data */}
      <h2 id="navigation-data" className={sectionTitle}>Navigation Data</h2>
      <p className={bodyText}>
        The Header reads its top-level links from the <code className={mono}>headerLinks</code> array
        exported by the navigation module. Each entry is a simple{" "}
        <code className={mono}>{"{ label, href }"}</code> object. To customize the header
        navigation, update this array:
      </p>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.comment}>{"// data/navigation.ts"}</span>{"\n"}
              <span className={syn.keyword}>export const</span> headerLinks = [{"\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"DOCS"</span>, href: <span className={syn.string}>"/docs/introduction"</span>{" },\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"COMPONENTS"</span>, href: <span className={syn.string}>"/components/button"</span>{" },\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"API"</span>, href: <span className={syn.string}>"/api/overview"</span>{" },\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"COMMUNITY"</span>, href: <span className={syn.string}>"https://github.com/..."</span>{" },\n"}
              ];
            </code></pre>
          ),
        }]}
      />
      <p className={bodyText}>
        Search results are drawn from the <code className={mono}>docsSidebar</code> data, not{" "}
        <code className={mono}>headerLinks</code>. This means every page in the sidebar is
        searchable from the header.
      </p>

      {/* Usage */}
      <h2 id="usage" className={sectionTitle}>Usage</h2>
      <p className={bodyText}>
        The Header is typically not used directly — it is rendered automatically by the
        Shell component. To hide the theme toggle, pass the prop through Shell:
      </p>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.comment}>{"// Shell renders Header automatically:"}</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}Shell{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Shell</span> <span className={syn.prop}>showThemeToggle</span>={"{false}"}{">"}{"\n"}
              {"  "}...{"\n"}
              {"</"}<span className={syn.fn}>Shell</span>{">"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Standalone usage (rare):"}</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}Header{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Header</span> <span className={syn.prop}>showThemeToggle</span>={"{true}"} {"/>"}
            </code></pre>
          ),
        }]}
      />
      <div className={css({ height: "48px" })} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const pageTitle = css({
  fontFamily: "heading",
  fontSize: "48px",
  fontWeight: "display",
  lineHeight: 0.95,
  marginBottom: "16px",
  color: "text.primary",
});

const descText = css({
  fontSize: "16px",
  lineHeight: 1.6,
  color: "text.secondary",
  marginBottom: "16px",
});

const importBlock = css({
  display: "inline-block",
  padding: "8px 16px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  marginBottom: "48px",
});

const importCode = css({
  fontFamily: "mono",
  fontSize: "13px",
  color: "sunbeam.orange",
});

const sectionTitle = css({
  fontFamily: "heading",
  fontSize: "32px",
  fontWeight: "heading",
  lineHeight: 1.15,
  marginBottom: "24px",
  marginTop: "48px",
  color: "text.primary",
});

const bodyText = css({
  fontSize: "15px",
  lineHeight: 1.7,
  color: "text.secondary",
  marginBottom: "24px",
});

const mono = css({
  fontFamily: "mono",
  fontSize: "13px",
});

const featureList = css({
  fontSize: "15px",
  lineHeight: 1.8,
  color: "text.secondary",
  marginBottom: "24px",
  paddingLeft: "24px",
  "& li": { marginBottom: "8px" },
  "& strong": { color: "text.primary" },
});
