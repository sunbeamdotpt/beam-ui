import { Link } from "react-router-dom";
import { css } from "styled-system/css";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";

/* ------------------------------------------------------------------ */
/*  STYLE DEFINITIONS                                                  */
/* ------------------------------------------------------------------ */

const hero = css({
  position: "relative",
  textAlign: "center",
  paddingBlock: "120px 100px",
  paddingInline: "40px",
  overflow: "hidden",
});

const heroGlow = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "700px",
  height: "700px",
  transform: "translate(-50%, -50%)",
  background:
    "radial-gradient(circle, rgba(255,161,16,0.10) 0%, rgba(250,82,15,0.05) 40%, transparent 70%)",
  pointerEvents: "none",
});

const heroTitle = css({
  fontFamily: "heading",
  fontSize: "82px",
  fontWeight: "display",
  lineHeight: 1.0,
  letterSpacing: "-2.05px",
  marginBottom: "24px",
  position: "relative",
  color: "text.primary",
});

const heroSubtitle = css({
  color: "text.secondary",
  fontSize: "18px",
  lineHeight: 1.5,
  marginBottom: "40px",
  position: "relative",
});

const beamIdentity = css({
  display: "flex",
  gap: "3px",
  justifyContent: "center",
  marginBottom: "40px",
  position: "relative",
});

const beamBlock = css({
  width: "48px",
  height: "12px",
  display: "inline-block",
});

const gradientBar = css({
  height: "6px",
  width: "320px",
  marginInline: "auto",
  marginBottom: "48px",
  background:
    "linear-gradient(to right, #ffd900, #ffe295, #ffa110, #ff8105, #fb6424, #fa520f)",
  position: "relative",
});

const section = css({
  maxWidth: "1280px",
  marginInline: "auto",
  paddingBlock: "80px",
  paddingInline: "40px",
});

const sectionLabel = css({
  fontSize: "14px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "2.52px",
  color: "sectionLabel",
  marginBottom: "12px",
});

const sectionHeading = css({
  fontFamily: "heading",
  fontSize: "56px",
  fontWeight: "display",
  lineHeight: 0.95,
  marginBottom: "24px",
  color: "text.primary",
});

const sectionDesc = css({
  color: "text.secondary",
  fontSize: "16px",
  lineHeight: 1.6,
  marginBottom: "48px",
  maxWidth: "640px",
});

const sectionDivider = css({
  border: "none",
  borderTop: "1px solid",
  borderTopColor: "border.subtle",
  marginInline: "40px",
  maxWidth: "1280px",
  marginLeft: "auto",
  marginRight: "auto",
});

/* Explore cards */
const exploreGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
});

const exploreCard = css({
  bg: "bg.card",
  padding: "32px",
  borderRadius: "0",
  textDecoration: "none",
  transition: "all 0.2s",
  border: "1px solid",
  borderColor: "border.subtle",
  _hover: {
    shadow: "golden",
    transform: "translateY(-2px)",
  },
});

const exploreCardLabel = css({
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.55px",
  color: "sunshine.700",
  marginBottom: "12px",
});

const exploreCardTitle = css({
  fontFamily: "heading",
  fontSize: "24px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "8px",
});

const exploreCardDesc = css({
  fontSize: "15px",
  color: "text.secondary",
  lineHeight: 1.6,
});

/* Install snippet */
const installBlock = css({
  bg: "sunbeam.black",
  color: "code.text",
  fontFamily: "mono",
  fontSize: "15px",
  padding: "16px 24px",
  marginBottom: "32px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  border: "1px solid rgba(255,255,255,0.05)",
});

const installPrompt = css({
  color: "sunshine.700",
  userSelect: "none",
});

/* ------------------------------------------------------------------ */
/*  DATA                                                                */
/* ------------------------------------------------------------------ */

const beamColors = ["#ffd900", "#ffe295", "#ffb83e", "#ffa110", "#ff8105", "#fb6424", "#fa520f"];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                           */
/* ------------------------------------------------------------------ */

