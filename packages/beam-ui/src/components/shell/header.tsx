import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { css } from "styled-system/css";
import { token } from "styled-system/tokens";
import { headerLinks, docsSidebar } from "../../data/navigation";
import { useTheme } from "../../hooks/use-theme";

const header = css({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "64px",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid",
  borderColor: "border.default",
  bg: "bg.nav",
  shadow: "nav",
});

const inner = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "1440px",
  paddingInline: "32px",
});

const leftGroup = css({
  display: "flex",
  alignItems: "center",
  gap: "40px",
});

const brandLink = css({
  textDecoration: "none",
  fontSize: "20px",
  fontFamily: "heading",
  fontWeight: "heading",
  letterSpacing: "-0.3px",
  color: "text.primary",
});

const nav = css({
  display: "flex",
  alignItems: "center",
  gap: "24px",
});

const navLink = css({
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: "text.secondary",
  transition: "color 0.2s",
  position: "relative",
  _hover: {
    color: "accent",
  },
});

const navLinkActive = css({
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: "accent",
  position: "relative",
  _after: {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "-2px",
    height: "2px",
    bg: "accent",
  },
});

const rightGroup = css({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

const searchWrapper = css({
  position: "relative",
});

const searchIcon = css({
  position: "absolute",
  top: "50%",
  left: "12px",
  transform: "translateY(-50%)",
  fontSize: "16px",
  color: "text.muted",
  pointerEvents: "none",
});

const searchInput = css({
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

const kbdStyle = css({
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
  pointerEvents: "none",
});

const themeBtn = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  bg: "transparent",
  border: "none",
  cursor: "pointer",
  color: "text.secondary",
  fontSize: "20px",
  transition: "color 0.2s",
  _hover: {
    color: "accent",
  },
});

const searchDropdown = css({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  marginTop: "4px",
  bg: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "sm",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  maxHeight: "320px",
  overflowY: "auto",
  zIndex: 100,
});

const searchResultItem = css({
  display: "block",
  padding: "10px 16px",
  fontSize: "14px",
  color: "text.secondary",
  textDecoration: "none",
  cursor: "pointer",
  transition: "all 0.1s",
  _hover: {
    bg: "rgba(250, 82, 15, 0.08)",
    color: "accent",
  },
});

const searchResultSection = css({
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "text.muted",
  padding: "8px 16px 4px",
});

const searchNoResults = css({
  padding: "16px",
  fontSize: "13px",
  color: "text.muted",
  textAlign: "center",
});

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

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isActive = (label: string, href: string) => {
    if (href === "/") return location.pathname === "/";
    if (label === "COMMUNITY") return false;
    return location.pathname.startsWith(href);
  };

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
      navigate(href);
    },
    [navigate]
  );

  return (
    <header className={header}>
      <div className={inner}>
        <div className={leftGroup}>
          <Link to="/" className={brandLink}>
            Sunbeam Studios
          </Link>
          <nav className={nav}>
            {headerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={isActive(link.label, link.href) ? navLinkActive : navLink}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={rightGroup}>
          <div className={searchWrapper} ref={wrapperRef}>
            <span className={`material-symbols-outlined ${searchIcon}`}>search</span>
            <input
              ref={inputRef}
              className={searchInput}
              type="text"
              placeholder="Search docs..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
            />
            <kbd className={kbdStyle}>&#x2318;K</kbd>
            {showResults && query.trim() && (
              <div className={searchDropdown}>
                {filtered.length === 0 ? (
                  <div className={searchNoResults}>No results for "{query}"</div>
                ) : (
                  (() => {
                    let lastSection = "";
                    return filtered.map((item) => {
                      const showSection = item.section !== lastSection;
                      lastSection = item.section;
                      return (
                        <div key={item.href + item.label}>
                          {showSection && (
                            <div className={searchResultSection}>{item.section}</div>
                          )}
                          <a
                            className={searchResultItem}
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
          <button className={themeBtn} onClick={toggle} aria-label="Toggle theme">
            {theme === "light" ? "\u2600" : "\u263E"}
          </button>
        </div>
      </div>
    </header>
  );
}
