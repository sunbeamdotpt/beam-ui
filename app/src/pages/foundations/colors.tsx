import { useEffect, useState } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";

/* ------------------------------------------------------------------ */
/*  TOC                                                                */
/* ------------------------------------------------------------------ */

const TOC_ITEMS = [
  { label: "Primary Colors", id: "primary-colors" },
  { label: "Sunshine Scale", id: "sunshine-scale" },
  { label: "Surfaces", id: "surfaces" },
  { label: "Semantic Tokens", id: "semantic-tokens" },
];

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const primaryColors = [
  { name: "sunbeam.orange", hex: "#fa520f" },
  { name: "sunbeam.flame", hex: "#fb6424" },
  { name: "beam.orange", hex: "#ff8105" },
];

const sunshineColors = [
  { name: "sunshine.900", hex: "#ff8a00" },
  { name: "sunshine.700", hex: "#ffa110" },
  { name: "sunshine.500", hex: "#ffb83e" },
  { name: "sunshine.300", hex: "#ffd06a" },
  { name: "beam.gold", hex: "#ffe295" },
  { name: "bright.yellow", hex: "#ffd900" },
];

const surfaceColors = [
  { name: "warm.ivory", hex: "#fffaeb" },
  { name: "cream", hex: "#fff0c2" },
  { name: "sunbeam.black", hex: "#1f1f1f" },
  { name: "card.dark", hex: "#2a2a2a" },
];

const semanticTokens = [
  { name: "bg.page", light: "#fffaeb", dark: "#1f1f1f" },
  { name: "bg.card", light: "#fff0c2", dark: "#2a2a2a" },
  { name: "bg.nav", light: "rgba(255,250,235,0.92)", dark: "rgba(31,31,31,0.92)" },
  { name: "text.primary", light: "#1f1f1f", dark: "#ffffff" },
  { name: "text.secondary", light: "hsl(0,0%,24%)", dark: "rgba(255,255,255,0.7)" },
  { name: "text.muted", light: "#7f6315", dark: "rgba(255,255,255,0.4)" },
  { name: "border.default", light: "rgba(127,99,21,0.15)", dark: "rgba(255,161,16,0.15)" },
  { name: "border.subtle", light: "rgba(127,99,21,0.08)", dark: "rgba(255,161,16,0.08)" },
  { name: "accent", light: "#fa520f", dark: "#fa520f" },
  { name: "sectionLabel", light: "#fa520f", dark: "#ffa110" },
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

const colorGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "16px",
  marginBottom: "40px",
});

const swatch = css({
  border: "1px solid",
  borderColor: "border.default",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.2s",
  _hover: { shadow: "golden", transform: "translateY(-1px)" },
});

const swatchBlock = css({ height: "80px" });

const swatchInfo = css({
  padding: "12px",
  bg: "bg.card",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const swatchName = css({
  fontSize: "13px",
  fontWeight: "body",
  color: "text.primary",
});

const swatchHex = css({
  fontSize: "12px",
  fontFamily: "mono",
  color: "text.muted",
  letterSpacing: "0.5px",
});

const copiedBadge = css({
  fontSize: "10px",
  color: "sunshine.700",
  fontWeight: "button",
  textTransform: "uppercase",
});

/* Semantic token table */
const semGrid = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "0",
  border: "1px solid",
  borderColor: "border.default",
  marginBottom: "40px",
});

const semHeader = css({
  padding: "12px 16px",
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.55px",
  color: "text.muted",
  bg: "bg.card",
  borderBottom: "1px solid",
  borderBottomColor: "border.default",
});

const semCell = css({
  padding: "12px 16px",
  fontSize: "13px",
  borderBottom: "1px solid",
  borderBottomColor: "border.subtle",
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const semDot = css({
  width: "20px",
  height: "20px",
  flexShrink: 0,
  border: "1px solid",
  borderColor: "border.default",
});

const semName = css({
  fontFamily: "mono",
  fontSize: "13px",
  color: "text.primary",
});

/* ------------------------------------------------------------------ */
/*  SWATCH COMPONENT                                                   */
/* ------------------------------------------------------------------ */

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={swatch} onClick={handleCopy} title={`Copy ${hex}`}>
      <div className={swatchBlock} style={{ background: hex }} />
      <div className={swatchInfo}>
        <div className={swatchName}>{name}</div>
        <div className={swatchHex}>{hex}</div>
        {copied && <div className={copiedBadge}>Copied</div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export function ColorsPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Foundations" },
          { label: "Colors" },
        ]}
      />

      <h1 className={pageTitle}>Colors</h1>
      <p className={pageDesc}>
        Beam's palette is built on warmth. From deep Sunbeam Orange to pale golden
        ivories, every color evokes the feeling of golden-hour light -- inviting,
        confident, and unmistakably Sunbeam.
      </p>

      {/* PRIMARY */}
      <h2 id="primary-colors" className={sectionTitle}>Primary Colors</h2>
      <div className={colorGrid}>
        {primaryColors.map((c) => (
          <ColorSwatch key={c.name} {...c} />
        ))}
      </div>

      {/* SUNSHINE */}
      <h2 id="sunshine-scale" className={sectionTitle}>Sunshine Scale</h2>
      <div className={colorGrid}>
        {sunshineColors.map((c) => (
          <ColorSwatch key={c.name} {...c} />
        ))}
      </div>

      {/* SURFACES */}
      <h2 id="surfaces" className={sectionTitle}>Surfaces</h2>
      <div className={colorGrid}>
        {surfaceColors.map((c) => (
          <ColorSwatch key={c.name} {...c} />
        ))}
      </div>

      {/* SEMANTIC TOKENS */}
      <h2 id="semantic-tokens" className={sectionTitle}>Semantic Tokens</h2>
      <p className={css({ color: "text.secondary", fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" })}>
        Semantic tokens resolve to different values in light and dark mode,
        providing automatic theme adaptation.
      </p>
      <div className={semGrid}>
        <div className={semHeader}>Token</div>
        <div className={semHeader}>Light</div>
        <div className={semHeader}>Dark</div>
        {semanticTokens.map((t) => (
          <>
            <div key={`${t.name}-name`} className={semCell}>
              <span className={semName}>{t.name}</span>
            </div>
            <div key={`${t.name}-light`} className={semCell}>
              <span className={semDot} style={{ background: t.light }} />
              <span className={css({ fontSize: "12px", fontFamily: "mono", color: "text.muted" })}>{t.light}</span>
            </div>
            <div key={`${t.name}-dark`} className={semCell}>
              <span className={semDot} style={{ background: t.dark }} />
              <span className={css({ fontSize: "12px", fontFamily: "mono", color: "text.muted" })}>{t.dark}</span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
