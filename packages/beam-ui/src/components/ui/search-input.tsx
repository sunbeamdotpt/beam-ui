import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { css, cx } from "styled-system/css";
import { docsSidebar } from "../../data/navigation.ts";

/** Props for {@link SearchInput}. */
interface SearchInputProps {
  /** Additional CSS class. */
  className?: string;
}

// Build a flat list of all nav items for search
const allNavItems = docsSidebar.flatMap((section) =>
  section.items.flatMap((item) => {
    const results = [{ label: item.label, href: item.href, section: section.title }];
    if (item.children) {
      item.children.forEach((child) =>
        results.push({ label: child.label, href: child.href, section: section.title })
      );
    }
    return results;
  })
);

/**
 * Searchable documentation input with keyboard shortcuts and live filtering.
 * Responds to Cmd+K / Ctrl+K, displays filtered results grouped by section.
 *
 * @example
 * ```tsx
 * <SearchInput />
 * ```
 */
export function SearchInput({ className }: SearchInputProps): ReactNode {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Cmd+K / Ctrl+K to focus, Escape to blur
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setShowResults(true);
      }
      if (e.key === "Escape") {
        setQuery("");
        setShowResults(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = query.trim()
    ? allNavItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = useCallback(
    (href: string) => {
      setQuery("");
      setShowResults(false);
      inputRef.current?.blur();
      window.location.href = href;
    },
    []
  );

  return (
    <div className={cx(wrapper, className)} ref={wrapperRef}>
      <span className={`material-symbols-outlined ${iconStyle}`}>search</span>
      <input
        ref={inputRef}
        className={input}
        type="text"
        placeholder="Search docs..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowResults(true);
        }}
        onFocus={() => setShowResults(true)}
        aria-label="Search"
      />
      <kbd className={kbd}>⌘K</kbd>
      {showResults && query.trim() && (
        <div className={dropdown} role="listbox">
          {filtered.length === 0 ? (
            <div className={noResults}>No results for &ldquo;{query}&rdquo;</div>
          ) : (
            (() => {
              let lastSection = "";
              return filtered.map((item) => {
                const showSection = item.section !== lastSection;
                lastSection = item.section;
                return (
                  <div key={item.href + item.label}>
                    {showSection && (
                      <div className={sectionHeader} role="presentation">{item.section}</div>
                    )}
                    <a
                      className={resultItem}
                      role="option"
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelect(item.href);
                      }}
                    >
                      {item.label}
                    </a>
                  </div>
                );
              });
            })()
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const wrapper = css({
  position: "relative",
  display: "block",
});

const iconStyle = css({
  position: "absolute",
  top: "50%",
  left: "12px",
  transform: "translateY(-50%)",
  fontSize: "16px",
  color: "text.muted",
  pointerEvents: "none",
});

const input = css({
  width: "240px",
  paddingLeft: "36px",
  paddingRight: "48px",
  paddingBlock: "8px",
  fontSize: "14px",
  fontFamily: "body",
  fontWeight: "body",
  bg: "bg.card",
  border: "1px solid",
  borderColor: "border.subtle",
  borderRadius: "sm",
  outline: "none",
  color: "text.primary",
  _placeholder: {
    color: "text.muted",
  },
  _focus: {
    borderColor: "accent",
    boxShadow: "0 0 0 2px rgba(250, 82, 15, 0.15)",
  },
});

const kbd = css({
  position: "absolute",
  top: "50%",
  right: "12px",
  transform: "translateY(-50%)",
  fontSize: "10px",
  fontWeight: "button",
  color: "text.muted",
  border: "1px solid",
  borderColor: "border.default",
  paddingInline: "6px",
  paddingBlock: "2px",
  borderRadius: "sm",
  fontFamily: "mono",
  lineHeight: 1,
  pointerEvents: "none",
});

const dropdown = css({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  marginTop: "4px",
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  shadow: "golden",
  maxHeight: "320px",
  overflowY: "auto",
  zIndex: 100,
});

const sectionHeader = css({
  padding: "8px 12px",
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "text.muted",
  backgroundColor: "bg.card",
  borderBottom: "1px solid",
  borderColor: "border.subtle",
});

const resultItem = css({
  display: "block",
  padding: "8px 12px",
  fontSize: "14px",
  color: "text.primary",
  textDecoration: "none",
  cursor: "pointer",
  _hover: {
    backgroundColor: "bg.card",
    color: "sunbeam.orange",
  },
});

const noResults = css({
  padding: "16px",
  fontSize: "13px",
  color: "text.muted",
  textAlign: "center",
});
