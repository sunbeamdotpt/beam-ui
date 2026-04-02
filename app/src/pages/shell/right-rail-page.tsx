import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { RightRail } from "@sunbeam/beam-ui/components/shell/right-rail";

const TOC_ITEMS = [
  { label: "Preview", id: "preview" },
  { label: "Description", id: "description" },
];

const SAMPLE_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "Installation", id: "installation" },
  { label: "Usage", id: "usage" },
  { label: "API Reference", id: "api-reference" },
];

export function RightRailPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shell" },
          { label: "RightRail" },
        ]}
      />

      <h1 className={pageTitle}>RightRail</h1>
      <p className={descText}>
        A sticky table-of-contents rail anchored to the right side of docs pages.
        Highlights the currently visible section as the user scrolls.
      </p>

      <h2 id="description" className={sectionTitle}>Description</h2>
      <p className={descText}>
        The RightRail accepts an <code>items</code> prop: an array of
        <code>{" { label, id }"}</code> objects corresponding to heading anchors on the page.
        It uses an IntersectionObserver to track which section is in view.
        The live RightRail is visible to the right of this page.
      </p>

      <h2 id="preview" className={sectionTitle}>Preview</h2>
      <div className={previewWrapper}>
        <RightRail items={SAMPLE_ITEMS} />
      </div>
    </div>
  );
}

const pageTitle = css({
  fontSize: "36px",
  fontWeight: "heading",
  color: "text.primary",
  letterSpacing: "-0.02em",
  marginBottom: "16px",
});

const descText = css({
  fontSize: "18px",
  lineHeight: 1.7,
  color: "text.secondary",
  marginBottom: "16px",
});

const sectionTitle = css({
  fontSize: "28px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "24px",
  marginTop: "48px",
});

const previewWrapper = css({
  position: "relative",
  border: "1px solid",
  borderColor: "border.default",
  overflow: "hidden",
  height: "300px",
  marginBottom: "32px",
  "& > *": {
    position: "relative !important",
  },
});
