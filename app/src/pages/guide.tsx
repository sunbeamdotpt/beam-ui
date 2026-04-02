import { Link } from "react-router-dom";
import { useEffect } from "react";
import { css } from "styled-system/css";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { Callout } from "@sunbeam/beam-ui/components/ui/callout";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";

const exampleNote = css({
  padding: "16px 20px",
  bg: "rgba(250, 82, 15, 0.06)",
  borderLeft: "3px solid",
  borderColor: "sunbeam.orange",
  marginBottom: "24px",
  fontSize: "13px",
  color: "text.secondary",
  lineHeight: 1.6,
  fontStyle: "italic",
});

const TOC_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "Solar Noise Method", id: "method" },
  { label: "Python Implementation", id: "implementation" },
  { label: "Erosion Pass", id: "erosion" },
  { label: "Performance Tips", id: "results" },
  { label: "Next Steps", id: "next-steps" },
];

export function GuidePage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <div className={exampleNote}>
        This is an example guide page demonstrating the Beam Design Language
        components in a long-form tutorial context.
      </div>

      {/* Breadcrumbs + meta bar */}
      <div className={metaBar}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/docs" },
            { label: "Guides", href: "/guides" },
            { label: "Procedural Terrain" },
          ]}
        />
        <div className={metaActions}>
          <Badge variant="premier">5 MIN READ</Badge>
          <a href="https://src.sunbeam.pt/studio/beam-ui" target="_blank" rel="noopener noreferrer" className={ghostLink}>
            VIEW SOURCE <Icon name="open_in_new" size={12} />
          </a>
          <Link to="/guides/procedural-terrain" className={ghostLink}>
            RUN EXAMPLE <Icon name="play_arrow" size={12} />
          </Link>
        </div>
      </div>

      {/* Dark hero banner */}
      <div className={heroBanner}>
        <div className={tagRow}>
          <span className={tagPill}>PROCEDURAL</span>
          <span className={tagPill}>TERRAIN</span>
          <span className={tagPill}>+2</span>
        </div>
        <h1 className={heroTitle}>
          Procedural Terrain Generation with Solar Noise
        </h1>
        <div className={authorLine}>
          <div className={avatarCircle}>
            <Icon name="person" size={18} className={css({ color: "white" })} />
          </div>
          <span className={css({ color: "white", fontWeight: "body", fontSize: "14px" })}>
            By Ana Costa
          </span>
          <span className={css({ color: "rgba(255,255,255,0.5)", fontSize: "14px" })}>
            {" "}· March 15, 2026 · Updated 2 days ago
          </span>
        </div>
      </div>

      {/* Overview */}
      <section className={css({ marginBottom: "48px" })}>
        <h2 id="overview" className={sectionTitle}>Use Solar Noise for Terrain</h2>
        <p className={bodyText}>
          Procedural terrain generation is a cornerstone of modern game development,
          enabling studios to create vast, explorable worlds without manually sculpting
          every vertex. The Sunbeam SDK provides a powerful set of primitives for this
          workflow, centered around the{" "}
          <code className={inlineCode}>Solar_Generator</code> module and its
          configurable noise functions.
        </p>
        <p className={bodyText}>
          By combining a base{" "}
          <code className={inlineCode}>noise_seed</code> with layered{" "}
          <code className={inlineCode}>octaves</code> and a tunable{" "}
          <code className={inlineCode}>persistence</code> value, you can produce
          terrain heightmaps that range from gentle rolling hills to jagged alpine
          ridgelines — all deterministically reproducible from a single seed value.
        </p>
      </section>

      {/* Divider */}
      <div className={divider} />

      {/* Method */}
      <section className={css({ marginBottom: "48px" })}>
        <h2 id="method" className={sectionTitle}>Method</h2>
        <p className={bodyText}>
          This guide uses a hybrid fractal Brownian motion (fBm) approach seeded by the
          Sunbeam Solar Noise algorithm. Unlike standard Perlin or Simplex noise, Solar
          Noise introduces subtle long-range correlations that produce more natural-looking
          continental shelves and mountain ranges. The method composes multiple noise
          octaves at decreasing amplitudes, weighted by a persistence curve that you
          control.
        </p>
      </section>

      {/* Implementation */}
      <section className={css({ marginBottom: "48px" })}>
        <h2 id="implementation" className={sectionTitle}>Implementation</h2>
        <p className={bodyText}>
          Initialize the terrain generator with a solar noise profile, then call{" "}
          <code className={inlineCode}>generate()</code> to produce a heightmap. The
          SDK handles octave layering, persistence scaling, and chunk boundaries
          automatically.
        </p>

        <CodeBlock
          tabs={[
            {
              label: "Python",
              content: (
                <pre><code>
                  <span className={syn.keyword}>import</span> sunbeam <span className={syn.keyword}>as</span> sb{"\n"}
                  {"\n"}
                  <span className={syn.comment}># Initialize terrain generator with solar noise</span>{"\n"}
                  terrain = sb.<span className={syn.fn}>TerrainGenerator</span>({"\n"}
                  {"    "}profile=<span className={syn.string}>"solar_noise_v2"</span>,{"\n"}
                  {"    "}seed=<span className={syn.number}>42</span>,{"\n"}
                  {"    "}octaves=<span className={syn.number}>6</span>,{"\n"}
                  {"    "}persistence=<span className={syn.number}>0.55</span>{"\n"}
                  ){"\n"}
                  {"\n"}
                  <span className={syn.comment}># Generate a 1024x1024 heightmap</span>{"\n"}
                  heightmap = terrain.<span className={syn.fn}>generate</span>({"\n"}
                  {"    "}width=<span className={syn.number}>1024</span>,{"\n"}
                  {"    "}height=<span className={syn.number}>1024</span>,{"\n"}
                  {"    "}scale=<span className={syn.number}>0.005</span>{"\n"}
                  ){"\n"}
                  {"\n"}
                  <span className={syn.comment}># Apply erosion pass</span>{"\n"}
                  eroded = terrain.<span className={syn.fn}>erode</span>({"\n"}
                  {"    "}heightmap,{"\n"}
                  {"    "}iterations=<span className={syn.number}>50</span>,{"\n"}
                  {"    "}flow_rate=<span className={syn.number}>0.02</span>{"\n"}
                  ){"\n"}
                  {"\n"}
                  <span className={syn.builtin}>print</span>(<span className={syn.string}>f"Generated terrain: </span>{"{"}eroded.shape{"}"}<span className={syn.string}>"</span>)
                </code></pre>
              ),
            },
            {
              label: "TypeScript",
              content: (
                <pre><code>
                  <span className={syn.keyword}>import</span> {"{"} TerrainGenerator {"}"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                  {"\n"}
                  <span className={syn.comment}>{"// Initialize terrain generator with solar noise"}</span>{"\n"}
                  <span className={syn.keyword}>const</span> terrain = <span className={syn.keyword}>new</span> <span className={syn.fn}>TerrainGenerator</span>({"{"}{"\n"}
                  {"    "}profile: <span className={syn.string}>"solar_noise_v2"</span>,{"\n"}
                  {"    "}seed: <span className={syn.number}>42</span>,{"\n"}
                  {"    "}octaves: <span className={syn.number}>6</span>,{"\n"}
                  {"    "}persistence: <span className={syn.number}>0.55</span>,{"\n"}
                  {"}"});{"\n"}
                  {"\n"}
                  <span className={syn.comment}>{"// Generate a 1024x1024 heightmap"}</span>{"\n"}
                  <span className={syn.keyword}>const</span> heightmap = <span className={syn.keyword}>await</span> terrain.<span className={syn.fn}>generate</span>({"{"}{"\n"}
                  {"    "}width: <span className={syn.number}>1024</span>,{"\n"}
                  {"    "}height: <span className={syn.number}>1024</span>,{"\n"}
                  {"    "}scale: <span className={syn.number}>0.005</span>,{"\n"}
                  {"}"});{"\n"}
                  {"\n"}
                  <span className={syn.comment}>{"// Apply erosion pass"}</span>{"\n"}
                  <span className={syn.keyword}>const</span> eroded = <span className={syn.keyword}>await</span> terrain.<span className={syn.fn}>erode</span>(heightmap, {"{"}{"\n"}
                  {"    "}iterations: <span className={syn.number}>50</span>,{"\n"}
                  {"    "}flowRate: <span className={syn.number}>0.02</span>,{"\n"}
                  {"}"});{"\n"}
                  {"\n"}
                  console.<span className={syn.fn}>log</span>(<span className={syn.string}>`Generated terrain: ${"{"}</span>eroded.width<span className={syn.string}>{"}"} x ${"{"}</span>eroded.height<span className={syn.string}>{"}"}`</span>);
                </code></pre>
              ),
            },
            {
              label: "cURL",
              content: (
                <pre><code>
                  curl https://api.sunbeam.studio/v1/terrain/generate \{"\n"}
                  {"  "}-H <span className={syn.string}>"Authorization: Bearer SB_STUDIO_ALPHA_X72"</span> \{"\n"}
                  {"  "}-H <span className={syn.string}>"Content-Type: application/json"</span> \{"\n"}
                  {"  "}-d <span className={syn.string}>{"'"}{"\n"}
                  {"  "}{"{"}{"\n"}
                  {"    "}<span className={syn.prop}>"profile"</span>: <span className={syn.string}>"solar_noise_v2"</span>,{"\n"}
                  {"    "}<span className={syn.prop}>"seed"</span>: <span className={syn.number}>42</span>,{"\n"}
                  {"    "}<span className={syn.prop}>"octaves"</span>: <span className={syn.number}>6</span>,{"\n"}
                  {"    "}<span className={syn.prop}>"persistence"</span>: <span className={syn.number}>0.55</span>,{"\n"}
                  {"    "}<span className={syn.prop}>"width"</span>: <span className={syn.number}>1024</span>,{"\n"}
                  {"    "}<span className={syn.prop}>"height"</span>: <span className={syn.number}>1024</span>,{"\n"}
                  {"    "}<span className={syn.prop}>"scale"</span>: <span className={syn.number}>0.005</span>{"\n"}
                  {"  "}{"}"}{"\n"}
                  {"  "}{"'"}</span>
                </code></pre>
              ),
            },
          ]}
        />
      </section>

      {/* Erosion Pass */}
      <section className={css({ marginBottom: "48px" })}>
        <h2 id="erosion" className={sectionTitle}>Erosion Pass</h2>
        <p className={bodyText}>
          Raw noise output rarely looks convincing on its own. A thermal erosion pass
          simulates sediment transport and deposition, carving realistic river valleys
          and smoothing harsh ridgelines. Control the strength of this effect with the{" "}
          <code className={inlineCode}>flow_rate</code> parameter — lower values
          produce subtle weathering, while higher values create deep canyon networks.
        </p>
      </section>

      {/* Results / Performance Tips */}
      <section className={css({ marginBottom: "48px" })}>
        <h2 id="results" className={sectionTitle}>Results</h2>
        <Callout variant="tip">
          For large open-world maps, wrap your generation calls in{" "}
          <code className={inlineCode}>sb.ChunkLoader</code> to stream terrain tiles
          on demand. This keeps memory usage under control and enables infinite-scroll
          terrain with sub-frame load times on modern GPUs.
        </Callout>
      </section>

      {/* Next Steps */}
      <section id="next-steps" className={css({ marginBottom: "64px" })}>
        <Badge variant="section">NEXT STEPS</Badge>
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          })}
        >
          <NextStepCard
            title="Lighting Models for Terrain"
            description="Apply physically-based lighting to your generated heightmaps."
            href="/guides/lighting-models"
          />
          <NextStepCard
            title="Shader Graph Pipelines"
            description="Build custom material shaders for terrain biomes."
            href="/guides/shader-graph"
          />
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Next Step Card                                                      */
/* ------------------------------------------------------------------ */
function NextStepCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      className={css({
        display: "block",
        padding: "24px",
        backgroundColor: "bg.card",
        borderRadius: "0",
        textDecoration: "none",
        transition: "all 0.2s ease",
        shadow: "golden",
        _hover: { translateY: "-1px" },
      })}
    >
      <h4
        className={css({
          fontWeight: "button",
          fontSize: "16px",
          color: "text.primary",
          marginBottom: "8px",
        })}
      >
        {title}
      </h4>
      <p
        className={css({
          fontSize: "14px",
          color: "text.secondary",
          lineHeight: 1.5,
          marginBottom: "12px",
        })}
      >
        {description}
      </p>
      <span
        className={css({
          color: "sunbeam.orange",
          fontWeight: "button",
          fontSize: "13px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        })}
      >
        Read more <Icon name="arrow_forward" size={14} />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const metaBar = css({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "8px",
});

const metaActions = css({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flexShrink: 0,
});

const ghostLink = css({
  color: "text.muted",
  fontWeight: "button",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  transition: "color 0.15s ease",
  _hover: { color: "accent" },
});

const heroBanner = css({
  backgroundColor: "sunbeam.black",
  color: "white",
  padding: "48px",
  marginBottom: "48px",
  marginTop: "8px",
});

const tagRow = css({
  display: "flex",
  gap: "8px",
  marginBottom: "24px",
});

const tagPill = css({
  border: "1px solid rgba(255,255,255,0.3)",
  color: "white",
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  padding: "4px 10px",
  borderRadius: "full",
  lineHeight: 1,
});

const heroTitle = css({
  fontSize: "32px",
  fontWeight: "heading",
  color: "white",
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
  marginBottom: "24px",
});

const authorLine = css({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const avatarCircle = css({
  width: "32px",
  height: "32px",
  borderRadius: "full",
  backgroundColor: "sunbeam.orange",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

const sectionTitle = css({
  fontSize: "28px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "16px",
});

const bodyText = css({
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
});

const inlineCode = css({
  backgroundColor: "bg.card",
  padding: "2px 8px",
  borderRadius: "md",
  fontFamily: "mono",
  fontSize: "14px",
  color: "text.primary",
  fontWeight: "heading",
  border: "1px solid",
  borderColor: "border.default",
});

const divider = css({
  height: "1px",
  backgroundColor: "border.default",
  marginBottom: "48px",
});
