import { Link } from "react-router-dom";
import { css } from "styled-system/css";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { ModelRow } from "@sunbeam/beam-ui/components/ui/model-row";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import {
  featuredModels,
  generalistModels,
  specialistModels,
} from "../data/models";

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const page = css({
  maxWidth: "1000px",
  marginInline: "auto",
  paddingInline: { base: "24px", md: "40px", lg: "64px" },
  paddingBlock: "48px",
});

const breadcrumbBar = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "40px",
  flexWrap: "wrap",
  gap: "12px",
});

const heroTitle = css({
  fontSize: { base: "28px", md: "34px", lg: "40px" },
  fontWeight: "heading",
  letterSpacing: "-0.02em",
  color: "text.primary",
  marginBottom: "24px",
});

const heroSubtitle = css({
  fontSize: "20px",
  color: "text.secondary",
  maxWidth: "640px",
  lineHeight: 1.6,
  fontWeight: "body",
});

const ctaRow = css({
  display: "flex",
  gap: "16px",
  marginTop: "40px",
});

const featuredGrid = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
  gap: "24px",
  marginBottom: "80px",
});

const featuredCard = css({
  padding: "32px",
  borderRadius: "0",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  cursor: "pointer",
  transition: "transform 0.2s ease",
  textDecoration: "none",
  _hover: {
    transform: "scale(1.02)",
  },
});

const featuredCardOrange = css({
  background: "linear-gradient(135deg, token(colors.sunbeam.orange), token(colors.sunbeam.orange))",
});

const featuredCardDark = css({
  background: "linear-gradient(135deg, token(colors.sunbeam.black), token(colors.card.dark))",
  border: "1px solid",
  borderColor: "border.default",
});

const featuredIcon = css({
  width: "48px",
  height: "48px",
  borderRadius: "md",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const featuredIconLight = css({
  bg: "rgba(255,255,255,0.2)",
  color: "white",
});

const featuredIconDark = css({
  bg: "rgba(255,255,255,0.1)",
  color: "sunbeam.orange",
});

const featuredName = css({
  fontSize: "24px",
  fontWeight: "heading",
  color: "white",
  marginBottom: "8px",
});

const featuredDesc = css({
  fontSize: "14px",
  color: "rgba(255,255,255,0.8)",
  lineHeight: 1.5,
});

const subsectionHeader = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: { base: "flex-start", md: "flex-end" },
  flexDirection: { base: "column", md: "row" },
  gap: { base: "8px", md: "16px" },
  marginBottom: "32px",
});

const subsectionTitle = css({
  fontSize: "30px",
  fontWeight: "heading",
  letterSpacing: "-0.01em",
  color: "text.primary",
});

const subsectionHint = css({
  fontSize: "14px",
  color: "text.secondary",
  fontWeight: "body",
});

const modelGrid = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
  gap: "32px 48px",
  marginBottom: "64px",
});

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function ModelsIndexPage() {
  return (
    <div className={page}>
      {/* Breadcrumbs */}
      <div className={breadcrumbBar}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Getting Started", href: "/docs" },
            { label: "Models" },
          ]}
        />
        <Badge variant="section">GETTING STARTED</Badge>
      </div>

      {/* Hero */}
      <header className={css({ marginBottom: "64px" })}>
        <h1 className={heroTitle}>Models</h1>
        <p className={heroSubtitle}>
          A list of all our available models, helping you explore their
          capabilities, performance, trade-offs, and more.
        </p>
        <div className={ctaRow}>
          <Button variant="primary" href="/models">
            Reach out
            <Icon name="arrow_forward" size={16} />
          </Button>
          <Button variant="ghost" href="/guides">
            Join our Discord
            <Icon name="chat_bubble" size={16} />
          </Button>
        </div>
      </header>

      {/* Featured Models */}
      <section className={css({ marginBottom: "80px" })}>
        <Badge variant="section">Featured Models</Badge>
        <div className={featuredGrid}>
          {featuredModels.map((model, idx) => {
            const isOrange = idx !== 1;
            return (
              <Link
                key={model.name}
                to={model.name === "Solar Medium 3.1" ? "/models/solar-medium-3-1" : "/models"}
                className={`${featuredCard} ${isOrange ? featuredCardOrange : featuredCardDark}`}
              >
                <div className={`${featuredIcon} ${isOrange ? featuredIconLight : featuredIconDark}`}>
                  <Icon name={model.icon} size={24} filled />
                </div>
                <div>
                  <h3 className={featuredName}>{model.name}</h3>
                  <p className={featuredDesc}>{model.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Frontier Models */}
      <section className={css({ marginBottom: "80px" })}>
        <Badge variant="section">Frontier Models</Badge>

        {/* Generalist */}
        <div className={css({ marginBottom: "64px" })}>
          <div className={subsectionHeader}>
            <h2 className={subsectionTitle}>Generalist</h2>
            <p className={subsectionHint}>Standard latency, high intelligence workloads</p>
          </div>
          <div className={modelGrid}>
            {generalistModels.map((m) => (
              <ModelRow
                key={m.name}
                name={m.name}
                icon={m.icon}
                tier={m.tier}
                version={m.version}
                description={m.description}
                href="/models"
              />
            ))}
          </div>
        </div>

        {/* Specialist */}
        <div>
          <div className={subsectionHeader}>
            <h2 className={subsectionTitle}>Specialist</h2>
            <p className={subsectionHint}>Domain-specific mastery and edge cases</p>
          </div>
          <div className={modelGrid}>
            {specialistModels.map((m) => (
              <ModelRow
                key={m.name}
                name={m.name}
                icon={m.icon}
                tier={m.tier}
                version={m.version}
                description={m.description}
                href="/models"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
