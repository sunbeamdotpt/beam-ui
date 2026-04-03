import { useEffect } from "react";
import { css } from "styled-system/css";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { Callout } from "@sunbeam/beam-ui/components/ui/callout";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";

const TOC_ITEMS = [
  { label: "Built-in Features", id: "features" },
  { label: "Focus Indicators", id: "focus" },
  { label: "Skip Navigation", id: "skip-nav" },
  { label: "Landmarks", id: "landmarks" },
  { label: "Ark UI Components", id: "ark-ui" },
  { label: "Custom Enhancements", id: "custom" },
  { label: "Testing", id: "testing" },
];

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const page = css({
  maxWidth: "720px",
});

const title = css({
  fontFamily: "heading",
  fontSize: "48px",
  fontWeight: "display",
  lineHeight: 0.95,
  color: "text.primary",
  letterSpacing: "-0.02em",
  marginBottom: "16px",
});

const subtitle = css({
  fontSize: "18px",
  color: "text.secondary",
  lineHeight: 1.6,
  marginBottom: "48px",
});

const sectionTitle = css({
  fontSize: "24px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "16px",
  marginTop: "48px",
  scrollMarginTop: "80px",
});

const body = css({
  fontSize: "15px",
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
});

const featureGrid = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
  gap: "16px",
  marginBottom: "32px",
});

const featureCard = css({
  display: "flex",
  gap: "12px",
  padding: "16px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.subtle",
});

const featureIcon = css({
  color: "sunbeam.orange",
  minWidth: "24px",
});

const featureTitle = css({
  fontSize: "14px",
  fontWeight: "button",
  color: "text.primary",
  marginBottom: "4px",
});

const featureDesc = css({
  fontSize: "13px",
  color: "text.muted",
  lineHeight: 1.5,
});

const tableWrap = css({
  overflowX: "auto",
  marginBottom: "32px",
});

const table = css({
  width: "100%",
  fontSize: "13px",
  borderCollapse: "collapse",
});

const th = css({
  textAlign: "left",
  padding: "10px 12px",
  fontWeight: "button",
  fontSize: "11px",
  color: "text.muted",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  borderBottom: "1px solid",
  borderColor: "border.default",
});

const td = css({
  padding: "10px 12px",
  borderBottom: "1px solid",
  borderColor: "border.subtle",
  color: "text.secondary",
  verticalAlign: "top",
});

const tdComponent = css({
  padding: "10px 12px",
  borderBottom: "1px solid",
  borderColor: "border.subtle",
  color: "text.primary",
  fontWeight: "button",
  verticalAlign: "top",
});

const inlineCode = css({
  fontFamily: "mono",
  fontSize: "12px",
  backgroundColor: "bg.card",
  padding: "2px 6px",
  borderRadius: "sm",
  color: "text.primary",
});

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const arkComponents = [
  "Accordion", "Clipboard", "Combobox", "Dialog", "DropdownMenu",
  "Editable", "HoverCard", "NumberInput", "PinInput", "Popover",
  "ProgressBar", "RadioGroup", "Select", "Slider", "Splitter",
  "Steps", "Switch", "Tabs", "TagsInput", "Toggle", "ToggleGroup", "Tooltip",
];

const a11yFeatures = [
  {
    icon: "keyboard",
    title: "Keyboard Navigation",
    desc: "All interactive components are fully operable via keyboard. Tab, Enter, Space, Escape, and Arrow keys work as expected per WAI-ARIA patterns.",
  },
  {
    icon: "visibility",
    title: "Focus Management",
    desc: "A visible orange focus ring appears on all interactive elements during keyboard navigation via :focus-visible. No focus traps except in modals.",
  },
  {
    icon: "record_voice_over",
    title: "Screen Reader Support",
    desc: "Proper ARIA roles, states, and properties throughout. Live regions announce dynamic content. Landmark roles structure the page.",
  },
  {
    icon: "contrast",
    title: "Color Independence",
    desc: "No information is conveyed by color alone. Status indicators include text alternatives. Stat bars have sr-only descriptions.",
  },
  {
    icon: "skip_next",
    title: "Skip Navigation",
    desc: "A skip-to-content link appears on first Tab press in every layout, jumping past the header and sidebar directly to main content.",
  },
  {
    icon: "select_all",
    title: "Selection Highlighting",
    desc: "Text selection uses a high-contrast sunbeam orange background with white text, consistent across light and dark modes.",
  },
];

