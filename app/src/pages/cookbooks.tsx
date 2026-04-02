import { css } from "styled-system/css";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { TopicCard } from "@sunbeam/beam-ui/components/ui/topic-card";
import { BentoItem } from "@sunbeam/beam-ui/components/ui/bento-item";
import { topics, featuredCookbooks } from "../data/cookbooks";

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const heroSection = css({
  maxWidth: "1440px",
  marginInline: "auto",
  paddingInline: "48px",
  paddingBlock: "64px",
  display: "flex",
  alignItems: "center",
  gap: "48px",
});

const heroLeft = css({
  flex: 1,
});

const heroTitle = css({
  fontSize: "48px",
  fontWeight: "heading",
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
  color: "text.primary",
  marginBottom: "24px",
});

const heroSubtitle = css({
  fontSize: "20px",
  color: "text.secondary",
  maxWidth: "540px",
  lineHeight: 1.6,
  fontWeight: "body",
  marginBottom: "32px",
});

const ctaRow = css({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

const heroRight = css({
  flex: 1,
  maxWidth: "420px",
});

const recipeBox = css({
  border: "4px solid",
  borderColor: "sunbeam.orange",
  padding: "32px",
  bg: "bg.page",
  position: "relative",
  overflow: "hidden",
});

const recipeEst = css({
  position: "absolute",
  top: "8px",
  right: "8px",
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "sunbeam.orange",
  opacity: 0.2,
});

const recipeNav = css({
  fontSize: "12px",
  fontWeight: "button",
  letterSpacing: "0.15em",
  color: "sunbeam.orange",
  textTransform: "uppercase",
  marginBottom: "4px",
  display: "block",
});

const recipeTitle = css({
  fontSize: "20px",
  fontWeight: "button",
  color: "text.primary",
  marginBottom: "24px",
});

const recipeGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "16px",
});

const recipeCell = css({
  aspectRatio: "1",
  bg: "bg.page",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "sm",
  border: "1px solid",
  borderColor: "border.default",
  cursor: "pointer",
  transition: "background 0.15s ease",
  _hover: {
    bg: "rgba(250, 82, 15, 0.1)",
  },
});

const recipeIcon = css({
  color: "sunbeam.orange",
});

/* Topics section */
const sectionWrapper = css({
  maxWidth: "1440px",
  marginInline: "auto",
  paddingInline: "48px",
  paddingBlock: "64px",
});

const solarRule = css({
  height: "4px",
  width: "100%",
  bg: "sunbeam.orange",
  marginBottom: "16px",
});

const sectionHeader = css({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginBottom: "48px",
});

const sectionHeaderRow = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

const sectionTitle = css({
  fontSize: "28px",
  fontWeight: "heading",
  color: "text.primary",
});

const sectionHint = css({
  color: "text.secondary",
  fontWeight: "body",
  fontSize: "14px",
});

const topicGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "24px",
});

/* Bento grid */
const bentoGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "auto auto",
  gap: "32px",
});

/* Grid icons for recipe box */
const gridIcons = [
  "restaurant",
  "terminal",
  "smart_toy",
  "precision_manufacturing",
  "auto_stories",
  "layers",
  "schema",
  "bolt",
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function CookbooksPage() {
  return (
    <div>
      {/* Hero */}
      <section className={heroSection}>
        <div className={heroLeft}>
          <h1 className={heroTitle}>Sunbeam Studios Cookbooks</h1>
          <p className={heroSubtitle}>
            Discover Sunbeam Studios capabilities from basic tutorials to
            advanced use cases. Master the art of procedural generation and
            agentic systems.
          </p>
          <div className={ctaRow}>
            <Button variant="primary" href="/guides">
              Contribute <Icon name="chevron_right" size={16} />
            </Button>
            <Button variant="ghost" href="/guides">
              Join our Discord <Icon name="chevron_right" size={16} />
            </Button>
          </div>
        </div>

        <div className={heroRight}>
          <div className={recipeBox}>
            <span className={recipeEst}>EST. 2024</span>
            <span className={recipeNav}>Navigation</span>
            <h3 className={recipeTitle}>QUICK ACCESS TO RECIPES</h3>
            <div className={recipeGrid}>
              {gridIcons.map((icon) => (
                <div key={icon} className={recipeCell}>
                  <Icon name={icon} size={24} className={recipeIcon} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className={sectionWrapper}>
        <div className={sectionHeader}>
          <div className={solarRule} />
          <div className={sectionHeaderRow}>
            <div>
              <Badge variant="premier">TOPICS</Badge>
              <h2 className={sectionTitle}>Explore by Topics</h2>
            </div>
            <p className={sectionHint}>Discover our cookbooks by use case.</p>
          </div>
        </div>
        <div className={topicGrid}>
          {topics.map((topic) => (
            <TopicCard
              key={topic.title}
              title={topic.title}
              icon={topic.icon}
              description={topic.description}
            />
          ))}
        </div>
      </section>

      {/* Featured Cookbooks */}
      <section className={sectionWrapper}>
        <div className={sectionHeader}>
          <div className={solarRule} />
          <div className={sectionHeaderRow}>
            <div>
              <Badge variant="premier">FEATURED COOKBOOKS</Badge>
              <h2 className={sectionTitle}>Featured Cookbooks</h2>
            </div>
            <p className={sectionHint}>Discover our best cookbooks.</p>
          </div>
        </div>
        <div className={bentoGrid}>
          <BentoItem
            variant="large"
            title={featuredCookbooks[0].title}
            description={featuredCookbooks[0].description}
            difficulty={featuredCookbooks[0].difficulty}
            category={featuredCookbooks[0].category}
          />
          <BentoItem
            variant="horizontal"
            title={featuredCookbooks[1].title}
            description={featuredCookbooks[1].description}
            difficulty={featuredCookbooks[1].difficulty}
            category={featuredCookbooks[1].category}
          />
          <BentoItem
            variant="small"
            title={featuredCookbooks[2].title}
            description={featuredCookbooks[2].description}
            difficulty={featuredCookbooks[2].difficulty}
            category={featuredCookbooks[2].category}
          />
          <BentoItem
            variant="small"
            title={featuredCookbooks[3].title}
            description={featuredCookbooks[3].description}
            difficulty={featuredCookbooks[3].difficulty}
            category={featuredCookbooks[3].category}
          />
        </div>
      </section>
    </div>
  );
}
