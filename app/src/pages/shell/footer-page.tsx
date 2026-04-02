import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { Footer } from "@sunbeam/beam-ui/components/shell/footer";

const TOC_ITEMS = [
  { label: "Preview", id: "preview" },
  { label: "Description", id: "description" },
];

export function FooterPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shell" },
          { label: "Footer" },
        ]}
      />

      <h1 className={pageTitle}>Footer</h1>
      <p className={descText}>
        The site-wide footer rendered at the bottom of every page. Features a
        multi-column link grid, brand lockup, and a warm orange top border.
      </p>

      <h2 id="description" className={sectionTitle}>Description</h2>
      <p className={descText}>
        The Footer component is rendered once in the application shell and does not
        accept props. It reads link sections from the shared <code>footerSections</code> array.
      </p>

      <h2 id="preview" className={sectionTitle}>Preview</h2>
      <div className={previewWrapper}>
        <Footer />
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
  border: "1px solid",
  borderColor: "border.default",
  overflow: "hidden",
  marginBottom: "32px",
});