const componentA11y = [
  { name: "Icon", features: "aria-hidden=\"true\" by default. Optional label prop renders role=\"img\" + aria-label for meaningful icons." },
  { name: "Table", features: "scope=\"col\" on headers. aria-sort on sortable columns. Optional caption (sr-only). Labeled checkboxes." },
  { name: "FileUpload", features: "Upload zone is keyboard accessible (Enter/Space). role=\"button\" with aria-label." },
  { name: "FileList", features: "Labeled checkboxes per row. Select-all with aria-label. role=\"grid\" on list, role=\"listbox\" on grid." },
  { name: "Toast", features: "role=\"alert\" + aria-live=\"assertive\" for errors. role=\"status\" + aria-live=\"polite\" for info. aria-atomic." },
  { name: "TreeView", features: "role=\"tree\"/\"treeitem\"/\"group\" hierarchy. aria-expanded on collapsible folders." },
  { name: "CodeBlock", features: "aria-pressed on toggle buttons. aria-live region for copy confirmation feedback." },
  { name: "StatBar", features: "sr-only text alternative for each bar (e.g., \"Speed: 4 out of 5\"). aria-hidden on visual indicators." },
  { name: "Pagination", features: "aria-current=\"page\" on active page. aria-label=\"Pagination\" on nav." },
  { name: "Callout", features: "role=\"note\" for tips/info. role=\"status\" for warnings. aria-hidden on decorative icon." },
  { name: "Breadcrumbs", features: "aria-label=\"Breadcrumb\" on nav. aria-current=\"page\" on last item." },
  { name: "Header", features: "aria-current=\"page\" on active nav link. Descriptive theme toggle label. Search results use listbox/option roles." },
  { name: "Sidebar", features: "aria-label=\"Documentation navigation\". aria-current=\"page\" on active link." },
  { name: "Card", features: "Semantic <article> element. aria-hidden on decorative icons." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function AccessibilityPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Foundations" },
          { label: "Accessibility" },
        ]}
      />
      <h1 className={title}>Accessibility</h1>
      <p className={subtitle}>
        Beam Design Language is built for Section 508 compliance and WCAG 2.1 AA
        conformance. Every component is keyboard navigable, screen reader
        compatible, and color independent.
      </p>

      <Callout variant="info">
        22 components are backed by Ark UI, which provides battle-tested WAI-ARIA
        patterns, focus management, and keyboard navigation out of the box. Custom
        components have been audited and enhanced to match the same standard.
      </Callout>

      {/* ------------------------------------------------------------ */}
      <h2 className={sectionTitle} id="features">Built-in Features</h2>
      <div className={featureGrid}>
        {a11yFeatures.map((f) => (
          <div key={f.title} className={featureCard}>
            <Icon name={f.icon} size={24} className={featureIcon} />
            <div>
              <div className={featureTitle}>{f.title}</div>
              <div className={featureDesc}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------ */}
      <h2 className={sectionTitle} id="focus">Focus Indicators</h2>
      <p className={body}>
        All interactive elements display a 2px sunbeam orange outline when focused
        via keyboard (<code className={inlineCode}>:focus-visible</code>). This
        ensures sighted keyboard users always know where focus is without
        cluttering the UI for mouse users.
      </p>
      <CodeBlock
        tabs={[{
          label: "CSS",
          content: (
            <pre><code>
              <span className={syn.prop}>:focus-visible</span> {"{"}{"\n"}
              {"  "}<span className={syn.prop}>outline</span>: <span className={syn.string}>2px solid var(--colors-sunbeam-orange)</span>;{"\n"}
              {"  "}<span className={syn.prop}>outline-offset</span>: <span className={syn.string}>2px</span>;{"\n"}
              {"}"}
            </code></pre>
          ),
        }]}
      />

      {/* ------------------------------------------------------------ */}
      <h2 className={sectionTitle} id="skip-nav">Skip Navigation</h2>
      <p className={body}>
        Every layout includes a visually hidden "Skip to main content" link that
        becomes visible when focused. Press <code className={inlineCode}>Tab</code> on
        any page to see it. This lets keyboard users bypass the header and sidebar
        navigation.
      </p>

      {/* ------------------------------------------------------------ */}
      <h2 className={sectionTitle} id="landmarks">Landmarks</h2>
      <p className={body}>
        The page structure uses semantic HTML landmarks so screen readers can
        navigate by region:
      </p>
      <div className={tableWrap}>
        <table className={table}>
          <thead>
            <tr>
              <th className={th} scope="col">Element</th>
              <th className={th} scope="col">Role</th>
              <th className={th} scope="col">Label</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className={tdComponent}>Header</td><td className={td}>banner</td><td className={td}>—</td></tr>
            <tr><td className={tdComponent}>Sidebar</td><td className={td}>complementary</td><td className={td}>Documentation navigation</td></tr>
            <tr><td className={tdComponent}>Main content</td><td className={td}>main</td><td className={td}>id="main-content"</td></tr>
            <tr><td className={tdComponent}>Right rail</td><td className={td}>complementary</td><td className={td}>On this page</td></tr>
            <tr><td className={tdComponent}>Breadcrumbs</td><td className={td}>navigation</td><td className={td}>Breadcrumb</td></tr>
            <tr><td className={tdComponent}>Footer</td><td className={td}>contentinfo</td><td className={td}>—</td></tr>
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------ */}
      <h2 className={sectionTitle} id="ark-ui">Ark UI Components</h2>
      <p className={body}>
        The following {arkComponents.length} components are built on Ark UI and
        inherit complete WAI-ARIA compliance including keyboard navigation, focus
        trapping (where appropriate), and screen reader announcements:
      </p>
      <div className={css({ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" })}>
        {arkComponents.map((c) => (
          <Badge key={c} variant="stable">{c}</Badge>
        ))}
      </div>

      {/* ------------------------------------------------------------ */}
      <h2 className={sectionTitle} id="custom">Custom Component Enhancements</h2>
      <p className={body}>
        The following custom components have been specifically enhanced for
        accessibility:
      </p>
      <div className={tableWrap}>
        <table className={table}>
          <thead>
            <tr>
              <th className={th} scope="col">Component</th>
              <th className={th} scope="col">Accessibility Features</th>
            </tr>
          </thead>
          <tbody>
            {componentA11y.map((c) => (
              <tr key={c.name}>
                <td className={tdComponent}>{c.name}</td>
                <td className={td}>{c.features}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------ */}
      <h2 className={sectionTitle} id="testing">Testing</h2>
      <p className={body}>
        We recommend testing with the following tools to verify accessibility:
      </p>
      <div className={featureGrid}>
        <div className={featureCard}>
          <Icon name="desktop_mac" size={24} className={featureIcon} />
          <div>
            <div className={featureTitle}>VoiceOver (macOS)</div>
            <div className={featureDesc}>Built-in screen reader. Press Cmd+F5 to toggle. Navigate with VO+Arrow keys.</div>
          </div>
        </div>
        <div className={featureCard}>
          <Icon name="tab" size={24} className={featureIcon} />
          <div>
            <div className={featureTitle}>Keyboard Only</div>
            <div className={featureDesc}>Navigate entirely with Tab, Shift+Tab, Enter, Space, Escape, and Arrow keys.</div>
          </div>
        </div>
        <div className={featureCard}>
          <Icon name="extension" size={24} className={featureIcon} />
          <div>
            <div className={featureTitle}>axe DevTools</div>
            <div className={featureDesc}>Browser extension that scans for WCAG violations. Run on every page.</div>
          </div>
        </div>
        <div className={featureCard}>
          <Icon name="palette" size={24} className={featureIcon} />
          <div>
            <div className={featureTitle}>Contrast Checker</div>
            <div className={featureDesc}>Verify text meets 4.5:1 contrast ratio (AA) against all background tokens.</div>
          </div>
        </div>
      </div>

      <div className={css({ height: "96px" })} />
    </div>
  );
}
