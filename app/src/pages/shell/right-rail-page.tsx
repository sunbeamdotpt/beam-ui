import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { PropsTable } from "../components/_template";

const TOC_ITEMS = [
  { label: "Preview", id: "preview" },
  { label: "Props", id: "props" },
  { label: "TOC Item", id: "toc-item" },
  { label: "Features", id: "features" },
  { label: "Scroll Tracking", id: "scroll-tracking" },
  { label: "Last Updated", id: "last-updated" },
  { label: "Usage", id: "usage" },
];

const PROPS = [
  { name: "items", type: "Array<{ label: string; id: string }>", required: true, description: "Array of table-of-contents items. Each entry maps to a heading anchor on the page." },
  { name: "lastUpdated", type: "string", required: false, description: "Date string displayed at the bottom of the rail (e.g. \"Mar 28, 2026\"). Typically generated from git at build time." },
];

const TOC_ITEM_FIELDS = [
  { name: "label", type: "string", required: true, description: "Display text shown in the TOC link." },
  { name: "id", type: "string", required: true, description: "HTML id of the corresponding heading element. Used for scroll targeting and active-state tracking." },
];

export function RightRailPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shell" },
          { label: "RightRail" },
        ]}
      />

      <h1 className={pageTitle}>RightRail</h1>
      <p className={descText}>
        A sticky table-of-contents rail anchored to the right side of docs pages.
        Highlights the currently visible section as the user scrolls and provides
        utility actions like copy-as-markdown and permalink.
      </p>
      <div className={importBlock}>
        <code className={importCode}>import {"{ RightRail }"} from "@sunbeam/beam-ui"</code>
      </div>

      {/* Preview */}
      <h2 id="preview" className={sectionTitle}>Preview</h2>
      <p className={bodyText}>
        The live RightRail is visible to the right of this page. It shows the
        "On This Page" heading, TOC links for each section, utility action buttons
        (copy permalink, copy as markdown, edit, report), and the last-updated
        timestamp at the bottom.
      </p>

      {/* Props */}
      <h2 id="props" className={sectionTitle}>Props</h2>
      <PropsTable props={PROPS} />

      {/* TOC Item */}
      <h2 id="toc-item" className={sectionTitle}>TOC Item Interface</h2>
      <p className={bodyText}>
        Each entry in the <code className={mono}>items</code> array has the following shape:
      </p>
      <PropsTable props={TOC_ITEM_FIELDS} />

      {/* Features */}
      <h2 id="features" className={sectionTitle}>Features</h2>
      <ul className={featureList}>
        <li><strong>Sticky positioning</strong> — stays fixed below the header (top: 64px) while content scrolls</li>
        <li><strong>Intersection Observer scroll tracking</strong> — automatically highlights the TOC link for the section currently in the viewport</li>
        <li><strong>Active link highlighting</strong> — the active item gets an orange left border, accent color text, and <code className={mono}>aria-current="location"</code></li>
        <li><strong>Copy as markdown</strong> — converts the page content to clean markdown via Turndown, stripping icons, buttons, navs, and badge elements</li>
        <li><strong>Copy permalink</strong> — copies the current URL including the active section hash</li>
        <li><strong>Edit and report links</strong> — quick links to source control and issue reporting</li>
        <li><strong>Last updated date</strong> — optional timestamp displayed at the bottom of the rail</li>
        <li><strong>Hash-aware</strong> — on mount, scrolls to and activates the section matching the URL hash</li>
      </ul>

      {/* Scroll Tracking */}
      <h2 id="scroll-tracking" className={sectionTitle}>Scroll Tracking</h2>
      <p className={bodyText}>
        The RightRail uses an <code className={mono}>IntersectionObserver</code> to
        detect which heading is currently visible. The observer watches all elements
        whose <code className={mono}>id</code> matches the TOC items.
      </p>
      <p className={bodyText}>
        The root margin is set to <code className={mono}>"-64px 0px -70% 0px"</code>,
        which means only headings in the top 30% of the viewport (below the 64px
        header) trigger activation. When multiple headings are visible, the topmost
        one wins. Clicking a TOC link smooth-scrolls to the target and updates the
        URL hash via <code className={mono}>history.replaceState</code> (no page jump).
      </p>

      {/* Last Updated */}
      <h2 id="last-updated" className={sectionTitle}>Last Updated</h2>
      <p className={bodyText}>
        The <code className={mono}>lastUpdated</code> prop accepts a date string
        that is rendered at the bottom of the rail with a clock icon. This value is
        typically generated from git at build time (e.g. via the last commit date
        touching the page file). When the prop is omitted, the timestamp section is
        not rendered.
      </p>

      {/* Usage */}
      <h2 id="usage" className={sectionTitle}>Usage</h2>
      <p className={bodyText}>
        The RightRail is rendered by <code className={mono}>DocsLayout</code>, which
        passes <code className={mono}>items</code> and{" "}
        <code className={mono}>lastUpdated</code> from the docs context. Individual
        pages set their TOC via the <code className={mono}>useDocsContext</code> hook:
      </p>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.comment}>{"// In DocsLayout (simplified):"}</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}RightRail{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> {"{ "}toc, lastUpdated{" }"} = useDocsContext();{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>RightRail</span>{"\n"}
              {"  "}<span className={syn.prop}>items</span>={"{toc}"}{"\n"}
              {"  "}<span className={syn.prop}>lastUpdated</span>={"{lastUpdated}"}{"\n"}
              {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// In a docs page:"}</span>{"\n"}
              <span className={syn.keyword}>const</span> TOC = [{"\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"Overview"</span>, id: <span className={syn.string}>"overview"</span>{" },\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"Props"</span>, id: <span className={syn.string}>"props"</span>{" },\n"}
              {"  "}{"{ "}label: <span className={syn.string}>"Usage"</span>, id: <span className={syn.string}>"usage"</span>{" },\n"}
              ];{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> {"{ "}setToc{" }"} = useDocsContext();{"\n"}
              useEffect(() ={">"} {"{ "}setToc(TOC); <span className={syn.keyword}>return</span> () ={">"} setToc([]); {"}"}, [setToc]);
            </code></pre>
          ),
        }]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const pageTitle = css({
  fontFamily: "heading",
  fontSize: "48px",
  fontWeight: "display",
  lineHeight: 0.95,
  marginBottom: "16px",
  color: "text.primary",
});

const descText = css({
  fontSize: "16px",
  lineHeight: 1.6,
  color: "text.secondary",
  marginBottom: "16px",
});

const importBlock = css({
  display: "inline-block",
  padding: "8px 16px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  marginBottom: "48px",
});

const importCode = css({
  fontFamily: "mono",
  fontSize: "13px",
  color: "sunbeam.orange",
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

const bodyText = css({
  fontSize: "15px",
  lineHeight: 1.7,
  color: "text.secondary",
  marginBottom: "24px",
});

const mono = css({
  fontFamily: "mono",
  fontSize: "13px",
});

const featureList = css({
  fontSize: "15px",
  lineHeight: 1.8,
  color: "text.secondary",
  marginBottom: "24px",
  paddingLeft: "24px",
  "& li": { marginBottom: "8px" },
  "& strong": { color: "text.primary" },
});

