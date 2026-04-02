import { useEffect } from "react";
import { css } from "styled-system/css";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";

/* ------------------------------------------------------------------ */
/* TOC items for the right-rail                                        */
/* ------------------------------------------------------------------ */

const TOC_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "Anatomy", id: "anatomy" },
  { label: "Content Area", id: "content-area" },
  { label: "Use Cases", id: "use-cases" },
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

export function FullwidthLayoutPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Badge variant="section">LAYOUTS</Badge>
      <h1 id="overview" className={pageTitle}>Fullwidth Layout</h1>
      <p className={description}>
        Sidebar with a wider content area (max 900px) for catalog pages,
        index views, and grid-based listings.
      </p>

      <div className={divider} />

      <h2 id="anatomy" className={sectionTitle}>Anatomy</h2>
      <p className={bodyText}>
        The Fullwidth Layout pairs the standard sidebar navigation with a
        wider content region suited for index pages, model catalogs, and
        grid-based listings. Unlike the Docs Layout, there is no right
        rail -- the full horizontal space is given to the content column,
        allowing for wider tables, card grids, and multi-column displays.
      </p>

      <div className={annotationBox}>
        <div className={annotationLabel}>Structure</div>
        <div className={annotationValue}>
          Sidebar (240px) + Content (max 900px, flex 1)
        </div>
      </div>

      <div className={divider} />

      <h2 id="content-area" className={sectionTitle}>Content Area</h2>
      <p className={bodyText}>
        The content column is capped at 900px (versus 720px in DocsLayout),
        giving an additional 180px of horizontal space. This extra width
        accommodates three-column card grids, wider data tables, and
        comparison views that would feel cramped in the standard docs
        layout.
      </p>
      <p className={bodyText}>
        The content area uses the same padding and vertical rhythm as the
        Docs Layout, so pages can be moved between layouts without
        significant styling changes. The sidebar remains identical across
        both layouts, preserving navigation consistency.
      </p>

      <div className={divider} />

      <h2 id="use-cases" className={sectionTitle}>Use Cases</h2>
      <p className={bodyText}>
        The wider content area is ideal for pages that display collections
        of items in grids or multi-column tables. Examples in this design
        system include:
      </p>
      <p className={bodyText}>
        <strong>Model Index</strong> -- A catalog of available models
        displayed as cards in a responsive grid. Each card shows model
        name, capability tags, and a brief description.
      </p>
      <p className={bodyText}>
        <strong>Resource Catalogs</strong> -- Browsable lists of guides,
        tutorials, or API endpoints that benefit from a card-based layout
        rather than a linear document flow.
      </p>
      <p className={bodyText}>
        <strong>Comparison Views</strong> -- Side-by-side feature
        comparison tables that need horizontal space to display multiple
        columns without horizontal scrolling.
      </p>

      <div className={divider} />

      <h2 id="usage" className={sectionTitle}>Usage</h2>
      <p className={bodyText}>
        Wrap your routes inside the <code>&lt;FullwidthLayout&gt;</code>{" "}
        component in <code>app.tsx</code>. Pages render via{" "}
        <code>&lt;Outlet&gt;</code> just like DocsLayout, but without the
        right rail or TOC context.
      </p>

      <div className={annotationBox}>
        <div className={annotationLabel}>Route Setup</div>
        <div className={annotationValue}>
          {'<Route element={<FullwidthLayout />}>'}<br />
          {'  <Route path="models" element={<ModelsIndexPage />} />'}<br />
          {'</Route>'}
        </div>
      </div>

      <p className={bodyText}>
        To see this layout in action, visit the{" "}
        <a href="/models" style={{ color: "inherit", textDecoration: "underline" }}>
          Models Index
        </a>{" "}
        page, which uses FullwidthLayout to display a card grid of
        available models.
      </p>
    </div>
  );
}
