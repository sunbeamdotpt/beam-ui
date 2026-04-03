import { useState } from "react";
import { css } from "styled-system/css";
import { Wizard, WizardModal } from "@sunbeam/beam-ui/components/ui/wizard";
import { Button as BeamButton } from "@sunbeam/beam-ui/components/ui/button";
import { TextInput } from "@sunbeam/beam-ui/components/ui/text-input";
import { Checkbox } from "@sunbeam/beam-ui/components/ui/checkbox";
import { Select } from "@sunbeam/beam-ui/components/ui/select";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const WIZARD_PROPS = [
  { name: "steps", type: "WizardStep[]", required: true, description: "Array of step definitions with title, optional description, and content." },
  { name: "onComplete", type: "() => void", required: true, description: "Called when the user clicks Finish on the last step." },
  { name: "onCancel", type: "() => void", required: false, description: "If provided, shows a Cancel button on the first step." },
  { name: "onStepChange", type: "(step: number) => void", required: false, description: "Called when the active step changes." },
  { name: "nextLabel", type: "string", required: false, description: 'Label for the Next button. Defaults to "Continue".' },
  { name: "backLabel", type: "string", required: false, description: 'Label for the Back button. Defaults to "Back".' },
  { name: "completeLabel", type: "string", required: false, description: 'Label for the Finish button. Defaults to "Finish".' },
  { name: "cancelLabel", type: "string", required: false, description: 'Label for the Cancel button. Defaults to "Cancel".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const STEP_PROPS = [
  { name: "title", type: "string", required: true, description: "Step title shown in the indicator." },
  { name: "description", type: "string", required: false, description: "Description shown above the content." },
  { name: "content", type: "ReactNode", required: true, description: "The step's body content." },
  { name: "isValid", type: "boolean", required: false, description: "If false, the Next button is disabled. Defaults to true." },
];

export function WizardPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const steps = [
    {
      title: "Account",
      description: "Set up your account details.",
      content: (
        <div className={css({ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" })}>
          <TextInput label="Display Name" value={name} onChange={setName} placeholder="Your name" />
          <TextInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        </div>
      ),
      isValid: name.length > 0 && email.length > 0,
    },
    {
      title: "Preferences",
      description: "Choose your preferences.",
      content: (
        <div className={css({ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" })}>
          <Select
            options={[
              { label: "English", value: "en" },
              { label: "Portuguese", value: "pt" },
              { label: "Spanish", value: "es" },
            ]}
            value="en"
            onChange={() => {}}
            placeholder="Select language"
          />
          <Checkbox checked={agreed} onChange={setAgreed} label="Send me updates about Sunbeam Studios" />
        </div>
      ),
    },
    {
      title: "Complete",
      description: "You're all set! Review your choices and finish setup.",
      content: (
        <div className={css({ padding: "24px", backgroundColor: "bg.card", border: "1px solid", borderColor: "border.default" })}>
          <p className={css({ fontSize: "sm", color: "text.secondary", lineHeight: 1.6 })}>
            Welcome, <strong className={css({ color: "text.primary" })}>{name || "..."}</strong>! Your account
            will be set up with <strong className={css({ color: "text.primary" })}>{email || "..."}</strong>.
          </p>
        </div>
      ),
    },
  ];

  return (
    <ComponentPage
      name="Wizard"
      description="A multi-step workflow component for onboarding, setup, and guided processes. Supports validation, navigation callbacks, customizable labels, and a modal variant for dialog-based wizards."
      importPath='import { Wizard } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewBox}>
        <Wizard
          steps={steps}
          onComplete={() => alert("Setup complete!")}
          onCancel={() => alert("Cancelled")}
        />
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={WIZARD_PROPS} />
      <h3 className={subHeading}>WizardStep</h3>
      <PropsTable props={STEP_PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}Wizard{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> steps = [{"\n"}
              {"  "}{"{"}{"\n"}
              {"    "}title: <span className={syn.string}>"Account"</span>,{"\n"}
              {"    "}description: <span className={syn.string}>"Set up your account."</span>,{"\n"}
              {"    "}content: {"<"}MyAccountForm /{">"},{"\\n"}
              {"    "}isValid: formIsValid,{"\n"}
              {"  "}{"}"},{"\n"}
              {"  "}{"{ "}title: <span className={syn.string}>"Preferences"</span>, content: {"<"}MyPrefsForm /{">"}{" },"}{"\n"}
              {"  "}{"{ "}title: <span className={syn.string}>"Complete"</span>, content: {"<"}MySummary /{">"}{" },"}{"\n"}
              ];{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>Wizard</span>{"\n"}
              {"  "}<span className={syn.prop}>steps</span>={"{steps}"}{"\n"}
              {"  "}<span className={syn.prop}>onComplete</span>={"{handleFinish}"}{"\n"}
              {"  "}<span className={syn.prop}>onCancel</span>={"{handleCancel}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={subHeading}>Minimal (2 steps, no cancel)</h3>
        <div className={previewBox}>
          <Wizard
            steps={[
              { title: "Step 1", content: <p className={css({ color: "text.secondary", fontSize: "sm" })}>First step content.</p> },
              { title: "Step 2", content: <p className={css({ color: "text.secondary", fontSize: "sm" })}>Second step content.</p> },
            ]}
            onComplete={() => alert("Done!")}
            completeLabel="Save"
          />
        </div>
      </div>

      <div className={variantBlock}>
        <h3 className={subHeading}>Modal variant</h3>
        <p className={css({ fontSize: "sm", color: "text.secondary", marginBottom: "16px", lineHeight: 1.6 })}>
          WizardModal wraps the wizard in an Ark UI Dialog for popup workflows.
        </p>
        <BeamButton variant="primary" onClick={() => setModalOpen(true)}>
          Open Setup Wizard
        </BeamButton>
        <WizardModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Account Setup"
          steps={[
            { title: "Name", content: <TextInput label="Display Name" value={name} onChange={setName} placeholder="Your name" />, isValid: name.length > 0 },
            { title: "Email", content: <TextInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />, isValid: email.length > 0 },
            { title: "Done", content: <p className={css({ fontSize: "sm", color: "text.secondary" })}>Welcome, {name || "..."}!</p> },
          ]}
          onComplete={() => { setModalOpen(false); alert("Setup complete!"); }}
        />
      </div>
    </ComponentPage>
  );
}

const previewBox = css({ padding: "32px", backgroundColor: "bg.card", marginBottom: "32px", border: "1px solid", borderColor: "border.default" });
const subHeading = css({ fontSize: "lg", fontWeight: "heading", color: "text.primary", marginBottom: "12px", marginTop: "24px" });
const variantBlock = css({ marginBottom: "40px" });
