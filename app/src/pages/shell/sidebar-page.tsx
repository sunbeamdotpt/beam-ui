import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { Sidebar } from "@sunbeam/beam-ui/components/shell/sidebar";
import { docsSidebar } from "@sunbeam/beam-ui/data/navigation";

const TOC_ITEMS = [
  { label: "Preview", id: "preview" },
  { label: "Description", id: "description" },
];

export function SidebarPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shell" },
          { label: "Sidebar" },
        ]}
      />

      <h1 className={pageTitle}>Sidebar</h1>
      <p className={descText}>
        The collapsible navigation sidebar used in docs, API, and fullwidth layouts.
        Renders grouped nav sections with collapsible items and active-state highlighting.
      </p>

      <h2 id="description" className={sectionTitle}>Description</h2>
      <p className={descText}>
        The Sidebar accepts a <code>sections</code> prop of type <code>NavSection[]</code>.
        It is sticky-positioned and scrolls independently of the main content area.
        The live Sidebar is visible to the left of this page.
      </p>

      <h2 id="preview" className={sectionTitle}>Preview</h2>
      <div className={previewWrapper}>
        <Sidebar sections={docsSidebar} />
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
  height: "400px",
  marginBottom: "32px",
  "& > *": {
    position: "relative !important",
  },
});
