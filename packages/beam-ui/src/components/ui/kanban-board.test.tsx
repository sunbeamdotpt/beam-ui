import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { KanbanCardView } from "./kanban-board.tsx";
import type { KanbanCard } from "./kanban-board.tsx";

const baseCard: KanbanCard = {
  id: "card-1",
  title: "Test card",
};

const cardWithAll: KanbanCard = {
  id: "card-2",
  title: "Full card",
  labels: [{ name: "bug", color: "#dc2626" }],
  assignees: [{ name: "Alice" }],
  milestone: "v1.0",
};

/* ------------------------------------------------------------------ */
/* Regression: existing props still work                               */
/* ------------------------------------------------------------------ */
describe("KanbanCardView — regression", () => {
  it("renders_card_title", () => {
    render(<KanbanCardView card={baseCard} />);
    expect(screen.getByText("Test card")).toBeInTheDocument();
  });

  it("renders_labels_when_present", () => {
    render(<KanbanCardView card={cardWithAll} />);
    expect(screen.getByText("bug")).toBeInTheDocument();
  });

  it("renders_milestone_when_present", () => {
    render(<KanbanCardView card={cardWithAll} />);
    expect(screen.getByText("v1.0")).toBeInTheDocument();
  });

  it("renders_assignee_avatar_when_present", () => {
    render(<KanbanCardView card={cardWithAll} />);
    expect(screen.getByRole("img", { name: "Alice" })).toBeInTheDocument();
  });

  it("renders_without_cover_or_blocked_by_default", () => {
    const { container } = render(<KanbanCardView card={baseCard} />);
    expect(container.querySelector('[data-part="cover"]')).not
      .toBeInTheDocument();
    expect(container.querySelector('[data-part="blocked-badge"]')).not
      .toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/* cover prop                                                          */
/* ------------------------------------------------------------------ */
describe("KanbanCardView — cover prop", () => {
  it("renders_cover_strip_when_cover_prop_is_set", () => {
    const { container } = render(
      <KanbanCardView card={{ ...baseCard, cover: "#fa520f" }} />,
    );
    expect(container.querySelector('[data-part="cover"]')).toBeInTheDocument();
  });

  it("does_not_render_cover_strip_when_cover_prop_is_undefined", () => {
    const { container } = render(<KanbanCardView card={baseCard} />);
    expect(container.querySelector('[data-part="cover"]')).not
      .toBeInTheDocument();
  });

  it("cover_supports_linear_gradient_string", () => {
    const gradient = "linear-gradient(135deg, #fffaeb, #fa520f)";
    const { container } = render(
      <KanbanCardView card={{ ...baseCard, cover: gradient }} />,
    );
    const coverEl = container.querySelector(
      '[data-part="cover"]',
    ) as HTMLElement;
    expect(coverEl).toBeInTheDocument();
    expect(coverEl.style.background).toBe(gradient);
  });

  it("cover_supports_plain_color_string", () => {
    const { container } = render(
      <KanbanCardView card={{ ...baseCard, cover: "#fffaeb" }} />,
    );
    const coverEl = container.querySelector(
      '[data-part="cover"]',
    ) as HTMLElement;
    expect(coverEl).toBeInTheDocument();
    expect(coverEl.style.background).toBe("rgb(255, 250, 235)");
  });
});

/* ------------------------------------------------------------------ */
/* blocked prop                                                        */
/* ------------------------------------------------------------------ */
describe("KanbanCardView — blocked prop", () => {
  it("renders_blocked_badge_when_blocked_is_true", () => {
    const { container } = render(
      <KanbanCardView card={{ ...baseCard, blocked: true }} />,
    );
    const badge = container.querySelector('[data-part="blocked-badge"]');
    expect(badge).toBeInTheDocument();
    expect(badge?.textContent).toContain("BLOCKED");
  });

  it("does_not_render_blocked_badge_when_blocked_is_false", () => {
    const { container } = render(
      <KanbanCardView card={{ ...baseCard, blocked: false }} />,
    );
    expect(container.querySelector('[data-part="blocked-badge"]')).not
      .toBeInTheDocument();
  });

  it("does_not_render_blocked_badge_when_blocked_is_undefined", () => {
    const { container } = render(<KanbanCardView card={baseCard} />);
    expect(container.querySelector('[data-part="blocked-badge"]')).not
      .toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/* cover + blocked together                                            */
/* ------------------------------------------------------------------ */
describe("KanbanCardView — cover and blocked combined", () => {
  it("cover_and_blocked_can_be_set_together", () => {
    const gradient = "linear-gradient(135deg, #fffaeb, #fa520f)";
    const { container } = render(
      <KanbanCardView
        card={{ ...baseCard, cover: gradient, blocked: true }}
      />,
    );
    expect(container.querySelector('[data-part="cover"]')).toBeInTheDocument();
    expect(container.querySelector('[data-part="blocked-badge"]'))
      .toBeInTheDocument();
    expect(screen.getByText("Test card")).toBeInTheDocument();
  });
});
