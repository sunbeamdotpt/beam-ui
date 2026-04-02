import { useState } from "react";
import { AccordionRoot, AccordionItem, AccordionItemTrigger, AccordionItemContent } from "@ark-ui/react/accordion";
import { css } from "styled-system/css";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { Tabs } from "@sunbeam/beam-ui/components/ui/tabs";
import {
  apiLeftPanel,
  apiRightPanel,
} from "@sunbeam/beam-ui/components/layouts/api-layout";
import { chatCompletionEndpoint } from "../data/api-endpoints";

/* ------------------------------------------------------------------ */
/* Left-panel styles                                                   */
/* ------------------------------------------------------------------ */

const heroBanner = css({
  position: "relative",
  height: "256px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "48px",
  overflow: "hidden",
  background: "linear-gradient(135deg, token(colors.sunbeam.orange), token(colors.sunbeam.flame))",
});

const heroDecorative = css({
  position: "absolute",
  top: 0,
  right: 0,
  padding: "32px",
  opacity: 0.2,
  pointerEvents: "none",
});

const heroPixelBlock = css({
  width: "16px",
  height: "16px",
  bg: "rgba(255,255,255,1)",
});

const heroPixelFade = css({
  width: "16px",
  height: "16px",
  bg: "rgba(255,255,255,0.5)",
});

const heroPixelFaint = css({
  width: "16px",
  height: "16px",
  bg: "rgba(255,255,255,0.2)",
});

const heroPixelDim = css({
  width: "16px",
  height: "16px",
  bg: "rgba(255,255,255,0.1)",
});

const heroTitle = css({
  position: "relative",
  zIndex: 1,
  fontSize: "36px",
  fontWeight: "heading",
  color: "white",
  lineHeight: 1,
  marginBottom: "8px",
});

const heroSubtitle = css({
  position: "relative",
  zIndex: 1,
  color: "rgba(255,255,255,0.8)",
  fontFamily: "mono",
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
});

const bodyArea = css({
  padding: "48px",
});

const endpointCard = css({
  borderBottom: "4px solid",
  borderColor: "sunbeam.orange",
  padding: "32px",
  bg: "bg.page",
});

const endpointHeading = css({
  fontSize: "24px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "24px",
});

const endpointPath = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  borderLeft: "4px solid",
  borderColor: "sunbeam.orange",
  paddingInline: "16px",
  paddingBlock: "12px",
  bg: "bg.page",
  marginBottom: "48px",
});

const methodBadge = css({
  bg: "sunbeam.orange",
  color: "white",
  fontSize: "10px",
  fontWeight: "button",
  paddingInline: "8px",
  paddingBlock: "2px",
  letterSpacing: "-0.02em",
});

const pathCode = css({
  fontFamily: "mono",
  fontSize: "14px",
  color: "text.secondary",
});

const copyIcon = css({
  marginLeft: "auto",
  color: "sunbeam.orange",
  cursor: "pointer",
  fontSize: "14px",
});

const accordionHeader = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid",
  borderColor: "border.subtle",
  paddingBottom: "16px",
  marginBottom: "32px",
});

const accordionTitle = css({
  fontSize: "18px",
  fontWeight: "heading",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "text.primary",
  bg: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  fontFamily: "heading",
});

const contentTypeLabel = css({
  fontFamily: "mono",
  fontSize: "10px",
  color: "text.muted",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
});

const paramBlock = css({
  marginBottom: "48px",
});

const paramName = css({
  fontFamily: "mono",
  fontWeight: "button",
  fontSize: "14px",
  color: "text.primary",
});

const paramRequired = css({
  color: "sunbeam.orange",
});

const paramTypeBadge = css({
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "-0.02em",
  paddingInline: "8px",
  paddingBlock: "2px",
});

const paramTypePrimary = css({
  bg: "rgba(250, 82, 15, 0.1)",
  color: "sunbeam.orange",
});

const paramTypeBlue = css({
  bg: "rgba(255, 161, 16, 0.08)",
  color: "sunshine.700",
});

const requiredTag = css({
  fontSize: "9px",
  fontWeight: "button",
  color: "sunbeam.orange",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  border: "1px solid",
  borderColor: "rgba(250, 82, 15, 0.2)",
  paddingInline: "6px",
  paddingBlock: "1px",
});

const paramDesc = css({
  fontSize: "14px",
  color: "text.secondary",
  lineHeight: 1.6,
  marginTop: "8px",
  marginBottom: "12px",
});

const defaultRow = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const defaultLabel = css({
  fontSize: "10px",
  fontFamily: "mono",
  color: "text.muted",
  textTransform: "uppercase",
});

const defaultValue = css({
  bg: "bg.card",
  paddingInline: "8px",
  paddingBlock: "2px",
  fontSize: "10px",
  fontFamily: "mono",
});

/* ------------------------------------------------------------------ */
/* Right-panel styles                                                  */
/* ------------------------------------------------------------------ */

const rightBody = css({
  padding: "32px",
});

