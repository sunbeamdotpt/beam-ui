import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { renderHook } from "@testing-library/react";
import { CommandPalette, type CommandPaletteItem } from "./command-palette.tsx";
import { useCommandPaletteShortcut } from "./use-command-palette-shortcut.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeItems(
  overrides?: Partial<CommandPaletteItem>[],
): CommandPaletteItem[] {
  const base: CommandPaletteItem[] = [
    {
      id: "1",
      label: "Open board",
      hint: "B",
      icon: "view_kanban",
      onSelect: vi.fn(),
    },
    {
      id: "2",
      label: "Create card",
      hint: "C",
      icon: "add",
      onSelect: vi.fn(),
    },
    {
      id: "3",
      label: "Find person",
      hint: "P",
      icon: "person",
      onSelect: vi.fn(),
    },
  ];
  if (!overrides) return base;
  return base.map((item, i) => ({ ...item, ...(overrides[i] ?? {}) }));
}

function renderPalette(
  props: Partial<React.ComponentProps<typeof CommandPalette>> = {},
) {
  const onOpenChange = vi.fn();
  const items = makeItems();
  render(
    <CommandPalette
      open
      onOpenChange={onOpenChange}
      items={items}
      {...props}
    />,
  );
  return { onOpenChange, items };
}

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

