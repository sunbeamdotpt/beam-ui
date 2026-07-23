/**
 * DocsLayout documentation page.
 *
 * Describes the two-column documentation layout, its zones, props, and shell integration.
 */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { css } from "styled-system/css";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";

/* ------------------------------------------------------------------ */
/* TOC                                                                 */
/* ------------------------------------------------------------------ */

const TOC_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "Visual Diagram", id: "diagram" },
  { label: "Zones", id: "zones" },
  { label: "Props & Slots", id: "props" },
  { label: "Route Setup", id: "route-setup" },
  { label: "Shell Integration", id: "shell-integration" },
  { label: "Live Examples", id: "live-examples" },
];

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const title = css({
  fontFamily: "heading",
  fontSize: "48px",
  fontWeight: "display",
  lineHeight: 0.95,
  color: "text.primary",
  letterSpacing: "-0.02em",
  marginBottom: "16px",
});

const subtitle = css({
  fontSize: "18px",
  color: "text.secondary",
  lineHeight: 1.6,
  marginBottom: "48px",
});

const sectionTitle = css({
  fontSize: "24px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "16px",
  marginTop: "48px",
});

const subheading = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "8px",
});

const bodyText = css({
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
});

const divider = css({
  height: "1px",
  bg: "border.default",
  marginBlock: "48px",
});

/* Wireframe styles */
const wireframe = css({
  display: "flex",
  height: "200px",
  border: "2px solid",
  borderColor: "border.default",
  marginBottom: "32px",
  borderRadius: "8px",
  overflow: "hidden",
});

const zone = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: "1px dashed",
  borderColor: "border.default",
  bg: "bg.card",
  padding: "12px",
});

const zonePrimary = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: "1px dashed",
  borderColor: "sunbeam.orange",
  bg: "rgba(250,82,15,0.05)",
  padding: "12px",
});

const zoneLabel = css({
  fontFamily: "mono",
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "text.primary",
});

const zoneDim = css({
  fontFamily: "mono",
  fontSize: "10px",
  color: "text.secondary",
});

/* Props table */
const tableWrapper = css({
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "8px",
  overflow: "hidden",
  marginBottom: "32px",
});

const tableHeader = css({
  display: "flex",
  bg: "bg.card",
  padding: "12px 16px",
  borderBottom: "1px solid",
  borderColor: "border.default",
  fontFamily: "mono",
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "text.secondary",
});

const tableRow = css({
  display: "flex",
  padding: "12px 16px",
  borderBottom: "1px solid",
  borderColor: "border.default",
  fontSize: "14px",
  _last: { borderBottom: "none" },
});

const cellName = css({
  fontFamily: "mono",
  fontWeight: "button",
  color: "text.primary",
});

const cellDesc = css({
  color: "text.secondary",
});

const liveLink = css({
  display: "block",
  padding: "12px 16px",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "8px",
  color: "text.primary",
  textDecoration: "none",
  marginBottom: "8px",
  transition: "border-color 0.15s",
  _hover: {
    borderColor: "sunbeam.orange",
  },
});

const liveLinkLabel = css({
  fontWeight: "button",
  marginBottom: "4px",
});

