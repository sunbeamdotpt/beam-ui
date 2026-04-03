import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";

/* ------------------------------------------------------------------ */
/*  TOC                                                                */
/* ------------------------------------------------------------------ */

const TOC_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "Discovery", id: "discovery" },
  { label: "Endpoints", id: "endpoints" },
  { label: "User-Agent Detection", id: "user-agent-detection" },
  { label: "Integration Guide", id: "integration-guide" },
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

const paragraph = css({
  color: "text.secondary",
  fontSize: "15px",
  lineHeight: 1.7,
  marginBottom: "16px",
  maxWidth: "680px",
});

const codeInline = css({
  fontFamily: "mono",
  fontSize: "13px",
  backgroundColor: "bg.card",
  padding: "2px 6px",
  border: "1px solid",
  borderColor: "border.subtle",
});

const codeBlock = css({
  fontFamily: "mono",
  fontSize: "13px",
  lineHeight: 1.6,
  backgroundColor: "bg.card",
  padding: "16px 20px",
  border: "1px solid",
  borderColor: "border.default",
  marginBottom: "24px",
  overflowX: "auto",
  whiteSpace: "pre",
  color: "text.primary",
});

/* Table styles */
const tableWrapper = css({
  border: "1px solid",
  borderColor: "border.default",
  marginBottom: "32px",
  overflowX: "auto",
});

const tableStyle = css({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
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
  borderBottom: "1px solid",
  borderBottomColor: "border.subtle",
  color: "text.primary",
  verticalAlign: "top",
});

const tdMono = css({
  padding: "12px 16px",
  borderBottom: "1px solid",
  borderBottomColor: "border.subtle",
  color: "text.primary",
  verticalAlign: "top",
  fontFamily: "mono",
  fontSize: "13px",
});

const listStyle = css({
  color: "text.secondary",
  fontSize: "15px",
  lineHeight: 1.7,
  marginBottom: "16px",
  paddingLeft: "24px",
  maxWidth: "680px",
  "& li": {
    marginBottom: "8px",
  },
});

const agentGrid = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
  gap: "8px",
  marginBottom: "24px",
});

