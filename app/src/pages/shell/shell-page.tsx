/**
 * Shell component documentation page.
 *
 * Documents the top-level application shell: header, footer, sidebar, and theme toggle.
 */
import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { PropsTable } from "../components/_template";

const TOC_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "Props", id: "props" },
  { label: "Structure", id: "structure" },
  { label: "Usage", id: "usage" },
  { label: "Customization", id: "customization" },
];

const PROPS = [
  { name: "showThemeToggle", type: "boolean", required: false, description: "Show the theme toggle button in the header. Defaults to true." },
  { name: "header", type: "ReactNode", required: false, description: "Replace the default Header with a custom element. Pass null to remove." },
  { name: "footer", type: "ReactNode", required: false, description: "Replace the default Footer with a custom element. Pass null to remove." },
  { name: "children", type: "ReactNode", required: false, description: "Content to render between the header and footer. With React Router, pass <Outlet /> as a child." },
  { name: "currentPath", type: "string", required: false, description: "Current path, used by the header to compute active nav states." },
  { name: "linkAs", type: "LinkComponent", required: false, description: "Component used to render links (e.g. your router's Link). Defaults to a plain <a>." },
  { name: "onNavigate", type: "(href: string) => void", required: false, description: "Called when a nav link or search result should trigger client-side navigation." },
  { name: "className", type: "string", required: false, description: "Override the default shell container class." },
];