const liveLinkDesc = css({
  fontSize: "13px",
  color: "text.secondary",
});

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function DocsLayoutPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Layouts" },
          { label: "Docs Layout" },
        ]}
      />

      <Badge variant="section">LAYOUTS</Badge>
      <h1 id="overview" className={title}>Docs Layout</h1>
      <p className={subtitle}>
        Three-column layout with sidebar navigation, centered content area
        (max 720px), and a right-rail table of contents. The primary layout
        for all documentation and component pages.
      </p>

      <div className={divider} />

      {/* ---- Visual Diagram ---- */}
      <h2 id="diagram" className={sectionTitle}>Visual Diagram</h2>
      <p className={bodyText}>
        The DocsLayout arranges three horizontal zones within a 1440px
        max-width container. The sidebar and right rail are sticky while the
        center column scrolls freely.
      </p>

      <div className={wireframe}>
        <div className={zone} style={{ width: "80px" }}>
          <span className={zoneLabel}>Sidebar</span>
          <span className={zoneDim}>240px</span>
        </div>
        <div className={zonePrimary} style={{ flex: 1 }}>
          <span className={zoneLabel}>Content</span>
          <span className={zoneDim}>max 720px</span>
        </div>
        <div className={zone} style={{ width: "60px" }}>
          <span className={zoneLabel}>Right Rail</span>
          <span className={zoneDim}>200px</span>
        </div>
      </div>

      <div className={divider} />

      {/* ---- Zones ---- */}
      <h2 id="zones" className={sectionTitle}>Zones</h2>

      <h3 className={subheading}>Sidebar (240px)</h3>
      <p className={bodyText}>
        Fixed-width panel on the left. Sticky-positioned below the header
        (top: 64px) and independently scrollable when its content exceeds
        the viewport. Displays the <code>docsSidebar</code> navigation tree
        with collapsible sections via the <code>Sidebar</code> shell component.
        Hidden on viewports below the <code>lg</code> breakpoint.
      </p>

      <h3 className={subheading}>Content (flex 1, max 720px)</h3>
      <p className={bodyText}>
        The primary reading area. Fills the remaining width between sidebar
        and right rail, with an inner container capped at 720px for an
        optimal reading measure of 65-75 characters per line. Pages render
        here as children (with React Router, the app passes{" "}
        <code>&lt;Outlet&gt;</code> as a child). Padding is
        responsive: 24px on mobile, 48px on medium, 120px on large.
      </p>

      <h3 className={subheading}>Right Rail (200px)</h3>
      <p className={bodyText}>
        Sticky panel that renders a table-of-contents derived from TOC items
        registered by the current page via <code>setToc()</code>. An
        IntersectionObserver highlights the active section. Conditionally
        rendered -- only appears when the page has provided TOC items. Hidden
        on viewports below the <code>lg</code> breakpoint.
      </p>

      <div className={divider} />

      {/* ---- Props & Slots ---- */}
      <h2 id="props" className={sectionTitle}>Props & Slots</h2>
      <p className={bodyText}>
        DocsLayout takes <code>children</code> (required), plus optional{" "}
        <code>pageDates</code>, <code>currentPath</code>, and{" "}
        <code>linkAs</code> props for router integration. It manages internal
        state and exposes context to child pages via <code>useDocsContext()</code>.
      </p>

      <div className={tableWrapper}>
        <div className={tableHeader}>
          <span style={{ flex: 1 }}>Export</span>
          <span style={{ flex: 1 }}>Type</span>
          <span style={{ flex: 2 }}>Description</span>
        </div>
        <div className={tableRow}>
          <span className={cellName} style={{ flex: 1 }}>DocsLayout</span>
          <span className={cellDesc} style={{ flex: 1 }}>Component</span>
          <span className={cellDesc} style={{ flex: 2 }}>
            Layout wrapper. Renders Sidebar, children, and RightRail. Props:{" "}
            <code>children</code> (required), <code>pageDates?</code>{" "}
            (<code>Record&lt;string, string&gt;</code>), <code>currentPath?</code>{" "}
            (<code>string</code>), <code>linkAs?</code> (link component,
            defaults to a plain <code>&lt;a&gt;</code>).
          </span>
        </div>
        <div className={tableRow}>
          <span className={cellName} style={{ flex: 1 }}>useDocsContext()</span>
          <span className={cellDesc} style={{ flex: 1 }}>Hook</span>
          <span className={cellDesc} style={{ flex: 2 }}>
            Returns <code>{`{ setToc }`}</code> to register TOC items with the right rail.
          </span>
        </div>
        <div className={tableRow}>
          <span className={cellName} style={{ flex: 1 }}>DocsTocItem</span>
          <span className={cellDesc} style={{ flex: 1 }}>Interface</span>
          <span className={cellDesc} style={{ flex: 2 }}>
            <code>{`{ label: string; id: string }`}</code> -- shape for each TOC entry.
          </span>
        </div>
      </div>

      <p className={bodyText}>
        Pages register their TOC in a <code>useEffect</code> and clear on unmount:
      </p>

      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>const</span> {"{ "}<span className={syn.fn}>setToc</span>{" } = "}<span className={syn.fn}>useDocsContext</span>{"();"}{"\n"}
              {"\n"}
              <span className={syn.fn}>useEffect</span>{"(() => {"}{"\n"}
              {"  "}<span className={syn.fn}>setToc</span>{"(["}{"\n"}
              {"    { "}<span className={syn.prop}>label</span>{": "}<span className={syn.string}>"Overview"</span>{", "}<span className={syn.prop}>id</span>{": "}<span className={syn.string}>"overview"</span>{" },"}{"\n"}
              {"    { "}<span className={syn.prop}>label</span>{": "}<span className={syn.string}>"Usage"</span>{", "}<span className={syn.prop}>id</span>{": "}<span className={syn.string}>"usage"</span>{" },"}{"\n"}
              {"  ]);"}{"\n"}
              {"  "}<span className={syn.keyword}>return</span>{" () => "}<span className={syn.fn}>setToc</span>{"([]);"}{"\n"}
              {"}, ["}<span className={syn.fn}>setToc</span>{"]);"}{"\n"}
            </code></pre>
          ),
        }]}
      />

      <div className={divider} />

      {/* ---- Route Setup ---- */}
      <h2 id="route-setup" className={sectionTitle}>Route Setup</h2>
      <p className={bodyText}>
        Nest page routes inside a <code>&lt;DocsLayout&gt;</code> route
        element, which itself is a child of the <code>&lt;Shell&gt;</code> route.
        All foundation, component, layout documentation, and shell pages use
        this pattern.
      </p>

      <CodeBlock
        tabs={[{
          label: "app.tsx",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span>{" { "}<span className={syn.fn}>DocsLayout</span>{" } "}<span className={syn.keyword}>from</span>{" "}<span className={syn.string}>"@sunbeam/beam-ui"</span>{";"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Layouts render children, so pass <Outlet /> to nest routes:"}</span>{"\n"}
              <span className={syn.keyword}>function</span>{" "}<span className={syn.fn}>DocsLayoutWrapper</span>{"() {"}{"\n"}
              {"  "}<span className={syn.keyword}>const</span>{" { pathname } = "}<span className={syn.fn}>useLocation</span>{"();"}{"\n"}
              {"  "}<span className={syn.keyword}>return</span>{" ("}{"\n"}
              {"    <"}<span className={syn.fn}>DocsLayout</span>{" "}<span className={syn.prop}>currentPath</span>{"={pathname} "}<span className={syn.prop}>linkAs</span>{"={Link}>"}{"\n"}
              {"      <"}<span className={syn.fn}>Outlet</span>{" />"}{"\n"}
              {"    </"}<span className={syn.fn}>DocsLayout</span>{">"}{"\n"}
              {"  );"}{"\n"}
              {"}"}{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<RouterShell />"}</span>{"}>"}{"\n"}
              {"  <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<DocsLayoutWrapper />"}</span>{"}>"}{"\n"}
              {"    <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>path</span>{"="}<span className={syn.string}>"foundations/colors"</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<ColorsPage />"}</span>{"} />"}{"\n"}
              {"    <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>path</span>{"="}<span className={syn.string}>"components/button"</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<ButtonPage />"}</span>{"} />"}{"\n"}
              {"    <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>path</span>{"="}<span className={syn.string}>"layouts/docs"</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<DocsLayoutPage />"}</span>{"} />"}{"\n"}
              {"  </"}<span className={syn.fn}>Route</span>{">"}{"\n"}
              {"</"}<span className={syn.fn}>Route</span>{">"}{"\n"}
            </code></pre>
          ),
        }]}
      />

      <div className={divider} />

      {/* ---- Shell Integration ---- */}
      <h2 id="shell-integration" className={sectionTitle}>Shell Integration</h2>
      <p className={bodyText}>
        The <code>Shell</code> component wraps DocsLayout from the outside,
        providing the fixed <strong>Header</strong> (64px) at the top and the
        <strong> Footer</strong> at the bottom. DocsLayout itself manages
        only the three-column body between them.
      </p>
      <p className={bodyText}>
        <strong>Sidebar</strong> is rendered internally by DocsLayout using
        the <code>docsSidebar</code> navigation data. It is not a prop you
        pass in -- the layout imports and renders it directly.
      </p>
      <p className={bodyText}>
        <strong>RightRail</strong> is also rendered internally. It receives
        its TOC items from the <code>DocsContext</code> state managed by
        the layout. Pages communicate with the right rail by calling{" "}
        <code>setToc()</code> via the <code>useDocsContext()</code> hook.
      </p>
      <p className={bodyText}>
        A <strong>skip-to-content</strong> link is included for accessibility.
        It targets <code>#main-content</code> and becomes visible on focus,
        allowing keyboard users to bypass the sidebar navigation.
      </p>

      <div className={divider} />

      {/* ---- Live Examples ---- */}
      <h2 id="live-examples" className={sectionTitle}>Live Examples</h2>
      <p className={bodyText}>
        These pages in the showcase app use DocsLayout:
      </p>

      <Link to="/foundations/colors" className={liveLink}>
        <div className={liveLinkLabel}>Colors</div>
        <div className={liveLinkDesc}>Foundation page -- demonstrates sidebar nav, centered content, and right-rail TOC.</div>
      </Link>
      <Link to="/foundations/typography" className={liveLink}>
        <div className={liveLinkLabel}>Typography</div>
        <div className={liveLinkDesc}>Foundation page with extensive sections and TOC navigation.</div>
      </Link>
      <Link to="/components/button" className={liveLink}>
        <div className={liveLinkLabel}>Button</div>
        <div className={liveLinkDesc}>Component page with preview, props table, and code examples.</div>
      </Link>
      <Link to="/foundations/accessibility" className={liveLink}>
        <div className={liveLinkLabel}>Accessibility</div>
        <div className={liveLinkDesc}>Foundation page with code blocks and callouts inside the docs layout.</div>
      </Link>
      <Link to="/docs" className={liveLink}>
        <div className={liveLinkLabel}>Docs Home</div>
        <div className={liveLinkDesc}>Landing page for the documentation section.</div>
      </Link>
    </div>
  );
}
