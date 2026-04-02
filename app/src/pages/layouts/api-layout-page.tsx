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
  { label: "Left Panel", id: "left-panel" },
  { label: "Right Panel", id: "right-panel" },
  { label: "Independent Scroll", id: "independent-scroll" },
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

export function ApiLayoutPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Badge variant="section">LAYOUTS</Badge>
      <h1 id="overview" className={pageTitle}>API Layout</h1>
      <p className={description}>
        Split-panel layout with sidebar navigation, a left documentation
        panel (55%), and a dark right code panel (45%). Designed for API
        reference pages where documentation and code examples sit
        side by side.
      </p>

      <div className={divider} />

      <h2 id="anatomy" className={sectionTitle}>Anatomy</h2>
      <p className={bodyText}>
        The API Layout composes three regions: the standard sidebar for
        API endpoint navigation, a left panel for endpoint documentation
        and parameter tables, and a dark-themed right panel for
        request/response examples and SDK snippets. The two content panels
        share the available width after the sidebar in a 55/45 split.
      </p>

      <div className={annotationBox}>
        <div className={annotationLabel}>Structure</div>
        <div className={annotationValue}>
          Sidebar (240px) + Left Panel (55%) + Right Panel (45%)
        </div>
      </div>

      <div className={divider} />

      <h2 id="left-panel" className={sectionTitle}>Left Panel</h2>
      <p className={bodyText}>
        The left panel houses endpoint documentation: descriptive prose,
        hero banners, request parameter tables, and response schema
        details. It uses a light background consistent with the rest of
        the documentation site, providing a comfortable reading experience
        for longer-form content.
      </p>
      <p className={bodyText}>
        Content in this panel is rendered via the{" "}
        <code>apiLeftPanel</code> CSS class exported from the layout
        module. The panel scrolls independently from the right panel,
        allowing readers to reference documentation while viewing code
        examples.
      </p>

      <div className={divider} />

      <h2 id="right-panel" className={sectionTitle}>Right Panel</h2>
      <p className={bodyText}>
        The dark code panel displays request/response examples, SDK
        snippets, and cURL commands. Its dark background
        (<code>#1A1412</code>, the <code>sunbeam.black</code> token)
        provides strong visual contrast that helps readers distinguish
        documentation from executable code at a glance.
      </p>

      <div className={annotationBox}>
        <div className={annotationLabel}>Right Panel Background</div>
        <div className={annotationValue}>sunbeam.black (#1A1412)</div>
      </div>

      <p className={bodyText}>
        Use the <code>apiRightPanel</code> CSS class for this region.
        Text inside should use light colors (white or semi-transparent
        white) for readability against the dark background.
      </p>

      <div className={divider} />

      <h2 id="independent-scroll" className={sectionTitle}>Independent Scroll</h2>
      <p className={bodyText}>
        Both panels scroll independently. This is critical for API
        reference pages where the documentation panel may be long (many
        parameters, detailed descriptions) while the code panel shows a
        compact request example. Independent scroll lets the reader lock
        the code example in view while scrolling through parameter docs.
      </p>

      <div className={divider} />

      <h2 id="usage" className={sectionTitle}>Usage</h2>
      <p className={bodyText}>
        Wrap your API routes inside the <code>&lt;ApiLayout&gt;</code>{" "}
        component in <code>app.tsx</code>. Each page should render two
        sibling elements using the exported panel classes:
      </p>

      <div className={annotationBox}>
        <div className={annotationLabel}>Route Setup</div>
        <div className={annotationValue}>
          {'<Route element={<ApiLayout />}>'}<br />
          {'  <Route path="api" element={<ApiReferencePage />} />'}<br />
          {'</Route>'}
        </div>
      </div>

      <div className={annotationBox}>
        <div className={annotationLabel}>Page Structure</div>
        <div className={annotationValue}>
          {'<>'}<br />
          {'  <div className={apiLeftPanel}>...docs...</div>'}<br />
          {'  <div className={apiRightPanel}>...code...</div>'}<br />
          {'</>'}
        </div>
      </div>

      <p className={bodyText}>
        To see this layout in action, visit the{" "}
        <a href="/api" style={{ color: "inherit", textDecoration: "underline" }}>
          API Reference
        </a>{" "}
        page, which uses ApiLayout to display endpoint documentation
        alongside live code examples.
      </p>
    </div>
  );
}