export function TokensPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className={hero}>
        <div className={heroGlow} />

        <div className={beamIdentity}>
          {beamColors.map((c) => (
            <span key={c} className={beamBlock} style={{ background: c }} />
          ))}
        </div>

        <h1 className={heroTitle}>
          Beam Design Language
        </h1>
        <p className={heroSubtitle}>
          The complete visual framework for Sunbeam Studios
        </p>

        <div className={gradientBar} />
      </section>

      <hr className={sectionDivider} />

      {/* ===== GET STARTED ===== */}
      <section className={section}>
        <div className={sectionLabel}>GET STARTED</div>
        <h2 className={sectionHeading}>Installation</h2>
        <p className={sectionDesc}>
          Add the Beam Design Language to your project and start building with the
          warm, expressive visual system of Sunbeam Studios.
        </p>

        <div className={installBlock}>
          <span className={installPrompt}>$</span>
          <span>npm install @sunbeam/beam-ui</span>
        </div>

        <CodeBlock
          tabs={[
            {
              label: "Setup",
              content: (
                <pre>
                  <span className={syn.keyword}>import</span> {"{ "}<span className={syn.fn}>Button</span>{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>'@sunbeam/beam-ui/components/ui/button'</span>;{"\n"}
                  <span className={syn.keyword}>import</span> {"{ "}<span className={syn.fn}>Card</span>{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>'@sunbeam/beam-ui/components/ui/card'</span>;{"\n"}
                  <span className={syn.keyword}>import</span> {"{ "}<span className={syn.fn}>DocsLayout</span>{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>'@sunbeam/beam-ui/components/layouts/docs-layout'</span>;{"\n"}
                  {"\n"}
                  <span className={syn.comment}>{"// Use Beam components with Panda CSS semantic tokens"}</span>{"\n"}
                  <span className={syn.keyword}>function</span> <span className={syn.fn}>App</span>() {"{"}{"\n"}
                  {"  "}<span className={syn.keyword}>return</span> ({"\n"}
                  {"    "}<span className={syn.prop}>{"<Card"}</span> <span className={syn.fn}>shadow</span>=<span className={syn.string}>"golden"</span><span className={syn.prop}>{">"}</span>{"\n"}
                  {"      "}<span className={syn.prop}>{"<Button"}</span> <span className={syn.fn}>variant</span>=<span className={syn.string}>"primary"</span><span className={syn.prop}>{">"}</span>Get Started<span className={syn.prop}>{"</Button>"}</span>{"\n"}
                  {"    "}<span className={syn.prop}>{"</Card>"}</span>{"\n"}
                  {"  );"}{"\n"}
                  {"}"}{"\n"}
                </pre>
              ),
            },
          ]}
        />
      </section>

      <hr className={sectionDivider} />

      {/* ===== EXPLORE ===== */}
      <section className={section}>
        <div className={sectionLabel}>EXPLORE</div>
        <h2 className={sectionHeading}>Discover the System</h2>
        <p className={sectionDesc}>
          Beam covers every layer of the design stack -- from foundational tokens to
          full page layouts.
        </p>

        <div className={exploreGrid}>
          <Link to="/foundations/colors" className={exploreCard}>
            <div className={exploreCardLabel}>Foundations</div>
            <div className={exploreCardTitle}>Colors &amp; Tokens</div>
            <div className={exploreCardDesc}>
              Warm ivories, golden ambers, and the signature Sunbeam Orange.
              Explore the full palette and semantic color system.
            </div>
          </Link>

          <Link to="/components/button" className={exploreCard}>
            <div className={exploreCardLabel}>Components</div>
            <div className={exploreCardTitle}>UI Components</div>
            <div className={exploreCardDesc}>
              Buttons, badges, cards, code blocks, and more -- every building
              block styled with Beam tokens.
            </div>
          </Link>

          <Link to="/layouts/docs" className={exploreCard}>
            <div className={exploreCardLabel}>Layouts</div>
            <div className={exploreCardTitle}>Page Layouts</div>
            <div className={exploreCardDesc}>
              Docs, API reference, and fullwidth layouts with sidebar navigation,
              right-rail TOC, and responsive shells.
            </div>
          </Link>
        </div>
      </section>

      {/* ===== BOTTOM GRADIENT ===== */}
      <div
        className={css({
          height: "64px",
          marginTop: "48px",
          background:
            "linear-gradient(to right, #ffd900, #ffe295, #ffa110, #ff8105, #fb6424, #fa520f)",
        })}
      />
    </>
  );
}
