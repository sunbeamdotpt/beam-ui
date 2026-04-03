import { useMemo } from "react";
import { css, cx } from "styled-system/css";
import katex from "katex";
import "katex/dist/katex.min.css";

export interface MathRendererProps {
  math: string;
  display?: boolean;
  className?: string;
}

export function MathRenderer({ math, display = false, className }: MathRendererProps) {
  const rendered = useMemo(() => {
    try {
      return {
        html: katex.renderToString(math, {
          displayMode: display,
          throwOnError: false,
        }),
        error: false,
      };
    } catch {
      return { html: "", error: true };
    }
  }, [math, display]);

  if (rendered.error) {
    return (
      <span className={cx(errorStyle, className)}>
        {math}
      </span>
    );
  }

  if (display) {
    // KaTeX renderToString produces safe HTML from LaTeX math input (no raw user HTML).
    return (
      <div
        className={cx(displayStyle, className)}
        dangerouslySetInnerHTML={{ __html: rendered.html }}
      />
    );
  }

  // KaTeX renderToString produces safe HTML from LaTeX math input (no raw user HTML).
  return (
    <span
      className={cx(inlineStyle, className)}
      dangerouslySetInnerHTML={{ __html: rendered.html }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */
const displayStyle = css({
  display: "block",
  textAlign: "center",
  padding: "24px 16px",
  overflowX: "auto",
});

const inlineStyle = css({
  display: "inline",
});

const errorStyle = css({
  fontFamily: "mono",
  fontSize: "13px",
  color: "sunbeam.orange",
  padding: "4px 8px",
  border: "1px solid",
  borderColor: "sunbeam.orange",
  backgroundColor: "rgba(250, 82, 15, 0.06)",
});
