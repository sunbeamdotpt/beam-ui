import { type ReactNode, createElement } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Navigate } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

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

interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
}

export function RequireAuth({ children, redirectTo = "/login" }: RequireAuthProps) {
  const isAuthenticated = useAuth((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return createElement(Navigate, { to: redirectTo, replace: true });
  }

  return <>{children}</>;
}