const examplesHeading = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "white",
  marginBottom: "4px",
});

const examplesSubtext = css({
  color: "rgba(144, 112, 102, 1)",
  fontFamily: "mono",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  marginBottom: "32px",
});

const codeBlock = css({
  bg: "rgba(0,0,0,0.4)",
  padding: "24px",
  marginBottom: "32px",
  position: "relative",
  overflowX: "auto",
});

const codeText = css({
  fontFamily: "mono",
  fontSize: "12px",
  lineHeight: 1.8,
  whiteSpace: "pre",
  color: "rgba(255,183,125,0.8)",
});

const codeCopyBtn = css({
  position: "absolute",
  top: "16px",
  right: "16px",
  bg: "transparent",
  border: "none",
  color: "rgba(255,255,255,0.2)",
  cursor: "pointer",
  _hover: { color: "white" },
});

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function isComplexType(type: string) {
  return type.includes("array") || type.includes("map") || type.includes("null");
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function ApiReferencePage() {
  const [codeLang, setCodeLang] = useState("typescript");
  const [responseTab, setResponseTab] = useState(
    chatCompletionEndpoint.responseExamples[0].label
  );
  const ep = chatCompletionEndpoint;

  const activeCode =
    ep.codeExamples.find((e) => e.language === codeLang)?.code ?? "";
  const activeResponse =
    ep.responseExamples.find((e) => e.label === responseTab)?.body ?? "";

  return (
    <>
      {/* LEFT PANEL */}
      <div className={apiLeftPanel}>
        {/* Hero Banner */}
        <section className={heroBanner}>
          <div className={heroDecorative}>
            <div
              className={css({
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "4px",
              })}
            >
              <div className={heroPixelBlock} />
              <div className={heroPixelFade} />
              <div className={heroPixelBlock} />
              <div className={heroPixelFaint} />
              <div className={heroPixelFade} />
              <div className={heroPixelBlock} />
              <div className={heroPixelDim} />
              <div className={heroPixelBlock} />
            </div>
          </div>
          <h1 className={heroTitle}>Chat Endpoints</h1>
          <p className={heroSubtitle}>Chat Completion API.</p>
        </section>

        {/* API Content Body */}
        <div className={bodyArea}>
          <div className={endpointCard}>
            <h2 className={endpointHeading}>{ep.title}</h2>

            <div className={endpointPath}>
              <span className={methodBadge}>{ep.method}</span>
              <code className={pathCode}>{ep.path}</code>
              <Icon name="link" size={14} className={copyIcon} />
            </div>

            {/* Request Body Accordion */}
            <AccordionRoot defaultValue={["request-body"]} multiple>
              <AccordionItem value="request-body">
                <AccordionItemTrigger className={accordionHeader}>
                  <span className={accordionTitle}>
                    <Icon name="keyboard_arrow_down" size={20} className={css({ color: "sunbeam.orange" })} />
                    Request Body
                  </span>
                  <span className={contentTypeLabel}>{ep.contentType}</span>
                </AccordionItemTrigger>

                <AccordionItemContent>
                  <div className={css({ display: "flex", flexDirection: "column", gap: "48px" })}>
                    {ep.params.map((param) => (
                      <div key={param.name} className={paramBlock}>
                        <div className={css({ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" })}>
                          <span className={paramName}>
                            {param.name}
                            {param.required && (
                              <span className={paramRequired}> *</span>
                            )}
                          </span>
                          <span
                            className={`${paramTypeBadge} ${isComplexType(param.type) ? paramTypeBlue : paramTypePrimary}`}
                          >
                            {param.type}
                          </span>
                          {param.required && (
                            <span className={requiredTag}>Required</span>
                          )}
                        </div>
                        <p className={paramDesc}>{param.description}</p>
                        {param.defaultValue !== undefined && (
                          <div className={defaultRow}>
                            <span className={defaultLabel}>Default Value</span>
                            <code className={defaultValue}>
                              {param.defaultValue}
                            </code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={apiRightPanel}>
        <div className={rightBody}>
          <h3 className={examplesHeading}>Examples</h3>
          <p className={examplesSubtext}>Real world code examples</p>

          {/* Language Tabs */}
          <Tabs
            variant="dark"
            items={ep.codeExamples.map((e) => ({
              value: e.language,
              label: e.label,
            }))}
            activeValue={codeLang}
            onChange={setCodeLang}
          />

          {/* Code Block */}
          <div className={codeBlock}>
            <button className={codeCopyBtn} title="Copy code">
              <Icon name="content_copy" size={18} />
            </button>
            <pre className={codeText}>{activeCode}</pre>
          </div>

          {/* Response Tabs */}
          <Tabs
            variant="dark"
            items={ep.responseExamples.map((e) => ({
              value: e.label,
              label: e.label,
            }))}
            activeValue={responseTab}
            onChange={setResponseTab}
          />

          {/* Response Block */}
          <div className={codeBlock}>
            <pre className={codeText}>{activeResponse}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
