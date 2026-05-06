import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { css } from "styled-system/css";
import {
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogCloseTrigger,
} from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { headerLinks, docsSidebar } from "../../data/navigation";
import { Sidebar } from "./sidebar";
import { ThemeToggle } from "../ui/theme-toggle";

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
  borderColor: "border.subtle",
  bg: "bg.nav",
  shadow: "nav",
});

const inner = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "1440px",
  paddingInline: { base: "16px", md: "24px", lg: "32px" },
});

const leftGroup = css({
  display: "flex",
  alignItems: "center",
  gap: { base: "12px", lg: "40px" },
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
  display: { base: "none", lg: "flex" },
  alignItems: "center",
  gap: "24px",
});

const menuBtn = css({
  display: { base: "flex", lg: "none" },
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  bg: "transparent",
  border: "none",
  cursor: "pointer",
  color: "text.primary",
  transition: "color 0.2s",
  _hover: {
    color: "accent",
  },
});

const drawerBackdrop = css({
  position: "fixed",
  inset: 0,
  bg: "rgba(31, 31, 31, 0.5)",
  zIndex: 99,
});

const drawerPositioner = css({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: 100,
});

const drawerContent = css({
  width: "300px",
  height: "100%",
  bg: "bg.page",
  overflowY: "auto",
  boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
});

const drawerCloseBtn = css({
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
  position: "absolute",
  top: "14px",
  right: "8px",
  _hover: {
    color: "accent",
  },
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
  display: { base: "none", md: "block" },
});

const searchTriggerMobile = css({
  display: { base: "flex", md: "none" },
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  bg: "transparent",
  border: "1px solid",
  borderColor: "border.subtle",
  borderRadius: "sm",
  cursor: "pointer",
  color: "text.muted",
  fontSize: "16px",
  _hover: {
    borderColor: "accent",
    color: "accent",
  },
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

/** Props for {@link Header}. */
interface HeaderProps {
  /** Show a theme toggle button (right-aligned). Defaults to true. */
  showThemeToggle?: boolean;
  /** Extra elements rendered in the right group before the theme toggle. */
  actions?: ReactNode;
}

/**
 * Fixed top navigation header with logo, nav links (desktop), search (with Cmd+K support),
 * mobile menu drawer, and optional theme toggle. Consumes {@link headerLinks} from navigation data.
 *
 * @example
 * ```tsx
 * <Header showThemeToggle actions={<ProfileMenu />} />
 * ```
 */
export function Header({ showThemeToggle = true, actions }: HeaderProps = {}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

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
    <>
      <header className={header}>
        <div className={inner}>
          <div className={leftGroup}>
            <button
              className={menuBtn}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                menu
              </span>
            </button>
            <Link to="/" className={brandLink}>
              Sunbeam Studios
            </Link>
            <nav className={nav} aria-label="Main">
              {location.pathname !== "/" && headerLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={isActive(link.label, link.href) ? navLinkActive : navLink}
                  {...(isActive(link.label, link.href) ? { "aria-current": "page" as const } : {})}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className={rightGroup}>
            <button
              className={searchTriggerMobile}
              onClick={() => inputRef.current?.focus()}
              aria-label="Search"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                search
              </span>
            </button>
            <div className={searchWrapper} ref={wrapperRef}>
              <span className={`material-symbols-outlined ${searchIcon}`}>search</span>
              <input
                ref={inputRef}
                className={searchInput}
                type="text"
                placeholder="Search docs..."
                aria-label="Search docs"
                role="combobox"
                aria-expanded={showResults && query.trim().length > 0}
                aria-controls={showResults && query.trim() ? "search-listbox" : undefined}
                aria-autocomplete="list"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
              />
              <kbd className={kbdStyle}>&#x2318;K</kbd>
              {showResults && query.trim() && (
                <div className={searchDropdown} role="listbox" id="search-listbox">
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
                              <div className={searchResultSection} role="presentation">{item.section}</div>
                            )}
                            <a
                              className={searchResultItem}
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
            {actions}
            {showThemeToggle && <ThemeToggle />}
          </div>
        </div>
      </header>

      {/* Mobile/Tablet navigation drawer */}
      <DialogRoot open={drawerOpen} onOpenChange={(d) => setDrawerOpen(d.open)}>
        <Portal>
          <DialogBackdrop className={drawerBackdrop} />
          <DialogPositioner className={drawerPositioner}>
            <DialogContent className={drawerContent}>
              <DialogCloseTrigger className={drawerCloseBtn} aria-label="Close navigation">
                <span className="material-symbols-outlined">close</span>
              </DialogCloseTrigger>
              <Sidebar sections={docsSidebar} />
            </DialogContent>
          </DialogPositioner>
        </Portal>
      </DialogRoot>
    </>
  );
}
