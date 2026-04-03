import { useEffect } from "react";
import { css } from "styled-system/css";
import { token } from "styled-system/tokens";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";

/* ------------------------------------------------------------------ */
/*  TOC                                                                */
/* ------------------------------------------------------------------ */

const TOC_ITEMS = [
  { label: "Type Scale", id: "type-scale" },
  { label: "Live Preview", id: "live-preview" },
  { label: "Usage", id: "usage" },
];

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const fontSizeTokens = [
  { token: "2xs", px: "10px", weight: 791, lh: "1.5", ls: "0.05em", usage: "Badges, pills, filter counts", typeRole: "Label", sample: "FILTER BADGES AND PILLS" },
  { token: "xs", px: "12px", weight: 647, lh: "1.5", ls: "normal", usage: "Meta lines, stats, timestamps", typeRole: "—", sample: "Meta lines, comment counts, timestamps" },
  { token: "sm", px: "14px", weight: 647, lh: "1.43", ls: "normal", usage: "Descriptions, nav links, form labels", typeRole: "Caption", sample: "Caption text, metadata, and secondary links" },
  { token: "md", px: "16px", weight: 647, lh: "1.50", ls: "normal", usage: "Standard body, issue/PR titles", typeRole: "Body", sample: "Standard paragraph text for content, navigation, and interface labels." },
  { token: "lg", px: "18px", weight: 647, lh: "1.4", ls: "normal", usage: "UI emphasis, settings headers", typeRole: "—", sample: "Emphasized body text and settings headers" },
  { token: "lg", px: "18px", weight: 791, lh: "1.4", ls: "normal", usage: "Bold callouts, stat values, key numbers", typeRole: "Emphasis", sample: "Emphasis callout or stat value" },
  { token: "xl", px: "20px", weight: 575, lh: "1.33", ls: "normal", usage: "Header brand name, large UI text", typeRole: "—", sample: "Header brand name" },
  { token: "2xl", px: "24px", weight: 575, lh: "1.33", ls: "normal", usage: "Card titles, page headings", typeRole: "Title", sample: "Card or Feature Title" },
  { token: "2xl", px: "24px", weight: 791, lh: "1.33", ls: "normal", usage: "Pricing, hero stats, bold titles", typeRole: "Strong Title", sample: "Strong Title" },
  { token: "3xl", px: "32px", weight: 575, lh: "1.15", ls: "normal", usage: "Feature titles, sub-headings", typeRole: "Sub-heading", sample: "Feature Title" },
  { token: "4xl", px: "48px", weight: 431, lh: "0.95", ls: "normal", usage: "Page headings (h1)", typeRole: "Sub-heading Large", sample: "Sub-heading" },
  { token: "5xl", px: "56px", weight: 431, lh: "0.95", ls: "normal", usage: "Section headings", typeRole: "Section", sample: "Section Heading" },
  { token: "6xl", px: "82px", weight: 431, lh: "1.0", ls: "-2.05px", usage: "Hero / display headings", typeRole: "Display", sample: "Beam" },
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

/* Token table */
const tableWrap = css({
  border: "1px solid",
  borderColor: "border.default",
  marginBottom: "40px",
  overflowX: "auto",
});

const table = css({
  width: "100%",
  borderCollapse: "collapse",
});

const th = css({
  padding: "12px 16px",
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.55px",
  color: "text.muted",
  bg: "bg.card",
  borderBottom: "1px solid",
  borderBottomColor: "border.default",
  textAlign: "left",
});

const td = css({
  padding: "12px 16px",
  fontSize: "13px",
  borderBottom: "1px solid",
  borderBottomColor: "border.subtle",
  color: "text.primary",
});

const tdMono = css({
  padding: "12px 16px",
  fontSize: "13px",
  fontFamily: "mono",
  borderBottom: "1px solid",
  borderBottomColor: "border.subtle",
  color: "text.primary",
});

const tdMuted = css({
  padding: "12px 16px",
  fontSize: "13px",
  borderBottom: "1px solid",
  borderBottomColor: "border.subtle",
  color: "text.secondary",
});

/* Preview */
const previewItem = css({
  marginBottom: "32px",
  paddingBottom: "32px",
  borderBottom: "1px solid",
  borderBottomColor: "border.subtle",
  _last: { borderBottom: "none" },
  overflowWrap: "break-word",
  wordBreak: "break-word",
});

const previewMeta = css({
  fontSize: "12px",
  color: "text.muted",
  fontFamily: "mono",
  marginTop: "8px",
});

const previewText = css({
  fontFamily: "heading",
  color: "text.primary",
});

/* Code block */
const codeWrap = css({
  bg: "sunbeam.black",
  padding: "24px",
  marginBottom: "40px",
  overflowX: "auto",
});

const codePre = css({
  fontFamily: "mono",
  fontSize: "13px",
  lineHeight: 1.7,
  color: "code.text",
  margin: 0,
});

const syn = {
  keyword: css({ color: "syn.keyword" }),
  fn: css({ color: "syn.fn" }),
  string: css({ color: "syn.string" }),
  prop: css({ color: "syn.prop" }),
};

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export function FontSizesPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Foundations" },
          { label: "Font Sizes" },
        ]}
      />

      <h1 className={pageTitle}>Font Sizes</h1>
      <p className={pageDesc}>
        Beam's type scale provides ten harmonious font-size tokens that cover
        everything from fine-print labels to hero display headings. Each token
        maps to a rem value so the scale adapts to the user's browser settings.
        For font families and weights, see the{" "}
        <a href="/foundations/typography" className={css({ color: "accent", textDecoration: "underline" })}>
          Typography
        </a>{" "}
        page.
      </p>

      {/* TYPE SCALE TABLE */}
      <h2 id="type-scale" className={sectionTitle}>Type Scale</h2>
      <div className={tableWrap}>
        <table className={table}>
          <thead>
            <tr>
              <th className={th}>Token</th>
              <th className={th}>Size</th>
              <th className={th}>Weight</th>
              <th className={th}>Line Height</th>
              <th className={th}>Type Role</th>
              <th className={th}>Usage</th>
            </tr>
          </thead>
          <tbody>
            {fontSizeTokens.map((t) => (
              <tr key={t.token}>
                <td className={tdMono}>{t.token}</td>
                <td className={tdMono}>{t.px}</td>
                <td className={tdMono}>{t.weight}</td>
                <td className={tdMono}>{t.lh}</td>
                <td className={td}>{t.typeRole}</td>
                <td className={tdMuted}>{t.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LIVE PREVIEW */}
      <h2 id="live-preview" className={sectionTitle}>Live Preview</h2>
      <div className={css({ marginBottom: "40px" })}>
        {fontSizeTokens.map((t) => (
          <div key={t.token} className={previewItem}>
            <div
              style={{
                fontFamily: token("fonts.heading"),
                fontSize: t.px,
                fontWeight: t.weight,
                lineHeight: t.lh,
                letterSpacing: t.ls === "normal" ? undefined : t.ls,
              }}
            >
              {t.sample}
            </div>
            <div className={previewMeta}>
              {t.typeRole !== "—" ? t.typeRole : t.token} — {t.px} / {t.weight} / {t.lh}
              {t.ls !== "normal" ? ` / ${t.ls}` : ""}
            </div>
          </div>
        ))}
      </div>

      {/* USAGE */}
      <h2 id="usage" className={sectionTitle}>Usage</h2>
      <p className={css({ color: "text.secondary", fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" })}>
        Use font-size tokens with the Panda CSS <code className={css({ fontFamily: "mono", fontSize: "13px" })}>css()</code> function
        or directly in style props.
      </p>
      <div className={codeWrap}>
        <pre className={codePre}>
          <span className={syn.keyword}>import</span>{" { "}<span className={syn.fn}>css</span>{" } "}<span className={syn.keyword}>from</span>{" "}<span className={syn.string}>"styled-system/css"</span>{";\n\n"}
          <span className={syn.keyword}>{"// Body text (default)"}</span>{"\n"}
          <span className={syn.keyword}>const</span>{" body = "}<span className={syn.fn}>css</span>{"({ "}<span className={syn.prop}>fontSize</span>{": "}<span className={syn.string}>"md"</span>{" });\n\n"}
          <span className={syn.keyword}>{"// Small / compact UI"}</span>{"\n"}
          <span className={syn.keyword}>const</span>{" caption = "}<span className={syn.fn}>css</span>{"({ "}<span className={syn.prop}>fontSize</span>{": "}<span className={syn.string}>"sm"</span>{" });\n\n"}
          <span className={syn.keyword}>{"// Section heading"}</span>{"\n"}
          <span className={syn.keyword}>const</span>{" heading = "}<span className={syn.fn}>css</span>{"({ "}<span className={syn.prop}>fontSize</span>{": "}<span className={syn.string}>"3xl"</span>{", "}<span className={syn.prop}>fontWeight</span>{": "}<span className={syn.string}>"heading"</span>{" });\n\n"}
          <span className={syn.keyword}>{"// Hero display"}</span>{"\n"}
          <span className={syn.keyword}>const</span>{" hero = "}<span className={syn.fn}>css</span>{"({ "}<span className={syn.prop}>fontSize</span>{": "}<span className={syn.string}>"5xl"</span>{", "}<span className={syn.prop}>fontWeight</span>{": "}<span className={syn.string}>"display"</span>{" });"}
        </pre>
      </div>
    </div>
  );
}
