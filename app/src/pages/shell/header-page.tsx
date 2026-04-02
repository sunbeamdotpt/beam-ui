import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { Header } from "@sunbeam/beam-ui/components/shell/header";

const TOC_ITEMS = [
  { label: "Preview", id: "preview" },
  { label: "Description", id: "description" },
];

export function HeaderPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shell" },
          { label: "Header" },
        ]}
      />

      <h1 className={pageTitle}>Header</h1>
      <p className={descText}>
        The fixed top navigation bar. Contains the logo, primary nav links, theme
        toggle, and search trigger. Sticks to the top of the viewport with a
        backdrop blur and warm border.
      </p>

      <h2 id="description" className={sectionTitle}>Description</h2>
      <p className={descText}>
        The Header component is rendered once in the application shell and does not
        accept props. It reads navigation data from the shared <code>headerLinks</code> array
        and manages theme state via the <code>useTheme</code> hook.
      </p>

      <h2 id="preview" className={sectionTitle}>Preview</h2>
      <p className={css({ fontSize: "14px", color: "text.secondary", marginBottom: "16px" })}>
        The live Header is visible at the top of this page.
      </p>
      <div className={previewWrapper}>
        <Header />
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
  marginBottom: "32px",
  "& > *": {
    position: "relative !important",
  },
});
