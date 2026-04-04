import { useState } from "react";
import { Steps } from "./steps";

export default function StepsStory() {
  const [current, setCurrent] = useState(1);

  return (
    <Steps
      currentStep={current}
      onChange={setCurrent}
      steps={[
        { title: "Account", description: "Create your account" },
        { title: "Profile", description: "Set up your profile" },
        { title: "Review", description: "Confirm details" },
      ]}
    />
  );
}

export function FirstStep() {
  return (
    <Steps
      currentStep={0}
      steps={[
        { title: "Account", description: "Create your account" },
        { title: "Profile", description: "Set up your profile" },
        { title: "Review", description: "Confirm details" },
      ]}
    />
  );
}

export function LastStep() {
  return (
    <Steps
      currentStep={2}
      steps={[
        { title: "Account", description: "Create your account" },
        { title: "Profile", description: "Set up your profile" },
        { title: "Review", description: "Confirm details" },
      ]}
    />
  );
}

export function TwoSteps() {
  const [current, setCurrent] = useState(0);
  return <Steps currentStep={current} onChange={setCurrent} steps={[{ title: "Start" }, { title: "Finish" }]} />;
}
