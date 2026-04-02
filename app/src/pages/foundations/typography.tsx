import { useEffect } from "react";
import { css, cx } from "styled-system/css";
import { token } from "styled-system/tokens";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";

/* ------------------------------------------------------------------ */
/*  TOC                                                                */
/* ------------------------------------------------------------------ */

const TOC_ITEMS = [
  { label: "Font Family", id: "font-family" },
  { label: "Monospace", id: "monospace" },
  { label: "Weight Scale", id: "weight-scale" },
  { label: "Type Scale", id: "type-scale" },
  { label: "Principles", id: "principles" },
];

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const weights = [
  { name: "Display", value: 431, sample: "Golden hour light" },
  { name: "Heading", value: 575, sample: "Warm and inviting" },
  { name: "Body", value: 647, sample: "Comfortable reading weight" },
  { name: "Button", value: 791, sample: "STRONG AND CLEAR" },
];

const typeScale = [
  { size: "82px", weight: 431, lh: "1.0", ls: "-2.05px", label: "Display", sample: "Beam" },
  { size: "56px", weight: 431, lh: "0.95", ls: "normal", label: "Section", sample: "Section Heading" },
  { size: "48px", weight: 431, lh: "0.95", ls: "normal", label: "Sub-heading Large", sample: "Sub-heading" },
  { size: "32px", weight: 575, lh: "1.15", ls: "normal", label: "Sub-heading", sample: "Feature Title" },
  { size: "24px", weight: 575, lh: "1.33", ls: "normal", label: "Title", sample: "Card or Feature Title" },
  { size: "16px", weight: 647, lh: "1.50", ls: "normal", label: "Body", sample: "Standard paragraph text for content, navigation, and interface labels." },
  { size: "14px", weight: 647, lh: "1.43", ls: "normal", label: "Caption", sample: "Caption text, metadata, and secondary links" },
];

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

const specimen = css({
  fontFamily: "heading",
  fontSize: { base: "36px", lg: "48px" },
  fontWeight: "display",
  lineHeight: 1.1,
  color: "text.primary",
  marginBottom: "8px",
});

const specimenMeta = css({
  fontSize: "13px",
  fontFamily: "mono",
  color: "text.muted",
  marginBottom: "40px",
});

const weightCard = css({
  marginBottom: "32px",
  paddingBottom: "32px",
  borderBottom: "1px solid",
  borderBottomColor: "border.subtle",
  _last: { borderBottom: "none" },
});

const weightSample = css({
  fontFamily: "heading",
  lineHeight: 1.1,
  color: "text.primary",
  marginBottom: "8px",
  fontSize: { base: "28px", lg: "40px" },
});

const weightMeta = css({
  fontSize: "12px",
  color: "text.muted",
  fontFamily: "mono",
});

const scaleItem = css({
  marginBottom: "32px",
  paddingBottom: "32px",
  borderBottom: "1px solid",
  borderBottomColor: "border.subtle",
  _last: { borderBottom: "none" },
  overflowWrap: "break-word",
  wordBreak: "break-word",
});

const scaleItemLargeText = css({
  fontSize: { base: "48px", lg: "82px" },
});

const scaleItemSectionText = css({
  fontSize: { base: "36px", lg: "56px" },
});

const scaleItemSubLargeText = css({
  fontSize: { base: "32px", lg: "48px" },
});

