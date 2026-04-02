import { useEffect } from "react";
import { css } from "styled-system/css";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";

/* ------------------------------------------------------------------ */
/* TOC items for the right-rail                                        */
/* ------------------------------------------------------------------ */

const TOC_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "When to Use", id: "when-to-use" },
  { label: "Structure", id: "structure" },
  { label: "Content Regions", id: "content-regions" },
  { label: "Comparison with DocsLayout", id: "comparison" },
  { label: "Usage", id: "usage" },
];

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const pageTitle = css({
  fontSize: "32px",
  fontWeight: "heading",
  color: "text.primary",
  letterSpacing: "-0.02em",
  marginBottom: "8px",
});

const description = css({
  fontSize: "16px",
  color: "text.secondary",
  lineHeight: 1.6,
  marginBottom: "48px",
});

const sectionTitle = css({
  fontSize: "24px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "16px",
});

const bodyText = css({
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
});

const annotationBox = css({
  padding: "24px",
  bg: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  marginBottom: "32px",
});

const annotationLabel = css({
  fontFamily: "mono",
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "sunbeam.orange",
  marginBottom: "8px",
});

const annotationValue = css({
  fontFamily: "mono",
  fontSize: "13px",
  color: "text.primary",
});

const divider = css({
  height: "1px",
  bg: "border.default",
  marginBlock: "48px",
});

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function CreatorsLayoutPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Badge variant="section">LAYOUTS</Badge>
      <h1 id="overview" className={pageTitle}>Creators Layout</h1>
      <p className={description}>
        Full-width layout without a sidebar, designed for community pages,
        landing pages, and marketing content where the entire viewport
        width is needed.
      </p>

      <div className={divider} />

      <h2 id="when-to-use" className={sectionTitle}>When to Use</h2>
      <p className={bodyText}>
        Use the Creators Layout for pages that prioritize visual impact
        over navigation hierarchy. These are typically top-level pages
        such as community showcases, creator spotlights, landing pages,
        and marketing content that benefit from edge-to-edge layouts
        without the constraints of a sidebar or right rail.
      </p>
      <p className={bodyText}>
        Unlike documentation pages where persistent sidebar navigation
        helps readers move between related topics, community and marketing
        pages are standalone destinations. Visitors arrive from direct
        links or the header navigation and engage with the page content
        without needing to browse a section tree.
      </p>

      <div className={divider} />

      <h2 id="structure" className={sectionTitle}>Structure</h2>
      <p className={bodyText}>
        The Creators Layout uses the shared application shell (Header +
        Footer) but renders the page content directly into the main area
        without wrapping it in a sidebar layout. The content area stretches
        to the full viewport width, constrained only by the outer shell
        max-width of 1440px.
      </p>

      <div className={annotationBox}>
        <div className={annotationLabel}>Structure</div>
        <div className={annotationValue}>
          Header (64px fixed) + Full-width Content (100%) + Footer
        </div>
      </div>

      <p className={bodyText}>
        In <code>app.tsx</code>, full-width pages are placed as direct
        children of the <code>&lt;Shell&gt;</code> route rather than
        nested inside a layout component. The Shell provides the header,
        footer, and the main content area with top padding to clear the
        fixed header.
      </p>

      <div className={divider} />

      <h2 id="content-regions" className={sectionTitle}>Content Regions</h2>
      <p className={bodyText}>
        Full-width pages typically compose their own internal layout using
        sections that span the viewport. Common patterns include:
      </p>
      <p className={bodyText}>
        <strong>Hero Section</strong> -- A full-bleed banner at the top of
        the page with a dark or accent background, large heading, and call
        to action. The Creators page uses a dark hero with the Sunbeam
        brand identity.
      </p>
      <p className={bodyText}>
        <strong>Card Grid</strong> -- A centered container (typically
        max-width 1200px) with a responsive CSS grid of creator cards,
        resource cards, or feature highlights.
      </p>
      <p className={bodyText}>
        <strong>CTA Footer</strong> -- A full-width call-to-action banner
        before the site footer, encouraging visitors to join the community
        or explore other sections.
      </p>

      <div className={divider} />

      <h2 id="comparison" className={sectionTitle}>Comparison with DocsLayout</h2>
      <div className={annotationBox}>
        <div className={annotationLabel}>DocsLayout</div>
        <div className={annotationValue}>
          Sidebar (240px) + Content (max 720px) + Right Rail (200px)
        </div>
      </div>
      <div className={annotationBox}>
        <div className={annotationLabel}>Creators Layout</div>
        <div className={annotationValue}>
          No sidebar. Full-width content (up to 1440px shell max-width).
        </div>
      </div>
      <p className={bodyText}>
        The key trade-off is navigation density vs. visual impact. Choose
        DocsLayout when readers need to move between many related pages.
        Choose the Creators Layout when the page is a standalone
        destination that benefits from maximum content width.
      </p>

      <div className={divider} />

      <h2 id="usage" className={sectionTitle}>Usage</h2>
      <p className={bodyText}>
        Place your route as a direct child of the Shell route in{" "}
        <code>app.tsx</code>, outside of any layout wrapper:
      </p>

      <div className={annotationBox}>
        <div className={annotationLabel}>Route Setup</div>
        <div className={annotationValue}>
          {'<Route element={<Shell />}>'}<br />
          {'  {/* Full-width pages (no sidebar) */}'}<br />
          {'  <Route path="community" element={<CreatorsPage />} />'}<br />
          {'  ...'}<br />
          {'</Route>'}
        </div>
      </div>

      <p className={bodyText}>
        To see this layout in action, visit the{" "}
        <a href="/community" style={{ color: "inherit", textDecoration: "underline" }}>
          Creators
        </a>{" "}
        page, which renders full-width inside the application shell
        without a sidebar or right rail.
      </p>
    </div>
  );
}
