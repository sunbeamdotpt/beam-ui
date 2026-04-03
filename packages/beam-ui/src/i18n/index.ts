import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  createElement,
} from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface I18nConfig {
  defaultLocale: string;
  locales: Record<string, Record<string, string>>;
}

interface I18nContextValue {
  t: (key: string, vars?: Record<string, string | number>) => string;
  locale: string;
  setLocale: (locale: string) => void;
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

const I18nContext = createContext<I18nContextValue | null>(null);

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

interface I18nProviderProps {
  config: I18nConfig;
  locale: string;
  children: ReactNode;
}

export function I18nProvider({ config, locale: initialLocale, children }: I18nProviderProps) {
  const [locale, setLocale] = useState(initialLocale);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const messages = config.locales[locale] ?? config.locales[config.defaultLocale] ?? {};
      const fallback = config.locales[config.defaultLocale] ?? {};

      // Handle pluralization: if `count` is provided, try `.one` / `.other` suffixes
      let resolved: string | undefined;
      if (vars && "count" in vars) {
        const count = Number(vars.count);
        const suffix = count === 1 ? ".one" : ".other";
        resolved = messages[key + suffix] ?? fallback[key + suffix];
      }

      // Fall back to base key
      if (!resolved) {
        resolved = messages[key] ?? fallback[key] ?? key;
      }

      // Interpolate {{var}} placeholders
      if (vars) {
        resolved = resolved.replace(/\{\{(\w+)\}\}/g, (_, name) => {
          return vars[name] !== undefined ? String(vars[name]) : `{{${name}}}`;
        });
      }

      return resolved;
    },
    [locale, config]
  );

  const value: I18nContextValue = { t, locale, setLocale };

  return createElement(I18nContext.Provider, { value }, children);
}

/* ------------------------------------------------------------------ */
/* Hook                                                                */
/* ------------------------------------------------------------------ */

export function useTranslation(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return ctx;
}