const scaleMeta = css({
  fontSize: "12px",
  color: "text.muted",
  marginTop: "8px",
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

export function TypographyPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Foundations" },
          { label: "Typography" },
        ]}
      />

      <h1 className={pageTitle}>Typography</h1>
      <p className={pageDesc}>
        Beam pairs two typefaces: Ysabeau Infant for all UI text and Monaspace Argon
        for code. Hierarchy comes primarily from size — not weight — with four
        calibrated weight stops on the variable font axis for fine control.
      </p>

      {/* FONT FAMILY */}
      <h2 id="font-family" className={sectionTitle}>Font Family</h2>
      <div className={specimen}>Ysabeau Infant</div>
      <div className={specimenMeta}>'Ysabeau Infant', Arial, ui-sans-serif, system-ui, sans-serif</div>
      <p className={css({ color: "text.secondary", fontSize: "15px", lineHeight: 1.7, marginBottom: "40px" })}>
        Ysabeau Infant is a variable-weight sans-serif that pairs geometric clarity
        with organic warmth. Its slightly condensed proportions work beautifully at
        display sizes while remaining highly legible at body text.
      </p>

      {/* MONOSPACE */}
      <h2 id="monospace" className={sectionTitle}>Monospace</h2>
      <div className={css({ fontFamily: "mono", fontSize: "36px", fontWeight: 400, color: "text.primary", marginBottom: "16px" })}>
        Monaspace Argon
      </div>
      <div className={specimenMeta}>'Monaspace Argon', 'SF Mono', 'Fira Code', monospace</div>
      <p className={css({ color: "text.secondary", fontSize: "15px", lineHeight: 1.7, marginBottom: "24px" })}>
        Monaspace Argon is part of GitHub's Monaspace superfamily — a set of fonts
        designed specifically for code. Argon's neo-grotesque style provides clean,
        neutral code rendering with excellent glyph differentiation at small sizes.
      </p>
      <div className={css({
        fontFamily: "mono",
        fontSize: "14px",
        lineHeight: 1.7,
        color: "code.text",
        bg: "sunbeam.black",
        padding: "24px",
        borderRadius: "0",
        marginBottom: "48px",
      })}>
        <span style={{ color: "#c084fc" }}>const</span> terrain = <span style={{ color: "#93c5fd" }}>generate</span>({"{"}<br/>
        {"  "}seed: <span style={{ color: "#86efac" }}>"ALGARVE_2026"</span>,<br/>
        {"  "}octaves: <span style={{ color: "#fb923c" }}>8</span>,<br/>
        {"  "}persistence: <span style={{ color: "#fb923c" }}>0.55</span>,<br/>
        {"}"});
      </div>

      {/* WEIGHT SCALE */}
      <h2 id="weight-scale" className={sectionTitle}>Weight Scale</h2>
      {weights.map((w) => (
        <div key={w.name} className={weightCard}>
          <div
            className={weightSample}
            style={{
              fontFamily: token("fonts.heading"),
              fontWeight: w.value,
            }}
          >
            {w.sample}
          </div>
          <div className={weightMeta}>
            {w.name} -- weight: {w.value}
          </div>
        </div>
      ))}

      {/* TYPE SCALE */}
      <h2 id="type-scale" className={sectionTitle}>Type Scale</h2>
      {typeScale.map((s) => {
        const responsiveClass =
          s.size === "82px" ? scaleItemLargeText :
          s.size === "56px" ? scaleItemSectionText :
          s.size === "48px" ? scaleItemSubLargeText :
          undefined;
        return (
          <div key={s.label} className={scaleItem}>
            <div
              className={responsiveClass ? cx(responsiveClass) : undefined}
              style={{
                fontFamily: token("fonts.heading"),
                ...(responsiveClass ? {} : { fontSize: s.size }),
                fontWeight: s.weight,
                lineHeight: s.lh,
                letterSpacing: s.ls,
              }}
            >
              {s.sample}
            </div>
            <div className={scaleMeta}>
              {s.label} -- {s.size} / {s.weight} / {s.lh}
              {s.ls !== "normal" ? ` / ${s.ls}` : ""}
            </div>
          </div>
        );
      })}

      {/* PRINCIPLES */}
      <h2 id="principles" className={sectionTitle}>Principles</h2>
      <div className={prose}>
        <p>
          <strong>Size carries hierarchy, not weight.</strong> The primary way Beam
          distinguishes a heading from body text is through size steps — 82px down
          to 14px. Weight plays a supporting role, with four stops calibrated for
          Ysabeau Infant's variable axis: display (431) is deliberately light at large
          sizes, heading (575) adds just enough presence at mid-sizes, body (647) is
          the comfortable reading weight, and button (791) provides maximum clarity
          for small uppercase labels.
        </p>
        <p>
          <strong>Two families, one voice.</strong> Ysabeau Infant handles all UI
          text — headlines, body, navigation, labels. Monaspace Argon handles all
          code — inline snippets, code blocks, terminal output, API paths. These two
          never mix roles: if it's code, it's Argon; everything else is Ysabeau.
        </p>
        <p>
          <strong>Tight at the top, generous at the bottom.</strong> Display sizes
          (56px+) use aggressive negative tracking (-2.05px) and ultra-tight line
          heights (0.95) to create dense, poster-like headlines. As sizes decrease,
          tracking relaxes to normal and line height opens to 1.5, prioritizing
          readability over visual impact.
        </p>
      </div>
    </div>
  );
}
