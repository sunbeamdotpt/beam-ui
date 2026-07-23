import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { PropsTable } from "../components/_template";

const TOC_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "Props", id: "props" },
  { label: "Item Interface", id: "item-interface" },
  { label: "Features", id: "features" },
  { label: "Preview", id: "preview" },
  { label: "Usage", id: "usage" },
];

const PROPS = [
  { name: "items", type: "Array<BreadcrumbItem>", required: true, description: "Array of breadcrumb items defining the trail. Items with href render as links; the last item renders as plain text." },
  { name: "className", type: "string", required: false, description: "Optional CSS class name applied to the root nav element." },
  { name: "linkAs", type: "LinkComponent", required: false, description: "Component used to render links (e.g. your router's Link). Defaults to a plain <a>." },
];

const ITEM_FIELDS = [
  { name: "label", type: "string", required: true, description: "Display text for the breadcrumb segment." },
  { name: "href", type: "string", required: false, description: "Route path the segment links to. Items with href render as accent-colored links; the last item always renders as muted plain text regardless of href." },
];

export function BreadcrumbsPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shell" },
          { label: "Breadcrumbs" },
        ]}
      />

      <h1 className={pageTitle}>Breadcrumbs</h1>
      <p className={descText}>
        A lightweight breadcrumb navigation trail that shows the user their current
        location within the site hierarchy. Linked ancestors appear in accent color,
        the current page is muted plain text.
      </p>
      <div className={importBlock}>
        <code className={importCode}>import {"{ Breadcrumbs }"} from "@sunbeam/beam-ui"</code>
      </div>

      {/* Props */}
      <h2 id="props" className={sectionTitle}>Props</h2>
      <PropsTable props={PROPS} />

      {/* Item Interface */}
      <h2 id="item-interface" className={sectionTitle}>Item Interface</h2>
      <h3 className={subHeading}>BreadcrumbItem</h3>
      <PropsTable props={ITEM_FIELDS} />

      {/* Features */}
      <h2 id="features" className={sectionTitle}>Features</h2>
      <ul className={featureList}>
        <li><strong>Semantic navigation</strong> — renders inside a <code className={mono}>&lt;nav&gt;</code> landmark with <code className={mono}>aria-label="Breadcrumb"</code></li>
        <li><strong>Current page marker</strong> — last item receives <code className={mono}>aria-current="page"</code> for screen readers</li>
        <li><strong>Chevron separator</strong> — single-angle-quote (<code className={mono}>&#x203A;</code>) between items</li>
        <li><strong>Linked ancestors</strong> — items with <code className={mono}>href</code> render as React Router Links in accent color with hover opacity</li>
        <li><strong>Muted current page</strong> — the final item always renders as plain text in <code className={mono}>text.muted</code> color</li>
      </ul>

      {/* Preview */}
      <h2 id="preview" className={sectionTitle}>Preview</h2>
      <p className={bodyText}>
        Three examples at different depths:
      </p>
      <div className={previewWrapper}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Colors" },
          ]}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/components/button" },
            { label: "Button" },
          ]}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shell", href: "/shell/shell" },
            { label: "Breadcrumbs" },
          ]}
        />
      </div>

      {/* Usage */}
      <h2 id="usage" className={sectionTitle}>Usage</h2>
      <p className={bodyText}>
        Place Breadcrumbs at the top of your page component, before the page title.
        The last item in the array represents the current page and should omit <code className={mono}>href</code>:
      </p>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}Breadcrumbs{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>export function</span> <span className={syn.fn}>ColorsPage</span>() {"{"}{"\n"}
              {"  "}<span className={syn.keyword}>return</span> ({"\n"}
              {"    <"}<span className={syn.fn}>div</span>{">"}{"\n"}
              {"      <"}<span className={syn.fn}>Breadcrumbs</span>{"\n"}
              {"        "}<span className={syn.prop}>items</span>={"{["}{"\n"}
              {"          "}{"{ "}label: <span className={syn.string}>"Home"</span>, href: <span className={syn.string}>"/"</span>{" },\n"}
              {"          "}{"{ "}label: <span className={syn.string}>"Foundations"</span>, href: <span className={syn.string}>"/foundations/colors"</span>{" },\n"}
              {"          "}{"{ "}label: <span className={syn.string}>"Colors"</span>{" },\n"}
              {"        "}]{"}"}{"\n"}
              {"      "}{"/>"}{"\n"}
              {"      <"}<span className={syn.fn}>h1</span>{">"}Colors{"</"}<span className={syn.fn}>h1</span>{">"}{"\n"}
              {"      "}...{"\n"}
              {"    </"}<span className={syn.fn}>div</span>{">"}{"\n"}
              {"  "});{"\n"}
              {"}"}
            </code></pre>
          ),
        }]}
      />
      <div className={css({ height: "48px" })} />
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

const previewWrapper = css({
  padding: "24px",
  border: "1px solid",
  borderColor: "border.default",
  backgroundColor: "bg.card",
  marginBottom: "32px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
