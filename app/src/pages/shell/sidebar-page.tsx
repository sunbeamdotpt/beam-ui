import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { Sidebar } from "@sunbeam/beam-ui/components/shell/sidebar";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { docsSidebar } from "@sunbeam/beam-ui/data/navigation";
import { PropsTable } from "../components/_template";

const TOC_ITEMS = [
  { label: "Preview", id: "preview" },
  { label: "Props", id: "props" },
  { label: "Data Structure", id: "data-structure" },
  { label: "Features", id: "features" },
  { label: "Scrollbar", id: "scrollbar" },
  { label: "Usage", id: "usage" },
];

const PROPS = [
  { name: "sections", type: "NavSection[]", required: true, description: "Array of navigation sections to render. Each section has a title and an array of NavItems." },
];

const NAV_SECTION_FIELDS = [
  { name: "title", type: "string", required: true, description: "Section heading text (rendered uppercase)." },
  { name: "items", type: "NavItem[]", required: true, description: "Array of navigation items in this section." },
];

const NAV_ITEM_FIELDS = [
  { name: "label", type: "string", required: true, description: "Display text for the nav link." },
  { name: "href", type: "string", required: true, description: "Route path the link navigates to." },
  { name: "icon", type: "string", required: false, description: "Optional Material Symbol icon name." },
  { name: "children", type: "NavItem[]", required: false, description: "Nested items rendered as a collapsible group. If children share the parent href, they render as quiet labels; otherwise as navigable links." },
];

export function SidebarPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shell" },
          { label: "Sidebar" },
        ]}
      />

      <h1 className={pageTitle}>Sidebar</h1>
      <p className={descText}>
        Sticky navigation sidebar with grouped sections, collapsible children,
        active-state highlighting, and a themed hover scrollbar. Used in all
        three-column layouts (Docs, API, Fullwidth).
      </p>
      <div className={importBlock}>
        <code className={importCode}>import {"{ Sidebar }"} from "@sunbeam/beam-ui"</code>
      </div>

      {/* Preview */}
      <h2 id="preview" className={sectionTitle}>Preview</h2>
      <p className={bodyText}>
        The live sidebar is visible to the left of this page. Below is an
        isolated preview with the current navigation data:
      </p>
      <div className={previewWrapper}>
        <Sidebar sections={docsSidebar} />
      </div>

      {/* Props */}
      <h2 id="props" className={sectionTitle}>Props</h2>
      <PropsTable props={PROPS} />

      {/* Data Structure */}
      <h2 id="data-structure" className={sectionTitle}>Data Structure</h2>

      <h3 className={subHeading}>NavSection</h3>
      <PropsTable props={NAV_SECTION_FIELDS} />

      <h3 className={subHeading}>NavItem</h3>
      <PropsTable props={NAV_ITEM_FIELDS} />

      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}Sidebar{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              <span className={syn.keyword}>import type</span> {"{ "}NavSection{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> sections: NavSection[] = [{"\n"}
              {"  "}{"{"}{"\n"}
              {"    "}title: <span className={syn.string}>"GETTING STARTED"</span>,{"\n"}
              {"    "}items: [{"\n"}
              {"      "}{"{ "}label: <span className={syn.string}>"Introduction"</span>, href: <span className={syn.string}>"/docs/intro"</span>{" },\n"}
              {"      "}{"{ "}label: <span className={syn.string}>"Installation"</span>, href: <span className={syn.string}>"/docs/install"</span>{" },\n"}
              {"    "}],{"\n"}
              {"  "}{"}"},{"\n"}
              {"  "}{"{"}{"\n"}
              {"    "}title: <span className={syn.string}>"COMPONENTS"</span>,{"\n"}
              {"    "}items: [{"\n"}
              {"      "}{"{ "}label: <span className={syn.string}>"Button"</span>, href: <span className={syn.string}>"/components/button"</span>{" },\n"}
              {"      "}{"{"}{"\n"}
              {"        "}label: <span className={syn.string}>"Charts"</span>,{"\n"}
              {"        "}href: <span className={syn.string}>"/components/charts"</span>,{"\n"}
              {"        "}children: [{"\n"}
              {"          "}{"{ "}label: <span className={syn.string}>"LineChart"</span>, href: <span className={syn.string}>"/components/line-chart"</span>{" },\n"}
              {"          "}{"{ "}label: <span className={syn.string}>"BarChart"</span>, href: <span className={syn.string}>"/components/bar-chart"</span>{" },\n"}
              {"        "}],{"\n"}
              {"      "}{"}"},{"\n"}
              {"    "}],{"\n"}
              {"  "}{"}"},{"\n"}
              ];{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Sidebar</span> <span className={syn.prop}>sections</span>={"{sections}"} {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Features */}
      <h2 id="features" className={sectionTitle}>Features</h2>
      <ul className={featureList}>
        <li><strong>Sticky positioning</strong> — stays fixed below the header (top: 64px) while content scrolls</li>
        <li><strong>Active state</strong> — current page link highlighted with orange left border and accent color, uses <code className={mono}>aria-current="page"</code></li>
        <li><strong>Collapsible groups</strong> — items with <code className={mono}>children</code> render as expandable sections using Ark UI Collapsible</li>
        <li><strong>Smart child rendering</strong> — children sharing the parent href render as quiet labels; children with unique hrefs render as navigable links with independent active states</li>
        <li><strong>Auto-expand</strong> — groups auto-expand when the current page matches a child route</li>
        <li><strong>Section headers</strong> — uppercase muted labels that group related nav items</li>
        <li><strong>Accessible</strong> — <code className={mono}>aside</code> landmark with <code className={mono}>aria-label="Documentation navigation"</code></li>
      </ul>

      {/* Scrollbar */}
      <h2 id="scrollbar" className={sectionTitle}>Scrollbar</h2>
      <p className={bodyText}>
        The sidebar uses a themed hover scrollbar:
      </p>
      <ul className={featureList}>
        <li><strong>Hidden by default</strong> — transparent thumb and track, no visual noise</li>
        <li><strong>Appears on hover</strong> — warm golden scrollbar thumb (<code className={mono}>rgba(255,161,16,0.25)</code>) fades in when hovering the sidebar</li>
        <li><strong>Thin profile</strong> — 4px width, rounded corners</li>
        <li><strong>Cross-browser</strong> — Webkit via CSS pseudo-elements, Firefox via <code className={mono}>scrollbarColor</code> JS toggle</li>
      </ul>
      <p className={bodyText}>
        This behavior is also available as a reusable component via <code className={mono}>ScrollArea</code> with <code className={mono}>scrollbar="hover"</code>.
      </p>

      {/* Usage */}
      <h2 id="usage" className={sectionTitle}>Usage</h2>
      <p className={bodyText}>
        The Sidebar is typically not used directly — it's rendered by the layout
        components (DocsLayout, ApiLayout, FullwidthLayout). To customize the
        navigation, update the <code className={mono}>docsSidebar</code> data in
        the navigation module:
      </p>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.comment}>{"// In your layout or shell:"}</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}Sidebar{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}docsSidebar{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui/data/navigation"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Sidebar</span> <span className={syn.prop}>sections</span>={"{docsSidebar}"} {"/>"}
            </code></pre>
          ),
        }]}
      />
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

const subHeading = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "16px",
  marginTop: "24px",
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

const previewWrapper = css({
  position: "relative",
  border: "1px solid",
  borderColor: "border.default",
  overflow: "hidden",
  height: "400px",
  marginBottom: "32px",
  "& > *": {
    position: "relative !important",
  },
});

