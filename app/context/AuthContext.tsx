"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

/* ── State shape ── */
export interface AuthState {
  phone: string;
  otp: string;
  name: string;
  dob: string;
  gender: string;
  email: string;
  category: "flats" | "flatmates" | "couch-potato" | null;
}

interface AuthContextValue extends AuthState {
  updateAuth: (fields: Partial<AuthState>) => void;
  resetAuth: () => void;
}

const initialState: AuthState = {
  phone: "",
  otp: "",
  name: "",
  dob: "",
  gender: "",
  email: "",
  category: null,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ── Provider ── */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  const updateAuth = useCallback((fields: Partial<AuthState>) => {
    setState((prev) => ({ ...prev, ...fields }));
  }, []);

  const resetAuth = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, updateAuth, resetAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ── Hook ── */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
