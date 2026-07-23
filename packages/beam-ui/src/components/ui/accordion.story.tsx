import { Accordion } from "./accordion.tsx";

export default function AccordionStory() {
  return (
    <Accordion
      items={[
        {
          value: "getting-started",
          title: "Getting Started",
          content:
            "Install the package and import the components you need. Beam UI provides a full set of accessible, styled primitives.",
        },
        {
          value: "theming",
          title: "Theming",
          content:
            "Beam UI uses Panda CSS tokens for theming. Override tokens in your panda.config to customize colors, fonts, and spacing.",
        },
        {
          value: "accessibility",
          title: "Accessibility",
          content:
            "All components follow WAI-ARIA patterns. Keyboard navigation, focus management, and screen reader support are built in.",
        },
      ]}
      multiple
      defaultValue={["getting-started"]}
    />
  );
}

export function Single() {
  return (
    <Accordion
      items={[
        { value: "a", title: "First Item", content: "Content for the first item." },
        { value: "b", title: "Second Item", content: "Content for the second item." },
      ]}
    />
  );
}

export function AllExpanded() {
  return (
    <Accordion
      items={[
        { value: "a", title: "Section A", content: "Expanded by default." },
        { value: "b", title: "Section B", content: "Also expanded." },
      ]}
      multiple
      defaultValue={["a", "b"]}
    />
  );
}
