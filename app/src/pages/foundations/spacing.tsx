import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";

/* ------------------------------------------------------------------ */
/*  TOC                                                                */
/* ------------------------------------------------------------------ */

const TOC_ITEMS = [
  { label: "Spacing Scale", id: "spacing-scale" },
  { label: "Usage", id: "usage" },
];

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const spacingScale = [2, 4, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 98, 100];

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */

const pageTitle = css({
  fontFamily: "heading",
  fontSize: "48px",
  fontWeight: "display",
  lineHeight: 0.95,
  marginBottom: "16px",
  color: "text.primary",
});

const pageDesc = css({
  color: "text.secondary",
  fontSize: "16px",
  lineHeight: 1.6,
  marginBottom: "48px",
});

const sectionTitle = css({
  fontFamily: "heading",
  fontSize: "32px",
  fontWeight: "heading",
  lineHeight: 1.15,
  marginBottom: "24px",
  marginTop: "48px",
  color: "text.primary",
});

const spacingRow = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  alignItems: "flex-end",
  marginBottom: "48px",
});

const spacingItem = css({
  textAlign: "center",
});

const spacingBox = css({
  background: "rgba(250, 82, 15, 0.12)",
  border: "1px solid rgba(250, 82, 15, 0.3)",
  marginBottom: "8px",
  marginInline: "auto",
});

const spacingLabel = css({
  fontSize: "12px",
  fontFamily: "mono",
  color: "text.muted",
});

const prose = css({
  color: "text.secondary",
  fontSize: "16px",
  lineHeight: 1.7,
  maxWidth: "640px",
  "& p": { marginBottom: "16px" },
});

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export function SpacingPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Foundations" },
          { label: "Spacing" },
        ]}
      />

      <h1 className={pageTitle}>Spacing</h1>
      <p className={pageDesc}>
        Beam uses a pragmatic spacing scale that balances tight UI density with
        generous breathing room at larger sizes. Values are specified in pixels
        for precision.
      </p>

      {/* SPACING SCALE */}
      <h2 id="spacing-scale" className={sectionTitle}>Spacing Scale</h2>
      <div className={spacingRow}>
        {spacingScale.map((px) => (
          <div key={px} className={spacingItem}>
            <div
              className={spacingBox}
              style={{ width: `${px}px`, height: `${px}px` }}
            />
            <div className={spacingLabel}>{px}px</div>
          </div>
        ))}
      </div>

      {/* USAGE */}
      <h2 id="usage" className={sectionTitle}>Usage</h2>
      <div className={prose}>
        <p>
          Small values (2-8px) handle internal component spacing -- gaps between
          icons and labels, padding inside badges, and subtle separations. Mid-range
          values (12-24px) define component padding, card interiors, and grid gaps.
          Large values (32-100px) create section spacing and page-level breathing
          room.
        </p>
        <p>
          Beam does not enforce a strict mathematical ratio. Instead, the scale is
          tuned by eye to feel balanced at each level. The jump from 80 to 98 to
          100, for instance, gives fine control over large section margins without
          forcing awkward multiples.
        </p>
      </div>
    </div>
  );
}
