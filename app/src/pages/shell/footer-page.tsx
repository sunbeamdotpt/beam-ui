import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { PropsTable } from "../components/_template";

const TOC_ITEMS = [
  { label: "Preview", id: "preview" },
  { label: "Props", id: "props" },
  { label: "Data Structure", id: "data-structure" },
  { label: "Features", id: "features" },
  { label: "Build Info", id: "build-info" },
  { label: "Customization", id: "customization" },
  { label: "Usage", id: "usage" },
];

const FOOTER_SECTION_FIELDS = [
  { name: "title", type: "string", required: true, description: "Section heading text (rendered uppercase with orange accent color)." },
  { name: "links", type: "Array<{ label: string; href: string }>", required: true, description: "Array of link objects rendered as navigation items in the section column." },
];

const FOOTER_LINK_FIELDS = [
  { name: "label", type: "string", required: true, description: "Display text for the footer link." },
  { name: "href", type: "string", required: true, description: "Route path or external URL the link navigates to." },
];

export function FooterPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shell" },
          { label: "Footer" },
        ]}
      />

      <h1 className={pageTitle}>Footer</h1>
      <p className={descText}>
        The site-wide footer rendered at the bottom of every page. Features a
        brand lockup, multi-column link grid, build info display, and a warm
        orange gradient divider bar.
      </p>
      <div className={importBlock}>
        <code className={importCode}>import {"{ Footer }"} from "@sunbeam/beam-ui"</code>
      </div>

      {/* Preview */}
      <h2 id="preview" className={sectionTitle}>Preview</h2>
      <p className={bodyText}>
        The Footer is visible at the bottom of every page in the application,
        including this one. Scroll down to see it rendered by the Shell component.
      </p>

      {/* Props */}
      <h2 id="props" className={sectionTitle}>Props</h2>
      <p className={bodyText}>
        The Footer currently takes <strong>no props</strong>. All data is read from
        the <code className={mono}>footerSections</code> array exported by the
        shared navigation module. The build label is injected at compile time via
        a Vite define.
      </p>

      {/* Data Structure */}
      <h2 id="data-structure" className={sectionTitle}>Data Structure</h2>
      <p className={bodyText}>
        Footer content is driven by the <code className={mono}>footerSections</code> array
        in <code className={mono}>data/navigation.ts</code>. Each section becomes a
        column in the footer grid.
      </p>

      <h3 className={subHeading}>FooterSection</h3>
      <PropsTable props={FOOTER_SECTION_FIELDS} />

      <h3 className={subHeading}>FooterLink</h3>
      <PropsTable props={FOOTER_LINK_FIELDS} />

      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.comment}>{"// data/navigation.ts"}</span>{"\n"}
              <span className={syn.keyword}>export const</span> footerSections = [{"\n"}
              {"  "}{"{"}{"\n"}
              {"    "}title: <span className={syn.string}>"Product"</span>,{"\n"}
              {"    "}links: [{"\n"}
              {"      "}{"{ "}label: <span className={syn.string}>"Foundations"</span>, href: <span className={syn.string}>"/foundations/accessibility"</span>{" },\n"}
              {"      "}{"{ "}label: <span className={syn.string}>"Shell"</span>, href: <span className={syn.string}>"/shell/shell"</span>{" },\n"}
              {"      "}{"{ "}label: <span className={syn.string}>"Layouts"</span>, href: <span className={syn.string}>"/layouts/docs"</span>{" },\n"}
              {"      "}{"{ "}label: <span className={syn.string}>"Components"</span>, href: <span className={syn.string}>"/components/accordion"</span>{" },\n"}
              {"    "}],{"\n"}
              {"  "}{"}"},{"\n"}
              {"  "}{"{"}{"\n"}
              {"    "}title: <span className={syn.string}>"Resources"</span>,{"\n"}
              {"    "}links: [{"\n"}
              {"      "}{"{ "}label: <span className={syn.string}>"Source Control"</span>, href: <span className={syn.string}>"https://src.sunbeam.pt/studio/beam-ui"</span>{" },\n"}
              {"      "}{"{ "}label: <span className={syn.string}>"Contact Us"</span>, href: <span className={syn.string}>"mailto:hello@sunbeam.pt"</span>{" },\n"}
              {"    "}],{"\n"}
              {"  "}{"}"},{"\n"}
              ];
            </code></pre>
          ),
        }]}
      />

      {/* Features */}
      <h2 id="features" className={sectionTitle}>Features</h2>
      <ul className={featureList}>
        <li><strong>Gradient divider bar</strong> — 4px solid orange top border separating the footer from page content</li>
        <li><strong>Brand section</strong> — "Sunbeam Studios" heading with tagline, spanning two columns on large screens</li>
        <li><strong>Multi-column link grid</strong> — responsive grid layout: 2 columns on mobile, 3 on tablet, 6 on desktop (brand takes 2)</li>
        <li><strong>Build info display</strong> — shows commit hash and dirty flag from <code className={mono}>__BUILD_LABEL__</code></li>
        <li><strong>Copyright</strong> — year and company name rendered below the tagline</li>
        <li><strong>Responsive layout</strong> — padding and grid columns adapt across breakpoints via Panda CSS responsive syntax</li>
        <li><strong>Hover transitions</strong> — links transition to <code className={mono}>sunshine.700</code> on hover</li>
      </ul>

      {/* Build Info */}
      <h2 id="build-info" className={sectionTitle}>Build Info</h2>
      <p className={bodyText}>
        The footer displays a build label next to the copyright notice. This value
        comes from the <code className={mono}>__BUILD_LABEL__</code> global, which is
        injected by Vite's <code className={mono}>define</code> config at build time.
        It typically contains the short git commit hash and a "dirty" flag if there
        are uncommitted changes (e.g. <code className={mono}>a3f8c12</code> or{" "}
        <code className={mono}>a3f8c12-dirty</code>).
      </p>
      <p className={bodyText}>
        The label is rendered in a monospace font at 10px with reduced opacity. When{" "}
        <code className={mono}>__BUILD_LABEL__</code> is undefined (e.g. in
        development without the define), the build info is hidden entirely via a
        runtime <code className={mono}>typeof</code> check.
      </p>

      {/* Customization */}
      <h2 id="customization" className={sectionTitle}>Customization</h2>
      <p className={bodyText}>
        To update footer links, edit the <code className={mono}>footerSections</code> array
        in <code className={mono}>packages/beam-ui/src/data/navigation.ts</code>. Each
        object in the array becomes a column. Add a new object with a{" "}
        <code className={mono}>title</code> and <code className={mono}>links</code> array
        to create a new column, or modify existing entries to change link text and
        destinations.
      </p>
      <p className={bodyText}>
        The brand section (company name, tagline, copyright) is hardcoded in the
        Footer component itself. To change those, edit{" "}
        <code className={mono}>components/shell/footer.tsx</code> directly.
      </p>

      {/* Usage */}
      <h2 id="usage" className={sectionTitle}>Usage</h2>
      <p className={bodyText}>
        The Footer is rendered automatically by the Shell component. You do not need
        to import or place it manually — it appears at the bottom of every page
        wrapped by the Shell.
      </p>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.comment}>{"// In the Shell component (simplified):"}</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}Footer{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>function</span> <span className={syn.fn}>Shell</span>() {"{"}{"\n"}
              {"  "}<span className={syn.keyword}>return</span> ({"\n"}
              {"    "}{"<"}<span className={syn.fn}>div</span>{">"}{"\n"}
              {"      "}{"<"}<span className={syn.fn}>Header</span> {"/>"}{"\n"}
              {"      "}{"<"}<span className={syn.fn}>main</span>{">"}{"\n"}
              {"        "}{"<"}<span className={syn.fn}>Sidebar</span> <span className={syn.prop}>sections</span>={"{sections}"} {"/>"}{"\n"}
              {"        "}{"{children}"} <span className={syn.comment}>{"  {/* page content; e.g. <Outlet /> from your router */}"}</span>{"\n"}
              {"        "}{"<"}<span className={syn.fn}>RightRail</span> <span className={syn.prop}>items</span>={"{toc}"} {"/>"}{"\n"}
              {"      "}{"</"}<span className={syn.fn}>main</span>{">"}{"\n"}
              {"      "}{"<"}<span className={syn.fn}>Footer</span> {"/>"} <span className={syn.comment}>{"  {/* rendered automatically */}"}</span>{"\n"}
              {"    "}{"</"}<span className={syn.fn}>div</span>{">"}{"\n"}
              {"  "});{"\n"}
              {"}"}{"\n"}
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

const subHeading = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "16px",
  marginTop: "24px",
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

