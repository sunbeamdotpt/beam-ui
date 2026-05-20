import { useState } from "react";
import { RadioGroup } from "./radio-group.tsx";

export default function RadioGroupStory() {
  const [value, setValue] = useState("monthly");

  return (
    <RadioGroup
      label="Billing cycle"
      value={value}
      onChange={setValue}
      options={[
        { value: "monthly", label: "Monthly" },
        { value: "quarterly", label: "Quarterly" },
        { value: "annual", label: "Annual (save 20%)" },
      ]}
    />
  );
}

export function WithoutLabel() {
  const [value, setValue] = useState("a");
  return (
    <RadioGroup
      value={value}
      onChange={setValue}
      options={[{ value: "a", label: "Option A" }, { value: "b", label: "Option B" }]}
    />
  );
}

export function ManyOptions() {
  const [value, setValue] = useState("sm");
  return (
    <RadioGroup
      label="Size"
      value={value}
      onChange={setValue}
      options={[
        { value: "xs", label: "Extra Small" },
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
        { value: "xl", label: "Extra Large" },
      ]}
    />
  );
}
