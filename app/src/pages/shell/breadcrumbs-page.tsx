import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";

const TOC_ITEMS = [
  { label: "Preview", id: "preview" },
  { label: "Description", id: "description" },
];

export function BreadcrumbsPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shell" },
          { label: "Breadcrumbs" },
        ]}
      />

      <h1 className={pageTitle}>Breadcrumbs</h1>
      <p className={descText}>
        A lightweight breadcrumb navigation trail. Shows the user their current
        location within the site hierarchy with linked ancestor pages.
      </p>

      <h2 id="description" className={sectionTitle}>Description</h2>
      <p className={descText}>
        The Breadcrumbs component accepts an <code>items</code> prop: an array of
        <code>{" { label, href? }"}</code> objects. Items with an <code>href</code> render as
        links; the last item renders as plain text in muted color.
      </p>

      <h2 id="preview" className={sectionTitle}>Preview</h2>
      <div className={previewWrapper}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Foundations", href: "/foundations/colors" },
            { label: "Colors" },
          ]}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/components/button" },
            { label: "Button" },
          ]}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "API Reference" },
          ]}
        />
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
  padding: "24px",
  border: "1px solid",
  borderColor: "border.default",
  backgroundColor: "bg.card",
  marginBottom: "32px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
