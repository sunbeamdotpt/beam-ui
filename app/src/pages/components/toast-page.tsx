import { useState, useCallback } from "react";
import { css } from "styled-system/css";
import { Toast } from "@sunbeam/beam-ui/components/ui/toast";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "message", type: "string", required: true, description: "The text content of the toast." },
  { name: "variant", type: '"success" | "error" | "info"', required: false, description: 'Visual style variant. Defaults to "info".' },
  { name: "visible", type: "boolean", required: true, description: "Controls whether the toast is shown." },
  { name: "onDismiss", type: "() => void", required: false, description: "Callback fired when the toast is dismissed or auto-hides after 3 seconds." },
];

type ToastVariant = "success" | "error" | "info";

interface ToastState {
  message: string;
  variant: ToastVariant;
  visible: boolean;
}

export function ToastPage() {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    variant: "info",
    visible: false,
  });

  const showToast = useCallback((variant: ToastVariant) => {
    const messages: Record<ToastVariant, string> = {
      success: "Bucket created successfully.",
      error: "Failed to delete bucket. Permission denied.",
      info: "Upload in progress. This may take a moment.",
    };
    setToast({ message: messages[variant], variant, visible: true });
  }, []);

  const dismiss = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <ComponentPage
      name="Toast"
      description="A fixed-position notification toast that auto-dismisses after 3 seconds. Supports success, error, and info variants with a colored left border."
      importPath='import { Toast } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <Button variant="primary" onClick={() => showToast("success")}>
          Success Toast
        </Button>
        <Button variant="dark" onClick={() => showToast("error")}>
          Error Toast
        </Button>
        <Button variant="cream" onClick={() => showToast("info")}>
          Info Toast
        </Button>
      </div>

      <Toast
        message={toast.message}
        variant={toast.variant}
        visible={toast.visible}
        onDismiss={dismiss}
      />

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
              <span className={syn.keyword}>import</span> {"{ "}useState{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"react"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}Toast{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [visible, setVisible] = <span className={syn.fn}>useState</span>(false){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Toast</span>{"\n"}
              {"  "}<span className={syn.prop}>message</span>=<span className={syn.string}>"Bucket created successfully."</span>{"\n"}
              {"  "}<span className={syn.prop}>variant</span>=<span className={syn.string}>"success"</span>{"\n"}
              {"  "}<span className={syn.prop}>visible</span>={"{"}visible{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onDismiss</span>={"{() => "}setVisible(false){"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Success</h3>
        <p className={variantDesc}>Green-gold left border. Use for confirming successful actions.</p>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Error</h3>
        <p className={variantDesc}>Orange left border. Use for failed operations or permission errors.</p>
      </div>

      <div className={variantBlock}>
        <h3 className={variantLabel}>Info</h3>
        <p className={variantDesc}>Light gold left border. Use for neutral, informational messages.</p>
      </div>
    </ComponentPage>
  );
}

const previewRow = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "16px",
  padding: "32px",
  backgroundColor: "bg.card",
  marginBottom: "32px",
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

const variantDesc = css({
  fontSize: "14px",
  color: "text.secondary",
  lineHeight: 1.6,
});
