import { useEffect } from "react";
import { css, cx } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";

/* ------------------------------------------------------------------ */
/*  TOC                                                                */
/* ------------------------------------------------------------------ */

const TOC_ITEMS = [
  { label: "Golden Shadow", id: "golden-shadow" },
  { label: "Nav Shadow", id: "nav-shadow" },
  { label: "Code Shadow", id: "code-shadow" },
  { label: "Light vs Dark", id: "light-vs-dark" },
];

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const goldenShadowCSS =
  "-8px 16px 39px rgba(127,99,21,0.12), -33px 64px 72px rgba(127,99,21,0.10), -73px 144px 97px rgba(127,99,21,0.06)";

const goldenDarkShadowCSS =
  "-8px 16px 39px rgba(127,99,21,0.18), -33px 64px 72px rgba(127,99,21,0.14), -73px 144px 97px rgba(127,99,21,0.08)";

const navShadowCSS = "0 4px 20px rgba(127,99,21,0.08)";

const codeShadowCSS = "0 10px 30px -10px rgba(0,0,0,0.5)";

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

const demoCard = css({
  padding: "32px",
  marginBottom: "16px",
  minHeight: "140px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const demoTitle = css({
  fontFamily: "heading",
  fontSize: "20px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "8px",
});

const demoDesc = css({
  fontSize: "14px",
  color: "text.secondary",
  lineHeight: 1.6,
});

const codeValue = css({
  fontSize: "12px",
  fontFamily: "mono",
  color: "text.muted",
  marginTop: "16px",
  lineHeight: 1.5,
  wordBreak: "break-all",
});

const comparisonGrid = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "24px",
  marginBottom: "40px",
});

const comparisonPane = css({
  padding: "32px",
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const comparisonLabel = css({
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.55px",
  marginBottom: "4px",
});

const innerDemoCard = css({
  padding: "24px",
  minHeight: "80px",
});

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export function ElevationPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Foundations" },
          { label: "Elevation" },
        ]}
      />

      <h1 className={pageTitle}>Elevation &amp; Shadows</h1>
      <p className={pageDesc}>
        Beam uses warm, amber-tinted shadows to create depth that feels like
        golden-hour lighting rather than cold, neutral drop shadows. Three shadow
        tokens cover all elevation needs.
      </p>

      {/* GOLDEN SHADOW */}
      <h2 id="golden-shadow" className={sectionTitle}>Golden Shadow</h2>
      <div
        className={cx(demoCard, css({ backgroundColor: "bg.card" }))}
        style={{
          boxShadow: goldenShadowCSS,
        }}
      >
        <div>
          <div className={demoTitle}>Golden Float</div>
          <div className={demoDesc}>
            Five cascading layers of amber-tinted shadow create the signature
            "golden hour" lighting effect. Used for elevated cards and hover states.
          </div>
        </div>
        <div className={codeValue}>
          box-shadow: {goldenShadowCSS}
        </div>
      </div>

      {/* NAV SHADOW */}
      <h2 id="nav-shadow" className={sectionTitle}>Nav Shadow</h2>
      <div
        className={cx(demoCard, css({ backgroundColor: "bg.card" }))}
        style={{
          boxShadow: navShadowCSS,
        }}
      >
        <div>
          <div className={demoTitle}>Navigation Shadow</div>
          <div className={demoDesc}>
            A subtle, warm shadow for the fixed header. Provides just enough
            separation from page content without drawing attention.
          </div>
        </div>
        <div className={codeValue}>
          box-shadow: {navShadowCSS}
        </div>
      </div>

      {/* CODE SHADOW */}
      <h2 id="code-shadow" className={sectionTitle}>Code Shadow</h2>
      <div
        className={demoCard}
        style={{
          background: "#1f1f1f",
          boxShadow: codeShadowCSS,
          color: "#d4d4d8",
        }}
      >
        <div>
          <div className={css({ fontFamily: "heading", fontSize: "20px", fontWeight: "heading", color: "white", marginBottom: "8px" })}>
            Code Block Shadow
          </div>
          <div className={css({ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 })}>
            A deeper, neutral shadow for dark code blocks. Creates a "floating
            terminal" effect against warm backgrounds.
          </div>
        </div>
        <div className={css({ fontSize: "12px", fontFamily: "mono", color: "rgba(255,255,255,0.35)", marginTop: "16px", lineHeight: 1.5, wordBreak: "break-all" })}>
          box-shadow: {codeShadowCSS}
        </div>
      </div>

      {/* LIGHT VS DARK */}
      <h2 id="light-vs-dark" className={sectionTitle}>Light vs Dark</h2>
      <p className={css({ color: "text.secondary", fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" })}>
        In dark mode, golden shadow opacity increases to remain visible against
        dark surfaces. The warm tint is preserved to maintain brand consistency.
      </p>

      <div className={comparisonGrid}>
        {/* Light */}
        <div className={comparisonPane} style={{ background: "#fffaeb" }}>
          <div className={comparisonLabel} style={{ color: "#7f6315" }}>Light Mode</div>
          <div
            className={innerDemoCard}
            style={{
              background: "#fff0c2",
              boxShadow: goldenShadowCSS,
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: 575, color: "#1f1f1f" }}>
              Elevated Card
            </div>
            <div style={{ fontSize: "13px", color: "hsl(0,0%,24%)", marginTop: "4px" }}>
              shadow: golden
            </div>
          </div>
        </div>

        {/* Dark */}
        <div className={comparisonPane} style={{ background: "#1f1f1f" }}>
          <div className={comparisonLabel} style={{ color: "rgba(255,255,255,0.4)" }}>Dark Mode</div>
          <div
            className={innerDemoCard}
            style={{
              background: "#2a2a2a",
              boxShadow: goldenDarkShadowCSS,
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: 575, color: "#ffffff" }}>
              Elevated Card
            </div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>
              shadow: goldenDark
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
