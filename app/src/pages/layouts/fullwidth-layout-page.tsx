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

export function FullwidthLayoutPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Layouts" },
          { label: "Fullwidth Layout" },
        ]}
      />

      <Badge variant="section">LAYOUTS</Badge>
      <h1 id="overview" className={title}>Fullwidth Layout</h1>
      <p className={subtitle}>
        Wide content layout with sidebar navigation and a content area capped
        at 900px. No right rail. Ideal for dashboards, model catalogs,
        card grids, and wide data tables.
      </p>

      <div className={divider} />

      {/* ---- Visual Diagram ---- */}
      <h2 id="diagram" className={sectionTitle}>Visual Diagram</h2>
      <p className={bodyText}>
        FullwidthLayout pairs the standard sidebar with a wider content region.
        Unlike DocsLayout, there is no right rail -- the full remaining
        horizontal space is given to the content column (up to 900px). The
        outer container has a max-width of 1440px centered on the page.
      </p>

      <div className={wireframe}>
        <div className={zone} style={{ width: "80px" }}>
          <span className={zoneLabel}>Sidebar</span>
          <span className={zoneDim}>240px</span>
        </div>
        <div className={zonePrimary} style={{ flex: 1 }}>
          <span className={zoneLabel}>Content</span>
          <span className={zoneDim}>max 900px</span>
        </div>
      </div>

      <div className={divider} />

      {/* ---- Zones ---- */}
      <h2 id="zones" className={sectionTitle}>Zones</h2>

      <h3 className={subheading}>Sidebar (240px)</h3>
      <p className={bodyText}>
        Fixed-width panel using the <code>docsSidebar</code> navigation data,
        identical to DocsLayout. Sticky-positioned below the header. Hidden
        on viewports below the <code>lg</code> breakpoint.
      </p>

      <h3 className={subheading}>Content (flex 1, max 900px)</h3>
      <p className={bodyText}>
        The content column is capped at 900px (versus 720px in DocsLayout),
        providing an additional 180px of horizontal space. This accommodates
        three-column card grids, wider data tables, and comparison views
        that would feel cramped in the standard docs layout. Padding is
        responsive: 24px base, 48px medium, 120px large.
      </p>
      <p className={bodyText}>
        Pages render via <code>&lt;Outlet&gt;</code>. There is no right-rail
        TOC context -- pages rendered in this layout do not have access to{" "}
        <code>useDocsContext()</code>. If a page needs a TOC, use DocsLayout
        instead.
      </p>

      <div className={divider} />

      {/* ---- Props & Slots ---- */}
      <h2 id="props" className={sectionTitle}>Props & Slots</h2>
      <p className={bodyText}>
        FullwidthLayout is a zero-prop component with no exported hooks or
        CSS classes. It is simpler than DocsLayout because it has no right
        rail or context management.
      </p>

      <div className={tableWrapper}>
        <div className={tableHeader}>
          <span style={{ flex: 1 }}>Export</span>
          <span style={{ flex: 1 }}>Type</span>
          <span style={{ flex: 2 }}>Description</span>
        </div>
        <div className={tableRow}>
          <span className={cellName} style={{ flex: 1 }}>FullwidthLayout</span>
          <span className={cellDesc} style={{ flex: 1 }}>Component</span>
          <span className={cellDesc} style={{ flex: 2 }}>Layout wrapper. No props. Renders Sidebar (docsSidebar) and a wider Outlet container (max 900px).</span>
        </div>
      </div>

      <p className={bodyText}>
        Pages inside FullwidthLayout are standard React components -- no
        special hooks or class names required:
      </p>

      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>export function</span>{" "}<span className={syn.fn}>ModelsIndexPage</span>{"() {"}{"\n"}
              {"  "}<span className={syn.keyword}>return</span>{" ("}{"\n"}
              {"    <"}<span className={syn.fn}>div</span>{">"}{"\n"}
              {"      <"}<span className={syn.fn}>h1</span>{">Models</"}<span className={syn.fn}>h1</span>{">"}{"\n"}
              {"      <"}<span className={syn.fn}>div</span>{" "}<span className={syn.prop}>className</span>{"="}<span className={syn.string}>"card-grid"</span>{">"}{"\n"}
              {"        "}<span className={syn.comment}>{"// Cards fill the wider 900px content area"}</span>{"\n"}
              {"      </"}<span className={syn.fn}>div</span>{">"}{"\n"}
              {"    </"}<span className={syn.fn}>div</span>{">"}{"\n"}
              {"  );"}{"\n"}
              {"}"}{"\n"}
            </code></pre>
          ),
        }]}
      />

      <div className={divider} />

      {/* ---- Route Setup ---- */}
      <h2 id="route-setup" className={sectionTitle}>Route Setup</h2>
      <p className={bodyText}>
        Nest routes inside a <code>&lt;FullwidthLayout&gt;</code> route
        element, which itself is a child of <code>&lt;Shell&gt;</code>.
      </p>

      <CodeBlock
        tabs={[{
          label: "app.tsx",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span>{" { "}<span className={syn.fn}>FullwidthLayout</span>{" } "}<span className={syn.keyword}>from</span>{" "}<span className={syn.string}>"@sunbeam/beam-ui/components/layouts/fullwidth-layout"</span>{";"}{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<Shell />"}</span>{"}>"}{"\n"}
              {"  "}<span className={syn.comment}>{"// Fullwidth pages (sidebar + wider content)"}</span>{"\n"}
              {"  <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<FullwidthLayout />"}</span>{"}>"}{"\n"}
              {"    <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>path</span>{"="}<span className={syn.string}>"models"</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<ModelsIndexPage />"}</span>{"} />"}{"\n"}
              {"    <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>path</span>{"="}<span className={syn.string}>"models/solstice-4-vision"</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<ModelDetailPage />"}</span>{"} />"}{"\n"}
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
        The <code>Shell</code> component provides the fixed <strong>Header</strong>{" "}
        (64px) and <strong>Footer</strong>. FullwidthLayout sits inside the
        Shell and manages the sidebar + content area.
      </p>
      <p className={bodyText}>
        <strong>Sidebar</strong> is rendered internally using the same{" "}
        <code>docsSidebar</code> navigation tree as DocsLayout. The sidebar
        provides consistent navigation across both layout types.
      </p>
      <p className={bodyText}>
        <strong>No Right Rail</strong> -- FullwidthLayout does not render a
        right rail. There is no TOC context or <code>useDocsContext()</code>{" "}
        hook available. If a page needs a right-rail TOC, use DocsLayout instead.
      </p>
      <p className={bodyText}>
        Unlike DocsLayout, FullwidthLayout does not include a skip-to-content
        link or explicit <code>role="main"</code> on the content area. The
        <code> &lt;main&gt;</code> element is a plain semantic element.
      </p>

      <div className={divider} />

      {/* ---- Live Examples ---- */}
      <h2 id="live-examples" className={sectionTitle}>Live Examples</h2>
      <p className={bodyText}>
        These pages in the showcase app use FullwidthLayout:
      </p>

      <Link to="/models" className={liveLink}>
        <div className={liveLinkLabel}>Models Index</div>
        <div className={liveLinkDesc}>Card grid of available models using the wider content area.</div>
      </Link>
      <Link to="/models/solstice-4-vision" className={liveLink}>
        <div className={liveLinkLabel}>Solstice 4 Vision (Model Detail)</div>
        <div className={liveLinkDesc}>Model detail page with specs, benchmarks, and usage examples in the wider layout.</div>
      </Link>
    </div>
  );
}
