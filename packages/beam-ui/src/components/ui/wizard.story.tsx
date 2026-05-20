import { Wizard, WizardModal } from "./wizard.tsx";

export default function WizardStory() {
  return (
    <div style={{ maxWidth: 600 }}>
      <Wizard
        steps={[
          {
            title: "Account",
            description: "Enter your account details.",
            content: <p>Account creation form goes here.</p>,
          },
          {
            title: "Profile",
            description: "Tell us about yourself.",
            content: <p>Profile setup form goes here.</p>,
          },
          {
            title: "Confirm",
            description: "Review and confirm.",
            content: <p>Review your information before finishing.</p>,
          },
        ]}
        onComplete={() => {}}
        onCancel={() => {}}
      />
    </div>
  );
}

export function TwoSteps() {
  return (
    <div style={{ maxWidth: 600 }}>
      <Wizard
        steps={[
          { title: "Start", content: <p>Begin here.</p> },
          { title: "Finish", content: <p>All done.</p> },
        ]}
        onComplete={() => {}}
      />
    </div>
  );
}

export function ModalWizard() {
  return (
    <div style={{ position: "relative", minHeight: 500 }}>
      <WizardModal
        open={true}
        onClose={() => {}}
        title="Setup Wizard"
        steps={[
          { title: "Step 1", content: <p>First step content.</p> },
          { title: "Step 2", content: <p>Second step content.</p> },
        ]}
        onComplete={() => {}}
      />
    </div>
  );
}

export function CustomLabels() {
  return (
    <div style={{ maxWidth: 600 }}>
      <Wizard
        steps={[
          { title: "Info", content: <p>Provide information.</p> },
          { title: "Done", content: <p>Review and submit.</p> },
        ]}
        onComplete={() => {}}
        nextLabel="Continue"
        backLabel="Go Back"
        completeLabel="Submit"
        cancelLabel="Discard"
        onCancel={() => {}}
      />
    </div>
  );
}
