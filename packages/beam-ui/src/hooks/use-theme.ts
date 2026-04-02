import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggle: () => void;
}

const getInitial = (): Theme => {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("sunbeam-theme") as Theme) ?? "light";
};

export const useTheme = create<ThemeStore>((set) => ({
  theme: getInitial(),
  toggle: () =>
    set((s) => {
      const next = s.theme === "light" ? "dark" : "light";
      localStorage.setItem("sunbeam-theme", next);
      document.documentElement.setAttribute("data-theme", next);
      return { theme: next };
    }),
}));

// Apply on load
if (typeof window !== "undefined") {
  document.documentElement.setAttribute("data-theme", getInitial());
}