export function ShellPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shell" },
          { label: "Shell" },
        ]}
      />

      <h1 className={pageTitle}>Shell</h1>
      <p className={descText}>
        The root application wrapper that provides a consistent Header + content + Footer
        structure across all pages. Handles the fixed header offset and min-height viewport
        fill, and renders whatever you pass as children in between.
      </p>
      <div className={importBlock}>
        <code className={importCode}>import {"{ Shell }"} from "@sunbeam/beam-ui"</code>
      </div>

      {/* Overview */}
      <h2 id="overview" className={sectionTitle}>Overview</h2>
      <p className={bodyText}>
        Shell is the outermost structural component. It renders the Header at the top,
        Footer at the bottom, and your page content in between. It knows nothing about
        routers: when used with React Router, pass <code className={mono}>&lt;Outlet /&gt;</code> as
        a child for nested routes, and wire navigation via <code className={mono}>linkAs</code>,{" "}
        <code className={mono}>currentPath</code>, and <code className={mono}>onNavigate</code>.
        Layout components (DocsLayout, ApiLayout, FullwidthLayout) are rendered inside the Shell.
      </p>

      {/* Wireframe */}
      <div className={wireframe}>
        <div className={wireZoneHeader}>HEADER (fixed, 64px)</div>
        <div className={wireZoneContent}>
          <span className={wireZoneLabel}>CONTENT (children)</span>
          <span className={wireZoneDim}>flex: 1, paddingTop: 64px</span>
        </div>
        <div className={wireZoneFooter}>FOOTER</div>
      </div>

      {/* Props */}
      <h2 id="props" className={sectionTitle}>Props</h2>
      <PropsTable props={PROPS} />

      {/* Structure */}
      <h2 id="structure" className={sectionTitle}>Structure</h2>
      <p className={bodyText}>
        The Shell renders this DOM structure:
      </p>
      <CodeBlock
        tabs={[{
          label: "HTML",
          content: (
            <pre><code>
              {"<div class=\"shell\">\n"}
              {"  <Header />\n"}
              {"  <div class=\"main\" style=\"padding-top: 64px\">\n"}
              {"    {children}  <!-- e.g. <Outlet /> -->\n"}
              {"  </div>\n"}
              {"  <Footer />\n"}
              {"</div>"}
            </code></pre>
          ),
        }]}
      />
      <p className={css({ fontSize: "15px", lineHeight: 1.7, color: "text.secondary", marginBottom: "24px", marginTop: "24px" })}>
        The shell container uses <code className={mono}>display: flex; flex-direction: column; min-height: 100vh</code> to
        ensure the footer is always pushed to the bottom of the viewport, even on short pages.
        The main content area uses <code className={mono}>flex: 1</code> to fill the remaining space.
      </p>

      {/* Usage */}
      <h2 id="usage" className={sectionTitle}>Usage</h2>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}Shell{", "}DocsLayout{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}Outlet{", "}Route{", "}Routes{", "}useLocation{", "}useNavigate{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"react-router-dom"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Shell renders children; with React Router, pass <Outlet /> as a child"}</span>{"\n"}
              <span className={syn.comment}>{"// and wire navigation via linkAs / currentPath / onNavigate"}</span>{"\n"}
              <span className={syn.keyword}>function</span> <span className={syn.fn}>RouterShell</span>() {"{"}{"\n"}
              {"  "}<span className={syn.keyword}>const</span> {"{ "}pathname{" } = "}<span className={syn.fn}>useLocation</span>{"();"}{"\n"}
              {"  "}<span className={syn.keyword}>const</span> navigate{" = "}<span className={syn.fn}>useNavigate</span>{"();"}{"\n"}
              {"  "}<span className={syn.keyword}>return</span> ({"\n"}
              {"    <"}<span className={syn.fn}>Shell</span> <span className={syn.prop}>currentPath</span>={"{pathname}"} <span className={syn.prop}>linkAs</span>={"{Link}"} <span className={syn.prop}>onNavigate</span>={"{navigate}"}{">"}{"\n"}
              {"      <"}<span className={syn.fn}>Outlet</span> {" />"}{"\n"}
              {"    </"}<span className={syn.fn}>Shell</span>{">"}{"\n"}
              {"  );"}{"\n"}
              {"}"}{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Routes</span>{">"}{"\n"}
              {"  <"}<span className={syn.fn}>Route</span> <span className={syn.prop}>element</span>={"{<"}<span className={syn.fn}>RouterShell</span> {"/>}"}{">"}{"\n"}
              {"    "}<span className={syn.comment}>{"// Full-width pages"}</span>{"\n"}
              {"    <"}<span className={syn.fn}>Route</span> <span className={syn.prop}>index</span> <span className={syn.prop}>element</span>={"{<"}<span className={syn.fn}>HomePage</span> {"/>}"} {"/>"}{"\n"}
              {"    "}<span className={syn.comment}>{"// Docs pages (with sidebar)"}</span>{"\n"}
              {"    <"}<span className={syn.fn}>Route</span> <span className={syn.prop}>path</span>=<span className={syn.string}>"docs/*"</span> <span className={syn.prop}>element</span>={"{<"}<span className={syn.fn}>DocsPage</span> {"/>}"} {"/>"}{"\n"}
              {"  </"}<span className={syn.fn}>Route</span>{">"}{"\n"}
              {"</"}<span className={syn.fn}>Routes</span>{">"}
            </code></pre>
          ),
        }]}
      />

      {/* Customization */}
      <h2 id="customization" className={sectionTitle}>Customization</h2>
      <p className={bodyText}>
        The Shell's header and footer can be replaced or removed entirely:
      </p>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.comment}>{"// Hide theme toggle"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Shell</span> <span className={syn.prop}>showThemeToggle</span>={"{false}"}{">"}{"\n"}
              {"  "}...{"\n"}
              {"</"}<span className={syn.fn}>Shell</span>{">"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Custom header"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Shell</span> <span className={syn.prop}>header</span>={"{<"}<span className={syn.fn}>MyHeader</span> {"/>}"}{">"}{"\n"}
              {"  "}...{"\n"}
              {"</"}<span className={syn.fn}>Shell</span>{">"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// No footer"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Shell</span> <span className={syn.prop}>footer</span>={"{null}"}{">"}{"\n"}
              {"  "}...{"\n"}
              {"</"}<span className={syn.fn}>Shell</span>{">"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Direct children (no router)"}</span>{"\n"}
              {"<"}<span className={syn.fn}>Shell</span>{">"}{"\n"}
              {"  <"}<span className={syn.fn}>MyPage</span> {"/>"}{"\n"}
              {"</"}<span className={syn.fn}>Shell</span>{">"}
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

const pageTitle = css({ fontFamily: "heading", fontSize: "48px", fontWeight: "display", lineHeight: 0.95, marginBottom: "16px", color: "text.primary" });
const descText = css({ fontSize: "16px", lineHeight: 1.6, color: "text.secondary", marginBottom: "16px" });
const importBlock = css({ display: "inline-block", padding: "8px 16px", backgroundColor: "bg.card", border: "1px solid", borderColor: "border.default", marginBottom: "48px" });
const importCode = css({ fontFamily: "mono", fontSize: "13px", color: "sunbeam.orange" });
const sectionTitle = css({ fontFamily: "heading", fontSize: "32px", fontWeight: "heading", lineHeight: 1.15, marginBottom: "24px", marginTop: "48px", color: "text.primary" });
const bodyText = css({ fontSize: "15px", lineHeight: 1.7, color: "text.secondary", marginBottom: "24px" });
const mono = css({ fontFamily: "mono", fontSize: "13px" });

const wireframe = css({ display: "flex", flexDirection: "column", border: "2px solid", borderColor: "border.default", marginBottom: "32px", height: "240px" });
const wireZoneHeader = css({ padding: "12px", fontSize: "11px", fontFamily: "mono", textTransform: "uppercase", letterSpacing: "0.1em", color: "sunbeam.orange", borderBottom: "2px solid", borderColor: "sunbeam.orange", backgroundColor: "rgba(250,82,15,0.05)", textAlign: "center" });
const wireZoneContent = css({ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", backgroundColor: "bg.card", borderBottom: "1px dashed", borderColor: "border.default" });
const wireZoneLabel = css({ fontSize: "11px", fontFamily: "mono", textTransform: "uppercase", letterSpacing: "0.1em", color: "text.muted" });
const wireZoneDim = css({ fontSize: "10px", fontFamily: "mono", color: "text.muted" });
const wireZoneFooter = css({ padding: "12px", fontSize: "11px", fontFamily: "mono", textTransform: "uppercase", letterSpacing: "0.1em", color: "text.muted", textAlign: "center" });
