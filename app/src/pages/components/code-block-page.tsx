import { css } from "styled-system/css";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "tabs", type: "CodeTab[]", required: true, description: "Array of tabs, each with a label and content or variants map." },
  { name: "streamToggle", type: "ToggleGroup", required: false, description: "Top-bar toggle for streaming/non-streaming modes." },
  { name: "versionToggle", type: "ToggleGroup", required: false, description: "Pill toggle for API version switching." },
  { name: "modeToggle", type: "ToggleGroup", required: false, description: "Pill toggle for sync/async mode switching." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function CodeBlockPage() {
  return (
    <ComponentPage
      name="CodeBlock"
      description="A full-featured code block with language tabs, pill toggles for version/mode/streaming, copy-to-clipboard, and syntax highlighting helpers."
      importPath='import { CodeBlock, syn } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewArea}>
        <CodeBlock
          streamToggle={{
            options: ["Non-streaming", "Streaming"],
            defaultValue: "Non-streaming",
          }}
          versionToggle={{
            options: ["V2", "V1"],
            defaultValue: "V2",
          }}
          modeToggle={{
            options: ["Synchronous", "Asynchronous"],
            defaultValue: "Synchronous",
          }}
          tabs={[
            {
              label: "Python",
              variants: {
                "Non-streaming|V2|Synchronous": (
                  <pre><code>
                    <span className={syn.keyword}>import</span> sunbeam{"\n"}
                    {"\n"}
                    client = sunbeam.<span className={syn.fn}>Sunbeam</span>(api_key=<span className={syn.string}>"YOUR_KEY"</span>){"\n"}
                    response = client.chat.completions.<span className={syn.fn}>create</span>({"\n"}
                    {"    "}model=<span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"    "}messages=[{"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>"content"</span>: <span className={syn.string}>"Hello"</span>{"}"}]{"\n"}
                    ){"\n"}
                    <span className={syn.builtin}>print</span>(response.choices[<span className={syn.number}>0</span>].message.content)
                  </code></pre>
                ),
                "default": (
                  <pre><code>
                    <span className={syn.keyword}>import</span> sunbeam{"\n"}
                    {"\n"}
                    client = sunbeam.<span className={syn.fn}>Sunbeam</span>(api_key=<span className={syn.string}>"YOUR_KEY"</span>){"\n"}
                    <span className={syn.builtin}>print</span>(<span className={syn.string}>"Connected!"</span>)
                  </code></pre>
                ),
              },
            },
            {
              label: "TypeScript",
              content: (
                <pre><code>
                  <span className={syn.keyword}>import</span> Sunbeam <span className={syn.keyword}>from</span> <span className={syn.string}>"sunbeam-sdk"</span>{"\n"}
                  {"\n"}
                  <span className={syn.keyword}>const</span> client = <span className={syn.keyword}>new</span> <span className={syn.fn}>Sunbeam</span>({"{"} <span className={syn.prop}>apiKey</span>: <span className={syn.string}>"YOUR_KEY"</span> {"}"}){"\n"}
                  <span className={syn.keyword}>const</span> res = <span className={syn.keyword}>await</span> client.chat.completions.<span className={syn.fn}>create</span>({"{"}{"\n"}
                  {"  "}<span className={syn.prop}>model</span>: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                  {"  "}<span className={syn.prop}>messages</span>: [{"{"} <span className={syn.prop}>role</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>content</span>: <span className={syn.string}>"Hello"</span> {"}"}]{"\n"}
                  {"}"}){"\n"}
                  console.<span className={syn.fn}>log</span>(res.choices[<span className={syn.number}>0</span>].message.content)
                </code></pre>
              ),
            },
          ]}
        />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}CodeBlock, syn{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>CodeBlock</span>{"\n"}
              {"  "}<span className={syn.prop}>tabs</span>={"{"}[{"{"}{"\n"}
              {"    "}<span className={syn.prop}>label</span>: <span className={syn.string}>"Python"</span>,{"\n"}
              {"    "}<span className={syn.prop}>content</span>: {"<"}<span className={syn.fn}>pre</span>{">"}...{"</"}<span className={syn.fn}>pre</span>{">"},{"\n"}
              {"  "}{"}"}]{"}"}{"\n"}
              {"  "}<span className={syn.prop}>versionToggle</span>={"{"}{"{"} <span className={syn.prop}>options</span>: [<span className={syn.string}>"V2"</span>, <span className={syn.string}>"V1"</span>] {"}"}{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      <p className={bodyText}>
        CodeBlock supports simple content (single code per tab) and variant maps keyed by toggle combinations. Use the <code className={inlineCode}>syn</code> helper object for syntax-highlighted spans.
      </p>

      <h3 className={variantLabel}>Simple (no toggles)</h3>
      <CodeBlock
        tabs={[{
          label: "Shell",
          content: (
            <pre><code>
              $ deno add jsr:@sunbeam/beam-ui
            </code></pre>
          ),
        }]}
      />

      <h3 className={css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", marginBottom: "12px", marginTop: "32px" })}>With all toggles</h3>
      <p className={bodyText}>
        Pass <code className={inlineCode}>streamToggle</code>, <code className={inlineCode}>versionToggle</code>, and <code className={inlineCode}>modeToggle</code> to enable the full control bar. Map variant keys as &quot;Stream|Version|Mode&quot; strings.
      </p>
    </ComponentPage>
  );
}

const previewArea = css({
  marginBottom: "32px",
});

const bodyText = css({
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
});

const inlineCode = css({
  backgroundColor: "bg.card",
  padding: "2px 8px",
  fontFamily: "mono",
  fontSize: "13px",
  color: "text.primary",
  fontWeight: "heading",
  border: "1px solid",
  borderColor: "border.default",
});

const variantLabel = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "12px",
});
