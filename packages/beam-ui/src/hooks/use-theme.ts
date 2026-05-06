import { create } from "zustand";

/** Theme variant: light or dark mode. */
type Theme = "light" | "dark";

/** State shape for the Zustand theme store. */
interface ThemeStore {
  /** Current theme mode. */
  theme: Theme;
  /** Toggle between light and dark modes, persisting to cookie and localStorage. */
  toggle: () => void;
}

const COOKIE_NAME = "sunbeam-theme";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

/** Read theme from cross-domain cookie, then localStorage, then system preference. */
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/** Write cookie on the broadest possible domain so all subdomains share it. */
function setCookie(name: string, value: string) {
  // Detect root domain: for "design.sunbeam.pt" → ".sunbeam.pt"
  const parts = window.location.hostname.split(".");
  const domain = parts.length >= 2
    ? "." + parts.slice(-2).join(".")
    : window.location.hostname;

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; domain=${domain}; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  // Also persist to localStorage as fallback
  localStorage.setItem(name, value);
}

const getInitial = (): Theme => {
  if (typeof window === "undefined") return "light";
  // 1. Cross-domain cookie (shared across all *.sunbeam.pt)
  const fromCookie = getCookie(COOKIE_NAME) as Theme | null;
  if (fromCookie === "light" || fromCookie === "dark") return fromCookie;
  // 2. localStorage fallback (same origin only)
  const fromStorage = localStorage.getItem(COOKIE_NAME) as Theme | null;
  if (fromStorage === "light" || fromStorage === "dark") return fromStorage;
  // 3. System preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

/**
 * Zustand store for theme persistence across all `*.sunbeam.pt` subdomains.
 *
 * Reads and writes theme via:
 * 1. Cross-domain cookie (broadest domain, shared across subdomains)
 * 2. localStorage (same-origin fallback)
 * 3. System preference (initial fallback if neither cookie nor storage is set)
 *
 * Applies the theme to document root via `data-theme` attribute on load and after toggle.
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, toggle } = useTheme();
 *   return <button onClick={toggle}>Toggle (current: {theme})</button>;
 * }
 * ```
 */
export const useTheme = create<ThemeStore>((set) => ({
  theme: getInitial(),
  toggle: () =>
    set((s) => {
      const next = s.theme === "light" ? "dark" : "light";
      setCookie(COOKIE_NAME, next);
      document.documentElement.setAttribute("data-theme", next);
      return { theme: next };
    }),
}));

// Apply on load
if (typeof window !== "undefined") {
  document.documentElement.setAttribute("data-theme", getInitial());
}
