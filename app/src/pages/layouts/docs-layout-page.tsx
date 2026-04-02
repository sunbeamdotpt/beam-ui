import { useEffect } from "react";
import { css } from "styled-system/css";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";

/* ------------------------------------------------------------------ */
/* TOC items for the right-rail demo                                   */
/* ------------------------------------------------------------------ */

const TOC_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "Anatomy", id: "anatomy" },
  { label: "Sidebar", id: "sidebar" },
  { label: "Center Column", id: "center-column" },
  { label: "Right Rail", id: "right-rail" },
  { label: "Scroll Behavior", id: "scroll-behavior" },
  { label: "Responsive Notes", id: "responsive-notes" },
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

export function DocsLayoutPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Badge variant="section">LAYOUTS</Badge>
      <h1 id="overview" className={pageTitle}>Docs Layout</h1>
      <p className={description}>
        Three-column layout with sidebar navigation, center content area
        (max 720px), and right-rail table of contents.
      </p>

      <div className={divider} />

      {/* Anatomy */}
      <h2 id="anatomy" className={sectionTitle}>Anatomy</h2>
      <p className={bodyText}>
        The Docs Layout composes three regions horizontally: a fixed-width
        sidebar for hierarchical navigation, a centered content column
        constrained to 720px for optimal reading measure, and an optional
        right rail that displays a table of contents generated from page
        headings.
      </p>

      <div className={annotationBox}>
        <div className={annotationLabel}>Structure</div>
        <div className={annotationValue}>
          Sidebar (240px) + Content (max 720px, flex 1) + Right Rail (200px)
        </div>
      </div>

      {/* Sidebar */}
      <h2 id="sidebar" className={sectionTitle}>Sidebar</h2>
      <p className={bodyText}>
        The sidebar is a 240px fixed-width panel that provides persistent
        hierarchical navigation across all documentation pages. It is
        sticky-positioned below the header and scrolls independently from
        the main content area.
      </p>
      <p className={bodyText}>
        Navigation items are organized into collapsible sections (e.g.
        Foundations, Components, Layouts) that map to the site's information
        architecture. The active route is highlighted with an accent border
        and background tint. Nested groupings up to two levels deep are
        supported via the Ark UI Collapsible primitive.
      </p>
      <p className={bodyText}>
        Sidebar data is defined in <code>navigation.ts</code> as an array
        of <code>NavSection</code> objects, each containing a title and an
        array of <code>NavItem</code> entries with label, href, and
        optional children.
      </p>

      <div className={divider} />

      {/* Center Column */}
      <h2 id="center-column" className={sectionTitle}>Center Column</h2>
      <p className={bodyText}>
        The center column is the primary content area. It uses{" "}
        <code>flex: 1</code> to fill the remaining horizontal space between
        the sidebar and right rail, with an inner container capped at
        720px for optimal reading measure (roughly 65-75 characters per
        line at body font size).
      </p>
      <p className={bodyText}>
        Content pages render inside this column via React Router's{" "}
        <code>&lt;Outlet&gt;</code>. Each page receives a{" "}
        <code>DocsContext</code> through <code>useOutletContext</code>,
        which exposes <code>setToc()</code> for registering table-of-contents
        entries with the right rail. A typical page sets its TOC items in
        a <code>useEffect</code> on mount and clears them on unmount.
      </p>

      <div className={annotationBox}>
        <div className={annotationLabel}>Usage</div>
        <div className={annotationValue}>
          {"const { setToc } = useDocsContext();"}<br />
          {"useEffect(() => { setToc(items); return () => setToc([]); }, [setToc]);"}
        </div>
      </div>

      <div className={divider} />

      {/* Right Rail */}
      <h2 id="right-rail" className={sectionTitle}>Right Rail</h2>
      <p className={bodyText}>
        The right rail is a 200px sticky panel that renders a
        table-of-contents derived from the TOC items registered by the
        current page. An <code>IntersectionObserver</code> tracks which
        section heading is visible in the viewport and highlights the
        corresponding entry in the rail.
      </p>
      <p className={bodyText}>
        Clicking a TOC entry smooth-scrolls to the matching section and
        updates the URL hash without a full navigation. The rail also
        provides utility actions: copying a permalink, copying the page
        content as markdown, and links to source control and issue
        reporting.
      </p>
      <p className={bodyText}>
        The right rail is conditionally rendered -- it only appears when
        the current page has provided TOC items via <code>setToc()</code>.
        Pages that do not call <code>setToc</code> will display a
        two-column layout (sidebar + content) instead.
      </p>

      <div className={divider} />

      {/* Scroll Behavior */}
      <h2 id="scroll-behavior" className={sectionTitle}>Scroll Behavior</h2>
      <p className={bodyText}>
        Both the sidebar and right rail use <code>position: sticky</code>{" "}
        with <code>top: 64px</code> (the header height) so they remain
        visible while the center content scrolls. Each panel has its own
        overflow-y scroll when its content exceeds the viewport height,
        ensuring long navigation trees and long TOC lists remain accessible.
      </p>
      <p className={bodyText}>
        Smooth scrolling is implemented via the native{" "}
        <code>scrollIntoView({"{ behavior: 'smooth' }"})</code> API. When
        the page loads with a URL hash, the layout scrolls to the matching
        element after a short delay to allow rendering to settle.
      </p>

      <div className={annotationBox}>
        <div className={annotationLabel}>Wiring a Page</div>
        <div className={annotationValue}>
          {"// In app.tsx, nest your route inside <DocsLayout>"}<br />
          {'<Route element={<DocsLayout />}>'}<br />
          {'  <Route path="my-page" element={<MyPage />} />'}<br />
          {'</Route>'}
        </div>
      </div>

      <div className={divider} />

      {/* Responsive Notes */}
      <h2 id="responsive-notes" className={sectionTitle}>Responsive Notes</h2>
      <p className={bodyText}>
        The DocsLayout is designed for desktop viewports (1024px and above).
        The three-column grid relies on a minimum viewport width of
        roughly 1200px to display all three regions without overlap. On
        narrower screens, the right rail is the first element to be hidden,
        followed by the sidebar collapsing into a mobile drawer or
        hamburger menu.
      </p>
      <p className={bodyText}>
        The outer container is capped at 1440px with auto horizontal
        margins, centering the layout on ultra-wide displays. The sidebar
        and right rail widths are fixed (240px and 200px respectively),
        while the center column flexes to absorb the remaining space up
        to its 720px max-width.
      </p>
    </div>
  );
}
