import { css } from "styled-system/css";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const colorClasses = [
  css({ bg: "sunbeam.orange" }),
  css({ bg: "sunshine.700" }),
  css({ bg: "sunshine.500" }),
  css({ bg: "beam.orange" }),
  css({ bg: "sunbeam.flame" }),
];

interface Creator {
  name: string;
  initials: string;
  colorIndex: number;
}

const creators: Creator[] = [
  { name: "Sofia Oliveira", initials: "SO", colorIndex: 0 },
  { name: "Marco Santos", initials: "MS", colorIndex: 1 },
  { name: "Ana Costa", initials: "AC", colorIndex: 2 },
  { name: "Pedro Lima", initials: "PL", colorIndex: 3 },
  { name: "Lucia Ferreira", initials: "LF", colorIndex: 4 },
  { name: "Tomás Almeida", initials: "TA", colorIndex: 0 },
  { name: "Beatriz Cardoso", initials: "BC", colorIndex: 1 },
  { name: "Rafael Nunes", initials: "RN", colorIndex: 2 },
  { name: "Inês Rocha", initials: "IR", colorIndex: 3 },
];

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const heroSection = css({
  maxWidth: "1440px",
  marginInline: "auto",
  paddingInline: "48px",
  paddingBlock: "80px 64px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const heroTitle = css({
  fontSize: "36px",
  fontWeight: "heading",
  letterSpacing: "-0.03em",
  lineHeight: 1.15,
  color: "text.primary",
  marginBottom: "16px",
});

const heroSubtitle = css({
  fontSize: "18px",
  color: "text.secondary",
  maxWidth: "700px",
  lineHeight: 1.6,
  fontWeight: "body",
});

const sectionWrapper = css({
  maxWidth: "1440px",
  marginInline: "auto",
  paddingInline: "48px",
  paddingBlock: "0 80px",
});

const sectionTitle = css({
  fontSize: "28px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "48px",
});

const creatorGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "24px",
});

const cardBase = css({
  aspectRatio: "1",
  position: "relative",
  borderRadius: "0",
  overflow: "hidden",
  cursor: "pointer",
  transition: "opacity 0.2s ease",
  _hover: {
    opacity: 0.88,
  },
});

const cardInitials = css({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "64px",
  fontWeight: "heading",
  color: "white",
  opacity: 0.25,
  letterSpacing: "0.05em",
  userSelect: "none",
});

const cardFooter = css({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  padding: "20px",
  background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
});

const cardName = css({
  fontSize: "16px",
  fontWeight: "button",
  color: "white",
  lineHeight: 1.2,
});

const cardIcon = css({
  color: "white",
  opacity: 0.8,
});

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function CreatorsPage() {
  return (
    <div>
      {/* Hero */}
      <section className={heroSection}>
        <h1 className={heroTitle}>
          ☀️ Welcome to the Sunbeam Studios Creator Program
        </h1>
        <p className={heroSubtitle}>
          We're looking for creators who are passionate about tools and games.
          Whether you build mods, stream development workflows, write tutorials,
          or craft stunning visual content — we want to hear from you.
        </p>
      </section>

      {/* Creators grid */}
      <section className={sectionWrapper}>
        <Badge variant="section">CREATORS</Badge>
        <h2 className={sectionTitle}>Meet our current Creators</h2>

        <div className={creatorGrid}>
          {creators.map((creator) => (
            <div
              key={creator.name}
              className={`${cardBase} ${colorClasses[creator.colorIndex]}`}
            >
              <div className={cardInitials}>{creator.initials}</div>
              <div className={cardFooter}>
                <span className={cardName}>{creator.name}</span>
                <Icon
                  name="arrow_outward"
                  size={20}
                  className={cardIcon}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
