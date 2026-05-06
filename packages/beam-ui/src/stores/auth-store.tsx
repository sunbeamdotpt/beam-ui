import { type ReactNode, createElement } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Navigate } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

/**
 * Authenticated user profile.
 *
 * Represents a logged-in user with identity and contact information.
 */
export interface User {
  /** Unique user identifier. */
  id: string;
  /** Login username. */
  username: string;
  /** Display name for UI (may differ from username). */
  displayName: string;
  /** Email address. */
  email: string;
  /** Optional avatar image URL. */
  avatarUrl?: string;
}

/** State shape for the Zustand auth store. */
interface AuthState {
  /** Authenticated user object, or null if not logged in. */
  user: User | null;
  /** Bearer token for API requests, or null if not authenticated. */
  token: string | null;
  /** True if user is currently authenticated. */
  isAuthenticated: boolean;
  /** True while an auth operation (login, logout, token refresh) is in progress. */
  isLoading: boolean;
  /** Set both token and user, marking the user as authenticated. */
  login: (token: string, user: User) => void;
  /** Clear token and user, marking the user as logged out. */
  logout: () => void;
  /** Update the user profile without changing authentication state. */
  setUser: (user: User) => void;
  /** Set the loading state during async operations. */
  setLoading: (loading: boolean) => void;
}

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

/**
 * Zustand store for authentication state and operations.
 *
 * Persists user and token to localStorage under key `"sunbeam-auth"`.
 * Use selectors to extract specific state fields without triggering unnecessary re-renders.
 *
 * @example
 * ```tsx
 * // Access entire auth state
 * const { user, isAuthenticated, login } = useAuth();
 *
 * // Access specific fields with selector (recommended for components)
 * const user = useAuth((s) => s.user);
 * const isLoading = useAuth((s) => s.isLoading);
 * ```
 */
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: (token: string, user: User) =>
        set({ token, user, isAuthenticated: true, isLoading: false }),

      logout: () =>
        set({ token: null, user: null, isAuthenticated: false, isLoading: false }),

      setUser: (user: User) =>
        set({ user }),

      setLoading: (loading: boolean) =>
        set({ isLoading: loading }),
    }),
    {
      name: "sunbeam-auth",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/* ------------------------------------------------------------------ */
/* RequireAuth guard                                                    */
/* ------------------------------------------------------------------ */

/** Props for {@link RequireAuth}. */
interface RequireAuthProps {
  /** Content to render if authenticated. */
  children: ReactNode;
  /** Route to redirect to if not authenticated. Defaults to `"/login"`. */
  redirectTo?: string;
}

/**
 * Route guard component that requires authentication.
 *
 * Renders children if user is authenticated, otherwise redirects to `redirectTo` path.
 * Useful as a wrapper for protected routes in React Router.
 *
 * @example
 * ```tsx
 * <Routes>
 *   <Route path="/" element={<Home />} />
 *   <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
 *   <Route path="/login" element={<LoginPage />} />
 * </Routes>
 * ```
 */
export function RequireAuth({ children, redirectTo = "/login" }: RequireAuthProps) {
  const isAuthenticated = useAuth((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return createElement(Navigate, { to: redirectTo, replace: true });
  }

  return <>{children}</>;
}
