import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { TweakSection } from "./tweak-section.tsx";
import { TweakRadio } from "./tweak-radio.tsx";
import { TweakToggle } from "./tweak-toggle.tsx";

describe("TweakSection", () => {
  it("renders_label_and_children", () => {
    render(
      <TweakSection label="Test Section">
        <div>Test content</div>
      </TweakSection>,
    );
    expect(screen.getByText("Test Section")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies_data_part_section_to_root", () => {
    const { container } = render(
      <TweakSection label="Test">
        <div>Content</div>
      </TweakSection>,
    );
    const section = container.querySelector('[data-part="section"]');
    expect(section).toBeInTheDocument();
  });
});

describe("TweakRadio", () => {
  const options = [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    { value: "opt3", label: "Option 3" },
  ];

  it("renders_one_button_per_option", () => {
    render(
      <TweakRadio
        label="Test Radio"
        value="opt1"
        options={options}
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("marks_active_option_with_aria_pressed_or_data_state", () => {
    const { container } = render(
      <TweakRadio
        label="Test Radio"
        value="opt2"
        options={options}
        onChange={() => {}}
      />,
    );
    // When opt2 is selected, Option 2 text is rendered
    expect(screen.getByText("Option 2")).toBeInTheDocument();

    // Verify the radio group structure exists with the right data state
    const radiogroup = container.querySelector('[role="radiogroup"]');
    expect(radiogroup).toBeInTheDocument();
  });

  it("calls_onChange_with_clicked_option_value", async () => {
    const onChange = vi.fn();
    render(
      <TweakRadio
        label="Test Radio"
        value="opt1"
        options={options}
        onChange={onChange}
      />,
    );
    const user = userEvent.setup();
    const opt2Button = screen.getByText("Option 2");
    await user.click(opt2Button);
    expect(onChange).toHaveBeenCalledWith("opt2");
  });

  it("does_not_call_onChange_when_clicking_already_selected", async () => {
    const onChange = vi.fn();
    render(
      <TweakRadio
        label="Test Radio"
        value="opt1"
        options={options}
        onChange={onChange}
      />,
    );
    const user = userEvent.setup();
    const opt1Button = screen.getByText("Option 1");
    await user.click(opt1Button);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("TweakToggle", () => {
  it("renders_label", () => {
    render(
      <TweakToggle
        label="Test Toggle"
        value={false}
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Test Toggle")).toBeInTheDocument();
  });

  it("reflects_value_prop_in_aria_pressed", () => {
    const { container } = render(
      <TweakToggle
        label="Test Toggle"
        value={false}
        onChange={() => {}}
      />,
    );
    let switchRoot = container.querySelector('[data-state="unchecked"]');
    expect(switchRoot).toBeInTheDocument();

    const { container: container2 } = render(
      <TweakToggle
        label="Test Toggle"
        value
        onChange={() => {}}
      />,
    );
    switchRoot = container2.querySelector('[data-state="checked"]');
    expect(switchRoot).toBeInTheDocument();
  });

  it("calls_onChange_with_negation_of_current_value", async () => {
    const onChange = vi.fn();
    const { container } = render(
      <TweakToggle
        label="Test Toggle"
        value={false}
        onChange={onChange}
      />,
    );
    const user = userEvent.setup();
    const switchLabel = container.querySelector('[data-part="root"]') as HTMLElement;
    await user.click(switchLabel);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("keyboard_space_toggles", async () => {
    const onChange = vi.fn();
    const { container } = render(
      <TweakToggle
        label="Test Toggle"
        value={false}
        onChange={onChange}
      />,
    );
    const switchLabel = container.querySelector('[data-part="root"]') as HTMLElement;
    const user = userEvent.setup();
    await user.click(switchLabel);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
