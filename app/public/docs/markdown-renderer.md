# MarkdownRenderer

> Props for {@link MarkdownRenderer}. */
export interface MarkdownRendererProps {
  /** Markdown source string (CommonMark + GitHub Flavored Markdown). Supports inline/block LaTeX with `$...$` (inline) and `$$...$$` (display). */
  content: string;
  /** Optional CSS class for the wrapper div. */
  className?: string;
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSanitize)
  .use(rehypeStringify);

type KatexType = typeof import("katex").default;

let katexModule: KatexType | null = null;
let katexLoading = false;
const katexCallbacks: (() => void)[] = [];

function loadKatex(): Promise<KatexType> {
  if (katexModule) return Promise.resolve(katexModule);
  return new Promise((resolve) => {
    katexCallbacks.push(() => resolve(katexModule as KatexType));
    if (!katexLoading) {
      katexLoading = true;
      Promise.all([
        import("katex"),
        // deno-lint-ignore no-explicit-any
        import("katex/dist/katex.min.css" as any),
      ]).then(([mod]) => {
        katexModule = mod.default as KatexType;
        katexCallbacks.forEach((cb) => cb());
        katexCallbacks.length = 0;
      });
    }
  });
}

/** Extract math blocks, replace with text markers that survive sanitization */
function extractMath(
  md: string,
): { processed: string; blocks: { id: string; math: string; display: boolean }[] } {
  const blocks: { id: string; math: string; display: boolean }[] = [];
  let idx = 0;

  // Block math: $$...$$
  let processed = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    const id = `BEAMMATH${idx++}BEAMMATH`;
    blocks.push({ id, math: math.trim(), display: true });
    return id;
  });

  // Inline math: $...$  (not preceded/followed by $)
  processed = processed.replace(/(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g, (_, math) => {
    const id = `BEAMMATH${idx++}BEAMMATH`;
    blocks.push({ id, math: math.trim(), display: false });
    return id;
  });

  return { processed, blocks };
}

/** Renders CommonMark + GitHub Flavored Markdown with sanitization and LaTeX math support. Converts markdown to HTML via a unified pipeline (remark → rehype → sanitize). LaTeX blocks (`$$...$$`) and inline math (`$...$`) are lazily loaded and rendered with KaTeX. * @example ```tsx <MarkdownRenderer content="# Hello\n\n$E = mc^2$" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/markdown-renderer?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { MarkdownRenderer } from "@sunbeam/beam-ui/components/ui/markdown-renderer"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| content | `string` | Yes | Markdown source string (CommonMark + GitHub Flavored Markdown). Supports inline/block LaTeX with `$...$` (inline) and `$$...$$` (display). |
| className | `string` | No | Optional CSS class for the wrapper div. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
