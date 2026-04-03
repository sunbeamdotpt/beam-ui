import { useState } from "react";
import { Link } from "react-router-dom";
import { css } from "styled-system/css";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { StatBar } from "@sunbeam/beam-ui/components/ui/stat-bar";
import { FeatureTile } from "@sunbeam/beam-ui/components/ui/feature-tile";
import { Tabs } from "@sunbeam/beam-ui/components/ui/tabs";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { featuredModels } from "../data/models";

const model = featuredModels.find((m) => m.name === "Solstice 4 Vision")!;

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const page = css({
  maxWidth: "720px",
  marginInline: "auto",
  paddingInline: { base: "24px", lg: "48px" },
  paddingBlock: "48px",
});

const breadcrumbBar = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "0",
  flexWrap: "wrap",
  gap: "8px",
});

const tryStudio = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "sunbeam.orange",
  fontWeight: "button",
  fontSize: "12px",
  letterSpacing: "0.15em",
  textDecoration: "none",
  _hover: { opacity: 0.8 },
});

const heroCard = css({
  position: "relative",
  padding: "32px",
  marginBottom: "32px",
  overflow: "hidden",
});

const heroGlow = css({
  position: "absolute",
  top: 0,
  right: 0,
  width: "128px",
  height: "128px",
  bg: "rgba(250, 82, 15, 0.05)",
  borderRadius: "full",
  filter: "blur(48px)",
  marginRight: "-64px",
  marginTop: "-64px",
  pointerEvents: "none",
});

const heroFlex = css({
  display: "flex",
  flexDirection: { base: "column", md: "row" },
  gap: { base: "24px", md: "32px" },
  alignItems: "flex-start",
  position: "relative",
  zIndex: 1,
});

const heroIcon = css({
  width: "96px",
  height: "96px",
  minWidth: "96px",
  bg: "bg.card",
  borderRadius: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "sunbeam.orange",
});

const heroInfo = css({
  flex: 1,
});

const metaRow = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "8px",
});

const dateLabel = css({
  fontSize: "12px",
  fontWeight: "button",
  color: "text.muted",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
});

const premierBadge = css({
  bg: "sunbeam.orange",
  color: "white",
  paddingInline: "8px",
  paddingBlock: "2px",
  borderRadius: "sm",
  fontSize: "10px",
  fontWeight: "button",
  letterSpacing: "-0.02em",
});

const versionLabel = css({
  fontSize: "12px",
  color: "text.muted",
  fontWeight: "body",
});

const heroTitle = css({
  fontSize: "28px",
  fontWeight: "button",
  color: "text.primary",
  letterSpacing: "-0.01em",
  marginBottom: "12px",
});

const heroDescription = css({
  color: "text.secondary",
  fontSize: "18px",
  lineHeight: 1.6,
  marginBottom: "24px",
});

const modelIdPill = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "12px",
  bg: "bg.card",
  paddingInline: "12px",
  paddingBlock: "6px",
  borderRadius: "0",
  border: "1px solid",
  borderColor: "border.subtle",
});

const modelIdText = css({
  fontFamily: "mono",
  fontSize: "12px",
  color: "text.primary",
});

const copyBtn = css({
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "text.muted",
  padding: 0,
  display: "flex",
  _hover: { color: "sunbeam.orange" },
});

const aliasBadge = css({
  bg: "bg.card",
  color: "text.muted",
  paddingInline: "8px",
  paddingBlock: "4px",
  borderRadius: "sm",
  fontSize: "10px",
  fontWeight: "button",
  marginLeft: "12px",
});

const actionRow = css({
  display: "flex",
  gap: "16px",
  marginBottom: "48px",
});

const featuresGrid = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
  gap: "16px",
});

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function ModelDetailPage() {
  const [activeTab, setActiveTab] = useState("features");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("solstice-4-vision-4.1.0").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className={page}>
      {/* Breadcrumbs */}
      <div className={breadcrumbBar}>
        <Breadcrumbs
          items={[
            { label: "Models", href: "/models" },
            { label: "Solstice 4 Vision" },
          ]}
        />
        <Link to="/models" className={tryStudio}>
          TRY IN STUDIO <Icon name="arrow_forward" size={14} />
        </Link>
      </div>

      {/* Hero Card */}
      <section className={heroCard}>
        <div className={heroGlow} />
        <div className={heroFlex}>
          <div className={heroIcon}>
            <Icon name={model.icon} size={48} filled />
          </div>
          <div className={heroInfo}>
            <div className={metaRow}>
              <span className={dateLabel}>March 15, 2026</span>
              <span className={premierBadge}>PREMIER</span>
              <span className={versionLabel}>{model.version}</span>
            </div>
            <h1 className={heroTitle}>{model.name}</h1>
            <p className={heroDescription}>
              Our frontier-class multimodal reasoning model update of March 2026.
            </p>
            <div className={css({ display: "flex", alignItems: "center", flexWrap: "wrap" })}>
              <div className={modelIdPill}>
                <span className={modelIdText}>solstice-4-vision-4.1.0</span>
                <button className={copyBtn} onClick={handleCopy} title="Copy model ID">
                  <Icon name={copied ? "check" : "content_copy"} size={14} />
                </button>
              </div>
              <span className={aliasBadge}>+1 alias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Action buttons */}
      <div className={actionRow}>
        <Button variant="primary" href="/models">
          Compare
        </Button>
        <Button variant="ghost" href="/models">
          Legal
        </Button>
      </div>

      {/* Stats Bar */}
      {model.stats && <StatBar stats={model.stats} />}

      {/* Tabs */}
      <Tabs
        items={[
          { value: "features", label: "FEATURES" },
          { value: "weights", label: "WEIGHTS" },
        ]}
        activeValue={activeTab}
        onChange={setActiveTab}
      />

      {/* Features Grid */}
      {activeTab === "features" && model.features && (
        <div className={featuresGrid}>
          {model.features.map((f) => (
            <FeatureTile
              key={f.name}
              name={f.name}
              endpoint={f.endpoint}
              icon={f.icon}
            />
          ))}
        </div>
      )}

      {activeTab === "weights" && (
        <p className={css({ color: "text.muted", fontSize: "14px", padding: "32px 0" })}>
          Weight information coming soon.
        </p>
      )}

      <div className={css({ height: "96px" })} />
    </div>
  );
}
