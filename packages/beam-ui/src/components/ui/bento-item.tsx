import { Link } from "react-router-dom";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

interface BentoItemProps {
  variant: "large" | "horizontal" | "small";
  title: string;
  description: string;
  difficulty: string;
  category: string;
  imageAlt?: string;
  href?: string;
}

/* ------------------------------------------------------------------ */
/* Shared styles                                                       */
/* ------------------------------------------------------------------ */

const categoryBadge = css({
  display: "inline-block",
  bg: "sunbeam.orange",
  color: "white",
  fontSize: "10px",
  fontWeight: "button",
  paddingInline: "8px",
  paddingBlock: "4px",
  letterSpacing: "0.05em",
});

const difficultyLabel = css({
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  color: "sunbeam.orange",
  bg: "bg.page",
  padding: "4px",
});

const arrowIcon = css({
  color: "sunbeam.orange",
  transition: "transform 0.2s ease",
});

/* ------------------------------------------------------------------ */
/* Large variant                                                       */
/* ------------------------------------------------------------------ */

const largeCard = css({
  gridColumn: { base: "span 1", md: "span 2" },
  gridRow: { base: "span 1", md: "span 2" },
  display: "flex",
  flexDirection: "column",
  bg: "bg.card",
  border: "1px solid",
  borderColor: "border.warm",
  textDecoration: "none",
  color: "text.primary",
  overflow: "hidden",
});

const largeImage = css({
  height: "288px",
  bg: "linear-gradient(135deg, token(colors.sunbeam.orange), token(colors.sunbeam.flame))",
  position: "relative",
  overflow: "hidden",
});

const largeImagePlaceholder = css({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "48px",
  opacity: 0.3,
});

const largeBody = css({
  padding: "32px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const largeTitle = css({
  fontSize: "24px",
  fontWeight: "button",
  marginBottom: "16px",
  color: "text.primary",
});

const largeDesc = css({
  fontSize: "14px",
  color: "text.secondary",
  marginBottom: "24px",
  flex: 1,
  lineHeight: 1.6,
});

const largeFooter = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const ctaLink = css({
  fontWeight: "button",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  transition: "transform 0.2s ease",
  _groupHover: {
    transform: "translateX(8px)",
  },
});

/* ------------------------------------------------------------------ */
/* Horizontal variant                                                  */
/* ------------------------------------------------------------------ */

const horizontalCard = css({
  gridColumn: { base: "span 1", md: "span 2" },
  display: "flex",
  flexDirection: { base: "column", md: "row" },
  bg: "bg.page",
  border: "1px solid",
  borderColor: "border.warm",
  textDecoration: "none",
  color: "text.primary",
  overflow: "hidden",
});

const horizontalImage = css({
  width: { base: "100%", md: "33.333%" },
  minHeight: { base: "160px", md: "100%" },
  bg: "linear-gradient(135deg, token(colors.sunbeam.black), token(colors.card.dark))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "sunbeam.orange",
  fontSize: "40px",
  opacity: 0.5,
  overflow: "hidden",
});

const horizontalBody = css({
  flex: 1,
  padding: "24px",
});

const horizontalCategory = css({
  fontSize: "10px",
  fontWeight: "button",
  color: "sunbeam.orange",
  letterSpacing: "-0.02em",
  marginBottom: "8px",
  display: "block",
});

const horizontalTitle = css({
  fontSize: "20px",
  fontWeight: "heading",
  marginBottom: "8px",
  color: "text.primary",
});

const horizontalDesc = css({
  fontSize: "14px",
  color: "text.secondary",
  marginBottom: "16px",
  lineHeight: 1.6,
});

const horizontalCta = css({
  fontSize: "14px",
  fontWeight: "button",
  borderBottom: "2px solid",
  borderColor: "sunbeam.orange",
  display: "inline",
});

/* ------------------------------------------------------------------ */
/* Small variant                                                       */
/* ------------------------------------------------------------------ */

const smallCard = css({
  bg: "bg.card",
  padding: "24px",
  border: "1px solid",
  borderColor: "border.warm",
  textDecoration: "none",
  color: "text.primary",
  display: "flex",
  flexDirection: "column",
});

const smallTitle = css({
  fontSize: "18px",
  fontWeight: "heading",
  marginBottom: "12px",
  color: "text.primary",
});

const smallDesc = css({
  fontSize: "12px",
  color: "text.secondary",
  marginBottom: "16px",
  flex: 1,
  lineHeight: 1.6,
});

const smallFooter = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "auto",
});

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function BentoItem({
  variant,
  title,
  description,
  difficulty,
  category,
  href = "/guides",
}: BentoItemProps) {
  if (variant === "large") {
    return (
      <Link to={href} className={cx(largeCard, css({ _hover: { "& .arrow": { transform: "translateX(8px)" } } }))}>
        <div className={largeImage}>
          <div className={largeImagePlaceholder}>
            <Icon name="auto_awesome" size={48} />
          </div>
          <div style={{ position: "absolute", top: 16, left: 16 }}>
            <span className={categoryBadge}>{category}</span>
          </div>
        </div>
        <div className={largeBody}>
          <h3 className={largeTitle}>{title}</h3>
          <p className={largeDesc}>{description}</p>
          <div className={largeFooter}>
            <span className={difficultyLabel}>{difficulty.toUpperCase()}</span>
            <span className={ctaLink}>
              READ RECIPE <Icon name="arrow_forward" size={16} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link to={href} className={horizontalCard}>
        <div className={horizontalImage}>
          <Icon name="developer_board" size={40} />
        </div>
        <div className={horizontalBody}>
          <span className={horizontalCategory}>{category}</span>
          <h3 className={horizontalTitle}>{title}</h3>
          <p className={horizontalDesc}>{description}</p>
          <span className={horizontalCta}>Explore Cookbook</span>
        </div>
      </Link>
    );
  }

  // small
  return (
    <Link to={href} className={smallCard}>
      <h3 className={smallTitle}>{title}</h3>
      <p className={smallDesc}>{description}</p>
      <div className={smallFooter}>
        <span className={difficultyLabel}>{difficulty}</span>
        <Icon name="east" size={20} className={arrowIcon} />
      </div>
    </Link>
  );
}
