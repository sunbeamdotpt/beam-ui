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
  { label: "Props & Exports", id: "props" },
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

const zoneDark = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: "1px dashed",
  borderColor: "border.default",
  bg: "sunbeam.black",
  color: "white",
  padding: "12px",
});

const zoneLabel = css({
  fontFamily: "mono",
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
});

const zoneDim = css({
  fontFamily: "mono",
  fontSize: "10px",
  opacity: 0.7,
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

export function ApiLayoutPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Layouts" },
          { label: "API Layout" },
        ]}
      />

      <Badge variant="section">LAYOUTS</Badge>
      <h1 id="overview" className={title}>API Layout</h1>
      <p className={subtitle}>
        Split-panel layout with sidebar navigation, a left documentation
        panel (55%), and a dark right code panel (45%). Designed for API
        reference pages where docs and code examples sit side by side.
      </p>

      <div className={divider} />

      {/* ---- Visual Diagram ---- */}
      <h2 id="diagram" className={sectionTitle}>Visual Diagram</h2>
      <p className={bodyText}>
        The ApiLayout composes three regions: the standard sidebar for API
        endpoint navigation, and a split content area divided into a light
        left panel and a dark right panel. Both panels scroll independently.
        The full layout height is <code>calc(100vh - 64px)</code> with overflow
        hidden on the outer container. On mobile, the panels stack vertically.
      </p>

      <div className={wireframe}>
        <div className={zone} style={{ width: "80px" }}>
          <span className={zoneLabel}>Sidebar</span>
          <span className={zoneDim}>240px</span>
        </div>
        <div className={zonePrimary} style={{ flex: 1 }}>
          <span className={zoneLabel}>Left Panel</span>
          <span className={zoneDim}>55%</span>
        </div>
        <div className={zoneDark} style={{ flex: 0.82 }}>
          <span className={zoneLabel}>Right Panel</span>
          <span className={zoneDim}>45%</span>
        </div>
      </div>

      <div className={divider} />

      {/* ---- Zones ---- */}
      <h2 id="zones" className={sectionTitle}>Zones</h2>

      <h3 className={subheading}>Sidebar (240px)</h3>
      <p className={bodyText}>
        Same fixed-width sticky sidebar as other layouts, but renders the{" "}
        <code>apiSidebar</code> navigation data instead of{" "}
        <code>docsSidebar</code>. This is a separate nav tree tailored for
        API endpoint groupings. Hidden below the <code>lg</code> breakpoint.
      </p>

      <h3 className={subheading}>Left Panel (55%)</h3>
      <p className={bodyText}>
        Light-background panel for endpoint documentation: descriptive prose,
        parameter tables, and response schema details. Uses{" "}
        <code>bg.page</code> background and scrolls independently via{" "}
        <code>overflowY: auto</code>. Content is placed inside an element
        with the exported <code>apiLeftPanel</code> CSS class. Padding is
        24px inline.
      </p>

      <h3 className={subheading}>Right Panel (45%)</h3>
      <p className={bodyText}>
        Dark-background panel (<code>sunbeam.black</code> / #1A1412) for
        request/response examples, SDK snippets, and cURL commands. Text
        renders in white. Also scrolls independently via{" "}
        <code>overflowY: auto</code>. Content is placed
        inside an element with the exported <code>apiRightPanel</code> CSS class.
      </p>

      <div className={divider} />

      {/* ---- Props & Exports ---- */}
      <h2 id="props" className={sectionTitle}>Props & Exports</h2>
      <p className={bodyText}>
        ApiLayout is a zero-prop component. It exports two CSS classes that
        pages use to structure their left/right panel content.
      </p>

      <div className={tableWrapper}>
        <div className={tableHeader}>
          <span style={{ flex: 1 }}>Export</span>
          <span style={{ flex: 1 }}>Type</span>
          <span style={{ flex: 2 }}>Description</span>
        </div>
        <div className={tableRow}>
          <span className={cellName} style={{ flex: 1 }}>ApiLayout</span>
          <span className={cellDesc} style={{ flex: 1 }}>Component</span>
          <span className={cellDesc} style={{ flex: 2 }}>Layout wrapper. No props. Renders Sidebar and split-panel Outlet.</span>
        </div>
        <div className={tableRow}>
          <span className={cellName} style={{ flex: 1 }}>apiLeftPanel</span>
          <span className={cellDesc} style={{ flex: 1 }}>CSS class (string)</span>
          <span className={cellDesc} style={{ flex: 2 }}>Apply to the left documentation panel. Sets width 55% (100% on mobile), light bg, independent scroll, 24px inline padding.</span>
        </div>
        <div className={tableRow}>
          <span className={cellName} style={{ flex: 1 }}>apiRightPanel</span>
          <span className={cellDesc} style={{ flex: 1 }}>CSS class (string)</span>
          <span className={cellDesc} style={{ flex: 2 }}>Apply to the right code panel. Sets width 45% (100% on mobile), dark bg (sunbeam.black), white text, independent scroll.</span>
        </div>
      </div>

      <p className={bodyText}>
        Each API page renders two sibling elements using these classes:
      </p>

      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span>{" { "}<span className={syn.fn}>apiLeftPanel</span>{", "}<span className={syn.fn}>apiRightPanel</span>{" } "}<span className={syn.keyword}>from</span>{" "}<span className={syn.string}>"@sunbeam/beam-ui/components/layouts/api-layout"</span>{";"}{"\n"}
              {"\n"}
              <span className={syn.keyword}>export function</span>{" "}<span className={syn.fn}>ApiReferencePage</span>{"() {"}{"\n"}
              {"  "}<span className={syn.keyword}>return</span>{" ("}{"\n"}
              {"    <>"}{"\n"}
              {"      <"}<span className={syn.fn}>div</span>{" "}<span className={syn.prop}>className</span>{"={"}<span className={syn.fn}>apiLeftPanel</span>{"}>...docs...</"}<span className={syn.fn}>div</span>{">"}{"\n"}
              {"      <"}<span className={syn.fn}>div</span>{" "}<span className={syn.prop}>className</span>{"={"}<span className={syn.fn}>apiRightPanel</span>{"}>...code...</"}<span className={syn.fn}>div</span>{">"}{"\n"}
              {"    </>"}{"\n"}
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
        Nest API routes inside an <code>&lt;ApiLayout&gt;</code> route
        element, which itself is a child of <code>&lt;Shell&gt;</code>.
        The Outlet renders directly into the split-panel container, so
        page components must return the two panel divs as siblings.
      </p>

      <CodeBlock
        tabs={[{
          label: "app.tsx",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span>{" { "}<span className={syn.fn}>ApiLayout</span>{" } "}<span className={syn.keyword}>from</span>{" "}<span className={syn.string}>"@sunbeam/beam-ui/components/layouts/api-layout"</span>{";"}{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<Shell />"}</span>{"}>"}{"\n"}
              {"  "}<span className={syn.comment}>{"// API pages (sidebar + split panels)"}</span>{"\n"}
              {"  <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<ApiLayout />"}</span>{"}>"}{"\n"}
              {"    <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>path</span>{"="}<span className={syn.string}>"api"</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<ApiReferencePage />"}</span>{"} />"}{"\n"}
              {"    <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>path</span>{"="}<span className={syn.string}>"api/*"</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<ApiReferencePage />"}</span>{"} />"}{"\n"}
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
        (64px) and <strong>Footer</strong>. ApiLayout sits inside the Shell
        and manages the sidebar + split panels.
      </p>
      <p className={bodyText}>
        <strong>Sidebar</strong> is rendered internally by ApiLayout using the{" "}
        <code>apiSidebar</code> navigation data (imported from{" "}
        <code>navigation.ts</code>). This is a separate nav tree from the
        docs sidebar, tailored for API endpoint groupings.
      </p>
      <p className={bodyText}>
        <strong>No Right Rail</strong> -- ApiLayout does not include a right
        rail or TOC. The right panel serves a different purpose (code examples)
        and there is no <code>useDocsContext</code> equivalent within ApiLayout.
      </p>
      <p className={bodyText}>
        The layout sets its height to <code>calc(100vh - 64px)</code> to
        fill the viewport below the header, with <code>overflow: hidden</code>{" "}
        on the outer container so each panel manages its own scroll. A{" "}
        <strong>skip-to-content</strong> link targeting <code>#main-content</code>{" "}
        is included for keyboard accessibility.
      </p>

      <div className={divider} />

      {/* ---- Live Examples ---- */}
      <h2 id="live-examples" className={sectionTitle}>Live Examples</h2>
      <p className={bodyText}>
        These pages in the showcase app use ApiLayout:
      </p>

      <Link to="/api" className={liveLink}>
        <div className={liveLinkLabel}>API Reference</div>
        <div className={liveLinkDesc}>Split-panel view with endpoint docs on the left and code examples on the dark right panel.</div>
      </Link>
    </div>
  );
}
