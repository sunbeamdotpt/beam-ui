/**
 * Docs home page — introduction and getting-started landing.
 *
 * Displays hero section, feature cards, and quick links into the design system docs.
 */
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { css } from "styled-system/css";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { Card } from "@sunbeam/beam-ui/components/ui/card";
import { CapabilityCard } from "@sunbeam/beam-ui/components/ui/capability-card";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";

export function DocsHomePage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc([]); }, [setToc]);
  return (
    <div>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/docs" },
          { label: "Getting Started", href: "/docs" },
          { label: "Introduction" },
        ]}
      />

      {/* Hero */}
      <section className={css({ marginBottom: "64px" })}>
        <h1 className={heroTitle}>
          Welcome to Sunbeam Studios
        </h1>
        <p className={heroSubtitle}>
          The warm heart of modern engineering. Build faster with our sun-drenched
          tools and intuitive documentation.
        </p>
      </section>

      {/* Product Cards */}
      <section className={css({ marginBottom: "64px" })}>
        <div className={css({ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" })}>
          <Card
            icon="dataset"
            title="Core Engine"
            description="The architectural backbone for your Portuguese-inspired digital experiences. Scalable, warm, and blazing fast."
            ctaLabel="Explore Engine"
            ctaHref="/docs/chat-completions/usage"
          />
          <Card
            icon="auto_awesome"
            title="Lumina SDK"
            description="A developer experience that feels like late-afternoon light. Minimalist structure, maximalist warmth in code."
            ctaLabel="Read Docs"
            ctaHref="/docs/chat-completions/usage"
          />
          <Card
            icon="terminal"
            title="Sol CLI"
            description="Manage your entire studio workflow from the command line with expressive, declarative commands."
            ctaLabel="View Reference"
            ctaHref="/docs/chat-completions/usage"
          />
        </div>
      </section>

      {/* Start Building */}
      <section
        className={css({
          marginBottom: "64px",
          borderTop: "1px solid",
          borderColor: "border.warm",
          paddingTop: "64px",
        })}
      >
        <div className={css({ marginBottom: "40px" })}>
          <span className={sectionLabel}>Start Building</span>
          <h2 className={sectionHeading}>Endless Capabilities</h2>
        </div>
        <Badge variant="section">START BUILDING</Badge>
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            lg: { gridTemplateColumns: "repeat(3, 1fr)" },
          })}
        >
          <CapabilityCard
            icon="chat_bubble"
            title="Text Generation"
            description="Produce high-quality Portuguese and international text with contextual warmth."
          />
          <CapabilityCard
            icon="visibility"
            title="Vision"
            description="Image understanding calibrated for vibrant, high-contrast environments."
          />
          <CapabilityCard
            icon="audio_file"
            title="Audio"
            description="Crystal clear speech synthesis with natural, warm vocal characteristics."
          />
          <CapabilityCard
            icon="hub"
            title="Embeddings"
            description="Vector representations that capture the nuance of your data ecosystem."
          />
          <CapabilityCard
            icon="integration_instructions"
            title="Function Calling"
            description="Seamlessly bridge the gap between models and your proprietary APIs."
          />
          <CapabilityCard
            icon="groups"
            title="Agents"
            description="Autonomous entities that collaborate across your studio workspace."
          />
        </div>
      </section>

      {/* Useful Links */}
      <section className={css({ marginBottom: "64px" })}>
        <Badge variant="section">USEFUL LINKS</Badge>
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          })}
        >
          <LinkTile icon="help_center" label="Help Center" href="/docs" />
          <LinkTile icon="menu_book" label="Guides" href="/guides" />
          <LinkTile icon="bolt" label="Studio" href="/docs" />
          <LinkTile icon="forum" label="Discord" href="/docs" />
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Link tile sub-component                                             */
/* ------------------------------------------------------------------ */
function LinkTile({ icon, label, href }: { icon: string; label: string; href: string }) {
  return (
    <Link
      to={href}
      className={css({
        backgroundColor: "bg.card",
        height: "128px",
        borderRadius: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        transition: "all 0.2s ease",
        textDecoration: "none",
        color: "text.primary",
        _hover: { backgroundColor: "beam.gold" },
      })}
    >
      <Icon
        name={icon}
        size={24}
        className={css({
          transition: "transform 0.2s ease",
        })}
      />
      <span
        className={css({
          fontWeight: "button",
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          fontSize: "12px",
        })}
      >
        {label}
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const heroTitle = css({
  fontSize: "48px",
  lineHeight: 1.1,
  fontWeight: "display",
  color: "text.primary",
  marginBottom: "24px",
  letterSpacing: "-0.02em",
});

const heroSubtitle = css({
  fontSize: "20px",
  color: "text.secondary",
  fontWeight: "body",
});

const sectionLabel = css({
  color: "sunbeam.orange",
  fontSize: "14px",
  fontWeight: "button",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  display: "block",
});

const sectionHeading = css({
  fontSize: "36px",
  fontWeight: "heading",
  color: "text.primary",
  textTransform: "uppercase",
  letterSpacing: "-0.025em",
  marginTop: "8px",
});
