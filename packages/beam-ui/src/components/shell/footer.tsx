import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { css } from "styled-system/css";
import { footerSections } from "../../data/navigation";

declare const __BUILD_LABEL__: string | undefined;

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

const buildLabel = css({
  fontFamily: "mono",
  fontSize: "10px",
  opacity: 0.6,
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

/**
 * Application footer with multi-column navigation and branding.
 * Consumes {@link footerSections} from navigation data. Shows optional build label if defined.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export function Footer(): ReactNode {
  return (
    <footer className={footer}>
      <div className={grid}>
        <div className={brandCol}>
          <span className={brandName}>Sunbeam Studios</span>
          <p className={brandDesc}>
            Olá de Portugal. Built for creators.
          </p>
          <p className={copyright}>
            &copy; 2026 Sunbeam Studios
            {typeof __BUILD_LABEL__ !== "undefined" && (
              <span className={buildLabel}> · {__BUILD_LABEL__}</span>
            )}
          </p>
        </div>
        {footerSections.map((section) => (
          <nav key={section.title} className={sectionCol} aria-label={section.title}>
            <span className={sectionTitle}>{section.title}</span>
            {section.links.map((link) => {
              const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto:");
              if (isExternal) {
                // Inject build version into mailto subject if present
                const href = link.href.startsWith("mailto:") && typeof __BUILD_LABEL__ !== "undefined"
                  ? link.href.replace("Question!", `${__BUILD_LABEL__} Question!`)
                  : link.href;
                return (
                  <a key={link.label} href={href} className={sectionLink} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                    {link.label}
                  </a>
                );
              }
              return (
                <Link key={link.label} to={link.href} className={sectionLink}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        ))}
      </div>
    </footer>
  );
}