const agentTag = css({
  fontFamily: "mono",
  fontSize: "13px",
  padding: "8px 12px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.subtle",
  color: "text.primary",
});

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export function LlmIntegrationPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Foundations" },
          { label: "LLM Integration" },
        ]}
      />

      <h1 className={pageTitle}>LLM Integration</h1>
      <p className={pageDesc}>
        Machine-readable documentation endpoints that make the Beam Design
        Language accessible to AI assistants, code generators, and LLM-powered
        tools.
      </p>

      {/* OVERVIEW */}
      <h2 id="overview" className={sectionTitle}>Overview</h2>
      <p className={paragraph}>
        The <span className={codeInline}>llms.txt</span> convention provides a
        standardized way for websites to serve clean, structured documentation
        to AI user-agents. Since design.sunbeam.pt is a React SPA, traditional
        web crawlers and LLMs receive an empty{" "}
        <span className={codeInline}>&lt;div id="root"&gt;</span> when they
        fetch pages. The llms.txt system solves this by serving pre-rendered
        markdown to known AI user-agents.
      </p>
      <p className={paragraph}>
        This ensures that tools like ChatGPT, Claude, Perplexity, and code
        assistants can understand Beam's component library, props, and usage
        patterns without needing to execute JavaScript.
      </p>

      {/* DISCOVERY */}
      <h2 id="discovery" className={sectionTitle}>Discovery</h2>
      <p className={paragraph}>
        LLMs and AI crawlers discover the documentation through multiple signals:
      </p>
      <ul className={listStyle}>
        <li>
          <strong>Well-known path:</strong> The{" "}
          <span className={codeInline}>/llms.txt</span> convention (similar to
          robots.txt) is checked by AI agents at the site root.
        </li>
        <li>
          <strong>HTML meta tag:</strong>{" "}
          <span className={codeInline}>&lt;meta name="ai-content" content="/llms.txt"&gt;</span>{" "}
          signals availability in the page head.
        </li>
        <li>
          <strong>Link alternate:</strong>{" "}
          <span className={codeInline}>&lt;link rel="alternate" type="text/markdown" href="/llms.txt"&gt;</span>{" "}
          provides a machine-discoverable alternate representation.
        </li>
        <li>
          <strong>robots.txt:</strong> Explicit{" "}
          <span className={codeInline}>Allow</span> directives for AI
          user-agents point to the documentation paths.
        </li>
      </ul>

      {/* ENDPOINTS */}
      <h2 id="endpoints" className={sectionTitle}>Endpoints</h2>
      <div className={tableWrapper}>
        <table className={tableStyle}>
          <thead>
            <tr>
              <th className={th}>Endpoint</th>
              <th className={th}>Content</th>
              <th className={th}>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdMono}>/llms.txt</td>
              <td className={td}>
                Concise overview with component list, install instructions, and
                stack summary
              </td>
              <td className={td}>~4 KB</td>
            </tr>
            <tr>
              <td className={tdMono}>/llms-full.txt</td>
              <td className={td}>
                Comprehensive API reference with all props, types, usage
                examples, and variants for every component
              </td>
              <td className={td}>~30 KB</td>
            </tr>
            <tr>
              <td className={tdMono}>/docs/&#123;component&#125;.md</td>
              <td className={td}>
                Individual component documentation with props table, usage
                example, and feature list
              </td>
              <td className={td}>~1 KB each</td>
            </tr>
            <tr>
              <td className={tdMono}>?render=html</td>
              <td className={td}>
                Append to any page URL to bypass markdown serving and get the
                fully rendered HTML page with live DOM structure, styles, and
                interactive components
              </td>
              <td className={td}>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className={paragraph}>
        Each markdown document includes a link to the rendered HTML version.
        LLMs can follow this link when they need to inspect the actual DOM
        structure, CSS classes, or interactive behavior of a component.
      </p>

      {/* USER-AGENT DETECTION */}
      <h2 id="user-agent-detection" className={sectionTitle}>User-Agent Detection</h2>
      <p className={paragraph}>
        The Caddy web server inspects the <span className={codeInline}>User-Agent</span>{" "}
        header and serves markdown instead of the SPA shell to known AI
        crawlers. When an AI user-agent hits a component page like{" "}
        <span className={codeInline}>/components/button</span>, it receives the
        corresponding <span className={codeInline}>/docs/button.md</span> file
        instead of the React app.
      </p>
      <p className={paragraph}>Matched user-agent strings:</p>
      <div className={agentGrid}>
        {[
          "GPTBot", "ChatGPT-User", "ChatGPT Agent", "OAI-SearchBot",
          "ClaudeBot", "Claude-User", "Claude-Web", "anthropic-ai",
          "PerplexityBot", "Perplexity-User", "Google-Extended", "Gemini",
          "PhindBot", "YouBot", "Devin", "FirecrawlAgent", "Crawl4AI",
        ].map((agent) => (
          <div key={agent} className={agentTag}>{agent}</div>
        ))}
      </div>

      {/* INTEGRATION GUIDE */}
      <h2 id="integration-guide" className={sectionTitle}>Integration Guide</h2>
      <p className={paragraph}>
        To add llms.txt support to your own project built with beam-ui:
      </p>
      <p className={paragraph}>
        <strong>1. Generate the documentation files</strong>
      </p>
      <div className={codeBlock}>
        npx tsx app/scripts/generate-llms-txt.ts
      </div>
      <p className={paragraph}>
        This produces <span className={codeInline}>llms.txt</span>,{" "}
        <span className={codeInline}>llms-full.txt</span>, and per-component
        markdown files in <span className={codeInline}>app/public/docs/</span>.
      </p>
      <p className={paragraph}>
        <strong>2. Add discovery signals to your HTML</strong>
      </p>
      <div className={codeBlock}>
{`<link rel="alternate" type="text/markdown" href="/llms.txt"
      title="LLM-readable documentation">
<meta name="ai-content" content="/llms.txt">`}
      </div>
      <p className={paragraph}>
        <strong>3. Configure your web server</strong>
      </p>
      <p className={paragraph}>
        Add user-agent detection to your Caddy, Nginx, or reverse proxy
        configuration to serve the markdown files to AI crawlers instead of
        the SPA shell. See the Beam Dockerfile for a complete Caddyfile example.
      </p>
      <p className={paragraph}>
        <strong>4. Add robots.txt directives</strong>
      </p>
      <div className={codeBlock}>
{`User-agent: GPTBot
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /docs/

User-agent: ClaudeBot
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /docs/`}
      </div>
    </div>
  );
}
