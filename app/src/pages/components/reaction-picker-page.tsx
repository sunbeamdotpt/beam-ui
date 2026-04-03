import { useState } from "react";
import { css } from "styled-system/css";
import { ReactionPicker } from "@sunbeam/beam-ui/components/ui/reaction-picker";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "reactions", type: "Reaction[]", required: true, description: "Array of reaction objects with emoji, count, and reacted fields." },
  { name: "onToggle", type: "(emoji: string) => void", required: true, description: "Callback when an existing reaction is clicked." },
  { name: "onAdd", type: "(emoji: string) => void", required: true, description: "Callback when a new emoji is selected from the picker." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const INITIAL_REACTIONS = [
  { emoji: "\u{1F44D}", count: 5, reacted: true },
  { emoji: "\u{1F389}", count: 3, reacted: false },
  { emoji: "\u{1F680}", count: 2, reacted: false },
];

export function ReactionPickerPage() {
  const [reactions, setReactions] = useState(INITIAL_REACTIONS);

  const handleToggle = (emoji: string) => {
    setReactions((prev) =>
      prev.map((r) =>
        r.emoji === emoji
          ? { ...r, reacted: !r.reacted, count: r.reacted ? r.count - 1 : r.count + 1 }
          : r
      )
    );
  };

  const handleAdd = (emoji: string) => {
    setReactions((prev) => {
      const existing = prev.find((r) => r.emoji === emoji);
      if (existing) {
        return prev.map((r) =>
          r.emoji === emoji && !r.reacted
            ? { ...r, reacted: true, count: r.count + 1 }
            : r
        );
      }
      return [...prev, { emoji, count: 1, reacted: true }];
    });
  };

  return (
    <ComponentPage
      name="ReactionPicker"
      description="An emoji reaction bar with counts and an add button. Users can toggle existing reactions or add new ones from a popover."
      importPath='import { ReactionPicker } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <ReactionPicker
          reactions={reactions}
          onToggle={handleToggle}
          onAdd={handleAdd}
        />
        <p className={css({ marginTop: "16px", fontSize: "13px", color: "text.muted" })}>
          Click a reaction to toggle it, or click + to add a new one.
        </p>
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}useState{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"react"</span>{"\n"}
              <span className={syn.keyword}>import</span> {"{ "}ReactionPicker{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [reactions, setReactions] = <span className={syn.fn}>useState</span>([{"\n"}
              {"  { emoji: "}<span className={syn.string}>{'"'}{"\u{1F44D}"}{'"'}</span>{", count: "}<span className={syn.number}>{"5"}</span>{", reacted: "}<span className={syn.keyword}>{"true"}</span>{" },"}{"\n"}
              {"  { emoji: "}<span className={syn.string}>{'"'}{"\u{1F389}"}{'"'}</span>{", count: "}<span className={syn.number}>{"3"}</span>{", reacted: "}<span className={syn.keyword}>{"false"}</span>{" },"}{"\n"}
              ]){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>ReactionPicker</span>{"\n"}
              {"  "}<span className={syn.prop}>reactions</span>={"{"}reactions{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onToggle</span>={"{"}handleToggle{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onAdd</span>={"{"}handleAdd{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Current state</h3>
        <div className={css({ fontFamily: "mono", fontSize: "12px", color: "text.secondary", backgroundColor: "bg.card", padding: "12px" })}>
          {reactions.map((r) => (
            <div key={r.emoji}>
              {r.emoji} count={r.count} reacted={String(r.reacted)}
            </div>
          ))}
        </div>
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
