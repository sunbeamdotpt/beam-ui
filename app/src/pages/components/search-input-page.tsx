import { css } from "styled-system/css";
import { SearchInput } from "@sunbeam/beam-ui/components/ui/search-input";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "className", type: "string", required: false, description: "Additional CSS class names for the wrapper element." },
];

export function SearchInputPage() {
  return (
    <ComponentPage
      name="SearchInput"
      description="A decorative search input with a keyboard shortcut badge. Primarily used in the navigation header as a visual placeholder for command-palette activation."
      importPath='import { SearchInput } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewArea}>
        <SearchInput />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />
      <p className={bodyText}>
        SearchInput is a presentational component with minimal props. It renders a read-only input with a search icon and a keyboard shortcut indicator.
      </p>

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}SearchInput{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Renders a styled read-only search field"}</span>{"\n"}
              {"<"}<span className={syn.fn}>SearchInput</span> {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// With custom class"}</span>{"\n"}
              {"<"}<span className={syn.fn}>SearchInput</span> <span className={syn.prop}>className</span>={"{"}<span className={syn.fn}>css</span>({"{"} <span className={syn.prop}>width</span>: <span className={syn.string}>"100%"</span> {"}"}){"}"}  {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      <p className={bodyText}>
        SearchInput is a single-variant component. It always renders with the warm ivory background, search icon, and keyboard shortcut badge.
      </p>
    </ComponentPage>
  );
}

const previewArea = css({
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "32px",
});

const bodyText = css({
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
});
