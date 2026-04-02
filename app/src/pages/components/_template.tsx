import { type ReactNode, useEffect } from "react";
import { css } from "styled-system/css";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";

const TOC_ITEMS = [
  { label: "Preview", id: "preview" },
  { label: "Props", id: "props" },
  { label: "Usage", id: "usage" },
  { label: "Variants", id: "variants" },
];

interface ComponentPageProps {
  name: string;
  description: string;
  importPath: string;
  children: ReactNode;
}

export function ComponentPage({ name, description, importPath, children }: ComponentPageProps) {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Components", href: "/components/button" },
          { label: name },
        ]}
      />

      <h1 className={pageTitle}>{name}</h1>

      <p className={descText}>{description}</p>

      <p className={importText}>
        <code className={importCode}>{importPath}</code>
      </p>

      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Props table                                                         */
/* ------------------------------------------------------------------ */
interface PropRow {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}

export function PropsTable({ props }: { props: PropRow[] }) {
  return (
    <div className={tableWrapper}>
      <div className={tableHeader}>
        <span className={headerCell} style={{ flex: 1 }}>Prop</span>
        <span className={headerCell} style={{ flex: 1.5 }}>Type</span>
        <span className={headerCell} style={{ flex: 0.5 }}>Required</span>
        <span className={headerCell} style={{ flex: 2 }}>Description</span>
      </div>
      {props.map((prop, idx) => (
        <div key={prop.name} className={idx % 2 === 0 ? rowEven : rowOdd}>
          <span className={propNameCell} style={{ flex: 1 }}>{prop.name}</span>
          <span className={propTypeCell} style={{ flex: 1.5 }}>{prop.type}</span>
          <span className={requiredCell} style={{ flex: 0.5 }}>{prop.required ? "Yes" : "No"}</span>
          <span className={descCell} style={{ flex: 2 }}>{prop.description}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading helper                                              */
/* ------------------------------------------------------------------ */
export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className={sectionTitle}>{children}</h2>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

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

const importText = css({
  marginBottom: "48px",
});

const importCode = css({
  backgroundColor: "bg.card",
  padding: "4px 12px",
  fontFamily: "mono",
  fontSize: "13px",
  color: "sunbeam.orange",
  border: "1px solid",
  borderColor: "border.default",
});

const sectionTitle = css({
  fontSize: "28px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "24px",
  marginTop: "48px",
});

const tableWrapper = css({
  borderRadius: "0",
  overflow: "hidden",
  marginBottom: "32px",
  border: "1px solid",
  borderColor: "border.default",
  overflowX: "auto",
});

const tableHeader = css({
  display: "flex",
  backgroundColor: "bg.card",
  padding: "12px 16px",
  gap: "8px",
  minWidth: "600px",
});

const headerCell = css({
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "text.muted",
});

const rowEven = css({
  display: "flex",
  padding: "12px 16px",
  gap: "8px",
  backgroundColor: "bg.page",
  alignItems: "baseline",
  minWidth: "600px",
});

const rowOdd = css({
  display: "flex",
  padding: "12px 16px",
  gap: "8px",
  backgroundColor: "bg.card",
  alignItems: "baseline",
  minWidth: "600px",
});

const propNameCell = css({
  fontFamily: "mono",
  fontWeight: "button",
  fontSize: "13px",
  color: "text.primary",
});

const propTypeCell = css({
  fontFamily: "mono",
  fontSize: "13px",
  color: "sunbeam.orange",
});

const requiredCell = css({
  fontSize: "12px",
  color: "text.muted",
});

const descCell = css({
  fontSize: "13px",
  color: "text.secondary",
  lineHeight: 1.5,
});
