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

export function CreatorsLayoutPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Layouts" },
          { label: "Creations Layout" },
        ]}
      />

      <Badge variant="section">LAYOUTS</Badge>
      <h1 id="overview" className={title}>Creations Layout</h1>
      <p className={subtitle}>
        Full-bleed layout with no sidebar and no right rail. Content fills
        the entire viewport width (up to the 1440px shell max-width). Designed
        for community pages, landing pages, cookbooks, and marketing content
        where visual impact takes priority over navigation hierarchy.
      </p>

      <div className={divider} />

      {/* ---- Visual Diagram ---- */}
      <h2 id="diagram" className={sectionTitle}>Visual Diagram</h2>
      <p className={bodyText}>
        The Creations Layout is the simplest of the four layouts. There is no
        dedicated layout component -- pages are placed as direct children of
        the <code>&lt;Shell&gt;</code> route. The Shell provides the Header
        and Footer; everything between them is the page content.
      </p>

      <div className={wireframe}>
        <div className={zonePrimary} style={{ flex: 1 }}>
          <span className={zoneLabel}>Content</span>
          <span className={zoneDim}>full width (up to 1440px)</span>
        </div>
      </div>

      <div className={divider} />

      {/* ---- Zones ---- */}
      <h2 id="zones" className={sectionTitle}>Zones</h2>

      <h3 className={subheading}>Content (full width)</h3>
      <p className={bodyText}>
        The single content zone spans the entire width between Header and
        Footer. There is no sidebar and no right rail. Pages manage their
        own internal layout -- hero sections, card grids, CTAs, and other
        full-bleed sections are composed directly within the page component.
      </p>
      <p className={bodyText}>
        The Shell's main area applies <code>paddingTop: 64px</code> to clear
        the fixed header and <code>flex: 1</code> to fill the viewport height.
        Beyond that, no constraints are imposed on the content.
      </p>

      <h3 className={subheading}>Common internal patterns</h3>
      <p className={bodyText}>
        <strong>Hero Section</strong> -- A full-bleed banner with a dark or
        accent background, large heading, and call to action. Often uses
        negative margins or viewport-width techniques to break out of any
        parent padding.
      </p>
      <p className={bodyText}>
        <strong>Card Grid</strong> -- A centered container (typically max-width
        1200px) with a responsive CSS grid of creator cards, resource cards,
        or feature highlights.
      </p>
      <p className={bodyText}>
        <strong>CTA Footer</strong> -- A full-width call-to-action banner
        before the site footer, encouraging visitors to join the community
        or explore other sections.
      </p>

      <div className={divider} />

      {/* ---- Props & Slots ---- */}
      <h2 id="props" className={sectionTitle}>Props & Slots</h2>
      <p className={bodyText}>
        The Creations Layout has no dedicated layout component. Pages are
        placed directly inside the <code>&lt;Shell&gt;</code> route. There
        are no exported components, hooks, or CSS classes to consume.
      </p>

      <div className={tableWrapper}>
        <div className={tableHeader}>
          <span style={{ flex: 1 }}>Pattern</span>
          <span style={{ flex: 1 }}>Type</span>
          <span style={{ flex: 2 }}>Description</span>
        </div>
        <div className={tableRow}>
          <span className={cellName} style={{ flex: 1 }}>Shell (direct child)</span>
          <span className={cellDesc} style={{ flex: 1 }}>Route pattern</span>
          <span className={cellDesc} style={{ flex: 2 }}>
            Place page route as a direct child of the Shell route element, outside any layout wrapper.
          </span>
        </div>
      </div>

      <p className={bodyText}>
        Since there is no layout wrapper, pages have full control over their
        markup. A typical Creators page composes its own sections:
      </p>

      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>export function</span>{" "}<span className={syn.fn}>CreatorsPage</span>{"() {"}{"\n"}
              {"  "}<span className={syn.keyword}>return</span>{" ("}{"\n"}
              {"    <>"}{"\n"}
              {"      <"}<span className={syn.fn}>section</span>{" "}<span className={syn.prop}>className</span>{"="}<span className={syn.string}>"hero"</span>{">"}{"\n"}
              {"        "}<span className={syn.comment}>{"// Full-bleed hero banner"}</span>{"\n"}
              {"      </"}<span className={syn.fn}>section</span>{">"}{"\n"}
              {"      <"}<span className={syn.fn}>section</span>{" "}<span className={syn.prop}>className</span>{"="}<span className={syn.string}>"card-grid"</span>{">"}{"\n"}
              {"        "}<span className={syn.comment}>{"// Centered content grid"}</span>{"\n"}
              {"      </"}<span className={syn.fn}>section</span>{">"}{"\n"}
              {"      <"}<span className={syn.fn}>section</span>{" "}<span className={syn.prop}>className</span>{"="}<span className={syn.string}>"cta"</span>{">"}{"\n"}
              {"        "}<span className={syn.comment}>{"// Call to action banner"}</span>{"\n"}
              {"      </"}<span className={syn.fn}>section</span>{">"}{"\n"}
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
        Place your route as a direct child of the <code>&lt;Shell&gt;</code>{" "}
        route, outside of any layout wrapper like DocsLayout or FullwidthLayout.
        The Shell provides the Header and Footer; the page fills the main area.
      </p>

      <CodeBlock
        tabs={[{
          label: "app.tsx",
          content: (
            <pre><code>
              {"<"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<Shell />"}</span>{"}>"}{"\n"}
              {"  "}<span className={syn.comment}>{"// Full-width pages (no sidebar, no right rail)"}</span>{"\n"}
              {"  <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>path</span>{"="}<span className={syn.string}>"community"</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<CreatorsPage />"}</span>{"} />"}{"\n"}
              {"  <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>path</span>{"="}<span className={syn.string}>"guides"</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<CookbooksPage />"}</span>{"} />"}{"\n"}
              {"\n"}
              {"  "}<span className={syn.comment}>{"// Docs pages use a layout wrapper instead"}</span>{"\n"}
              {"  <"}<span className={syn.fn}>Route</span>{" "}<span className={syn.prop}>element</span>{"={"}<span className={syn.string}>{"<DocsLayout />"}</span>{"}>"}{"\n"}
              {"    "}<span className={syn.comment}>{"// ..."}</span>{"\n"}
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
        (64px) and <strong>Footer</strong>. The Shell renders its{" "}
        <code>children</code> in a flex container with{" "}
        <code>paddingTop: 64px</code> and <code>flex: 1</code>, which is
        where the page content appears.
      </p>
      <p className={bodyText}>
        <strong>No Sidebar</strong> -- Unlike DocsLayout and FullwidthLayout,
        there is no sidebar. Navigation is handled entirely by the Header
        and in-page links.
      </p>
      <p className={bodyText}>
        <strong>No Right Rail</strong> -- There is no TOC panel. Pages that
        need section navigation should implement their own scroll-based
        navigation or anchor links.
      </p>
      <p className={bodyText}>
        The key trade-off is navigation density versus visual impact. Choose
        the Creations Layout when the page is a standalone destination that
        benefits from maximum content width, such as community showcases,
        landing pages, and marketing content. Choose DocsLayout when readers
        need to browse between many related pages.
      </p>

      <div className={divider} />

      {/* ---- Live Examples ---- */}
      <h2 id="live-examples" className={sectionTitle}>Live Examples</h2>
      <p className={bodyText}>
        These pages in the showcase app use the Creations Layout pattern (direct
        Shell children with no layout wrapper):
      </p>

      <Link to="/community" className={liveLink}>
        <div className={liveLinkLabel}>Creators / Community</div>
        <div className={liveLinkDesc}>Full-bleed community page with hero banner, creator card grid, and CTA section.</div>
      </Link>
      <Link to="/guides" className={liveLink}>
        <div className={liveLinkLabel}>Cookbooks / Guides</div>
        <div className={liveLinkDesc}>Full-width guides listing page, rendered as a direct Shell child.</div>
      </Link>
      <Link to="/" className={liveLink}>
        <div className={liveLinkLabel}>Home (Tokens)</div>
        <div className={liveLinkDesc}>The index route, also a direct Shell child with full-width content.</div>
      </Link>
    </div>
  );
}
