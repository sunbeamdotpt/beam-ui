import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { Callout } from "@sunbeam/beam-ui/components/ui/callout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";

const TOC_ITEMS = [
  { label: "Install", id: "install" },
  { label: "Panda CSS Setup", id: "panda" },
  { label: "Usage", id: "usage" },
  { label: "Fonts", id: "fonts" },
];

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
  maxWidth: "640px",
});

const inlineCode = css({
  fontFamily: "mono",
  fontSize: "13px",
  backgroundColor: "bg.card",
  padding: "2px 6px",
  border: "1px solid",
  borderColor: "border.default",
});

export function InstallationPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div className={css({ maxWidth: "720px" })}>
      <Breadcrumbs items={[
        { label: "Foundations", href: "/foundations/accessibility" },
        { label: "Installation" },
      ]} />

      <h1 className={pageTitle}>Installation</h1>
      <p className={pageDesc}>
        Get the Beam Design Language into your project in a few steps.
      </p>

      {/* ===== Install ===== */}
      <h2 id="install" className={sectionTitle}>Install</h2>
      <p className={paragraph}>
        Beam UI is published to JSR (the JavaScript Registry). No scoped
        registry configuration is needed. Add it with Deno, or with the JSR
        CLI in npm-based projects:
      </p>
      <CodeBlock
        tabs={[
          {
            label: "Deno",
            content: <pre><code>deno add jsr:@sunbeam/beam-ui</code></pre>,
          },
          {
            label: "npm / pnpm / yarn",
            content: <pre><code>npx jsr add @sunbeam/beam-ui</code></pre>,
          },
        ]}
      />

      {/* ===== Panda CSS ===== */}
      <h2 id="panda" className={sectionTitle}>Panda CSS Setup</h2>
      <p className={paragraph}>
        Beam ships a Panda CSS preset with all design tokens, semantic tokens, and
        text styles. Extend it in your <code className={inlineCode}>panda.config.ts</code>:
      </p>
      <CodeBlock
        tabs={[{
          label: "panda.config.ts",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}<span className={syn.fn}>defineConfig</span>{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@pandacss/dev"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}<span className={syn.fn}>beamPreset</span>{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui/preset"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>export default</span> <span className={syn.fn}>defineConfig</span>({"{"}{"\n"}
              {"  "}presets: [<span className={syn.fn}>beamPreset</span>],{"\n"}
              {"  "}include: [<span className={syn.string}>"./src/**/*.tsx"</span>],{"\n"}
              {"  "}jsxFramework: <span className={syn.string}>"react"</span>,{"\n"}
              {"}"})
            </code></pre>
          ),
        }]}
      />

      <Callout variant="tip">
        Run <code className={inlineCode}>npx panda codegen</code> after setup to
        generate the styled-system directory with all Beam tokens.
      </Callout>

      {/* ===== Usage ===== */}
      <h2 id="usage" className={sectionTitle}>Usage</h2>
      <p className={paragraph}>
        Import components directly from the package:
      </p>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}<span className={syn.fn}>Shell</span>{", "}<span className={syn.fn}>Button</span>{", "}<span className={syn.fn}>Badge</span>{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Shell includes Header + Footer out of the box"}</span>{"\n"}
              <span className={syn.keyword}>function</span> <span className={syn.fn}>App</span>() {"{"}{"\n"}
              {"  "}<span className={syn.keyword}>return</span> ({"\n"}
              {"    "}{"<"}<span className={syn.fn}>Shell</span>{">"}{"\n"}
              {"      "}{"<"}<span className={syn.fn}>Button</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"primary"</span>{">"}Get Started{"</"}<span className={syn.fn}>Button</span>{">"}{"\n"}
              {"      "}{"<"}<span className={syn.fn}>Badge</span> <span className={syn.prop}>variant</span>=<span className={syn.string}>"approved"</span>{">"}Live{"</"}<span className={syn.fn}>Badge</span>{">"}{"\n"}
              {"    "}{"</"}<span className={syn.fn}>Shell</span>{">"}{"\n"}
              {"  );"}{"\n"}
              {"}"}
            </code></pre>
          ),
        }]}
      />

      {/* ===== Fonts ===== */}
      <h2 id="fonts" className={sectionTitle}>Fonts</h2>
      <p className={paragraph}>
        Beam ships its typefaces self-hosted inside the package -- no CDN needed.
        Import the stylesheet once at application startup and your bundler
        (Vite, Rollup, webpack) emits the woff2 files automatically:
      </p>
      <ul className={css({ color: "text.secondary", fontSize: "15px", lineHeight: 1.7, paddingLeft: "24px", marginBottom: "16px", maxWidth: "640px" })}>
        <li><strong className={css({ color: "text.primary" })}>Ysabeau Infant</strong> (variable, weights 431/575/647/791) -- headings and body</li>
        <li><strong className={css({ color: "text.primary" })}>Monaspace Argon</strong> -- monospace, code blocks, and UI labels</li>
        <li><strong className={css({ color: "text.primary" })}>Material Symbols Outlined</strong> -- icon font</li>
      </ul>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.comment}>{"// In your app entry (e.g. main.tsx), before other styles"}</span>{"\n"}
              <span className={syn.keyword}>import</span> <span className={syn.string}>"@sunbeam/beam-ui/styles/fonts.css"</span>{";"}
            </code></pre>
          ),
        }]}
      />

      <div className={css({ height: "48px" })} />
    </div>
  );
}