describe("CommandPalette — filtering", () => {
  it("shows_all_items_with_empty_query", () => {
    renderPalette();
    expect(screen.getByText("Open board")).toBeInTheDocument();
    expect(screen.getByText("Create card")).toBeInTheDocument();
    expect(screen.getByText("Find person")).toBeInTheDocument();
  });

  it("filters_to_substring_matches_case_insensitive", async () => {
    renderPalette();
    const user = userEvent.setup();
    const input = screen.getByRole("combobox");
    await user.type(input, "CARD");
    expect(screen.getByText("Create card")).toBeInTheDocument();
    expect(screen.queryByText("Open board")).not.toBeInTheDocument();
    expect(screen.queryByText("Find person")).not.toBeInTheDocument();
  });

  it("groups_items_by_group_label_when_provided", () => {
    const items: CommandPaletteItem[] = [
      { id: "a", label: "Alpha", group: "Navigation", onSelect: vi.fn() },
      { id: "b", label: "Beta", group: "Navigation", onSelect: vi.fn() },
      { id: "c", label: "Gamma", group: "Actions", onSelect: vi.fn() },
    ];
    renderPalette({ items });
    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Gamma")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Keyboard navigation
// ---------------------------------------------------------------------------

describe("CommandPalette — keyboard", () => {
  it("arrow_down_moves_active_row", async () => {
    renderPalette();
    const user = userEvent.setup();
    const input = screen.getByRole("combobox");
    // First item is active by default (index 0)
    const rows = screen.getAllByRole("option");
    expect(rows[0]).toHaveAttribute("data-active", "true");

    await user.type(input, "{ArrowDown}");
    const updatedRows = screen.getAllByRole("option");
    expect(updatedRows[1]).toHaveAttribute("data-active", "true");
  });

  it("arrow_up_at_first_row_wraps_to_last", async () => {
    renderPalette();
    const user = userEvent.setup();
    const input = screen.getByRole("combobox");
    // First item active (index 0); ArrowUp should wrap to last
    await user.type(input, "{ArrowUp}");
    const rows = screen.getAllByRole("option");
    expect(rows[rows.length - 1]).toHaveAttribute("data-active", "true");
  });

  it("enter_calls_onSelect_for_active_row", async () => {
    const onSelect = vi.fn();
    const items: CommandPaletteItem[] = [
      { id: "x", label: "Execute me", onSelect },
    ];
    const onOpenChange = vi.fn();
    render(
      <CommandPalette open onOpenChange={onOpenChange} items={items} />,
    );
    const user = userEvent.setup();
    const input = screen.getByRole("combobox");
    await user.type(input, "{Enter}");
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("escape_calls_onOpenChange_false", async () => {
    const onOpenChange = vi.fn();
    render(
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        items={makeItems()}
      />,
    );
    const user = userEvent.setup();
    const input = screen.getByRole("combobox");
    await user.type(input, "{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("tab_advances_like_arrow_down", async () => {
    renderPalette();
    const user = userEvent.setup();
    const input = screen.getByRole("combobox");
    // Index 0 is active; Tab should move to index 1
    await user.click(input);
    await user.keyboard("{Tab}");
    const rows = screen.getAllByRole("option");
    expect(rows[1]).toHaveAttribute("data-active", "true");
  });
});

// ---------------------------------------------------------------------------
// Click
// ---------------------------------------------------------------------------

describe("CommandPalette — click", () => {
  it("click_on_row_calls_onSelect_and_closes", async () => {
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    const items: CommandPaletteItem[] = [
      { id: "y", label: "Clickable", onSelect },
    ];
    render(
      <CommandPalette open onOpenChange={onOpenChange} items={items} />,
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("Clickable"));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

// ---------------------------------------------------------------------------
// Reset semantics
// ---------------------------------------------------------------------------

describe("CommandPalette — reset semantics", () => {
  it("query_clears_when_dialog_closes", async () => {
    const { rerender } = render(
      <CommandPalette
        open
        onOpenChange={vi.fn()}
        items={makeItems()}
      />,
    );
    const user = userEvent.setup();
    const input = screen.getByRole("combobox");
    await user.type(input, "card");
    expect(input).toHaveValue("card");

    // Close dialog
    rerender(
      <CommandPalette
        open={false}
        onOpenChange={vi.fn()}
        items={makeItems()}
      />,
    );
    // Reopen
    rerender(
      <CommandPalette
        open
        onOpenChange={vi.fn()}
        items={makeItems()}
      />,
    );
    const freshInput = screen.getByRole("combobox");
    expect(freshInput).toHaveValue("");
  });

  it("active_row_resets_to_0_when_items_change", async () => {
    const initialItems = makeItems();
    const { rerender } = render(
      <CommandPalette
        open
        onOpenChange={vi.fn()}
        items={initialItems}
      />,
    );
    const user = userEvent.setup();
    const input = screen.getByRole("combobox");
    // Move active to index 1
    await user.type(input, "{ArrowDown}");
    let rows = screen.getAllByRole("option");
    expect(rows[1]).toHaveAttribute("data-active", "true");

    // Swap in different items
    const newItems: CommandPaletteItem[] = [
      { id: "new1", label: "New item one", onSelect: vi.fn() },
      { id: "new2", label: "New item two", onSelect: vi.fn() },
    ];
    rerender(
      <CommandPalette open onOpenChange={vi.fn()} items={newItems} />,
    );
    rows = screen.getAllByRole("option");
    expect(rows[0]).toHaveAttribute("data-active", "true");
  });
});

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

describe("CommandPalette — empty state", () => {
  it("shows_empty_message_when_no_match", async () => {
    renderPalette({ emptyMessage: "Nothing here" });
    const user = userEvent.setup();
    const input = screen.getByRole("combobox");
    await user.type(input, "zzzzzzzzz");
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// useCommandPaletteShortcut hook
// ---------------------------------------------------------------------------

describe("useCommandPaletteShortcut", () => {
  const originalPlatform = navigator.platform;

  afterEach(() => {
    Object.defineProperty(navigator, "platform", {
      value: originalPlatform,
      configurable: true,
    });
  });

  it("meta_k_invokes_setOpen_true_on_mac", () => {
    Object.defineProperty(navigator, "platform", {
      value: "MacIntel",
      configurable: true,
    });
    const setOpen = vi.fn();
    renderHook(() => useCommandPaletteShortcut(setOpen));
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(setOpen).toHaveBeenCalledWith(true);
  });

  it("ctrl_k_invokes_setOpen_true_on_non_mac", () => {
    Object.defineProperty(navigator, "platform", {
      value: "Win32",
      configurable: true,
    });
    const setOpen = vi.fn();
    renderHook(() => useCommandPaletteShortcut(setOpen));
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(setOpen).toHaveBeenCalledWith(true);
  });

  it("non_matching_keys_do_nothing", () => {
    Object.defineProperty(navigator, "platform", {
      value: "MacIntel",
      configurable: true,
    });
    const setOpen = vi.fn();
    renderHook(() => useCommandPaletteShortcut(setOpen));
    fireEvent.keyDown(window, { key: "p", metaKey: true });
    fireEvent.keyDown(window, { key: "k", metaKey: false });
    expect(setOpen).not.toHaveBeenCalled();
  });

  it("removes_listener_on_unmount", () => {
    Object.defineProperty(navigator, "platform", {
      value: "MacIntel",
      configurable: true,
    });
    const setOpen = vi.fn();
    const { unmount } = renderHook(() => useCommandPaletteShortcut(setOpen));
    unmount();
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(setOpen).not.toHaveBeenCalled();
  });
});
