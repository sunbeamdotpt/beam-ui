import { useState, useCallback } from "react";
import { css } from "styled-system/css";
import { FileUpload } from "@sunbeam/beam-ui/components/ui/file-upload";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "onFiles", type: "(files: File[]) => void", required: true, description: "Callback fired when files are selected or dropped." },
  { name: "accept", type: "string", required: false, description: "Accepted file types (e.g. \".png,.jpg\" or \"image/*\")." },
  { name: "multiple", type: "boolean", required: false, description: "Allow selecting multiple files. Defaults to false." },
  { name: "disabled", type: "boolean", required: false, description: "Disables the upload zone. Defaults to false." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

export function FileUploadPage() {
  const [files, setFiles] = useState<string[]>([]);

  const handleFiles = useCallback((incoming: File[]) => {
    setFiles(incoming.map((f) => f.name));
  }, []);

  return (
    <ComponentPage
      name="FileUpload"
      description="A drag-and-drop file upload zone that also supports click-to-browse. Displays the number of selected files and supports accept filters and multiple selection."
      importPath='import { FileUpload } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <div className={uploadWrapper}>
          <FileUpload onFiles={handleFiles} multiple accept="image/*" />
          {files.length > 0 && (
            <ul className={fileList}>
              {files.map((name) => (
                <li key={name} className={fileItem}>{name}</li>
              ))}
            </ul>
          )}
        </div>
        <div className={uploadWrapper}>
          <FileUpload onFiles={() => {}} disabled />
        </div>
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
              <span className={syn.keyword}>import</span> {"{ "}FileUpload{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>function</span> <span className={syn.fn}>handleFiles</span>(files: File[]) {"{}"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Single file"}</span>{"\n"}
              {"<"}<span className={syn.fn}>FileUpload</span> <span className={syn.prop}>onFiles</span>={"{"}handleFiles{"}"} {"/>"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Multiple images"}</span>{"\n"}
              {"<"}<span className={syn.fn}>FileUpload</span>{"\n"}
              {"  "}<span className={syn.prop}>onFiles</span>={"{"}handleFiles{"}"}{"\n"}
              {"  "}<span className={syn.prop}>multiple</span>{"\n"}
              {"  "}<span className={syn.prop}>accept</span>=<span className={syn.string}>"image/*"</span>{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Default</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "400px" })}>
          <FileUpload onFiles={() => {}} />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Disabled</h3>
        <div className={css({ marginBottom: "16px", maxWidth: "400px" })}>
          <FileUpload onFiles={() => {}} disabled />
        </div>
      </div>
    </ComponentPage>
  );
}

const previewRow = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  gap: "24px",
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "32px",
});

const uploadWrapper = css({
  flex: 1,
  minWidth: "260px",
});

const fileList = css({
  listStyle: "none",
  margin: "12px 0 0",
  padding: 0,
});

const fileItem = css({
  fontSize: "13px",
  fontFamily: "mono",
  color: "text.secondary",
  padding: "4px 0",
});

const variantBlock = css({
  marginBottom: "40px",
});

const variantLabel = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  textTransform: "capitalize",
  marginBottom: "12px",
});
