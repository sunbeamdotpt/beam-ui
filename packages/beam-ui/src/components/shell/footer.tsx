import { Link } from "react-router-dom";
import { css } from "styled-system/css";
import { footerSections } from "../../data/navigation";

const footer = css({
  bg: "sunbeam.black",
  borderTop: "4px solid",
  borderColor: "sunbeam.orange",
});

const grid = css({
  display: "grid",
  gridTemplateColumns: { base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(6, 1fr)" },
  gap: "32px",
  maxWidth: "1440px",
  marginInline: "auto",
  paddingInline: { base: "24px", md: "48px", lg: "48px" },
  paddingBlock: "64px",
});

const brandCol = css({
  gridColumn: { base: "span 2", md: "span 3", lg: "span 2" },
});

const brandName = css({
  display: "block",
  fontSize: "20px",
  fontFamily: "heading",
  fontWeight: "heading",
  color: "warm.ivory",
  marginBottom: "16px",
});

const brandDesc = css({
  fontSize: "14px",
  lineHeight: "1.6",
  color: "rgba(255, 250, 235, 0.5)",
  maxWidth: "320px",
});

const copyright = css({
  fontSize: "12px",
  color: "rgba(255, 250, 235, 0.3)",
  marginTop: "16px",
});

const sectionCol = css({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

const sectionTitle = css({
  fontSize: "12px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "sunbeam.orange",
  marginBottom: "4px",
});

const sectionLink = css({
  fontSize: "14px",
  color: "rgba(255, 250, 235, 0.5)",
  textDecoration: "none",
  transition: "color 0.2s",
  _hover: {
    color: "sunshine.700",
  },
});

export function Footer() {
  return (
    <footer className={footer}>
      <div className={grid}>
        <div className={brandCol}>
          <span className={brandName}>Sunbeam Studios</span>
          <p className={brandDesc}>
            Portuguese warmth in every pixel. Built for the global developer
            community.
          </p>
          <p className={copyright}>&copy; 2026 Sunbeam Studios</p>
        </div>
        {footerSections.map((section) => (
          <div key={section.title} className={sectionCol}>
            <span className={sectionTitle}>{section.title}</span>
            {section.links.map((link) => (
              <Link key={link.label} to={link.href} className={sectionLink}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
