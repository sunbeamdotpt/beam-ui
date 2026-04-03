import { useState } from "react";
import { css } from "styled-system/css";
import { Steps } from "@sunbeam/beam-ui/components/ui/steps";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "steps", type: "StepItem[]", required: true, description: "Array of { title, description? } step definitions." },
  { name: "currentStep", type: "number", required: true, description: "Zero-based index of the current step." },
  { name: "onChange", type: "(step: number) => void", required: false, description: "Callback when a step indicator is clicked." },
];

const STEP_ITEMS = [
  { title: "Account", description: "Create your account" },
  { title: "Profile", description: "Set up your profile" },
  { title: "Review", description: "Confirm details" },
];

export function StepsPage() {
  const [step, setStep] = useState(1);

  return (
    <ComponentPage
      name="Steps"
      description="A step indicator for multi-step workflows. Built on Ark UI Steps."
      importPath='import { Steps } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <Steps steps={STEP_ITEMS} currentStep={step} onChange={setStep} />
        <div className={css({ display: "flex", gap: "8px", marginTop: "24px" })}>
          <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))}>Back</Button>
          <Button variant="primary" onClick={() => setStep(Math.min(STEP_ITEMS.length - 1, step + 1))}>Next</Button>
        </div>
        <p className={css({ marginTop: "12px", fontSize: "13px", color: "text.muted" })}>Step: {step + 1} / {STEP_ITEMS.length}</p>
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
              <span className={syn.keyword}>import</span> {"{ "}Steps{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> [step, setStep] = <span className={syn.fn}>useState</span>(<span className={syn.number}>0</span>){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Steps</span>{"\n"}
              {"  "}<span className={syn.prop}>steps</span>={"{"}[{"{ "}<span className={syn.prop}>title</span>: <span className={syn.string}>"Account"</span>{" }"}, {"{ "}<span className={syn.prop}>title</span>: <span className={syn.string}>"Profile"</span>{" }"}]{"}"}{"\n"}
              {"  "}<span className={syn.prop}>currentStep</span>={"{"}step{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onChange</span>={"{"}setStep{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Completed</h3>
        <Steps steps={STEP_ITEMS} currentStep={3} />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
